-- 1. Habilitar a extensão pgcrypto para uuid_generate_v4
create extension if not exists "pgcrypto";

-- 2. Criar tabela de perfis de usuário (perfis públicos vinculados ao auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Habilitar RLS em profiles
alter table public.profiles enable row level security;

-- Criar políticas de RLS para profiles
create policy "Usuários podem visualizar o próprio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Usuários podem atualizar o próprio perfil"
  on public.profiles for update
  using (auth.uid() = id);

-- 3. Criar tabela de progresso persistente (novels, segredos, personagens)
create table if not exists public.user_progress (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  current_season integer default 1 not null,
  current_subphase integer default 1 not null, -- 1 = Investigador, 2 = Diretor, 3 = Interventor
  score integer default 0 not null,
  unlocked_characters jsonb default '[]'::jsonb not null, -- Ex: [{"id": 1, "level": 2}]
  unlocked_secrets jsonb default '[]'::jsonb not null, -- Ex: ["audio_mirella"]
  updated_at timestamp with time zone default now() not null
);

-- Habilitar RLS em user_progress
alter table public.user_progress enable row level security;

-- Criar políticas de RLS para user_progress
create policy "Usuários podem ver o próprio progresso"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Usuários podem inserir o próprio progresso"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Usuários podem atualizar o próprio progresso"
  on public.user_progress for update
  using (auth.uid() = user_id);

-- 4. Criar tabela de estados de partida (runs ativas)
create table if not exists public.game_states (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  legalidade integer default 50 not null check (legalidade >= 0 and legalidade <= 100),
  poder_politico integer default 50 not null check (poder_politico >= 0 and poder_politico <= 100),
  opiniao_publica integer default 50 not null check (opiniao_publica >= 0 and opiniao_publica <= 100),
  orcamento integer default 50 not null check (orcamento >= 0 and orcamento <= 100),
  active_card_id text,
  is_active boolean default true not null,
  years_survived integer default 0 not null,
  history_logs jsonb default '[]'::jsonb not null, -- Histórico de swiping da run atual
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Habilitar RLS em game_states
alter table public.game_states enable row level security;

-- Criar políticas de RLS para game_states
create policy "Usuários podem ver seus estados de jogo"
  on public.game_states for select
  using (auth.uid() = user_id);

create policy "Usuários podem criar estados de jogo"
  on public.game_states for insert
  with check (auth.uid() = user_id);

create policy "Usuários podem atualizar seus estados de jogo"
  on public.game_states for update
  using (auth.uid() = user_id);

create policy "Usuários podem deletar seus estados de jogo"
  on public.game_states for delete
  using (auth.uid() = user_id);

-- 5. Trigger automático para criar perfil ao criar conta no Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (new.id, split_part(new.email, '@', 1));
  
  -- Cria progresso inicial também
  insert into public.user_progress (user_id)
  values (new.id);
  
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
