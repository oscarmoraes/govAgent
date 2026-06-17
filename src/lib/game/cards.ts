export type Faction = 'consórcio' | 'cúpula' | 'sindicato' | 'neutro';

export interface Character {
  id: string;
  name: string;
  role: string;
  faction: Faction;
  description: string;
  avatarUrl: string;
  levelAvatars?: Record<number, string>; // Suporte a avatares dinâmicos de closeup por nível
}

export interface CardDecision {
  previewText: string;
  effects: {
    legalidade?: number;
    poder_politico?: number;
    opiniao_publica?: number;
    orcamento?: number;
    tensao?: number; // Efeito na Tensão do Pacto (+10, -15, etc.)
  };
  nextCardId?: string;
  unlockCharacterId?: string;
  unlockSecretId?: string; // Ex: 'reveal_faction_valerio'
}

export interface Card {
  id: string;
  characterId: string;
  text: string;
  left: CardDecision;
  right: CardDecision;
  subphase: 1 | 2 | 3;
  requiredLevel?: number; // Nível mínimo do dossiê do personagem para a carta entrar no pool
  requiredFactionRevealed?: boolean; // Se a facção já precisa ter sido descoberta
}

// Registro Geral de Personagens
export const CHARACTERS: Record<string, Character> = {
  'olga': {
    id: 'olga',
    name: 'Dona Olga',
    role: 'Aposentada Civil',
    faction: 'neutro',
    description: 'Antiga funcionária administrativa de cartório municipal, cujas economias sumiram de sua caderneta de poupança.',
    avatarUrl: '/assets/characters/olga.png',
  },
  'valerio': {
    id: 'valerio',
    name: 'Dr. Valério',
    role: 'Diretor-Presidente de Banco',
    faction: 'consórcio',
    description: 'Banqueiro de investimentos e articulador financeiro encarregado de ocultar recursos desviados em offshores.',
    avatarUrl: '/assets/characters/valerio.png',
  },
  'marina': {
    id: 'marina',
    name: 'Marina Cruz',
    role: 'Jornalista Investigativa',
    faction: 'neutro',
    description: 'Repórter independente do portal "Lupa Virtual", focada em crimes financeiros de colarinho branco.',
    avatarUrl: '/assets/characters/marina.png',
  },
  'hermes': {
    id: 'hermes',
    name: 'Dr. Hermes',
    role: 'Juiz Federal de Crimes Financeiros',
    faction: 'cúpula',
    description: 'Magistrado federal sênior suspeito de anular buscas policiais por supostos vícios processuais.',
    avatarUrl: '/assets/characters/hermes.png',
  },
  'sombra': {
    id: 'sombra',
    name: 'Marcos "Sombra"',
    role: 'Cobrador e Operador Tático',
    faction: 'sindicato',
    description: 'Executor e cobrador urbano a serviço das milícias e facções, encarregado de ameaçar testemunhas.',
    avatarUrl: '/assets/characters/sombra.png',
  },
  'clara': {
    id: 'clara',
    name: 'Clara Mendes',
    role: 'Diretora de TI Bancária',
    faction: 'consórcio',
    description: 'Superintendente operacional de câmbio que controla as senhas de servidores no exterior.',
    avatarUrl: '/assets/characters/clara.png',
  },
  'altamiro': {
    id: 'altamiro',
    name: 'Deputado Federal',
    role: 'Presidente de Comissão Legislativa',
    faction: 'cúpula',
    description: 'Líder parlamentar influente especializado em criar CPIs de retaliação e aprovar leis de abuso de autoridade.',
    avatarUrl: '/assets/characters/altamiro.png',
  },
  'rogerio': {
    id: 'rogerio',
    name: 'Inspetor Rogério',
    role: 'Investigador de Campo Sênior',
    faction: 'neutro',
    description: 'Agente sênior da agência GovAgent, parceiro leal do jogador nas operações de busca e apreensão.',
    avatarUrl: '/assets/characters/rogerio.png',
  },
  'mirella': {
    id: 'mirella',
    name: 'Mirella',
    role: 'Modelo & Influenciadora',
    faction: 'consórcio',
    description: 'Personalidade da internet suspeita de atuar como testa de ferro na propriedade de imóveis de luxo do banqueiro.',
    avatarUrl: '/assets/characters/mirella.png',
  },
  'augusto': {
    id: 'augusto',
    name: 'Dr. Augusto',
    role: 'Subprocurador da República',
    faction: 'cúpula',
    description: 'Promotor encarregado de assinar denúncias, acusado de reter investigações importantes em suas gavetas.',
    avatarUrl: '/assets/characters/augusto.png',
  },
  'geraldo': {
    id: 'geraldo',
    name: 'Geraldo',
    role: 'Operador de Câmbio Paralelo',
    faction: 'sindicato',
    description: 'Doleiro responsável por realizar transações com dinheiro em malas.',
    avatarUrl: '/assets/characters/geraldo.png',
  },
  'alice': {
    id: 'alice',
    name: 'Alice',
    role: 'Estudante de Direito',
    faction: 'neutro',
    description: 'Filha do Inspetor Rogério, estudante universitária.',
    avatarUrl: '/assets/characters/alice.png',
  },
  'fontes': {
    id: 'fontes',
    name: 'Dr. Fontes',
    role: 'Advogado Criminalista Sênior',
    faction: 'cúpula',
    description: 'Advogado criminalista sênior, especialista em anulações técnicas.',
    avatarUrl: '/assets/characters/fontes.png',
  },
  'beto': {
    id: 'beto',
    name: 'Beto',
    role: 'Engenheiro de Redes & Hacker',
    faction: 'sindicato',
    description: 'Hacker encarregado de roubar e sabotar provas da polícia.',
    avatarUrl: '/assets/characters/beto.png',
  },
  'cecilia': {
    id: 'cecilia',
    name: 'Sra. Cecília',
    role: 'Secretária Executiva',
    faction: 'neutro',
    description: 'Secretária executiva do banqueiro, testemunha ocular de crimes.',
    avatarUrl: '/assets/characters/cecilia.png',
  },
  'emilio': {
    id: 'emilio',
    name: 'Emílio',
    role: 'Gestor de Ativos Estrangeiros',
    faction: 'consórcio',
    description: 'Diretor financeiro associado a fundos estrangeiros e paraísos fiscais.',
    avatarUrl: '/assets/characters/emilio.png',
  },
  'linhares': {
    id: 'linhares',
    name: 'Senador da República',
    role: 'Líder do Governo no Senado',
    faction: 'cúpula',
    description: 'Líder político do governo, padrinho das indicações judiciais da Cúpula.',
    avatarUrl: '/assets/characters/linhares.png',
  },
  'thiago': {
    id: 'thiago',
    name: 'Cabo Thiago',
    role: 'Operador de Inteligência da PM',
    faction: 'sindicato',
    description: 'Policial militar que vaza relatórios de inteligência operacional.',
    avatarUrl: '/assets/characters/thiago.png',
  },
  'nelson': {
    id: 'nelson',
    name: 'Dr. Nelson',
    role: 'Perito Contábil Judicial',
    faction: 'cúpula',
    description: 'Perito judicial contábil contatado para fraudar laudos de auditoria.',
    avatarUrl: '/assets/characters/nelson.png',
  },
  'lucia': {
    id: 'lucia',
    name: 'Lúcia',
    role: 'Auditora de Compliance',
    faction: 'neutro',
    description: 'Auditora de conformidade do banco cooperativo CooperCred, responsável por detectar transações atípicas de desvios previdenciários.',
    avatarUrl: '/assets/characters/lucia.png',
  },
  'xavier': {
    id: 'xavier',
    name: 'Dr. Xavier',
    role: 'Diretor-Geral da GovAgent',
    faction: 'cúpula',
    description: 'Diretor-Geral da Agência de Inteligência (GovAgent), suspeito de atuar como agente infiltrado da Cúpula.',
    avatarUrl: '/assets/characters/xavier.png',
  },
  'mauricio': {
    id: 'mauricio',
    name: 'Dr. Maurício',
    role: 'Diretor da CVM',
    faction: 'consórcio',
    description: 'Diretor regulador que facilita a aprovação de debêntures fictícias para lavagem de capital.',
    avatarUrl: '/assets/characters/mauricio.png',
  },
  'sergio': {
    id: 'sergio',
    name: 'Sérgio',
    role: 'Gerente Alfandegário do Porto Seco',
    faction: 'sindicato',
    description: 'Gerente aduaneiro responsável por facilitar a liberação física de contêineres de contrabando.',
    avatarUrl: '/assets/characters/sergio.png',
  },
  'sandra': {
    id: 'sandra',
    name: 'Sandra',
    role: 'Ex-Esposa do Deputado',
    faction: 'neutro',
    description: 'Guarda diários secretos detalhando transações de construtoras para influenciar votações da PEC.',
    avatarUrl: '/assets/characters/sandra.png',
  },
  'brandao': {
    id: 'brandao',
    name: 'Dr. Brandão',
    role: 'Ministro do STJ',
    faction: 'cúpula',
    description: 'Magistrado de corte superior que comercializa decisões liminares e anulações de buscas táticas.',
    avatarUrl: '/assets/characters/brandao.png',
  },
  'jonas': {
    id: 'jonas',
    name: 'Jonas',
    role: 'Líder de Milícia Armada',
    faction: 'sindicato',
    description: 'Comandante operacional que coordena a segurança de perímetros clandestinos e rotas de contrabando.',
    avatarUrl: '/assets/characters/jonas.png',
  },
  'patricia': {
    id: 'patricia',
    name: 'Patrícia',
    role: 'Relações Públicas & Assessora',
    faction: 'neutro',
    description: 'Assessora de comunicação encarregada de plantar pautas de difamação e campanhas de fake news.',
    avatarUrl: '/assets/characters/patricia.png',
  },
  'emerson': {
    id: 'emerson',
    name: 'Emerson',
    role: 'Presidente do Fundo PreviGov',
    faction: 'consórcio',
    description: 'Gestor público encarregado de desviar aportes de previdência para fundos fantasmas de Nassau.',
    avatarUrl: '/assets/characters/emerson.png',
  },
  'renata': {
    id: 'renata',
    name: 'Renata Mendes',
    role: 'Analista Forense da Receita',
    faction: 'neutro',
    description: 'Auditora financeira encarregada de rastrear as contas bancárias ocultas e empresas de fachada.',
    avatarUrl: '/assets/characters/renata.png',
  },
  'vitor': {
    id: 'vitor',
    name: 'Vitor',
    role: 'Piloto de Carga Aérea',
    faction: 'sindicato',
    description: 'Piloto responsável por operar pousos táticos clandestinos transportando cargas não declaradas.',
    avatarUrl: '/assets/characters/vitor.png',
  },
};

// Deck de Cartas Narrativas Principais (Reescritas com Subtexto Cyber-Noir)
export const CARDS: Record<string, Card> = {
  // --- SUBFASE 1: INVESTIGADOR ---
  's1_olga_inicio': {
    id: 's1_olga_inicio',
    characterId: 'olga',
    text: 'Minhas economias sumiram da caderneta de poupança sob uma justificativa de [tarifa administrativa especial] da Cripta Valério. Eles estão me silenciando, por favor investigue!',
    left: {
      previewText: 'Ignorar queixa',
      effects: { opiniao_publica: -10, legalidade: 5, tensao: -5 },
      nextCardId: 's1_random_event',
    },
    right: {
      previewText: 'Investigar banco',
      effects: { opiniao_publica: 10, orcamento: -5, tensao: 5 },
      nextCardId: 's1_lucia_alerta',
      unlockCharacterId: 'lucia',
    },
    subphase: 1,
  },
  's1_lucia_alerta': {
    id: 's1_lucia_alerta',
    characterId: 'lucia',
    text: 'Chefe, a [Malha de Sinais] disparou um alerta. O desvio de Dona Olga não foi erro operacional: as economias foram convertidas em [títulos fantasmas] por Geraldo, o doleiro do Sindicato.',
    left: {
      previewText: 'Arquivar caso',
      effects: { legalidade: -10, opiniao_publica: -15, tensao: -10 },
      nextCardId: 's1_random_event',
    },
    right: {
      previewText: 'Rastrear Geraldo',
      effects: { legalidade: 10, orcamento: -10, tensao: 10 },
      nextCardId: 's1_geraldo_doleiro',
      unlockCharacterId: 'geraldo',
    },
    subphase: 1,
  },
  's1_geraldo_doleiro': {
    id: 's1_geraldo_doleiro',
    characterId: 'geraldo',
    text: 'Fui encurralado pela sua equipe. Posso descriptografar os registros da [Malha Offshore] da Cripta Valério se vocês me garantirem uma saída segura da cidade.',
    left: {
      previewText: 'Recusar acordo',
      effects: { legalidade: 15, orcamento: -10, opiniao_publica: -5, tensao: 15 },
      nextCardId: 's1_random_event',
    },
    right: {
      previewText: 'Fechar delação',
      effects: { legalidade: -10, poder_politico: -15, orcamento: 15, tensao: 10 },
      nextCardId: 's1_clara_dados',
      unlockCharacterId: 'clara',
      unlockSecretId: 'reveal_faction_valerio',
    },
    subphase: 1,
  },
  's1_clara_dados': {
    id: 's1_clara_dados',
    characterId: 'clara',
    text: 'Os registros do Geraldo me expuseram. Tenho acesso ao [terminal de Nassau]. Colaboro com as chaves de acesso se me derem abrigo contra o Sindicato.',
    left: {
      previewText: 'Negar proteção',
      effects: { legalidade: -15, opiniao_publica: -10, tensao: -15 },
      nextCardId: 's1_random_event',
    },
    right: {
      previewText: 'Dar proteção',
      effects: { orcamento: -20, legalidade: 20, tensao: 20 },
      nextCardId: 'transition_to_s2',
      unlockSecretId: 'reveal_faction_clara',
    },
    subphase: 1,
  },
  's1_pec_inicio': {
    id: 's1_pec_inicio',
    characterId: 'altamiro',
    text: 'Propus na comissão a PEC da Impunidade para blindar servidores contra abusos da GovAgent. Se apoiarem publicamente, garanto [verbas discricionárias] suplementares.',
    left: {
      previewText: 'Enfrentar proposta',
      effects: { legalidade: 15, poder_politico: -15, tensao: 15 },
      nextCardId: 's1_pec_dossie',
      unlockCharacterId: 'sandra',
    },
    right: {
      previewText: 'Apoiar PEC',
      effects: { poder_politico: 20, legalidade: -20, tensao: -10 },
      nextCardId: 's1_random_event',
    },
    subphase: 1,
  },
  's1_pec_dossie': {
    id: 's1_pec_dossie',
    characterId: 'sandra',
    text: 'Sou ex-esposa do Deputado Altamiro e guardo seus [diários secretos de caixa]. Eles revelam construtoras pagando propinas em espécie para comprar votos na PEC.',
    left: {
      previewText: 'Arquivar relatórios',
      effects: { legalidade: -15, poder_politico: 10, tensao: -10 },
      nextCardId: 's1_random_event',
    },
    right: {
      previewText: 'Indiciar parlamentar',
      effects: { legalidade: 25, orcamento: -10, tensao: 25 },
      nextCardId: 's1_pec_confronto',
      unlockCharacterId: 'brandao',
    },
    subphase: 1,
  },
  's1_pec_confronto': {
    id: 's1_pec_confronto',
    characterId: 'brandao',
    text: 'Como Ministro do STJ, exijo que retirem Sandra do programa de proteção. Caso contrário, decretarei a [anulação integral] de todas as suas buscas táticas.',
    left: {
      previewText: 'Ignorar e prosseguir',
      effects: { legalidade: 20, poder_politico: -25, tensao: 30 },
      nextCardId: 'transition_to_s2',
      unlockSecretId: 'reveal_faction_brandao',
    },
    right: {
      previewText: 'Recuar busca',
      effects: { poder_politico: 15, legalidade: -20, tensao: -15 },
      nextCardId: 'transition_to_s2',
    },
    subphase: 1,
  },
  's1_porto_inicio': {
    id: 's1_porto_inicio',
    characterId: 'sergio',
    text: 'Detectamos selos falsos nos contêineres do terminal alfandegário de Nassau. O Sindicato está usando o Porto Seco para mover [cargas pesadas] sem inspeção fiscal.',
    left: {
      previewText: 'Evitar atrito',
      effects: { legalidade: -10, tensao: -10 },
      nextCardId: 's1_random_event',
    },
    right: {
      previewText: 'Apreender terminal',
      effects: { legalidade: 15, orcamento: -15, tensao: 15 },
      nextCardId: 's1_porto_carga',
      unlockCharacterId: 'vitor',
    },
    subphase: 1,
  },
  's1_porto_carga': {
    id: 's1_porto_carga',
    characterId: 'vitor',
    text: 'Fui encurralado na pista de pouso clandestina da alfândega. Ofereço decodificar o manifesto de Nassau do Sindicato se me derem [imunidade tática].',
    left: {
      previewText: 'Recusar delação',
      effects: { legalidade: 20, tensao: 20 },
      nextCardId: 's1_random_event',
    },
    right: {
      previewText: 'Assinar acordo',
      effects: { legalidade: -10, orcamento: -15, poder_politico: 15 },
      nextCardId: 's1_porto_milicia',
      unlockCharacterId: 'jonas',
      unlockSecretId: 'reveal_faction_vitor',
    },
    subphase: 1,
  },
  's1_porto_milicia': {
    id: 's1_porto_milicia',
    characterId: 'jonas',
    text: 'O Sindicato controla este Porto Seco. Se insistirem em apreender nossos contêineres, retaliaremos com [bloqueios de sinal] e rotas de abastecimento urbano.',
    left: {
      previewText: 'Enfrentar milícia',
      effects: { legalidade: 25, orcamento: -20, opiniao_publica: 20, tensao: 30 },
      nextCardId: 'transition_to_s2',
      unlockSecretId: 'reveal_faction_jonas',
    },
    right: {
      previewText: 'Ceder e liberar',
      effects: { legalidade: -30, orcamento: 15, tensao: -20 },
      nextCardId: 'transition_to_s2',
    },
    subphase: 1,
  },
  's1_midia_inicio': {
    id: 's1_midia_inicio',
    characterId: 'patricia',
    text: 'Nossa agência de comunicação pode reverter o desgaste de imagem da GovAgent nos portais. Em troca, solicitamos que [desviem o foco] do Senador Linhares.',
    left: {
      previewText: 'Recusar chantagem',
      effects: { opiniao_publica: -15, legalidade: 15, tensao: 15 },
      nextCardId: 's1_midia_chantagem',
      unlockCharacterId: 'mirella',
    },
    right: {
      previewText: 'Fechar acordo RP',
      effects: { opiniao_publica: 25, legalidade: -20, poder_politico: 10 },
      nextCardId: 's1_random_event',
    },
    subphase: 1,
  },
  's1_midia_chantagem': {
    id: 's1_midia_chantagem',
    characterId: 'mirella',
    text: 'Patrícia me pagou em criptoativos para promover posts atacando sua conduta. Tenho os registros da [carteira digital] dela se prometerem não me indiciar.',
    left: {
      previewText: 'Ignorar Mirella',
      effects: { opiniao_publica: -10, legalidade: 5 },
      nextCardId: 's1_random_event',
    },
    right: {
      previewText: 'Expor carteira',
      effects: { opiniao_publica: 30, legalidade: 15, poder_politico: -20, tensao: 25 },
      nextCardId: 'transition_to_s2',
      unlockSecretId: 'reveal_faction_patricia',
    },
    subphase: 1,
  },
  's1_pensao_inicio': {
    id: 's1_pensao_inicio',
    characterId: 'emerson',
    text: 'Proponho injetar 400 milhões do fundo PreviGov em títulos estruturados garantidos pelo Banco Valério. É uma [operação segura] de fomento.',
    left: {
      previewText: 'Aprovar aporte',
      effects: { orcamento: 25, legalidade: -20, poder_politico: 10 },
      nextCardId: 's1_random_event',
    },
    right: {
      previewText: 'Bloquear fundos',
      effects: { legalidade: 20, orcamento: -10, tensao: 15 },
      nextCardId: 's1_pensao_auditoria',
      unlockCharacterId: 'renata',
    },
    subphase: 1,
  },
  's1_pensao_auditoria': {
    id: 's1_pensao_auditoria',
    characterId: 'renata',
    text: 'Analisei a movimentação e rastreei o desvio de 400 milhões do PreviGov direto para contas de Maurício, o Diretor da CVM. Devo lavrar o [auto de infração]?',
    left: {
      previewText: 'Abafar auto',
      effects: { legalidade: -20, poder_politico: 15 },
      nextCardId: 's1_random_event',
    },
    right: {
      previewText: 'Indiciar Maurício',
      effects: { legalidade: 25, poder_politico: -20, tensao: 25 },
      nextCardId: 'transition_to_s2',
      unlockCharacterId: 'mauricio',
      unlockSecretId: 'reveal_faction_emerson',
    },
    subphase: 1,
  },
  's1_xavier_confronto': {
    id: 's1_xavier_confronto',
    characterId: 'xavier',
    text: 'Você interceptou meus acessos ao terminal de Nassau. Posso transferir o sigilo dos inquéritos das contas de Linhares para você se esquecer disso.',
    left: {
      previewText: 'Prender Xavier',
      effects: { legalidade: 30, poder_politico: -30, tensao: 30 },
      nextCardId: 's1_random_event',
    },
    right: {
      previewText: 'Aceitar sigilo',
      effects: { poder_politico: 20, legalidade: -20, tensao: -15 },
      nextCardId: 's1_random_event',
    },
    subphase: 1,
  },

  // --- SUBFASE 2: DIRETOR ---
  's2_valerio_suborno': {
    id: 's2_valerio_suborno',
    characterId: 'valerio',
    text: 'Fiquei sabendo que o terminal de Nassau caiu em suas mãos. Ofereço um [seguro de segurança] de 20 milhões de créditos para arquivarem os logs contábeis. Fechamos?',
    left: {
      previewText: 'Recusar e indiciar',
      effects: { poder_politico: -20, opiniao_publica: 15, orcamento: -5 },
      nextCardId: 's2_altamiro_cpi',
      unlockCharacterId: 'altamiro',
    },
    right: {
      previewText: 'Aceitar verba',
      effects: { orcamento: 30, legalidade: -25, poder_politico: 10 },
      nextCardId: 's2_marina_vazamento',
      unlockSecretId: 'reveal_faction_altamiro',
    },
    subphase: 2,
  },
  's2_altamiro_cpi': {
    id: 's2_altamiro_cpi',
    characterId: 'altamiro',
    text: 'Sua Força-Tarefa está invadindo sistemas privados sem o [mandado de blindagem] do Congresso. Se não recuarem de Valério, abrirei uma CPI de retaliação.',
    left: {
      previewText: 'Enfrentar Congresso',
      effects: { poder_politico: -25, opiniao_publica: 20, orcamento: -10 },
      nextCardId: 's2_marina_vazamento',
      unlockSecretId: 'reveal_faction_linhares',
    },
    right: {
      previewText: 'Recuar nas buscas',
      effects: { poder_politico: 15, legalidade: -15, opiniao_publica: -15 },
      nextCardId: 's2_marina_vazamento',
    },
    subphase: 2,
  },
  's2_marina_vazamento': {
    id: 's2_marina_vazamento',
    characterId: 'marina',
    text: 'Interceptamos uma frequência de áudio do Dr. Valério combinando pagamentos ao juiz federal Dr. Hermes. Se eu lançar o [furo de imprensa], causará um sismo.',
    left: {
      previewText: 'Vazar tudo',
      effects: { opiniao_publica: 30, legalidade: -20, poder_politico: -15 },
      nextCardId: 's2_hermes_retaliacao',
      unlockCharacterId: 'hermes',
      unlockSecretId: 'reveal_faction_hermes',
    },
    right: {
      previewText: 'Pedir sigilo',
      effects: { legalidade: 15, opiniao_publica: -20 },
      nextCardId: 's2_hermes_retaliacao',
      unlockCharacterId: 'hermes',
    },
    subphase: 2,
  },
  's2_hermes_retaliacao': {
    id: 's2_hermes_retaliacao',
    characterId: 'hermes',
    text: 'Seus coletores de dados foram longe demais. Se continuarem farejando meu juízo, usarei meu poder de comarca para decretar a [anulação de provas] por vício formal.',
    left: {
      previewText: 'Representar no CNJ',
      effects: { legalidade: 20, poder_politico: -25, orcamento: -10 },
      nextCardId: 'transition_to_s3',
    },
    right: {
      previewText: 'Negociar termos',
      effects: { poder_politico: 15, legalidade: -20, opiniao_publica: -10 },
      nextCardId: 'transition_to_s3',
    },
    subphase: 2,
  },

  // --- SUBFASE 3: JULGAMENTO (CONFRONTO FINAL) ---
  's3_sombra_sequestro': {
    id: 's3_sombra_sequestro',
    characterId: 'sombra',
    text: 'O juiz federal marcou o júri da Cripta Valério. Mas a filha de Rogério está sob nosso radar de sequestro. Apague os [HDs originais] ou ela pagará o preço.',
    left: {
      previewText: 'Operação de resgate',
      effects: { orcamento: -30, opiniao_publica: 10, legalidade: 10 },
      nextCardId: 's3_rogerio_julgamento',
      unlockCharacterId: 'alice',
      unlockSecretId: 'reveal_faction_sombra',
    },
    right: {
      previewText: 'Ceder à chantagem',
      effects: { legalidade: -30, orcamento: 10, poder_politico: 10 },
      nextCardId: 's3_rogerio_traicao',
      unlockCharacterId: 'alice',
    },
    subphase: 3,
  },
  's3_rogerio_julgamento': {
    id: 's3_rogerio_julgamento',
    characterId: 'rogerio',
    text: 'Minha filha está a salvo do Sindicato! As provas da Cripta Valério continuam intactas. Iniciaremos o [júri federal] ou adiamos por precaução política?',
    left: {
      previewText: 'Iniciar o júri',
      effects: { legalidade: 20, opiniao_publica: 20 },
      nextCardId: 'julgamento_final',
    },
    right: {
      previewText: 'Adiar julgamento',
      effects: { legalidade: -15, poder_politico: 10 },
      nextCardId: 'julgamento_final',
    },
    subphase: 3,
  },
  's3_rogerio_traicao': {
    id: 's3_rogerio_traicao',
    characterId: 'rogerio',
    text: 'Obrigado por resgatar Alice, mas os registros originais foram corrompidos. Sem a [assinatura de Nassau], a comarca arquivará tudo e seremos exonerados.',
    left: {
      previewText: 'Ir a julgamento',
      effects: { legalidade: -40, opiniao_publica: -30 },
      nextCardId: 'julgamento_final',
    },
    right: {
      previewText: 'Pedir demissão',
      effects: { poder_politico: -50 },
      nextCardId: 'julgamento_final',
    },
    subphase: 3,
  },
  'cupula_intimidacao_1': {
    id: 'cupula_intimidacao_1',
    characterId: 'linhares',
    text: 'Senador Linhares envia um emissário com um aviso: "Suas buscas na Cripta Valério estão causando ruído desnecessário. Recue um passo ou a [lei de diretrizes orçamentárias] da agência será cortada."',
    left: {
      previewText: 'Recuar',
      effects: { tensao: -15, poder_politico: 10, orcamento: -5 },
    },
    right: {
      previewText: 'Ignorar Ameaça',
      effects: { tensao: 20, poder_politico: -15, orcamento: -15 },
    },
    subphase: 1,
  },
  'cupula_suborno_2': {
    id: 'cupula_suborno_2',
    characterId: 'fontes',
    text: 'Dr. Fontes liga de um número criptografado: "Meu cliente propõe uma doação generosa para os [fundos de pensão] dos seus agentes se garantirem o extravio dos logs de Nassau. Um acordo razoável?"',
    left: {
      previewText: 'Aceitar doação',
      effects: { tensao: -20, orcamento: 25, legalidade: -20 },
    },
    right: {
      previewText: 'Recusar',
      effects: { tensao: 25, opiniao_publica: 15, legalidade: 15 },
    },
    subphase: 1,
  },
  'cupula_ameaca_3': {
    id: 'cupula_ameaca_3',
    characterId: 'sombra',
    text: 'Marcos "Sombra" emparelha com seu carro no trânsito: "Você anda fazendo perguntas demais sobre a [Cripta Valério]. Lembre-se que sabemos onde a filha de Rogério estuda..."',
    left: {
      previewText: 'Reforçar guarda',
      effects: { tensao: 15, orcamento: -15, poder_politico: 10 },
    },
    right: {
      previewText: 'Ignorar',
      effects: { tensao: -25, legalidade: -15, opiniao_publica: -10 },
    },
    subphase: 1,
  },
  'cupula_final_4': {
    id: 'cupula_final_4',
    characterId: 'xavier',
    text: 'Diretor Xavier convoca uma reunião reservada: "A comarca exige que encerremos a investigação principal. Se você assinar a [certidão de arquivamento], terá uma promoção garantida."',
    left: {
      previewText: 'Assinar arquivamento',
      effects: { tensao: -30, poder_politico: 20, legalidade: -30 },
      nextCardId: 'transition_to_s2',
    },
    right: {
      previewText: 'Insistir no caso',
      effects: { tensao: 30, poder_politico: -20, legalidade: 20 },
      nextCardId: 'transition_to_s2',
    },
    subphase: 1,
  },
  's1_check_lucia': {
    id: 's1_check_lucia',
    characterId: 'lucia',
    text: 'Chefe, analisando a [assinatura criptográfica] dos servidores de Nassau, descobri que os relatórios do COAF foram desviados por uma rota interna da GovAgent. Temos um infiltrado na agência.',
    left: {
      previewText: 'Registrar segredo',
      effects: { legalidade: 10, poder_politico: -5 },
      unlockSecretId: 'reveal_faction_xavier',
      nextCardId: 's1_xavier_confronto',
    },
    right: {
      previewText: 'Arquivar em sigilo',
      effects: { poder_politico: 10, opiniao_publica: -5 },
    },
    subphase: 1,
  },
  's1_check_rogerio': {
    id: 's1_check_rogerio',
    characterId: 'rogerio',
    text: 'Detectamos olheiros do Sindicato monitorando os arredores do nosso perímetro. Eles querem as chaves de Nassau da [Cripta Valério] e parecem impacientes.',
    left: {
      previewText: 'Reforçar perímetros',
      effects: { orcamento: -15, legalidade: 10 },
    },
    right: {
      previewText: 'Vazar contrainformação',
      effects: { opiniao_publica: 15, poder_politico: -10 },
    },
    subphase: 1,
  },
};

// Eventos Genéricos de Sobrevivência (Ricos, Misteriosos e com Palavras-Chave e Níveis)
export const GENERIC_SURVIVAL_CARDS: Card[] = [
  // --- NÍVEL 1 ---
  {
    id: 'gen_olga_vizinhanca',
    characterId: 'olga',
    text: 'Dona Olga relata sussurros no corredor. Homens de casaco escuro entraram na sala ao lado carregando [maletas pesadas] com a marca da Cúpula.',
    left: {
      previewText: 'Ignorar queixa',
      effects: { opiniao_publica: -5, legalidade: 5 },
    },
    right: {
      previewText: 'Enviar ronda tática',
      effects: { orcamento: -5, opiniao_publica: 10 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_lucia_fracionado',
    characterId: 'lucia',
    text: 'Chefe, a [Malha de Sinais] detectou uma pulsação de transferências de crédito fragmentadas sob a mesma [assinatura fantasma] da Cripta Valério.',
    left: {
      previewText: 'Manter observação',
      effects: { opiniao_publica: -5, legalidade: 5 },
    },
    right: {
      previewText: 'Intimar operadores',
      effects: { orcamento: -10, legalidade: 15, poder_politico: -10 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_thiago_vazamento_sinal',
    characterId: 'thiago',
    text: 'Vigilância de sinal: Nossas frequências operacionais vazaram. O plano da batida tática de amanhã virou [ruído de rua] nos canais do Sindicato.',
    left: {
      previewText: 'Investigar equipe',
      effects: { legalidade: 15, orcamento: -5, poder_politico: -10 },
    },
    right: {
      previewText: 'Ignorar vazamento',
      effects: { legalidade: -15, poder_politico: 10 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_geraldo_receita_fiscal',
    characterId: 'geraldo',
    text: 'Chefe, a fiscalização do Porto farejou minhas [encomendas confidenciais] na alfândega do terminal. Preciso de um desvio de sinal rápido.',
    left: {
      previewText: 'Decretar apreensão',
      effects: { legalidade: 15, orcamento: -5, poder_politico: -10 },
    },
    right: {
      previewText: 'Desviar fiscais',
      effects: { orcamento: 10, legalidade: -20, poder_politico: 5 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_marina_furo_escuta',
    characterId: 'marina',
    text: 'Tive acesso a gravações de interceptações táticas ilegais contendo suborno a investigadores da agência. Devo lançar o [furo de imprensa]?',
    left: {
      previewText: 'Permitir furo',
      effects: { opiniao_publica: 20, legalidade: -15, poder_politico: -10 },
    },
    right: {
      previewText: 'Oferecer outro caso',
      effects: { orcamento: -10, opiniao_publica: -10, legalidade: 10 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_mirella_propaganda_incorporadora',
    characterId: 'mirella',
    text: 'A influenciadora Mirella iniciou uma campanha maciça na rede promovendo a incorporadora sob suspeita de ocultar [títulos imobiliários].',
    left: {
      previewText: 'Notificar agência',
      effects: { opiniao_publica: 10, poder_politico: -5 },
    },
    right: {
      previewText: 'Ignorar promoção',
      effects: { legalidade: -10, opiniao_publica: -10 },
    },
    subphase: 1,
    requiredLevel: 1,
  },

  // --- NÍVEL 2 ---
  {
    id: 'gen_olga_fraude_panfleto',
    characterId: 'olga',
    text: 'Dona Olga nos entrega um panfleto prometendo lucros de 6% ao mês por uma [banca clandestina] vinculada ao banqueiro Valério.',
    left: {
      previewText: 'Arquivar denúncia',
      effects: { legalidade: -10, opiniao_publica: -5 },
    },
    right: {
      previewText: 'Abrir auditoria',
      effects: { orcamento: -10, legalidade: 15, poder_politico: -5 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
  {
    id: 'gen_lucia_auditoria_cooperativa',
    characterId: 'lucia',
    text: 'A auditoria da CooperCred encontrou saques maciços em espécie efetuados na madrugada em terminais laranjas usando a [senha de Nassau].',
    left: {
      previewText: 'Abafar relatório',
      effects: { legalidade: -15, poder_politico: 10, orcamento: 5 },
    },
    right: {
      previewText: 'Bloquear senhas',
      effects: { orcamento: -10, legalidade: 20, opiniao_publica: 10 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
  {
    id: 'gen_thiago_gps_acesso',
    characterId: 'thiago',
    text: 'O Cabo Thiago solicita acesso em tempo real aos rastreadores de satélite das viaturas alegando [planejamento preventivo] contra milícias.',
    left: {
      previewText: 'Negar acesso',
      effects: { legalidade: 15, poder_politico: -5 },
    },
    right: {
      previewText: 'Autorizar sinal',
      effects: { legalidade: -20, poder_politico: 15, orcamento: 5 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
  {
    id: 'gen_geraldo_escuta_zona',
    characterId: 'geraldo',
    text: 'Escuta telefônica ativa: Geraldo combina em código a entrega de "envelopes de documentos" para a [segurança tática] da milícia nos portos.',
    left: {
      previewText: 'Realizar batida',
      effects: { orcamento: -15, legalidade: 20, opiniao_publica: 10 },
    },
    right: {
      previewText: 'Rastrear destino',
      effects: { legalidade: 10, poder_politico: -10 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
  {
    id: 'gen_marina_dossie_linhares',
    characterId: 'marina',
    text: 'A jornalista Marina obteve cópia dos diários contábeis secretos do Senador Linhares. Se ela publicar, haverá retaliações de [Censura Tática] contra a agência.',
    left: {
      previewText: 'Liberar publicação',
      effects: { opiniao_publica: 30, poder_politico: -25, orcamento: -10 },
    },
    right: {
      previewText: 'Apreender diários',
      effects: { legalidade: -20, poder_politico: 15, orcamento: 10 },
    },
    subphase: 2,
    requiredLevel: 2,
  },
  {
    id: 'gen_mirella_cobertura_nassau',
    characterId: 'mirella',
    text: 'Investigação patrimonial: A cobertura onde Mirella reside está em nome de um [fundo de fachada] das Bahamas financiado por Valério.',
    left: {
      previewText: 'Manter sigilo',
      effects: { poder_politico: 10, legalidade: -15 },
    },
    right: {
      previewText: 'Vazar para portais',
      effects: { opiniao_publica: 25, legalidade: -10, poder_politico: -15 },
    },
    subphase: 2,
    requiredLevel: 2,
  },
  {
    id: 'gen_nelson_laudo_simplificado',
    characterId: 'nelson',
    text: 'O perito Nelson relata brechas nos livros da Cripta Valério. Ele sugere emitir um [parecer simplificado] em troca de favorecimento político.',
    left: {
      previewText: 'Rejeitar parecer',
      effects: { legalidade: 15, poder_politico: -10 },
    },
    right: {
      previewText: 'Homologar parecer',
      effects: { poder_politico: 15, legalidade: -25, orcamento: 10 },
    },
    subphase: 2,
    requiredLevel: 2,
  },
  // --- NOVAS CARTAS DE EXPANSÃO (NÍVEL 1 E 2) ---
  {
    id: 'gen_rogerio_patrulha',
    characterId: 'rogerio',
    text: 'Chefe, detectamos movimentações estranhas na Zona Norte. Sugiro enviar uma [varredura de rádio] ou manter os agentes no perímetro.',
    left: {
      previewText: 'Recuar agentes',
      effects: { legalidade: 10, opiniao_publica: -5 },
    },
    right: {
      previewText: 'Enviar varredura',
      effects: { orcamento: -10, legalidade: -5, opiniao_publica: 10 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_rogerio_informante',
    characterId: 'rogerio',
    text: 'Um informante das docas diz que o Sindicato está aguardando um [carregamento especial]. Posso preparar uma campana tática.',
    left: {
      previewText: 'Ignorar pista',
      effects: { opiniao_publica: -10, legalidade: 10 },
    },
    right: {
      previewText: 'Montar campana',
      effects: { orcamento: -15, legalidade: 15, poder_politico: -5 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
  {
    id: 'gen_hermes_liminar',
    characterId: 'hermes',
    text: 'Fui notificado de uma petição de urgência da defesa. Posso expedir uma [liminar de suspensão] para acalmar os ânimos ou manter o curso legal.',
    left: {
      previewText: 'Sustentar busca',
      effects: { legalidade: 15, poder_politico: -15, orcamento: -5 },
    },
    right: {
      previewText: 'Decretar pausa',
      effects: { poder_politico: 15, legalidade: -20 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_hermes_audiencia',
    characterId: 'hermes',
    text: 'A audiência de conciliação está agendada. Se você ceder em liberar a [senha de Nassau], posso facilitar as certidões de busca contra o Sindicato.',
    left: {
      previewText: 'Manter bloqueio',
      effects: { legalidade: 15, poder_politico: -10 },
    },
    right: {
      previewText: 'Liberar acessos',
      effects: { poder_politico: 15, legalidade: -25, orcamento: 15 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
  {
    id: 'gen_altamiro_orcamento',
    characterId: 'altamiro',
    text: 'O Congresso está revendo as verbas de segurança. Um gesto de deferência às nossas pautas pode destravar o [crédito suplementar] da agência.',
    left: {
      previewText: 'Negar acordos',
      effects: { legalidade: 20, orcamento: -15, poder_politico: -10 },
    },
    right: {
      previewText: 'Alinhar pautas',
      effects: { orcamento: 20, legalidade: -15, poder_politico: 15 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_altamiro_discurso',
    characterId: 'altamiro',
    text: 'Tenho um pronunciamento agendado. Posso elogiar a lisura da agência ou denunciar o [abuso de interceptações] em rede nacional.',
    left: {
      previewText: 'Enfrentar críticas',
      effects: { opiniao_publica: -15, legalidade: 15, poder_politico: -10 },
    },
    right: {
      previewText: 'Negociar discurso',
      effects: { poder_politico: 15, opiniao_publica: 10, legalidade: -15 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
  {
    id: 'gen_fontes_acordo',
    characterId: 'fontes',
    text: 'Meu cliente está disposto a assinar um [termo de ajustamento] financeiro se a agência retirar a acusação de lavagem contábil.',
    left: {
      previewText: 'Negar acordo',
      effects: { legalidade: 15, opiniao_publica: 10, poder_politico: -10 },
    },
    right: {
      previewText: 'Aceitar multas',
      effects: { orcamento: 20, legalidade: -20, poder_politico: 5 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_fontes_recurso',
    characterId: 'fontes',
    text: 'Entrei com um recurso alegando que suas escutas táticas foram obtidas sem a devida [chave de autorização] judicial. Quer negociar?',
    left: {
      previewText: 'Contestar recurso',
      effects: { legalidade: 15, poder_politico: -15, orcamento: -5 },
    },
    right: {
      previewText: 'Conceder prazos',
      effects: { poder_politico: 15, legalidade: -20 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
  {
    id: 'gen_beto_rastreador',
    characterId: 'beto',
    text: 'Detectei uma vulnerabilidade no firewall da Cripta Valério. Posso instalar um [rastreador de pacotes] ou vender a falha para o Sindicato.',
    left: {
      previewText: 'Negar contratação',
      effects: { legalidade: 15, opiniao_publica: -5 },
    },
    right: {
      previewText: 'Contratar hacker',
      effects: { orcamento: -10, legalidade: -15, poder_politico: 15 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_beto_cripto',
    characterId: 'beto',
    text: 'Alguém está tentando rastrear meu endereço IP. Preciso de recursos para subir um [servidor proxy] ou apagarei as provas digitais.',
    left: {
      previewText: 'Negar verba',
      effects: { legalidade: 15, orcamento: 5, poder_politico: -15 },
    },
    right: {
      previewText: 'Financiar proxy',
      effects: { orcamento: -15, legalidade: -15, poder_politico: 20 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
  {
    id: 'gen_cecilia_agenda',
    characterId: 'cecilia',
    text: 'Achei uma cópia da [agenda de reuniões] do banqueiro Valério contendo datas de jantares confidenciais com a Cúpula. Devo entregar à equipe?',
    left: {
      previewText: 'Ignorar diários',
      effects: { opiniao_publica: -10, legalidade: 5 },
    },
    right: {
      previewText: 'Apreender agenda',
      effects: { legalidade: 15, opiniao_publica: 15, poder_politico: -15 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_cecilia_ameaca',
    characterId: 'cecilia',
    text: 'Recebi ligações com estática no meu ramal. Acho que o Sindicato descobriu que escondi os [diários de caixa] do banco.',
    left: {
      previewText: 'Negar escolta',
      effects: { opiniao_publica: -15, legalidade: 10 },
    },
    right: {
      previewText: 'Dar escolta civil',
      effects: { orcamento: -10, legalidade: 15, opiniao_publica: 15 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
  {
    id: 'gen_emilio_criptoativo',
    characterId: 'emilio',
    text: 'Há uma oscilação atípica nas transações de [criptoativos] de Nassau. Posso congelar a liquidação ou deixar o fluxo seguir.',
    left: {
      previewText: 'Congelar ativos',
      effects: { legalidade: 15, orcamento: -10, poder_politico: -10 },
    },
    right: {
      previewText: 'Manter fluxo',
      effects: { orcamento: 15, legalidade: -15, poder_politico: 10 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_emilio_assinatura',
    characterId: 'emilio',
    text: 'Os auditores estão na porta do escritório nas Bahamas. Preciso de uma [assinatura de trânsito] para mover os registros de lugar.',
    left: {
      previewText: 'Negar trânsito',
      effects: { legalidade: 20, orcamento: -10, poder_politico: -10 },
    },
    right: {
      previewText: 'Permitir trânsito',
      effects: { orcamento: 20, legalidade: -25, poder_politico: 10 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
  {
    id: 'gen_augusto_denuncia',
    characterId: 'augusto',
    text: 'A denúncia contra a Cripta Valério está pronta, mas o [colegiado de procuradores] exige mais robustez contábil para homologar.',
    left: {
      previewText: 'Pressionar júri',
      effects: { poder_politico: 15, legalidade: -15 },
    },
    right: {
      previewText: 'Aprofundar perícia',
      effects: { orcamento: -10, legalidade: 20, opiniao_publica: 10 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_augusto_limite',
    characterId: 'augusto',
    text: 'Recebi orientações para restringir o escopo das buscas digitais apenas ao escritório local, poupando a [senha de Nassau]. Como agir?',
    left: {
      previewText: 'Catar diretrizes',
      effects: { poder_politico: 15, legalidade: -15, opiniao_publica: -10 },
    },
    right: {
      previewText: 'Expandir buscas',
      effects: { legalidade: 20, poder_politico: -20, orcamento: -5 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
  {
    id: 'gen_linhares_indicacao',
    characterId: 'linhares',
    text: 'A vaga no Tribunal Superior está aberta. Posso indicar um corregedor favorável se você arquivar o inquérito das [contas de campanha].',
    left: {
      previewText: 'Rejeitar indicação',
      effects: { legalidade: 20, poder_politico: -25, opiniao_publica: 10 },
    },
    right: {
      previewText: 'Acolher nome',
      effects: { poder_politico: 20, legalidade: -25, orcamento: 10 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_linhares_pressao',
    characterId: 'linhares',
    text: 'A Cúpula está incomodada com as buscas. Um recuo estratégico nas investigações evitará retaliações de corte na [lei orçamentária] da agência.',
    left: {
      previewText: 'Avançar buscas',
      effects: { legalidade: 20, orcamento: -20, poder_politico: -20 },
    },
    right: {
      previewText: 'Suspender batida',
      effects: { poder_politico: 15, orcamento: 15, legalidade: -20 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
  {
    id: 'gen_alice_arquivo',
    characterId: 'alice',
    text: 'Encontrei pastas arquivadas do cartório estadual contendo assinaturas do antigo [Pacto das Sombras] de 1996. Devo extrair os PDFs?',
    left: {
      previewText: 'Bloquear arquivos',
      effects: { legalidade: -10, poder_politico: 10 },
    },
    right: {
      previewText: 'Baixar relatórios',
      effects: { legalidade: 15, orcamento: -5, opiniao_publica: 10 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_alice_sombra',
    characterId: 'alice',
    text: 'Notei um veículo escuro com vidros fumê vigiando a entrada da faculdade. Acho que estou sob rastreamento de [agentes fantasmas].',
    left: {
      previewText: 'Ignorar suspeita',
      effects: { opiniao_publica: -15, legalidade: 5 },
    },
    right: {
      previewText: 'Dar proteção policial',
      effects: { orcamento: -10, legalidade: 15, opiniao_publica: 15 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
  // --- NÍVEL 1 & 2 EXPANSÃO ---
  {
    id: 'gen_mauricio_cvm_inspecao',
    characterId: 'mauricio',
    text: 'Recebi um relatório de auditoria interna apontando movimentações atípicas no Banco Valério. Posso [atrasar a divulgação] do relatório.',
    left: {
      previewText: 'Atrasar laudo',
      effects: { legalidade: -15, poder_politico: 15, orcamento: 5 },
    },
    right: {
      previewText: 'Publicar laudo',
      effects: { legalidade: 20, poder_politico: -15, opiniao_publica: 15 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_mauricio_cvm_multa',
    characterId: 'mauricio',
    text: 'A CVM está prestes a aplicar uma multa recorde às corretoras associadas a Nassau. Podemos propor um [acordo administrativo].',
    left: {
      previewText: 'Propor acordo',
      effects: { orcamento: 20, legalidade: -20, poder_politico: 5 },
    },
    right: {
      previewText: 'Aplicar multa',
      effects: { legalidade: 15, opiniao_publica: 15, poder_politico: -10 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
  {
    id: 'gen_sergio_porto_fiscal',
    characterId: 'sergio',
    text: 'Fiscais da Receita querem escanear todos os contêineres do Porto Seco. Isso vai gerar um [atraso operacional] crítico.',
    left: {
      previewText: 'Pausar escâner',
      effects: { orcamento: 15, legalidade: -15 },
    },
    right: {
      previewText: 'Manter escaneamento',
      effects: { legalidade: 20, orcamento: -10, opiniao_publica: 5 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_sergio_porto_seguranca',
    characterId: 'sergio',
    text: 'A segurança tática da milícia local de Jonas se ofereceu para patrulhar o terminal em troca de [isenção tarifária] parcial.',
    left: {
      previewText: 'Aceitar patrulha',
      effects: { legalidade: -20, poder_politico: 15, orcamento: 10 },
    },
    right: {
      previewText: 'Recusar apoio',
      effects: { legalidade: 15, orcamento: -5 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
  {
    id: 'gen_sandra_diario_venda',
    characterId: 'sandra',
    text: 'Um portal de notícias me ofereceu uma quantia alta pelos diários originais de Altamiro. Devo [vender o material]?',
    left: {
      previewText: 'Vender diários',
      effects: { opiniao_publica: 20, legalidade: -15, poder_politico: -10 },
    },
    right: {
      previewText: 'Entregar à polícia',
      effects: { legalidade: 25, orcamento: -10, opiniao_publica: 15 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_sandra_ameaca_rua',
    characterId: 'sandra',
    text: 'Fui abordada por homens na rua exigindo as senhas dos arquivos criptografados. Acho que a Cúpula quer meu [silêncio definitivo].',
    left: {
      previewText: 'Pedir asilo',
      effects: { orcamento: -15, legalidade: 10, opiniao_publica: 10 },
    },
    right: {
      previewText: 'Mudar de endereço',
      effects: { orcamento: -5, legalidade: -5 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
  {
    id: 'gen_brandao_stj_liminar',
    characterId: 'brandao',
    text: 'A defense solicitou uma liminar suspendendo o compartilhamento dos dados de Nassau. Posso [conceder a suspensão] temporária.',
    left: {
      previewText: 'Conceder liminar',
      effects: { poder_politico: 15, legalidade: -20 },
    },
    right: {
      previewText: 'Denegar liminar',
      effects: { legalidade: 15, poder_politico: -15 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_brandao_stj_recurso',
    characterId: 'brandao',
    text: 'O plenário do tribunal vai julgar a legalidade da sua agência. Um recuo nas investigações do Senador ajudará a [manter o escopo] da GovAgent.',
    left: {
      previewText: 'Modular buscas',
      effects: { poder_politico: 20, legalidade: -15, orcamento: 5 },
    },
    right: {
      previewText: 'Manter ofensiva',
      effects: { legalidade: 20, poder_politico: -25, orcamento: -10 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
  {
    id: 'gen_jonas_milicia_pedagio',
    characterId: 'jonas',
    text: 'Estabelecemos um cordão de monitoramento nos acessos ao Porto Seco. Cobramos uma [taxa operacional] para garantir a paz.',
    left: {
      previewText: 'Pagar taxa',
      effects: { orcamento: -15, legalidade: -15, poder_politico: 15 },
    },
    right: {
      previewText: 'Desmantelar barreiras',
      effects: { legalidade: 20, orcamento: -10, opiniao_publica: 10 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_jonas_milicia_fuga',
    characterId: 'jonas',
    text: 'Nossos homens interceptaram o piloto Vitor. Se a GovAgent retirar os mandados de prisão contra minha liderança, [libero o piloto].',
    left: {
      previewText: 'Retirar mandados',
      effects: { legalidade: -25, poder_politico: 15 },
    },
    right: {
      previewText: 'Ignorar ultimato',
      effects: { legalidade: 15, opiniao_publica: -10 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
  {
    id: 'gen_patricia_rp_dossie',
    characterId: 'patricia',
    text: 'Tenho um plano de comunicação para desmentir os vazamentos da jornalista Marina Cruz, rotulando os áudios como [manipulação digital].',
    left: {
      previewText: 'Patrocinar campanha',
      effects: { opiniao_publica: 20, legalidade: -15, orcamento: -10 },
    },
    right: {
      previewText: 'Rejeitar RP',
      effects: { legalidade: 15, opiniao_publica: -15 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_patricia_rp_vazamento',
    characterId: 'patricia',
    text: 'Descobri de onde partem os vazamentos da GovAgent. Posso entregar o nome do agente traidor em troca do [arquivamento das contas] de Linhares.',
    left: {
      previewText: 'Aceitar nome',
      effects: { legalidade: 20, poder_politico: -15, opiniao_publica: -10 },
    },
    right: {
      previewText: 'Recusar acordo',
      effects: { legalidade: 10, opiniao_publica: 10 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
  {
    id: 'gen_emerson_previgov_compra',
    characterId: 'emerson',
    text: 'O conselho da PreviGov quer comprar títulos imobiliários de empresas de fachada vinculadas a Geraldo. O [retorno financeiro] é alto.',
    left: {
      previewText: 'Autorizar compra',
      effects: { orcamento: 25, legalidade: -20 },
    },
    right: {
      previewText: 'Vetar transação',
      effects: { legalidade: 20, orcamento: -10 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_emerson_previgov_auditoria',
    characterId: 'emerson',
    text: 'A auditoria da Receita está exigindo a abertura das contas do PreviGov de 2024. Posso alegar [sigilo administrativo] de segurança.',
    left: {
      previewText: 'Decretar sigilo',
      effects: { legalidade: -15, poder_politico: 15 },
    },
    right: {
      previewText: 'Abrir livros',
      effects: { legalidade: 20, poder_politico: -15 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
  {
    id: 'gen_renata_receita_offshore',
    characterId: 'renata',
    text: 'Rastreei uma remessa de 50 milhões enviada para a [Malha Offshore] nas Bahamas. A assinatura bate com a de Emílio.',
    left: {
      previewText: 'Notificar CVM',
      effects: { legalidade: 15, orcamento: -5 },
    },
    right: {
      previewText: 'Congelar de imediato',
      effects: { legalidade: 20, orcamento: -10, poder_politico: -10 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_renata_receita_intimacao',
    characterId: 'renata',
    text: 'Temos provas suficientes para intimar Dr. Valério sobre evasão de divisas. Devo lavrar a [intimação fiscal] oficial?',
    left: {
      previewText: 'Emitir intimação',
      effects: { legalidade: 25, poder_politico: -20, orcamento: -10 },
    },
    right: {
      previewText: 'Aguardar perícia',
      effects: { legalidade: -10, poder_politico: 10 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
  {
    id: 'gen_vitor_piloto_rota',
    characterId: 'vitor',
    text: 'Tenho as coordenadas da pista de pouso alternativa que o Sindicato usa. Posso [mapear a rota] para sua equipe.',
    left: {
      previewText: 'Seguir mapeamento',
      effects: { orcamento: -10, legalidade: 15, opiniao_publica: 10 },
    },
    right: {
      previewText: 'Ignorar pista',
      effects: { legalidade: -10, opiniao_publica: -5 },
    },
    subphase: 1,
    requiredLevel: 1,
  },
  {
    id: 'gen_vitor_piloto_fuga',
    characterId: 'vitor',
    text: 'A milícia de Jonas está patrulhando o hangar clandestino. Preciso de uma [escolta de fuga] urgente ou serei silenciado.',
    left: {
      previewText: 'Enviar escolta',
      effects: { orcamento: -15, legalidade: 15 },
    },
    right: {
      previewText: 'Deixar por conta',
      effects: { legalidade: -15, opiniao_publica: -10 },
    },
    subphase: 1,
    requiredLevel: 2,
  },
];
