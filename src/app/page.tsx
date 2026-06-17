'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { CHARACTERS, CARDS, GENERIC_SURVIVAL_CARDS, Card, Character, Faction } from '@/lib/game/cards';

// --- ICONES DE LINHA MINIMALISTAS (OUTLINE SVGS) ---
const ClockIcon = ({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" style={{ width: '12px', height: '12px', display: 'inline-block', verticalAlign: 'middle', ...style }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const FolderIcon = ({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" style={{ width: '16px', height: '16px', display: 'inline-block', verticalAlign: 'middle', ...style }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const UsersIcon = ({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" style={{ width: '16px', height: '16px', display: 'inline-block', verticalAlign: 'middle', ...style }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const KeyIcon = ({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" style={{ width: '16px', height: '16px', display: 'inline-block', verticalAlign: 'middle', ...style }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m-2-2a2 2 0 00-2 2m2-2a2 2 0 002 2m0 0V9a2 2 0 012 2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2M9 15v-1a5 5 0 111.06-4.06L14.25 14H15v1h1v1h1v1h-1v1h-1l-2.25-2.25M9 15a5 5 0 01-5-5" />
  </svg>
);

const LockIcon = ({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" style={{ width: '14px', height: '14px', display: 'inline-block', verticalAlign: 'middle', ...style }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const ExitIcon = ({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" style={{ width: '16px', height: '16px', display: 'inline-block', verticalAlign: 'middle', ...style }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const ShieldIcon = ({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" style={{ width: '32px', height: '32px', display: 'inline-block', verticalAlign: 'middle', ...style }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const SignalIcon = ({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" style={{ width: '16px', height: '16px', display: 'inline-block', verticalAlign: 'middle', ...style }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const SatelliteIcon = ({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" style={{ width: '24px', height: '24px', display: 'inline-block', verticalAlign: 'middle', ...style }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
  </svg>
);

const TerminalIcon = ({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" style={{ width: '24px', height: '24px', display: 'inline-block', verticalAlign: 'middle', ...style }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const AgentIcon = ({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" style={{ width: '24px', height: '24px', display: 'inline-block', verticalAlign: 'middle', ...style }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const ChartIcon = ({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" style={{ width: '24px', height: '24px', display: 'inline-block', verticalAlign: 'middle', ...style }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
  </svg>
);

export interface SwipeLog {
  dia: number;
  nome: string;
  texto: string;
  decisao: string;
  direcao: 'left' | 'right';
}

export default function GamePage() {
  const supabase = createClient();
  
  // --- ESTADOS DE AUTENTICAÇÃO E CARREGAMENTO ---
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // --- ESTADOS DO JOGO (PILAREs & PROGRESSÃO) ---
  const [legalidade, setLegalidade] = useState(50);
  const [poder, setPoder] = useState(50);
  const [opiniao, setOpiniao] = useState(50);
  const [orcamento, setOrcamento] = useState(50);
  
  const [subphase, setSubphase] = useState<1 | 2 | 3>(1);
  const [years, setYears] = useState(0);
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [gameOverReason, setGameOverReason] = useState<string | null>(null);
  const [isVictory, setIsVictory] = useState(false);
  
  // --- PERSISTÊNCIA (ARQUIVOS / DOSSIÊS) ---
  const [unlockedCharacters, setUnlockedCharacters] = useState<Record<string, number>>({});
  const [unlockedSecrets, setUnlockedSecrets] = useState<string[]>([]);
  const [activeRunId, setActiveRunId] = useState<string | null>(null);
  const [recentCardIds, setRecentCardIds] = useState<string[]>([]);
  const [teamDrawerOpen, setTeamDrawerOpen] = useState(false);
  const [tensaoPacto, setTensaoPacto] = useState(0);
  const [isPactPowerActive, setIsPactPowerActive] = useState(false);
  const [truceCooldown, setTruceCooldown] = useState(0);
  
  // --- ESTADOS DE PODERES ATIVÁVEIS ---
  const [isIndicatorPowerActive, setIsIndicatorPowerActive] = useState(false);
  const [isLuciaPowerActive, setIsLuciaPowerActive] = useState(false);
  const [isRogerioPowerActive, setIsRogerioPowerActive] = useState(false);
  const [isRenataPowerActive, setIsRenataPowerActive] = useState(false);
  const [hoveredChoice, setHoveredChoice] = useState<'left' | 'right' | null>(null);
  const [swipesLog, setSwipesLog] = useState<SwipeLog[]>([]);
  
  // --- UI CONTROLS ---
  const [showAuthPortal, setShowAuthPortal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);
  const [drawerTab, setDrawerTab] = useState<'dossiers' | 'history' | 'deaths'>('dossiers');
  const [pastRuns, setPastRuns] = useState<any[]>([]);
  const [showRescueModal, setShowRescueModal] = useState(false);
  const [showKeysModal, setShowKeysModal] = useState(false);

  // --- CONTROLE DE ANIMAÇÃO / SWIPE ---
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [cardTransitionState, setCardTransitionState] = useState<'normal' | 'leaving-left' | 'leaving-right' | 'entering'>('normal');
  const cardRef = useRef<HTMLDivElement>(null);

  // --- 1. AUTENTICAÇÃO E CARREGAMENTO INICIAL ---
  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        await loadUserData(session.user.id);
      }
      setAuthLoading(false);
    }
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setUser(session.user);
        await loadUserData(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Carrega dados persistentes do Supabase
  const loadUserData = async (userId: string) => {
    // 1. Carrega progresso global
    const { data: progress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (progress) {
      setUnlockedCharacters(progress.unlocked_characters || {});
      setUnlockedSecrets(progress.unlocked_secrets || []);
      setSubphase((progress.current_subphase as 1 | 2 | 3) || 1);
    }

    // 2. Carrega run ativa, se houver
    const { data: run } = await supabase
      .from('game_states')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (run) {
      setLegalidade(run.legalidade);
      setPoder(run.poder_politico);
      setOpiniao(run.opiniao_publica);
      setOrcamento(run.orcamento);
      setYears(run.years_survived);
      setActiveRunId(run.id);
      
      const historyObj = run.history_logs;
      if (historyObj && typeof historyObj === 'object' && !Array.isArray(historyObj)) {
        setRecentCardIds(historyObj.card_history || []);
        setTensaoPacto(historyObj.tensao_pacto || 0);
        setIsPactPowerActive(historyObj.is_pact_power_active || false);
        setTruceCooldown(historyObj.truce_cooldown || 0);
        setIsIndicatorPowerActive(historyObj.is_indicator_power_active !== undefined ? historyObj.is_indicator_power_active : false);
        setIsLuciaPowerActive(historyObj.is_lucia_power_active || false);
        setIsRogerioPowerActive(historyObj.is_rogerio_power_active || false);
        setIsRenataPowerActive(historyObj.is_renata_power_active || false);
        setSwipesLog(historyObj.swipes_log || []);
      } else {
        setRecentCardIds(Array.isArray(historyObj) ? historyObj : []);
        setTensaoPacto(0);
        setIsPactPowerActive(false);
        setTruceCooldown(0);
        setIsIndicatorPowerActive(false);
        setIsLuciaPowerActive(false);
        setIsRogerioPowerActive(false);
        setIsRenataPowerActive(false);
        setSwipesLog([]);
      }
      let activeCard = null;
      if (run.active_card_id) {
        let cardId = run.active_card_id;
        if (cardId === 's1_olga_fraude') cardId = 's1_olga_inicio';
        
        if (CARDS[cardId]) {
          activeCard = CARDS[cardId];
        } else {
          activeCard = GENERIC_SURVIVAL_CARDS.find(c => c.id === cardId) || null;
        }
      }

      if (activeCard) {
        setActiveCard(activeCard);
      } else {
        startNewRun(userId);
      }
    } else {
      startNewRun(userId);
    }

    // 3. Carrega histórico de mortes/runs concluídas
    const { data: past } = await supabase
      .from('game_states')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', false)
      .order('created_at', { ascending: false });

    if (past) {
      setPastRuns(past);
    }
  };

  // Login / Cadastro no Supabase
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setErrorMessage(error.message);
      else alert('Conta criada! Verifique seu email para confirmação (se ativo) ou faça login.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErrorMessage(error.message);
    }
  };

  // Login Anônimo (Facilita testes imediatos)
  const handleAnonymousLogin = async () => {
    setErrorMessage('');
    const { error } = await supabase.auth.signInAnonymously();
    if (error) setErrorMessage(error.message);
  };

  // --- 2. LÓGICA DE PARTIDA (RUN) ---
  const startNewRun = async (userId: string) => {
    // Carrega progresso para saber qual subfase iniciar e se o tutorial já foi jogado
    const { data: progress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    let startingSubphase: 1 | 2 | 3 = 1;
    let unlockedCharsMap = unlockedCharacters;
    
    if (progress) {
      startingSubphase = (progress.current_subphase as 1 | 2 | 3) || 1;
      unlockedCharsMap = progress.unlocked_characters || {};
    }

    setLegalidade(50);
    setPoder(50);
    setOpiniao(50);
    setOrcamento(50);
    setGameOverReason(null);
    setIsVictory(false);
    setRecentCardIds([]);
    setTensaoPacto(0);
    setIsPactPowerActive(false);
    setTruceCooldown(0);
    setIsIndicatorPowerActive(false);
    setIsLuciaPowerActive(false);
    setIsRogerioPowerActive(false);
    setIsRenataPowerActive(false);
    setSwipesLog([]);

    let firstCard: Card;
    let startingDay = 0;

    if (startingSubphase === 2) {
      firstCard = CARDS['s2_valerio_suborno'];
      startingDay = 28;
    } else if (startingSubphase === 3) {
      firstCard = CARDS['s3_sombra_sequestro'];
      startingDay = 35;
    } else {
      // Subfase 1: Se o jogador já desbloqueou algum personagem (ou seja, já jogou o tutorial),
      // sorteia aleatoriamente um dos 5 casos de início de história (Olga, PEC, Porto, Mídia ou Pensão)
      const hasPlayedTutorial = Object.keys(unlockedCharsMap).length > 0;
      if (hasPlayedTutorial) {
        const starterCaseIds = [
          's1_olga_inicio',
          's1_pec_inicio',
          's1_porto_inicio',
          's1_midia_inicio',
          's1_pensao_inicio'
        ];
        const randomId = starterCaseIds[Math.floor(Math.random() * starterCaseIds.length)];
        firstCard = CARDS[randomId] || CARDS['s1_olga_inicio'];
        startingDay = 0;
      } else {
        firstCard = CARDS['s1_olga_inicio'];
        startingDay = 0;
      }
    }

    setYears(startingDay);
    setSubphase(startingSubphase);
    setActiveCard(firstCard);

    // Salva o novo estado no banco de dados
    const { data: newRun, error } = await supabase
      .from('game_states')
      .insert({
        user_id: userId,
        legalidade: 50,
        poder_politico: 50,
        opiniao_publica: 50,
        orcamento: 50,
        active_card_id: firstCard.id,
        is_active: true,
        years_survived: startingDay,
        history_logs: {
          card_history: [],
          tensao_pacto: 0,
          is_pact_power_active: false,
          truce_cooldown: 0,
          is_indicator_power_active: true,
          is_lucia_power_active: false,
          is_rogerio_power_active: false,
          is_renata_power_active: false,
          swipes_log: []
        },
      })
      .select()
      .single();

    if (newRun) {
      setActiveRunId(newRun.id);
    }
  };

  // --- 3. MOTOR DE CÁLCULO MINIMAX (TEORIA DOS JOGOS) ---
  const calculateMinimaxCard = (currentSub: 1 | 2 | 3, history: string[] = []): Card => {
    const availableCards = GENERIC_SURVIVAL_CARDS.filter(c => {
      // 1. Valida a subfase atual da operação
      if (c.subphase > currentSub) return false;
      
      // 2. Valida se o jogador já atingiu o nível necessário do dossiê deste personagem
      // Cartas de Nível 1 podem rodar mesmo se o personagem estiver com nível 0 (desbloqueio por descoberta)
      const playerCharLevel = unlockedCharacters[c.characterId] || 0;
      const reqLevel = c.requiredLevel || 1;
      if (reqLevel > 1 && playerCharLevel < reqLevel) return false;

      // 3. Valida se exige que a facção já esteja exposta para a trama fazer sentido
      if (c.requiredFactionRevealed && !isFactionRevealed(c.characterId)) return false;

      return true;
    });
    
    // Filtro de Cooldown para impedir loops de cartas genéricas repetidas
    const cooldownSize = Math.max(0, Math.min(3, availableCards.length - 1));
    const recentPlayed = history.slice(-cooldownSize);
    const candidates = availableCards.filter(c => !recentPlayed.includes(c.id));
    const finalCandidates = candidates.length > 0 ? candidates : availableCards;
    
    let bestCard = finalCandidates[0];
    let maxMinVulnerability = -1;

    // Função de Vulnerabilidade: V(S) = sum(x - 50)^2
    const getVulnerability = (l: number, p: number, o: number, b: number) => {
      return Math.pow(l - 50, 2) + Math.pow(p - 50, 2) + Math.pow(o - 50, 2) + Math.pow(b - 50, 2);
    };

    // Percorre cada carta e calcula o Minimax
    finalCandidates.forEach(card => {
      // Simulação da escolha Esquerda (Left)
      const leftL = Math.max(0, Math.min(100, legalidade + (card.left.effects.legalidade || 0)));
      const leftP = Math.max(0, Math.min(100, poder + (card.left.effects.poder_politico || 0)));
      const leftO = Math.max(0, Math.min(100, opiniao + (card.left.effects.opiniao_publica || 0)));
      let leftEffB = card.left.effects.orcamento || 0;
      if (isLuciaPowerActive && leftEffB < 0) {
        leftEffB = Math.round(leftEffB * 0.7);
      }
      const leftB = Math.max(0, Math.min(100, orcamento + leftEffB));
      const vulnLeft = getVulnerability(leftL, leftP, leftO, leftB);

      // Simulação da escolha Direita (Right)
      const rightL = Math.max(0, Math.min(100, legalidade + (card.right.effects.legalidade || 0)));
      const rightP = Math.max(0, Math.min(100, poder + (card.right.effects.poder_politico || 0)));
      const rightO = Math.max(0, Math.min(100, opiniao + (card.right.effects.opiniao_publica || 0)));
      let rightEffB = card.right.effects.orcamento || 0;
      if (isLuciaPowerActive && rightEffB < 0) {
        rightEffB = Math.round(rightEffB * 0.7);
      }
      const rightB = Math.max(0, Math.min(100, orcamento + rightEffB));
      const vulnRight = getVulnerability(rightL, rightP, rightO, rightB);

      // O jogador jogará para minimizar seu perigo. O Sistema escolhe a carta que maximiza essa vulnerabilidade mínima.
      // Adicionamos uma perturbação aleatória (+- 40 pontos) para quebrar empates e evitar loops rígidos
      const minPlayerVuln = Math.min(vulnLeft, vulnRight);
      const score = minPlayerVuln + (Math.random() - 0.5) * 80;
      
      if (score > maxMinVulnerability) {
        maxMinVulnerability = score;
        bestCard = card;
      }
    });

    return bestCard || GENERIC_SURVIVAL_CARDS[0];
  };

  // --- 4. EXECUÇÃO DE DECISÃO (SWIPE RESOLUTION) ---
  const handleDecision = async (dir: 'left' | 'right') => {
    if (!activeCard || !user) return;

    const decision = dir === 'left' ? activeCard.left : activeCard.right;
    const effects = decision.effects;

    // Lúcia Ramos: Reduz perdas de Orçamento em 30%
    let effOrcamento = effects.orcamento || 0;
    if (isLuciaPowerActive && effOrcamento < 0) {
      effOrcamento = Math.round(effOrcamento * 0.7);
    }

    // Calcula os novos valores
    const nextL = Math.max(0, Math.min(100, legalidade + (effects.legalidade || 0)));
    const nextP = Math.max(0, Math.min(100, poder + (effects.poder_politico || 0)));
    const nextO = Math.max(0, Math.min(100, opiniao + (effects.opiniao_publica || 0)));
    const nextB = Math.max(0, Math.min(100, orcamento + effOrcamento));
    const nextYears = years + 1;
    setYears(nextYears);

    // Calcula os novos valores da tensão do pacto
    const nextTensao = Math.max(0, Math.min(100, tensaoPacto + (effects.tensao || 0)));
    setTensaoPacto(nextTensao);

    // Decrementa o cooldown da trégua a cada decisão de dia
    const nextCooldown = Math.max(0, truceCooldown - 1);
    setTruceCooldown(nextCooldown);

    // Registra o card jogado no histórico local para evitar repetições consecutivas
    const updatedHistory = [...recentCardIds, activeCard.id];
    setRecentCardIds(updatedHistory);

    // Registra o swipe no histórico de ações
    const newLogEntry: SwipeLog = {
      dia: years + 1,
      nome: activeChar ? activeChar.name : 'Desconhecido',
      texto: activeCard.text,
      decisao: decision.previewText,
      direcao: dir
    };
    const updatedSwipesLog = [...swipesLog, newLogEntry];
    setSwipesLog(updatedSwipesLog);

    // 1. Processa Desbloqueios de Personagem/Segredo
    let updatedChars = { ...unlockedCharacters };
    let updatedSecrets = [...unlockedSecrets];
    let progressChanged = false;

    // Auto-desbloqueia o dossiê do personagem no Nível 1 ao entrar em contato com ele nas operações
    if (activeCard.characterId && !updatedChars[activeCard.characterId]) {
      updatedChars[activeCard.characterId] = 1;
      progressChanged = true;
    }

    if (decision.unlockCharacterId) {
      const currentLevel = updatedChars[decision.unlockCharacterId] || 0;
      if (currentLevel < 3) {
        updatedChars[decision.unlockCharacterId] = currentLevel + 1;
        progressChanged = true;
      }
    }

    if (decision.unlockSecretId && !unlockedSecrets.includes(decision.unlockSecretId)) {
      updatedSecrets.push(decision.unlockSecretId);
      progressChanged = true;
    }

    // 2. Determina próxima carta e subfase
    let nextCard: Card | null = null;
    let nextSub = subphase;

    let lookupId = decision.nextCardId;
    if (lookupId === 's1_olga_fraude') lookupId = 's1_olga_inicio';

    if (lookupId && CARDS[lookupId]) {
      nextCard = CARDS[lookupId];
    } else if (decision.nextCardId === 'transition_to_s2') {
      if (nextYears >= 28) {
        nextSub = 2;
        nextCard = CARDS['s2_valerio_suborno'];
        progressChanged = true;
        updatedChars['valerio'] = 1; // Destrava Valerio no nível 1 ao iniciar subfase 2
      } else {
        // Ainda não sobreviveu 28 rodadas (4 semanas), continua investigando com Minimax
        nextCard = calculateMinimaxCard(subphase, updatedHistory);
      }
    } else if (decision.nextCardId === 'transition_to_s3') {
      nextSub = 3;
      nextCard = CARDS['s3_sombra_sequestro'];
      progressChanged = true;
      updatedChars['sombra'] = 1;
    } else if (decision.nextCardId === 'julgamento_final') {
      // Resolve o veredicto do chefe final da temporada
      
      // Validação das Assinaturas de Nassau (Valério, Linhares, Sombra, Xavier)
      const hasAllSignatures = 
        (unlockedCharacters['valerio'] || 0) === 3 &&
        (unlockedCharacters['linhares'] || 0) === 3 &&
        (unlockedCharacters['sombra'] || 0) === 3 &&
        (unlockedCharacters['xavier'] || 0) === 3;

      if (!hasAllSignatures) {
        setGameOverReason('Impunidade do Pacto: Você foi ao júri final sem as 4 assinaturas digitais de Nassau. O Pacto das Sombras blindou os réus e o processo foi enterrado.');
      } else if (nextL >= 60 && nextO >= 70) {
        setIsVictory(true);
      } else if (nextL < 40) {
        setGameOverReason('Anulado: Suas investigações foram declaradas ilegais e todas as provas anuladas pelo Supremo.');
      } else if (nextP < 20) {
        setGameOverReason('Exoneração: O Congresso aprovou a demissão da sua equipe de inteligência.');
      } else {
        setGameOverReason('Impunidade: O Banqueiro foi inocentado por falta de provas sólidas.');
      }
    } else {
      // Fallback para Minimax caso nextCardId seja nulo ou não exista no deck fixo (evita tela vazia)
      nextCard = calculateMinimaxCard(subphase, updatedHistory);
    }

    // Avanço automático por tempo: se atingir o dia 28 na subfase 1, transiciona obrigatoriamente
    if (nextSub === 1 && nextYears >= 28) {
      nextSub = 2;
      nextCard = CARDS['s2_valerio_suborno'];
      progressChanged = true;
      updatedChars['valerio'] = 1;
    }

    // Injeção de Eventos Narrativos da Cúpula (Sextas-Feiras) na Subfase 1
    if (nextSub === 1 && nextYears % 7 === 6) {
      if (nextYears === 6) nextCard = CARDS['cupula_intimidacao_1'];
      else if (nextYears === 13) nextCard = CARDS['cupula_suborno_2'];
      else if (nextYears === 20) nextCard = CARDS['cupula_ameaca_3'];
      else if (nextYears === 27) nextCard = CARDS['cupula_final_4'];
    }

    // Injeção de Eventos de Checkpoint Narrativo Intermediário na Subfase 1 (Dia 10 e Dia 20)
    if (nextSub === 1 && nextYears === 9) { // Dia 10 da run (years começa em 0, então nextYears === 9 é o dia 10 resolvido)
      nextCard = CARDS['s1_check_lucia'];
    } else if (nextSub === 1 && nextYears === 19) { // Dia 20 da run
      nextCard = CARDS['s1_check_rogerio'];
    }

    setActiveCard(nextCard);
    setSubphase(nextSub);

    // 3. Valida condições de derrota (pilares estourados + tensão do pacto)
    let reason: string | null = null;
    if (nextTensao >= 100) reason = 'Eliminação: A Cúpula Primária considerou suas ações uma ameaça intolerável ao Pacto das Sombras e decretou seu silenciamento definitivo.';
    else if (nextL <= 0) reason = 'Anulação: O STF anulou suas investigações devido a abusos de autoridade.';
    else if (nextL >= 100) reason = 'Prescrição: A excessiva burocracia travou os prazos e os crimes prescreveram.';
    else if (nextP <= 0) reason = 'Exoneração: Você foi exonerado após um complô de blindagem política.';
    else if (nextP >= 100) reason = 'Cooptação: Você cedeu aos acordos políticos e se tornou parte da engrenagem corrupta.';
    else if (nextO <= 0) reason = 'Abafamento: A opinião pública perdeu o interesse e o caso foi arquivado silenciosamente.';
    else if (nextO >= 100) reason = 'Histeria: Vazamentos descontrolados geraram pânico social e ruptura democrática.';
    else if (nextB <= 0) reason = 'Paralisia: Faltaram fundos básicos para manter os investigadores em campo.';
    else if (nextB >= 100) reason = 'Tirania: Você utilizou verbas ilegais do Estado e foi preso por desvio.';

    // Se houver derrota e o escudo de Rogério estiver ativo, consome e salva
    let finalL = nextL;
    let finalP = nextP;
    let finalO = nextO;
    let finalB = nextB;
    let finalRogerio = isRogerioPowerActive;

    if (reason && isRogerioPowerActive && nextTensao < 100) {
      reason = null;
      finalRogerio = false;
      setIsRogerioPowerActive(false);

      if (nextL <= 0) finalL = 20;
      if (nextL >= 100) finalL = 80;
      if (nextP <= 0) finalP = 20;
      if (nextP >= 100) finalP = 80;
      if (nextO <= 0) finalO = 20;
      if (nextO >= 100) finalO = 80;
      if (nextB <= 0) finalB = 20;
      if (nextB >= 100) finalB = 80;

      setShowRescueModal(true);
    }

    setLegalidade(finalL);
    setPoder(finalP);
    setOpiniao(finalO);
    setOrcamento(finalB);

    if (reason) {
      setGameOverReason(reason);
    }

    // 4. Salva progresso no Supabase
    if (user) {
      if (progressChanged) {
        setUnlockedCharacters(updatedChars);
        setUnlockedSecrets(updatedSecrets);
        await supabase
          .from('user_progress')
          .update({
            current_subphase: nextSub,
            unlocked_characters: updatedChars,
            unlocked_secrets: updatedSecrets,
          })
          .eq('user_id', user.id);
      }

      // Atualiza o estado da run atual
      if (activeRunId) {
        const historyData = {
          card_history: updatedHistory,
          tensao_pacto: nextTensao,
          is_pact_power_active: isPactPowerActive,
          truce_cooldown: nextCooldown,
          is_indicator_power_active: isIndicatorPowerActive,
          is_lucia_power_active: isLuciaPowerActive,
          is_rogerio_power_active: finalRogerio,
          is_renata_power_active: isRenataPowerActive,
          swipes_log: updatedSwipesLog,
          game_over_reason: reason || (isVictory ? 'Vitória Operacional: Dossiê Nassau concluído com sucesso e Cripta Valério condenada.' : null)
        };
        await supabase
          .from('game_states')
          .update({
            legalidade: finalL,
            poder_politico: finalP,
            opiniao_publica: finalO,
            orcamento: finalB,
            active_card_id: nextCard?.id || null,
            is_active: !reason && !isVictory && nextCard !== null,
            years_survived: nextYears,
            history_logs: historyData,
          })
          .eq('id', activeRunId);

        if (reason || isVictory || nextCard === null) {
          // Apenas recarrega o histórico de mortes/runs concluídas para atualizar a aba "Registro de Baixas",
          // sem sobrescrever a tela de Game Over/Vitória iniciando uma nova run automaticamente
          const { data: past } = await supabase
            .from('game_states')
            .select('*')
            .eq('user_id', user.id)
            .eq('is_active', false)
            .order('created_at', { ascending: false });

          if (past) {
            setPastRuns(past);
          }
        }
      }
    }
  };

  // --- 5. INTERAÇÃO DE ARRASTAR (POINTER EVENTS) ---
  const handlePointerDown = (e: React.PointerEvent) => {
    if (gameOverReason || isVictory) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    if (cardRef.current) {
      cardRef.current.style.transition = 'none';
      cardRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setDragOffset({ x: dx, y: dy });

    if (cardRef.current) {
      cardRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotateY(${dx * 0.12}deg) rotateX(${-dy * 0.08}deg) rotateZ(${dx * 0.06}deg)`;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (cardRef.current) {
      cardRef.current.releasePointerCapture(e.pointerId);
    }

    // Avalia o limiar de arrastar (110px)
    if (dragOffset.x > 110) {
      // Animação de saída da carta para a direita
      setCardTransitionState('leaving-right');
      setTimeout(async () => {
        // Limpa estilos inline antes de carregar a próxima carta
        if (cardRef.current) {
          cardRef.current.style.transform = '';
          cardRef.current.style.transition = '';
        }
        await handleDecision('right');
        setCardTransitionState('entering');
        setTimeout(() => {
          setCardTransitionState('normal');
        }, 35);
      }, 320);
    } else if (dragOffset.x < -110) {
      // Animação de saída da carta para a esquerda
      setCardTransitionState('leaving-left');
      setTimeout(async () => {
        if (cardRef.current) {
          cardRef.current.style.transform = '';
          cardRef.current.style.transition = '';
        }
        await handleDecision('left');
        setCardTransitionState('entering');
        setTimeout(() => {
          setCardTransitionState('normal');
        }, 35);
      }, 320);
    } else {
      // Retorna para o centro
      if (cardRef.current) {
        cardRef.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
        cardRef.current.style.transform = `translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
      }
    }
    setDragOffset({ x: 0, y: 0 });
  };

  // Determina opacity dos indicadores de texto lateral
  const leftOpacity = dragOffset.x < 0 ? Math.min(1, Math.abs(dragOffset.x) / 100) : 0;
  const rightOpacity = dragOffset.x > 0 ? Math.min(1, Math.abs(dragOffset.x) / 100) : 0;

  // Helpers de revelação de facções (segredos do e eixo de expansão)
  const isFactionRevealed = (charId: string) => {
    const char = CHARACTERS[charId];
    if (!char) return false;
    if (char.faction === 'neutro') return true;
    return unlockedSecrets.includes(`reveal_faction_${charId}`);
  };

  const getAvatarEmoji = (charId: string) => {
    const char = CHARACTERS[charId];
    if (!char) return '👤';
    if (char.faction === 'neutro') return '👤';
    if (!isFactionRevealed(charId)) return '👤';
    return char.faction === 'consórcio' ? '🏦' : char.faction === 'cúpula' ? '🏛️' : '🦂';
  };

  // Resolve o avatar de closeup do personagem conforme o nível atual do dossiê
  const getCharacterAvatar = (char: Character) => {
    const level = unlockedCharacters[char.id] || 1;
    if (char.levelAvatars && char.levelAvatars[level]) {
      return char.levelAvatars[level];
    }
    return char.avatarUrl;
  };

  // Renderiza a imagem do avatar com fallback robusto para o emoji de facção
  const renderAvatarContent = (char: Character) => {
    const avatar = getCharacterAvatar(char);
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'inherit' }}>
        <img
          src={avatar}
          alt={char.name}
          style={{ width: '100%', height: '100%', borderRadius: 'inherit', objectFit: 'cover', display: 'block' }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const fallbackSpan = e.currentTarget.nextElementSibling as HTMLElement;
            if (fallbackSpan) fallbackSpan.style.display = 'block';
          }}
        />
        <span style={{ fontSize: 'inherit', display: 'none' }}>
          {getAvatarEmoji(char.id)}
        </span>
      </div>
    );
  };

  // Transforma as marcações [palavra] em tags styled para realce de conotação cifrada
  const renderCardText = (text: string) => {
    if (!text) return "";
    const regex = /\[([^\]]+)\]/g;
    const parts = text.split(regex);
    const matches = text.match(regex);
    
    if (!matches) return <span>{text}</span>;
    
    let matchIndex = 0;
    return (
      <span>
        {parts.map((part, index) => {
          if (index % 2 === 1) {
            const rawWord = matches[matchIndex++];
            const keyword = rawWord.substring(1, rawWord.length - 1);
            return (
              <span key={index} className="suspicious-keyword" title="Cifrado Suspeito Detectado">
                {keyword}
              </span>
            );
          }
          return part;
        })}
      </span>
    );
  };

  // Ativa o sensor de escuta de frequências do Pacto
  const handleActivatePactSensor = async () => {
    if (isPactPowerActive || !user) return;
    
    if (poder < 10 && opiniao < 10) {
      alert("Recursos insuficientes para rastrear o canal de comunicações da Cúpula.");
      return;
    }

    let nextP = poder;
    let nextO = opiniao;
    if (poder >= opiniao) {
      nextP = Math.max(0, poder - 10);
      setPoder(nextP);
    } else {
      nextO = Math.max(0, opiniao - 10);
      setOpiniao(nextO);
    }

    setIsPactPowerActive(true);

    if (activeRunId) {
      const historyData = {
        card_history: recentCardIds,
        tensao_pacto: tensaoPacto,
        is_pact_power_active: true,
        truce_cooldown: truceCooldown,
        is_indicator_power_active: isIndicatorPowerActive,
        is_lucia_power_active: isLuciaPowerActive,
        is_rogerio_power_active: isRogerioPowerActive,
        is_renata_power_active: isRenataPowerActive,
        swipes_log: swipesLog
      };

      await supabase
        .from('game_states')
        .update({
          poder_politico: nextP,
          opiniao_publica: nextO,
          history_logs: historyData
        })
        .eq('id', activeRunId);
    }
  };

  // Propõe uma trégua temporária à Cúpula Primária
  const handleProposeTruce = async () => {
    if (!isPactPowerActive || truceCooldown > 0 || poder < 15 || !user) return;

    const nextP = Math.max(0, poder - 15);
    const nextTensao = Math.max(0, tensaoPacto - 25);
    const nextCooldown = 7; // Cooldown de 7 turnos (dias)

    setPoder(nextP);
    setTensaoPacto(nextTensao);
    setTruceCooldown(nextCooldown);

    if (activeRunId) {
      const historyData = {
        card_history: recentCardIds,
        tensao_pacto: nextTensao,
        is_pact_power_active: true,
        truce_cooldown: nextCooldown,
        is_indicator_power_active: isIndicatorPowerActive,
        is_lucia_power_active: isLuciaPowerActive,
        is_rogerio_power_active: isRogerioPowerActive,
        is_renata_power_active: isRenataPowerActive,
        swipes_log: swipesLog
      };

      await supabase
        .from('game_states')
        .update({
          poder_politico: nextP,
          history_logs: historyData
        })
        .eq('id', activeRunId);
    }
  };

  // Liga/desliga poderes com custos associados de Poder Político
  const handleTogglePower = async (member: 'lucia' | 'rogerio' | 'renata' | 'indicator') => {
    if (!user) return;

    let nextLucia = isLuciaPowerActive;
    let nextRogerio = isRogerioPowerActive;
    let nextRenata = isRenataPowerActive;
    let nextIndicator = isIndicatorPowerActive;
    let nextPoder = poder;

    if (member === 'lucia') {
      if (!isLuciaPowerActive) {
        if (poder < 10) {
          alert('Poder Político insuficiente para ativar o Rastreamento de Lúcia (Custo: 10).');
          return;
        }
        nextPoder = Math.max(0, poder - 10);
        nextLucia = true;
      } else {
        nextLucia = false;
      }
    } else if (member === 'rogerio') {
      if (!isRogerioPowerActive) {
        if (poder < 15) {
          alert('Poder Político insuficiente para ativar o Escudo de Rogério (Custo: 15).');
          return;
        }
        nextPoder = Math.max(0, poder - 15);
        nextRogerio = true;
      } else {
        nextRogerio = false;
      }
    } else if (member === 'renata') {
      if (!isRenataPowerActive) {
        if (poder < 12) {
          alert('Poder Político insuficiente para ativar a Quebra de Sigilo de Renata (Custo: 12).');
          return;
        }
        nextPoder = Math.max(0, poder - 12);
        nextRenata = true;
      } else {
        nextRenata = false;
      }
    } else if (member === 'indicator') {
      if (!isIndicatorPowerActive) {
        if (poder < 8) {
          alert('Poder Político insuficiente para reativar o Sensor de Previsão (Custo: 8).');
          return;
        }
        nextPoder = Math.max(0, poder - 8);
        nextIndicator = true;
      } else {
        nextIndicator = false;
      }
    }

    // Atualiza estados locais
    setIsLuciaPowerActive(nextLucia);
    setIsRogerioPowerActive(nextRogerio);
    setIsRenataPowerActive(nextRenata);
    setIsIndicatorPowerActive(nextIndicator);
    setPoder(nextPoder);

    if (activeRunId) {
      const historyData = {
        card_history: recentCardIds,
        tensao_pacto: tensaoPacto,
        is_pact_power_active: isPactPowerActive,
        truce_cooldown: truceCooldown,
        is_indicator_power_active: nextIndicator,
        is_lucia_power_active: nextLucia,
        is_rogerio_power_active: nextRogerio,
        is_renata_power_active: nextRenata,
        swipes_log: swipesLog
      };

      await supabase
        .from('game_states')
        .update({
          poder_politico: nextPoder,
          history_logs: historyData
        })
        .eq('id', activeRunId);
    }
  };

  const handleChoiceClick = (dir: 'left' | 'right') => {
    if (gameOverReason || isVictory || cardTransitionState !== 'normal') return;
    
    setCardTransitionState(dir === 'left' ? 'leaving-left' : 'leaving-right');
    
    setTimeout(async () => {
      if (cardRef.current) {
        cardRef.current.style.transform = '';
        cardRef.current.style.transition = '';
      }
      await handleDecision(dir);
      setCardTransitionState('entering');
      setTimeout(() => {
        setCardTransitionState('normal');
      }, 35);
    }, 320);
  };

  // Renderização do Histórico de Decisões no Menu de Arquivos
  const renderHistoryLog = () => {
    if (swipesLog.length === 0) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '40px 20px', textAlign: 'center' }}>
          <span style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📖</span>
          <h3 style={{ fontSize: '1rem', color: '#fff', marginBottom: '6px' }}>Histórico Vazio</h3>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', maxWidth: '240px' }}>
            Nenhuma decisão foi registrada ainda nesta rodada de operações.
          </p>
        </div>
      );
    }

    return (
      <div className="history-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fade-in 0.2s ease', paddingBottom: '20px' }}>
        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>
          Visualizando a ordem cronológica de decisões de campo. As investigações salvam cada detalhe de seu dossiê.
        </p>
        
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '20px', paddingLeft: '24px', borderLeft: '1px solid rgba(255, 255, 255, 0.05)' }}>
          {swipesLog.map((entry, idx) => {
            const isLeft = entry.direcao === 'left';
            const factionColor = isLeft ? 'var(--color-sindicato)' : 'var(--color-cúpula)';
            
            return (
              <div key={idx} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {/* Indicador no timeline */}
                <div 
                  style={{ 
                    position: 'absolute', 
                    left: '-29.5px', 
                    top: '4px', 
                    width: '10px', 
                    height: '10px', 
                    borderRadius: '50%', 
                    backgroundColor: factionColor,
                    boxShadow: `0 0 6px ${factionColor}`,
                    border: '2px solid #0d0d12'
                  }} 
                />
                
                {/* Header do card com Dia e Remetente */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-title)', fontSize: '0.75rem', fontWeight: 'bold', color: factionColor, letterSpacing: '0.5px' }}>
                    DIA {String(entry.dia).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)', fontWeight: '500' }}>
                    {entry.nome}
                  </span>
                </div>
                
                {/* Card de Conteúdo do log */}
                <div 
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.02)', 
                    border: '1px solid rgba(255, 255, 255, 0.04)', 
                    borderRadius: '8px', 
                    padding: '10px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)', fontStyle: 'italic', margin: 0, lineHeight: '1.4' }}>
                    "{entry.texto}"
                  </p>
                  
                  {/* Escolha realizada */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#fff', fontWeight: '500' }}>
                    <span style={{ color: factionColor }}>{isLeft ? '←' : '→'}</span>
                    <span>{entry.decisao}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Renderização do Histórico de Mortes (Registro de Baixas)
  const renderDeathsLog = () => {
    if (pastRuns.length === 0) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '40px 20px', textAlign: 'center' }}>
          <span style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔒</span>
          <h3 style={{ fontSize: '1rem', color: '#fff', marginBottom: '6px' }}>Sem Registro de Baixas</h3>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', maxWidth: '240px' }}>
            Nenhuma baixa operacional foi arquivada pela Corregedoria ainda.
          </p>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fade-in 0.2s ease', paddingBottom: '20px' }}>
        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>
          Visualizando o arquivo de mandatos e operações encerradas.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {pastRuns.map((run, index) => {
            const historyObj = run.history_logs;
            let gameOverReason = '';
            if (historyObj && typeof historyObj === 'object' && !Array.isArray(historyObj)) {
              gameOverReason = historyObj.game_over_reason || 'Operação arquivada sem motivo especificado.';
            } else {
              gameOverReason = 'Operação encerrada.';
            }

            const runDate = new Date(run.created_at).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            const isActualWin = gameOverReason.toLowerCase().includes('vitória') || gameOverReason.toLowerCase().includes('sucesso') || (run.legalidade >= 60 && run.opiniao_publica >= 70 && !gameOverReason.includes('💀') && !gameOverReason.includes('Falha') && !gameOverReason.includes('Impunidade') && !gameOverReason.includes('Anulado') && !gameOverReason.includes('Exoneração') && !gameOverReason.includes('Eliminação'));

            return (
              <div 
                key={run.id} 
                style={{
                  border: `1px solid ${isActualWin ? 'rgba(0, 255, 102, 0.2)' : 'rgba(255, 42, 95, 0.2)'}`,
                  background: isActualWin ? 'rgba(0, 255, 102, 0.02)' : 'rgba(255, 42, 95, 0.02)',
                  padding: '12px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontWeight: 'bold' }}>
                    OP #{pastRuns.length - index} — {runDate}
                  </span>
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 'bold',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: isActualWin ? 'rgba(0, 255, 102, 0.15)' : 'rgba(255, 42, 95, 0.15)',
                    color: isActualWin ? '#00ff66' : '#ff2a5f'
                  }}>
                    {isActualWin ? '🏆 CONCLUÍDO' : '💀 BAIXA'}
                  </span>
                </div>
                
                <div style={{ fontSize: '0.8rem', color: '#fff', lineHeight: '1.4' }}>
                  {gameOverReason}
                </div>

                <div style={{ display: 'flex', gap: '10px', fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '6px' }}>
                  <span>⏱️ {run.years_survived} dias</span>
                  <span>⚖️ {run.legalidade}%</span>
                  <span>🏛️ {run.poder_politico}%</span>
                  <span>📰 {run.opiniao_publica}%</span>
                  <span>💰 {run.orcamento}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Renderiza o Modal imersivo do resgate do Inspetor Rogério
  const renderRescueModal = () => {
    if (!showRescueModal) return null;

    return (
      <div className="rescue-overlay">
        <div className="rescue-card">
          <span className="rescue-icon" style={{ display: 'flex', justifyContent: 'center', margin: '0 auto 10px auto', color: '#ff2a5f' }}>
            <ShieldIcon style={{ width: '32px', height: '32px' }} />
          </span>
          <h2 className="rescue-title">Escudo de Campo Implantado</h2>
          <p className="rescue-desc">
            O Inspetor Rogério e sua equipe de intervenção tática interceptaram a situação a tempo! Eles contiveram o colapso dos seus recursos de campo.
          </p>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255, 42, 95, 0.85)', fontWeight: 'bold', margin: '4px 0 12px 0' }}>
            ATENÇÃO: O recurso em colapso foi estabilizado para limites operacionais seguros (20% ou 80%). O escudo de campo foi consumido.
          </p>
          <button className="btn-rescue-confirm" onClick={() => setShowRescueModal(false)}>
            Reconfigurar Protocolos
          </button>
        </div>
      </div>
    );
  };

  // Renderiza o Modal de Chaves Nassau
  const renderKeysModal = () => {
    if (!showKeysModal) return null;

    return (
      <div className="rescue-overlay" style={{ zIndex: 110 }}>
        <div className="rescue-card" style={{ maxWidth: '320px', padding: '24px 20px', border: '1px solid rgba(0, 229, 255, 0.3)', boxShadow: '0 0 20px rgba(0, 229, 255, 0.15)' }}>
          <span className="rescue-icon" style={{ textShadow: '0 0 10px rgba(0, 229, 255, 0.4)', color: '#00e5ff', display: 'flex', justifyContent: 'center', margin: '0 auto 10px auto' }}>
            <KeyIcon style={{ width: '32px', height: '32px' }} />
          </span>
          <h2 className="rescue-title" style={{ fontSize: '1.2rem', color: '#00e5ff', marginBottom: '8px' }}>Chaves Nassau</h2>
          <p className="rescue-desc" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4', marginBottom: '16px' }}>
            Descriptografe as 4 assinaturas de Nassau (Dossiê Nível 3 dos alvos chaves) para quebrar o Pacto das Sombras no Julgamento Final (Dia 28).
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', marginBottom: '20px' }}>
            {[
              { id: 'valerio', name: 'Dr. Valério' },
              { id: 'linhares', name: 'Senador Linhares' },
              { id: 'sombra', name: 'Marcos "Sombra"' },
              { id: 'xavier', name: 'Dr. Xavier' }
            ].map(target => {
              const lvl = unlockedCharacters[target.id] || 0;
              const isUnlocked = lvl === 3;
              return (
                <div key={target.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '8px 12px', 
                  background: 'rgba(9, 9, 12, 0.6)', 
                  borderRadius: '6px', 
                  border: isUnlocked ? '1px solid rgba(0, 255, 102, 0.2)' : '1px solid rgba(255,255,255,0.05)'
                }}>
                  <span style={{ fontSize: '0.85rem', color: isUnlocked ? '#ffffff' : 'rgba(255,255,255,0.4)', fontWeight: '600' }}>
                    {target.name}
                  </span>
                  <span style={{ 
                    fontSize: '0.78rem', 
                    color: isUnlocked ? '#00ff66' : 'rgba(255,255,255,0.2)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px',
                    fontWeight: 'bold'
                  }}>
                    {isUnlocked ? (
                      <>
                        <KeyIcon style={{ width: '12px', height: '12px', color: '#00ff66' }} /> Desbloqueado
                      </>
                    ) : (
                      <>
                        <LockIcon /> Bloqueado
                      </>
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          <button className="btn-rescue-confirm" style={{ backgroundColor: '#00e5ff', color: '#09090c', border: 'none', boxShadow: '0 0 10px rgba(0, 229, 255, 0.3)', width: '100%' }} onClick={() => setShowKeysModal(false)}>
            Confirmar e Voltar
          </button>
        </div>
      </div>
    );
  };

  // Renderização da Ficha do Personagem no Menu de Arquivos
  const renderCharacterDetails = () => {
    if (!selectedCharId) return null;
    const char = CHARACTERS[selectedCharId];
    const level = unlockedCharacters[selectedCharId] || 0;

    return (
      <div className="char-detail-view" style={{ animation: 'fade-in 0.2s ease' }}>
        <button onClick={() => setSelectedCharId(null)} className="btn-close" style={{ marginBottom: '16px' }}>← Voltar</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div className="char-folder-avatar" style={{ width: '80px', height: '80px', fontSize: '2.5rem', overflow: 'hidden' }}>
            {renderAvatarContent(char)}
          </div>
          <div>
            <h3 className="drawer-title">{char.name}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
              <span style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.6)', fontStyle: 'italic' }}>{char.role}</span>
              <span className={`card-faction-badge badge-${isFactionRevealed(char.id) ? char.faction : 'neutro'}`} style={{ position: 'relative', bottom: '0', alignSelf: 'flex-start' }}>
                {isFactionRevealed(char.id) ? `Facção: ${char.faction}` : 'Facção: ?'}
              </span>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '6px' }}>Perfil Básico (Nível 1)</h4>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>{char.description}</p>
          </div>

          <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', opacity: level >= 2 ? 1 : 0.4 }}>
            <h4 style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '6px' }}>Investigações (Nível 2)</h4>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
              {level >= 2 ? 'Investigado por conexão com o doleiro Geraldo e envolvimento em transações de empresas laranjas no banco do Dr. Valério.' : '🔒 Faça decisões adicionais sobre este personagem para desbloquear.'}
            </p>
          </div>

          <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', opacity: level >= 3 ? 1 : 0.4 }}>
            <h4 style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '6px' }}>Segredos Globais (Nível 3)</h4>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
              {level >= 3 ? 'Confirmado como elo principal entre a lavagem de capitais do Consórcio e o suborno legislativo operado por parlamentares.' : '🔒 Requer nível 3 de desbloqueio para acesso total.'}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // --- 6. RENDER DA TELA DE LOGIN ---
  if (authLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#09090c', color: '#fff' }}>
        <p>Carregando Força-Tarefa...</p>
      </div>
    );
  }

  if (!user) {
    if (!showAuthPortal) {
      return (
        <div className="app-container home-container">
          <div className="home-hero">
            <span style={{ fontSize: '2rem', display: 'block', animation: 'rescue-pulse-icon 2s infinite alternate ease-in-out', marginTop: '5px' }}>🏛️</span>
            <h1 className="home-logo-glow" style={{ fontSize: '2.1rem', margin: '4px 0' }}>GovAgent</h1>
            <p className="home-subtitle" style={{ margin: '2px 0 10px 0' }}>Força-Tarefa contra a Corrupção Sistêmica</p>
            <div className="home-description">
              Como Diretor-Geral da <strong>GovAgent</strong>, equilibre as facções da República, 
              desmantele o <strong>Pacto das Sombras</strong> e obtenha as assinaturas Nassau para evitar o colapso democrático.
            </div>
          </div>

          <h3 className="home-section-title">Facções Rivais</h3>
          <div className="home-faction-row">
            <div className="home-faction-badge faction-consorcio" title="Consórcio: Oligarquia financeira e desvios públicos">
              Consórcio
            </div>
            <div className="home-faction-badge faction-cupula" title="Cúpula: Elite política e magistrados corruptos">
              Cúpula
            </div>
            <div className="home-faction-badge faction-sindicato" title="Sindicato: Redes criminosas e milícias urbanas">
              Sindicato
            </div>
          </div>

          <h3 className="home-section-title">Capacidades da Agência</h3>
          <div className="home-caps-row">
            <div className="home-cap-tag" title="Previsão Tática (Radar de Opções)">
              <span>📡</span> Previsão
            </div>
            <div className="home-cap-tag" title="Malha de Sinais (Proteção de Gastos)">
              <span>👩‍💻</span> Sinais
            </div>
            <div className="home-cap-tag" title="Escudo de Campo (Prevenção de Colapso)">
              <span>🛡️</span> Escudo
            </div>
            <div className="home-cap-tag" title="Auditoria Forense (Detecção de Facções)">
              <span>📊</span> Auditoria
            </div>
          </div>

          <button 
            className="home-btn-start" 
            onClick={() => setShowAuthPortal(true)}
            id="btn-open-terminal"
          >
            Acessar Terminal Operacional ⚡
          </button>
        </div>
      );
    }

    return (
      <div className="app-container" style={{ padding: '24px 20px', justifyContent: 'center', gap: '12px', overflowY: 'hidden' }}>
        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '3rem' }}>🏛️</span>
          <h1 className="overlay-title" style={{ marginTop: '6px', fontSize: '1.6rem' }}>Acesso ao Sistema</h1>
          <p className="overlay-desc" style={{ fontSize: '0.8rem' }}>Força-Tarefa Especial contra a Corrupção Sistêmica</p>
        </div>

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
          <input
            type="email"
            placeholder="E-mail de Inteligência"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', background: '#121218', border: '1px solid rgba(255,255,255,0.06)', color: '#fff', fontSize: '0.85rem' }}
            required
          />
          <input
            type="password"
            placeholder="Senha de Acesso"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', background: '#121218', border: '1px solid rgba(255,255,255,0.06)', color: '#fff', fontSize: '0.85rem' }}
            required
          />
          <button type="submit" className="btn-primary" style={{ maxWidth: 'none', padding: '12px', background: '#00e5ff', color: '#09090c', boxShadow: '0 4px 15px rgba(0,229,255,0.2)', fontSize: '0.9rem', fontWeight: 'bold' }}>
            {isSignUp ? 'Cadastrar Credencial' : 'Autenticar'}
          </button>
        </form>

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '0.8rem' }}>
          <button onClick={() => setIsSignUp(!isSignUp)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
            {isSignUp ? 'Já tenho conta' : 'Criar nova credencial'}
          </button>
          <button onClick={() => setShowAuthPortal(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
            Voltar ao Início
          </button>
        </div>

        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.05)', margin: '8px 0' }} />

        <button onClick={handleAnonymousLogin} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}>
          🕵️ Entrar Anonimamente (Modo Teste)
        </button>

        {errorMessage && (
          <div style={{ padding: '12px', borderRadius: '6px', background: 'rgba(255,42,95,0.1)', border: '1px solid rgba(255,42,95,0.2)', color: 'var(--color-sindicato)', fontSize: '0.85rem', width: '100%', textAlign: 'center' }}>
            {errorMessage}
          </div>
        )}
      </div>
    );
  }

  const activeChar = activeCard ? CHARACTERS[activeCard.characterId] : null;

  const previewDirection = dragOffset.x < -15 ? 'left' : dragOffset.x > 15 ? 'right' : hoveredChoice;

  const getPilarPreviewClass = (pilarName: 'legalidade' | 'poder_politico' | 'opiniao_publica' | 'orcamento') => {
    if (!isIndicatorPowerActive || !previewDirection || !activeCard) return '';
    const decision = previewDirection === 'left' ? activeCard.left : activeCard.right;
    let val = decision.effects[pilarName] || 0;
    if (pilarName === 'orcamento' && isLuciaPowerActive && val < 0) {
      val = Math.round(val * 0.7);
    }
    if (val === 0) return '';
    const suffix = Math.abs(val) >= 15 ? 'large' : 'small';
    return val > 0 ? `pilar-preview-up-${suffix}` : `pilar-preview-down-${suffix}`;
  };

  return (
    <div className="app-container">
      {/* HEADER / PILARES DE TENSÃO */}
      <header className="tension-header">
        <div className={`pilar-card ${legalidade <= 15 ? 'pilar-danger-low' : legalidade >= 85 ? 'pilar-danger-high' : ''} ${getPilarPreviewClass('legalidade')}`}>
          <div className="pilar-liquid-fill fill-legalidade" style={{ height: `${legalidade}%` }} />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="svg-pilar-icon">
            <title>{`Legalidade: ${legalidade}%`}</title>
            <line x1="12" y1="3" x2="12" y2="21" />
            <line x1="9" y1="21" x2="15" y2="21" />
            <line x1="5" y1="7" x2="19" y2="7" />
            <line x1="5" y1="7" x2="2" y2="15" />
            <line x1="5" y1="7" x2="8" y2="15" />
            <path d="M2 15h6" />
            <line x1="19" y1="7" x2="16" y2="15" />
            <line x1="19" y1="7" x2="22" y2="15" />
            <path d="M16 15h6" />
          </svg>
        </div>

        <div className={`pilar-card ${poder <= 15 ? 'pilar-danger-low' : poder >= 85 ? 'pilar-danger-high' : ''} ${getPilarPreviewClass('poder_politico')}`}>
          <div className="pilar-liquid-fill fill-poder" style={{ height: `${poder}%` }} />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="svg-pilar-icon">
            <title>{`Poder Político: ${poder}%`}</title>
            <path d="M3 21h18" />
            <path d="M5 21V10h14v11" />
            <path d="M12 3L3 10h18L12 3z" />
            <line x1="8" y1="14" x2="8" y2="17" />
            <line x1="12" y1="14" x2="12" y2="17" />
            <line x1="16" y1="14" x2="16" y2="17" />
          </svg>
        </div>

        <div className={`pilar-card ${opiniao <= 15 ? 'pilar-danger-low' : opiniao >= 85 ? 'pilar-danger-high' : ''} ${getPilarPreviewClass('opiniao_publica')}`}>
          <div className="pilar-liquid-fill fill-opiniao" style={{ height: `${opiniao}%` }} />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="svg-pilar-icon">
            <title>{`Opinião Pública: ${opiniao}%`}</title>
            <path d="M3 8h4l9-5v18l-9-5H3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
            <path d="M13 16v3a2 2 0 0 1-2 2" />
            <path d="M19 8c1 1 1 3 0 4" />
            <path d="M22 6c2 2 2 6 0 8" />
          </svg>
        </div>

        <div className={`pilar-card ${orcamento <= 15 ? 'pilar-danger-low' : orcamento >= 85 ? 'pilar-danger-high' : ''} ${getPilarPreviewClass('orcamento')}`}>
          <div className="pilar-liquid-fill fill-orcamento" style={{ height: `${orcamento}%` }} />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="svg-pilar-icon">
            <title>{`Orçamento: ${orcamento}%`}</title>
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
      </header>

      {/* GAME FIELD */}
      <main className="game-field">
        <div className="timeline-info">
          <span>Dia {((years) % 7) + 1} — Semana {Math.floor(years / 7) + 1}</span>
          <span className="subphase-badge">
            {subphase === 1 ? 'Investigador' : subphase === 2 ? 'Diretor' : 'Interventor'}
          </span>
        </div>

        <div className="pact-panel-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '330px', margin: '4px 0 8px 0' }}>
          <div className="pact-status-bar" style={{ 
            width: '100%', 
            padding: '8px 12px', 
            background: 'rgba(9, 9, 12, 0.65)', 
            border: '1px solid rgba(0, 229, 255, 0.18)', 
            borderRadius: '8px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <span className="pact-title" style={{ fontSize: '0.75rem', color: '#00e5ff', fontWeight: 'bold', fontFamily: 'var(--font-title)', letterSpacing: '0.5px', display: 'flex', alignItems: 'center' }}>
                <SignalIcon style={{ marginRight: '6px', color: '#00e5ff' }} /> Pacto: {isPactPowerActive ? `TENSÃO DO PACTO: ${tensaoPacto}%` : 'SINAL CRIPTOGRAFADO'}
              </span>
              {!isPactPowerActive ? (
                <button 
                  onClick={handleActivatePactSensor}
                  style={{
                    padding: '3px 10px',
                    fontSize: '0.68rem',
                    color: '#00e5ff',
                    background: 'rgba(0, 229, 255, 0.1)',
                    border: '1px solid #00e5ff',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 0 6px rgba(0, 229, 255, 0.2)'
                  }}
                  title="Custo: 10 Poder para rastrear e revelar a Tensão do Pacto"
                >
                  Rastrear (-10)
                </button>
              ) : (
                <button 
                  onClick={handleProposeTruce}
                  disabled={truceCooldown > 0 || poder < 15}
                  style={{ 
                    padding: '3px 10px', 
                    fontSize: '0.68rem', 
                    color: truceCooldown > 0 ? 'rgba(255,255,255,0.25)' : '#00e5ff', 
                    background: truceCooldown > 0 ? 'rgba(255,255,255,0.02)' : 'rgba(0, 229, 255, 0.1)', 
                    border: '1px solid',
                    borderColor: truceCooldown > 0 ? 'rgba(255,255,255,0.1)' : '#00e5ff',
                    borderRadius: '4px', 
                    cursor: truceCooldown > 0 ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.2s ease',
                    boxShadow: truceCooldown > 0 ? 'none' : '0 0 6px rgba(0, 229, 255, 0.2)'
                  }}
                  title="Custo: 15 Poder para reduzir a Tensão do Pacto em 25%"
                >
                  {truceCooldown > 0 ? `Trégua (${truceCooldown}d)` : 'Trégua (-15)'}
                </button>
              )}
            </div>

            {isPactPowerActive ? (
              <div className="pact-tension-bar-container" style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                <div className="pact-tension-bar-fill" style={{ 
                  width: `${tensaoPacto}%`, 
                  height: '100%', 
                  backgroundColor: tensaoPacto >= 75 ? 'var(--color-sindicato)' : '#00e5ff',
                  boxShadow: tensaoPacto >= 75 ? '0 0 6px var(--color-sindicato)' : '0 0 6px #00e5ff',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            ) : null}
          </div>
        </div>

          {/* Sinais Ativos (Poderes Ativos) */}
          {(isIndicatorPowerActive || isLuciaPowerActive || isRogerioPowerActive || isRenataPowerActive) && (
            <div className="active-powers-hud">
              {isIndicatorPowerActive && (
                <span className="power-hud-badge badge-active-sensor" title="Sensor de Previsão Ativo">
                  📡 Sensor
                </span>
              )}
              {isLuciaPowerActive && (
                <span className="power-hud-badge badge-active-lucia" title="Rastreamento da Malha: Perdas de Orçamento mitigadas em 30%">
                  👩‍💻 Malha
                </span>
              )}
              {isRogerioPowerActive && (
                <span className="power-hud-badge badge-active-rogerio" title="Escudo de Campo: Evita derrota recuperando pilar crítico a 20%">
                  🛡️ Escudo
                </span>
              )}
              {isRenataPowerActive && (
                <span className="power-hud-badge badge-active-renata" title="Auditoria Forense: Revela a facção real do card atual">
                  📊 Sigilo
                </span>
              )}
            </div>
          )}

        <div className="card-deck">
          {activeCard && activeChar && (
            <div
              ref={cardRef}
              className={`game-card ${cardTransitionState}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              {/* Textos de Swipe Indicator */}
              <div className="card-indicator card-indicator-left" style={{ opacity: leftOpacity }}>
                {activeCard.left.previewText}
              </div>
              <div className="card-indicator card-indicator-right" style={{ opacity: rightOpacity }}>
                {activeCard.right.previewText}
              </div>

              <div className="card-character-banner" style={{ position: 'relative' }}>
                <div className="card-avatar-wrapper" style={{ overflow: 'hidden' }}>
                  {renderAvatarContent(activeChar)}
                </div>
                <span className="card-role-badge">
                  {activeChar.role}
                </span>
              </div>

              <div className="card-content">
                {isRenataPowerActive && (unlockedCharacters[activeChar.id] || 0) >= 2 && (() => {
                  const factionColor = activeChar.faction === 'consórcio' ? 'var(--color-consórcio)' :
                                       activeChar.faction === 'cúpula' ? 'var(--color-cúpula)' :
                                       activeChar.faction === 'sindicato' ? 'var(--color-sindicato)' : 'rgba(255,255,255,0.4)';
                  return (
                    <div style={{ textAlign: 'center', marginBottom: '4px' }}>
                      <span className="card-faction-reveal-badge" style={{
                        display: 'inline-block',
                        backgroundColor: 'rgba(9, 9, 12, 0.95)',
                        border: `1px solid ${factionColor}`,
                        color: factionColor,
                        fontSize: '0.65rem',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        boxShadow: `0 0 8px ${factionColor}`,
                        textShadow: `0 0 3px ${factionColor}`
                      }}>
                        {activeChar.faction}
                      </span>
                    </div>
                  );
                })()}
                <h2 className="card-name">{activeChar.name}</h2>
                <p className="card-text">{renderCardText(activeCard.text)}</p>
              </div>
            </div>
          )}
        </div>

        {activeCard && (
          <div className="choice-buttons-container">
            <button 
              className="btn-choice btn-choice-left" 
              onClick={() => handleChoiceClick('left')}
              onMouseEnter={() => setHoveredChoice('left')}
              onMouseLeave={() => setHoveredChoice(null)}
            >
              👈 {activeCard.left.previewText}
            </button>
            <button 
              className="btn-choice btn-choice-right" 
              onClick={() => handleChoiceClick('right')}
              onMouseEnter={() => setHoveredChoice('right')}
              onMouseLeave={() => setHoveredChoice(null)}
            >
              {activeCard.right.previewText} 👉
            </button>
          </div>
        )}
      </main>

      {/* BOTTOM BAR */}
      <footer className="bottom-bar" style={{ gap: '10px' }}>
        <button className="btn-archives" style={{ flex: 1 }} onClick={() => { setDrawerOpen(true); setDrawerTab('dossiers'); setSelectedCharId(null); }}>
          <FolderIcon /> Arquivos
        </button>
        <button className="btn-archives" style={{ flex: 1, backgroundColor: 'rgba(0, 229, 255, 0.05)', borderColor: 'rgba(0, 229, 255, 0.2)', color: '#00e5ff' }} onClick={() => setTeamDrawerOpen(true)}>
          <UsersIcon /> Equipe
        </button>
        <button className="btn-icon" title="Chaves Nassau" onClick={() => setShowKeysModal(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <KeyIcon style={{ width: '18px', height: '18px' }} />
        </button>
        <button className="btn-icon" title="Encerrar Sessão" onClick={async () => {
          if (window.confirm("Deseja realmente encerrar a sessão operacional e sair do terminal?")) {
            await supabase.auth.signOut();
          }
        }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ExitIcon style={{ width: '18px', height: '18px' }} />
        </button>
      </footer>

      {/* DRAWER / ARQUIVOS DO CASO */}
      <div className={`drawer-overlay ${drawerOpen ? 'drawer-overlay-active' : ''}`} onClick={() => setDrawerOpen(false)} />
      <div className={`drawer-content ${drawerOpen ? 'drawer-active' : ''}`}>
        <div className="drawer-header" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <h2 className="drawer-title">{selectedCharId ? 'Dossiê do Alvo' : 'Arquivos do Caso'}</h2>
            <button className="btn-close" onClick={() => { setDrawerOpen(false); setSelectedCharId(null); }}>×</button>
          </div>
          {!selectedCharId && (
            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
              <button
                onClick={() => setDrawerTab('dossiers')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: drawerTab === 'dossiers' ? '#00e5ff' : 'rgba(255,255,255,0.5)',
                  borderBottom: drawerTab === 'dossiers' ? '2px solid #00e5ff' : 'none',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-title)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease'
                }}
              >
                Dossiês
              </button>
              <button
                onClick={() => setDrawerTab('history')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: drawerTab === 'history' ? '#00e5ff' : 'rgba(255,255,255,0.5)',
                  borderBottom: drawerTab === 'history' ? '2px solid #00e5ff' : 'none',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-title)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease'
                }}
              >
                Histórico de Decisões
              </button>
              <button
                onClick={() => setDrawerTab('deaths')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: drawerTab === 'deaths' ? '#00e5ff' : 'rgba(255,255,255,0.5)',
                  borderBottom: drawerTab === 'deaths' ? '2px solid #00e5ff' : 'none',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-title)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease'
                }}
              >
                Registro de Baixas
              </button>
            </div>
          )}
        </div>
        <div className="drawer-body">
          {selectedCharId ? (
            renderCharacterDetails()
          ) : drawerTab === 'history' ? (
            renderHistoryLog()
          ) : drawerTab === 'deaths' ? (
            renderDeathsLog()
          ) : (
            <div className="character-grid">
              {Object.values(CHARACTERS).map(char => {
                const isUnlocked = !!unlockedCharacters[char.id];
                return (
                  <div
                    key={char.id}
                    className={`char-folder-card ${!isUnlocked ? 'char-folder-locked' : ''}`}
                    onClick={() => isUnlocked && setSelectedCharId(char.id)}
                  >
                    <div className="char-folder-avatar" style={{ overflow: 'hidden' }}>
                      {!isUnlocked ? '🔒' : renderAvatarContent(char)}
                    </div>
                    <span className="char-folder-name">{!isUnlocked ? 'Desconhecido' : char.name}</span>
                    {isUnlocked && (
                      <span className="char-folder-faction" style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem' }}>
                        {char.role}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* DRAWER / MEMBROS DA EQUIPE */}
      <div className={`drawer-overlay ${teamDrawerOpen ? 'drawer-overlay-active' : ''}`} onClick={() => setTeamDrawerOpen(false)} />
      <div className={`drawer-content ${teamDrawerOpen ? 'drawer-active' : ''}`}>
        <div className="drawer-header">
          <h2 className="drawer-title">Equipe de Investigação</h2>
          <button className="btn-close" onClick={() => setTeamDrawerOpen(false)}>×</button>
        </div>
        <div className="drawer-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
              Os membros da força-tarefa fornecem inteligência de campo e habilidades ativáveis que consomem Poder Político.
            </p>
            
            {/* Sensor de Previsão */}
            <div className="team-member-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', border: '1px solid rgba(0, 229, 255, 0.15)', background: 'rgba(0, 229, 255, 0.02)', padding: '10px 12px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div className="team-member-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00e5ff' }}>
                  <SatelliteIcon />
                </div>
                <div className="team-member-info">
                  <h3 className="team-member-name" style={{ fontSize: '0.9rem', margin: 0 }}>Sensor de Previsão</h3>
                  <p className="team-member-role" style={{ fontSize: '0.72rem', margin: '2px 0' }}>Habilidade de Agente</p>
                  <span className="team-member-power" style={{ fontSize: '0.72rem', color: isIndicatorPowerActive ? '#00ff66' : 'rgba(255,255,255,0.4)', fontWeight: '500' }}>
                    {isIndicatorPowerActive ? '● ATIVO' : '○ INATIVO'} (Visualizar verde/vermelho nos pilares)
                  </span>
                </div>
              </div>
              <button 
                onClick={() => handleTogglePower('indicator')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.75rem',
                  borderRadius: '6px',
                  background: isIndicatorPowerActive ? 'rgba(255, 42, 95, 0.1)' : 'rgba(0, 229, 255, 0.1)',
                  color: isIndicatorPowerActive ? '#ff2a5f' : '#00e5ff',
                  border: `1px solid ${isIndicatorPowerActive ? '#ff2a5f' : '#00e5ff'}`,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease'
                }}
              >
                {isIndicatorPowerActive ? 'Desativar' : 'Ativar (-8)'}
              </button>
            </div>

            {/* Lúcia Ramos */}
            <div className="team-member-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '10px 12px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div className="team-member-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00e5ff' }}>
                  <TerminalIcon />
                </div>
                <div className="team-member-info">
                  <h3 className="team-member-name" style={{ fontSize: '0.9rem', margin: 0 }}>Lúcia Ramos</h3>
                  <p className="team-member-role" style={{ fontSize: '0.72rem', margin: '2px 0' }}>Rastreamento da Malha</p>
                  <span className="team-member-power" style={{ fontSize: '0.72rem', color: isLuciaPowerActive ? '#00ff66' : 'rgba(255,255,255,0.4)', fontWeight: '500' }}>
                    {isLuciaPowerActive ? '● ATIVO' : '○ INATIVO'} (Reduz perdas de Orçamento em 30%)
                  </span>
                </div>
              </div>
              <button 
                onClick={() => handleTogglePower('lucia')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.75rem',
                  borderRadius: '6px',
                  background: isLuciaPowerActive ? 'rgba(255, 42, 95, 0.1)' : 'rgba(0, 229, 255, 0.1)',
                  color: isLuciaPowerActive ? '#ff2a5f' : '#00e5ff',
                  border: `1px solid ${isLuciaPowerActive ? '#ff2a5f' : '#00e5ff'}`,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease'
                }}
              >
                {isLuciaPowerActive ? 'Desativar' : 'Ativar (-10)'}
              </button>
            </div>

            {/* Inspetor Rogério */}
            <div className="team-member-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '10px 12px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div className="team-member-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00e5ff' }}>
                  <AgentIcon />
                </div>
                <div className="team-member-info">
                  <h3 className="team-member-name" style={{ fontSize: '0.9rem', margin: 0 }}>Inspetor Rogério</h3>
                  <p className="team-member-role" style={{ fontSize: '0.72rem', margin: '2px 0' }}>Escudo de Campo</p>
                  <span className="team-member-power" style={{ fontSize: '0.72rem', color: isRogerioPowerActive ? '#00ff66' : 'rgba(255,255,255,0.4)', fontWeight: '500' }}>
                    {isRogerioPowerActive ? '● SHIELD ATIVO' : '○ INATIVO'} (Evita colapso de recursos e recupera 20%)
                  </span>
                </div>
              </div>
              <button 
                onClick={() => handleTogglePower('rogerio')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.75rem',
                  borderRadius: '6px',
                  background: isRogerioPowerActive ? 'rgba(255, 42, 95, 0.1)' : 'rgba(0, 229, 255, 0.1)',
                  color: isRogerioPowerActive ? '#ff2a5f' : '#00e5ff',
                  border: `1px solid ${isRogerioPowerActive ? '#ff2a5f' : '#00e5ff'}`,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease'
                }}
              >
                {isRogerioPowerActive ? 'Desativar' : 'Ativar (-15)'}
              </button>
            </div>

            {/* Renata Mendes */}
            <div className="team-member-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '10px 12px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div className="team-member-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00e5ff' }}>
                  <ChartIcon />
                </div>
                <div className="team-member-info">
                  <h3 className="team-member-name" style={{ fontSize: '0.9rem', margin: 0 }}>Renata Mendes</h3>
                  <p className="team-member-role" style={{ fontSize: '0.72rem', margin: '2px 0' }}>Auditoria Forense</p>
                  <span className="team-member-power" style={{ fontSize: '0.72rem', color: isRenataPowerActive ? '#00ff66' : 'rgba(255,255,255,0.4)', fontWeight: '500' }}>
                    {isRenataPowerActive ? '● ATIVO' : '○ INATIVO'} (Revela alinhamento de fichas Nível {'>='} 2)
                  </span>
                </div>
              </div>
              <button 
                onClick={() => handleTogglePower('renata')}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.75rem',
                  borderRadius: '6px',
                  background: isRenataPowerActive ? 'rgba(255, 42, 95, 0.1)' : 'rgba(0, 229, 255, 0.1)',
                  color: isRenataPowerActive ? '#ff2a5f' : '#00e5ff',
                  border: `1px solid ${isRenataPowerActive ? '#ff2a5f' : '#00e5ff'}`,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease'
                }}
              >
                {isRenataPowerActive ? 'Desativar' : 'Ativar (-12)'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {renderRescueModal()}
      {renderKeysModal()}

      {/* GAME OVER OVERLAY */}
      {gameOverReason && (
        <div className="screen-overlay" style={{ padding: '24px 20px', justifyContent: 'center' }}>
          <span className="overlay-icon" style={{ marginBottom: '8px' }}>💀</span>
          <h2 className="overlay-title" style={{ fontSize: '1.4rem', marginBottom: '4px' }}>Operação Encerrada</h2>
          <p className="overlay-desc" style={{ fontSize: '0.85rem', lineHeight: '1.4', margin: '0 0 12px 0', color: 'rgba(255,255,255,0.7)' }}>{gameOverReason}</p>
          
          {/* Relatório da Operação */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '100%',
            maxWidth: '300px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '12px',
            padding: '14px',
            margin: '0 0 16px 0',
            textAlign: 'left'
          }}>
            <h3 style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.4)', margin: '0 0 2px 0', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px', fontFamily: 'var(--font-title)', fontWeight: 'bold' }}>
              Relatório de Campo
            </h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ClockIcon /> Dias de Sobrevivência:
              </span>
              <span style={{ color: '#fff', fontWeight: 'bold' }}>{years} dias</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <UsersIcon /> Dossiês Descobertos:
              </span>
              <span style={{ color: '#00e5ff', fontWeight: 'bold' }}>
                {Object.keys(unlockedCharacters).length} / 30
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <KeyIcon style={{ width: '12px', height: '12px' }} /> Assinaturas Nassau:
              </span>
              <span style={{ color: '#00e5ff', fontWeight: 'bold', display: 'flex', gap: '4px', alignItems: 'center' }}>
                {['valerio', 'linhares', 'sombra', 'xavier'].map((id, idx) => {
                  const isKeyUnlocked = (unlockedCharacters[id] || 0) === 3;
                  return (
                    <span key={idx} style={{ display: 'flex', alignItems: 'center' }} title={`${id.toUpperCase()}: ${isKeyUnlocked ? 'Assinatura Coletada' : 'Bloqueada'}`}>
                      {isKeyUnlocked ? (
                        <KeyIcon style={{ width: '12px', height: '12px', color: '#00e5ff' }} />
                      ) : (
                        <LockIcon />
                      )}
                    </span>
                  );
                })}
              </span>
            </div>

            {/* Pilares Finais */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '6px',
              marginTop: '4px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              paddingTop: '10px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.01)', padding: '6px 4px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.03)' }} title="Legalidade">
                <span style={{ fontSize: '0.9rem' }}>⚖️</span>
                <span style={{ fontSize: '0.72rem', color: '#fff', fontWeight: 'bold', marginTop: '2px' }}>{legalidade}%</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.01)', padding: '6px 4px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.03)' }} title="Poder Político">
                <span style={{ fontSize: '0.9rem' }}>🏛️</span>
                <span style={{ fontSize: '0.72rem', color: '#fff', fontWeight: 'bold', marginTop: '2px' }}>{poder}%</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.01)', padding: '6px 4px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.03)' }} title="Opinião Pública">
                <span style={{ fontSize: '0.9rem' }}>📰</span>
                <span style={{ fontSize: '0.72rem', color: '#fff', fontWeight: 'bold', marginTop: '2px' }}>{opiniao}%</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.01)', padding: '6px 4px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.03)' }} title="Orçamento">
                <span style={{ fontSize: '0.9rem' }}>💰</span>
                <span style={{ fontSize: '0.72rem', color: '#fff', fontWeight: 'bold', marginTop: '2px' }}>{orcamento}%</span>
              </div>
            </div>
          </div>

          <button className="btn-primary" onClick={() => startNewRun(user.id)}>
            Iniciar Novo Mandato
          </button>
        </div>
      )}

      {/* VICTORY OVERLAY */}
      {isVictory && (
        <div className="screen-overlay" style={{ background: 'radial-gradient(circle, #0e1e24 0%, #09090c 100%)', padding: '24px 20px', justifyContent: 'center' }}>
          <span className="overlay-icon" style={{ textShadow: '0 0 20px #00e5ff', marginBottom: '8px' }}>🏆</span>
          <h2 className="overlay-title" style={{ color: '#00e5ff', fontSize: '1.4rem', marginBottom: '4px' }}>Caso Concluído!</h2>
          <p className="overlay-desc" style={{ fontSize: '0.85rem', lineHeight: '1.4', margin: '0 0 12px 0', color: 'rgba(255,255,255,0.75)' }}>Você superou as pressões do Consórcio, neutralizou a blindagem da Cúpula e manteve as provas íntegras. Dr. Valério foi condenado!</p>
          
          {/* Relatório da Operação */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '100%',
            maxWidth: '300px',
            background: 'rgba(0, 229, 255, 0.02)',
            border: '1px solid rgba(0, 229, 255, 0.15)',
            borderRadius: '12px',
            padding: '14px',
            margin: '0 0 16px 0',
            textAlign: 'left'
          }}>
            <h3 style={{ fontSize: '0.78rem', color: '#00e5ff', margin: '0 0 2px 0', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(0, 229, 255, 0.1)', paddingBottom: '6px', fontFamily: 'var(--font-title)', fontWeight: 'bold' }}>
              Relatório de Sucesso
            </h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ClockIcon /> Mandato Concluído:
              </span>
              <span style={{ color: '#00e5ff', fontWeight: 'bold' }}>{years} dias</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <UsersIcon /> Dossiês Descobertos:
              </span>
              <span style={{ color: '#fff', fontWeight: 'bold' }}>
                {Object.keys(unlockedCharacters).length} / 30
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', alignItems: 'center' }}>
              <span style={{ color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <KeyIcon style={{ width: '12px', height: '12px' }} /> Assinaturas Nassau:
              </span>
              <span style={{ color: '#00e5ff', fontWeight: 'bold', display: 'flex', gap: '4px', alignItems: 'center' }}>
                {['valerio', 'linhares', 'sombra', 'xavier'].map((id, idx) => {
                  const isKeyUnlocked = (unlockedCharacters[id] || 0) === 3;
                  return (
                    <span key={idx} style={{ display: 'flex', alignItems: 'center' }} title={`${id.toUpperCase()}: ${isKeyUnlocked ? 'Assinatura Coletada' : 'Bloqueada'}`}>
                      {isKeyUnlocked ? (
                        <KeyIcon style={{ width: '12px', height: '12px', color: '#00e5ff' }} />
                      ) : (
                        <LockIcon />
                      )}
                    </span>
                  );
                })}
              </span>
            </div>

            {/* Pilares Finais */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '6px',
              marginTop: '4px',
              borderTop: '1px solid rgba(0, 229, 255, 0.1)',
              paddingTop: '10px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.01)', padding: '6px 4px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.03)' }} title="Legalidade">
                <span style={{ fontSize: '0.9rem' }}>⚖️</span>
                <span style={{ fontSize: '0.72rem', color: '#fff', fontWeight: 'bold', marginTop: '2px' }}>{legalidade}%</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.01)', padding: '6px 4px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.03)' }} title="Poder Político">
                <span style={{ fontSize: '0.9rem' }}>🏛️</span>
                <span style={{ fontSize: '0.72rem', color: '#fff', fontWeight: 'bold', marginTop: '2px' }}>{poder}%</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.01)', padding: '6px 4px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.03)' }} title="Opinião Pública">
                <span style={{ fontSize: '0.9rem' }}>📰</span>
                <span style={{ fontSize: '0.72rem', color: '#fff', fontWeight: 'bold', marginTop: '2px' }}>{opiniao}%</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.01)', padding: '6px 4px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.03)' }} title="Orçamento">
                <span style={{ fontSize: '0.9rem' }}>💰</span>
                <span style={{ fontSize: '0.72rem', color: '#fff', fontWeight: 'bold', marginTop: '2px' }}>{orcamento}%</span>
              </div>
            </div>
          </div>

          <button className="btn-primary" style={{ background: '#00e5ff', color: '#09090c', boxShadow: '0 4px 15px rgba(0,229,255,0.3)' }} onClick={() => startNewRun(user.id)}>
            Próxima Temporada
          </button>
        </div>
      )}
    </div>
  );
}
