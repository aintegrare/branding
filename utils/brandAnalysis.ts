import { BrandResults } from '@/app/page'
import { archetypeData } from '@/data/archetypes'

export function analyzeBrandResults(answers: Record<string, any>): BrandResults {
  // Análise mais sofisticada dos arquétipos
  const archetype = determineArchetype(answers)
  
  // Análise detalhada da persona
  const persona = determinePersona(answers)
  
  // Análise dos valores centrais
  const ethos = determineEthos(answers)
  
  // Análise detalhada do buyer persona
  const buyerPersona = determineBuyerPersona(answers)

  return {
    archetype,
    persona,
    ethos,
    buyerPersona,
    answers
  }
}

function determineArchetype(answers: Record<string, any>): string {
  const mission = answers.brand_mission
  const communication = answers.communication_style
  const emotion = answers.target_emotion
  const relationship = answers.customer_relationship
  const innovation = answers.innovation_approach
  const marketPosition = answers.market_position
  const visualStyle = answers.visual_style_preference
  const emotionalPriorities = answers.emotional_priorities || []

  // Sistema de pontuação mais sofisticado
  const scores: Record<string, number> = {
    'The Innocent': 0,
    'The Explorer': 0,
    'The Sage': 0,
    'The Hero': 0,
    'The Outlaw': 0,
    'The Magician': 0,
    'The Regular Guy/Girl': 0,
    'The Lover': 0,
    'The Jester': 0,
    'The Caregiver': 0,
    'The Creator': 0,
    'The Ruler': 0
  }

  // Pontuação baseada na missão (peso alto)
  const missionScores = {
    innovation: { 'The Magician': 4, 'The Outlaw': 3, 'The Creator': 3, 'The Explorer': 2 },
    connection: { 'The Lover': 4, 'The Caregiver': 3, 'The Regular Guy/Girl': 3, 'The Innocent': 2 },
    excellence: { 'The Ruler': 4, 'The Sage': 3, 'The Hero': 2, 'The Magician': 2 },
    empowerment: { 'The Hero': 4, 'The Magician': 3, 'The Explorer': 2, 'The Sage': 2 },
    adventure: { 'The Explorer': 4, 'The Outlaw': 3, 'The Hero': 2, 'The Jester': 2 },
    wisdom: { 'The Sage': 4, 'The Ruler': 2, 'The Caregiver': 2, 'The Innocent': 1 }
  }

  if (mission && missionScores[mission as keyof typeof missionScores]) {
    Object.entries(missionScores[mission as keyof typeof missionScores]).forEach(([archetype, score]) => {
      scores[archetype] += score
    })
  }

  // Pontuação baseada no estilo de comunicação
  const communicationScores = {
    authoritative: { 'The Ruler': 3, 'The Sage': 3, 'The Hero': 2 },
    friendly: { 'The Regular Guy/Girl': 3, 'The Caregiver': 2, 'The Innocent': 2 },
    inspiring: { 'The Hero': 3, 'The Magician': 2, 'The Sage': 2 },
    playful: { 'The Jester': 3, 'The Creator': 2, 'The Explorer': 2 },
    sophisticated: { 'The Ruler': 3, 'The Lover': 2, 'The Sage': 2 },
    rebellious: { 'The Outlaw': 4, 'The Creator': 2, 'The Explorer': 2 }
  }

  if (communication && communicationScores[communication as keyof typeof communicationScores]) {
    Object.entries(communicationScores[communication as keyof typeof communicationScores]).forEach(([archetype, score]) => {
      scores[archetype] += score
    })
  }

  // Pontuação baseada na emoção alvo
  const emotionScores = {
    trust: { 'The Innocent': 3, 'The Caregiver': 2, 'The Sage': 2 },
    excitement: { 'The Explorer': 3, 'The Jester': 2, 'The Hero': 2 },
    comfort: { 'The Caregiver': 3, 'The Regular Guy/Girl': 2, 'The Innocent': 2 },
    inspiration: { 'The Hero': 3, 'The Magician': 2, 'The Sage': 2 },
    curiosity: { 'The Sage': 3, 'The Explorer': 2, 'The Magician': 2 },
    prestige: { 'The Ruler': 3, 'The Lover': 2, 'The Hero': 1 }
  }

  if (emotion && emotionScores[emotion as keyof typeof emotionScores]) {
    Object.entries(emotionScores[emotion as keyof typeof emotionScores]).forEach(([archetype, score]) => {
      scores[archetype] += score
    })
  }

  // Pontuação baseada no tipo de relacionamento
  const relationshipScores = {
    mentor: { 'The Sage': 3, 'The Caregiver': 2, 'The Ruler': 1 },
    friend: { 'The Regular Guy/Girl': 3, 'The Lover': 2, 'The Caregiver': 2 },
    leader: { 'The Hero': 3, 'The Ruler': 3, 'The Magician': 1 },
    partner: { 'The Regular Guy/Girl': 2, 'The Lover': 2, 'The Sage': 1 },
    entertainer: { 'The Jester': 3, 'The Creator': 2, 'The Explorer': 1 },
    protector: { 'The Caregiver': 3, 'The Hero': 2, 'The Innocent': 2 }
  }

  if (relationship && relationshipScores[relationship as keyof typeof relationshipScores]) {
    Object.entries(relationshipScores[relationship as keyof typeof relationshipScores]).forEach(([archetype, score]) => {
      scores[archetype] += score
    })
  }

  // Pontuação baseada na posição de mercado
  const marketScores = {
    premium: { 'The Ruler': 3, 'The Lover': 2, 'The Sage': 2 },
    accessible: { 'The Regular Guy/Girl': 3, 'The Caregiver': 2, 'The Innocent': 2 },
    innovative: { 'The Magician': 3, 'The Creator': 2, 'The Explorer': 2 },
    traditional: { 'The Innocent': 3, 'The Ruler': 2, 'The Sage': 2 },
    disruptive: { 'The Outlaw': 3, 'The Magician': 2, 'The Explorer': 2 }
  }

  if (marketPosition && marketScores[marketPosition as keyof typeof marketScores]) {
    Object.entries(marketScores[marketPosition as keyof typeof marketScores]).forEach(([archetype, score]) => {
      scores[archetype] += score
    })
  }

  // Pontuação baseada no estilo visual
  const visualScores = {
    minimalist: { 'The Innocent': 2, 'The Sage': 2, 'The Ruler': 1 },
    bold: { 'The Hero': 2, 'The Outlaw': 2, 'The Magician': 1 },
    organic: { 'The Caregiver': 2, 'The Innocent': 2, 'The Explorer': 1 },
    luxurious: { 'The Ruler': 3, 'The Lover': 2 },
    playful: { 'The Jester': 3, 'The Creator': 2, 'The Explorer': 1 }
  }

  if (visualStyle && visualScores[visualStyle as keyof typeof visualScores]) {
    Object.entries(visualScores[visualStyle as keyof typeof visualScores]).forEach(([archetype, score]) => {
      scores[archetype] += score
    })
  }

  // Pontuação baseada nas prioridades emocionais (ranking)
  if (emotionalPriorities.length > 0) {
    emotionalPriorities.forEach((emotion: string, index: number) => {
      const weight = emotionalPriorities.length - index // Peso maior para itens no topo
      if (emotionScores[emotion as keyof typeof emotionScores]) {
        Object.entries(emotionScores[emotion as keyof typeof emotionScores]).forEach(([archetype, score]) => {
          scores[archetype] += (score * weight) / emotionalPriorities.length
        })
      }
    })
  }

  // Encontrar o arquétipo com maior pontuação
  const sortedArchetypes = Object.entries(scores)
    .sort(([,a], [,b]) => b - a)
    .map(([archetype]) => archetype)

  return sortedArchetypes[0]
}

function determinePersona(answers: Record<string, any>): string {
  const personality = answers.brand_personality_detailed
  const communication = answers.communication_style
  const riskTolerance = parseInt(answers.risk_tolerance) || 5
  const visualStyle = answers.visual_style_preference
  const marketPosition = answers.market_position

  // Análise mais detalhada da personalidade
  let personaDescription = ''

  // Base da personalidade
  if (personality) {
    personaDescription = `Uma marca que incorpora ${personality.toLowerCase()}`
  } else {
    const basePersonalities = {
      authoritative: 'liderança confiante e conhecedora',
      friendly: 'companheirismo caloroso e acessível',
      inspiring: 'orientação visionária e motivacional',
      playful: 'espírito criativo e divertido',
      sophisticated: 'presença refinada e elegante',
      rebellious: 'inovação ousada e disruptiva'
    }
    personaDescription = `Uma marca caracterizada por ${basePersonalities[communication as keyof typeof basePersonalities] || 'autenticidade única'}`
  }

  // Adicionar características de risco
  const riskCharacteristics = {
    low: 'com uma abordagem reflexiva e medida que prioriza estabilidade e confiança',
    medium: 'com uma perspectiva equilibrada que pondera cuidadosamente oportunidades contra segurança',
    high: 'com um espírito ousado e aventureiro que abraça incertezas e pioneira novas fronteiras'
  }

  const riskLevel = riskTolerance <= 3 ? 'low' : riskTolerance <= 7 ? 'medium' : 'high'
  personaDescription += ` ${riskCharacteristics[riskLevel]}`

  // Adicionar estilo visual
  if (visualStyle) {
    const visualCharacteristics = {
      minimalist: 'expressa através de design limpo e proposital que fala através da simplicidade',
      bold: 'manifestada em visuais dinâmicos e de alto impacto que comandam atenção',
      organic: 'refletida em estética natural e fluida que parece autêntica e fundamentada',
      luxurious: 'exibida através de design premium e sofisticado que exala qualidade',
      playful: 'mostrada através de visuais criativos e experimentais que despertam alegria e curiosidade'
    }
    personaDescription += `. Esta personalidade é ${visualCharacteristics[visualStyle as keyof typeof visualCharacteristics]}`
  }

  // Adicionar posicionamento de mercado
  if (marketPosition) {
    const positionCharacteristics = {
      premium: 'direcionada a audiências exigentes que apreciam excelência e exclusividade',
      accessible: 'acolhendo todos com valores inclusivos e democráticos',
      innovative: 'liderando o avanço tecnológico e soluções criativas',
      traditional: 'honrando valores testados pelo tempo mantendo relevância',
      disruptive: 'desafiando sabedoria convencional e remodelando padrões da indústria'
    }
    personaDescription += `, ${positionCharacteristics[marketPosition as keyof typeof positionCharacteristics]}.`
  }

  return personaDescription
}

function determineEthos(answers: Record<string, any>): string[] {
  const values = answers.brand_values || []
  const mission = answers.brand_mission
  const successMetrics = answers.success_metrics || []
  const competitiveAdvantage = answers.competitive_advantage
  const futureVision = answers.future_vision

  // Mapeamento mais detalhado dos valores
  const ethosMap: Record<string, string> = {
    integrity: 'Construímos confiança através de honestidade inabalável, transparência e práticas comerciais éticas',
    innovation: 'Continuamente empurramos limites, abraçamos soluções criativas e pioneiramos pensamento revolucionário',
    sustainability: 'Priorizamos administração ambiental e responsabilidade social em cada decisão que tomamos',
    inclusivity: 'Celebramos diversidade, garantimos oportunidades iguais e criamos pertencimento para todos',
    quality: 'Entregamos excelência em cada detalhe, recusando comprometer padrões ou artesanato',
    transparency: 'Mantemos comunicação aberta e honesta e operamos com completa visibilidade',
    community: 'Construímos relacionamentos significativos e fomentamos conexões que criam valor duradouro',
    growth: 'Nutrimos aprendizado contínuo, desenvolvimento e evolução para indivíduos e organizações',
    courage: 'Tomamos posições ousadas, abraçamos riscos calculados e defendemos aquilo em que acreditamos',
    authenticity: 'Permanecemos fiéis à nossa identidade central enquanto nos adaptamos para servir melhor nossa comunidade'
  }

  let ethos = values.map((value: string) => ethosMap[value]).filter(Boolean)

  // Adicionar ethos baseado na missão
  const missionEthos: Record<string, string> = {
    innovation: 'Acreditamos no poder transformador da inovação para criar um amanhã melhor',
    connection: 'Existimos para construir pontes, criar compreensão e construir conexões humanas significativas',
    excellence: 'Estamos comprometidos em alcançar os mais altos padrões e inspirar outros a fazer o mesmo',
    empowerment: 'Empoderamos indivíduos e organizações a descobrir e alcançar seu pleno potencial',
    adventure: 'Abraçamos exploração, encorajamos descoberta e celebramos a jornada de crescimento',
    wisdom: 'Compartilhamos conhecimento responsavelmente e ajudamos outros a tomar decisões informadas e reflexivas'
  }

  if (mission && missionEthos[mission] && !ethos.some(e => e.includes(mission))) {
    ethos.unshift(missionEthos[mission])
  }

  // Adicionar ethos baseado nas métricas de sucesso
  const successEthos: Record<string, string> = {
    impact: 'Medimos nosso valor pela mudança positiva que criamos no mundo',
    loyalty: 'Acreditamos em construir relacionamentos que resistem ao teste do tempo',
    innovation: 'Lideramos pelo exemplo, estabelecendo novos padrões para o que é possível',
    recognition: 'Lutamos pela excelência que ganha respeito de pares e líderes da indústria'
  }

  successMetrics.forEach((metric: string) => {
    if (successEthos[metric] && !ethos.some(e => e.includes(metric))) {
      ethos.push(successEthos[metric])
    }
  })

  // Adicionar ethos baseado na vantagem competitiva
  const advantageEthos: Record<string, string> = {
    quality: 'Nunca comprometemos qualidade, acreditando que excelência não é negociável',
    service: 'Vamos além para exceder expectativas e criar experiências deliciosas',
    customization: 'Reconhecemos que cada cliente é único e merece soluções sob medida',
    heritage: 'Honramos nosso legado enquanto evoluímos continuamente para atender necessidades modernas'
  }

  if (competitiveAdvantage && advantageEthos[competitiveAdvantage]) {
    ethos.push(advantageEthos[competitiveAdvantage])
  }

  // Adicionar visão futura se fornecida
  if (futureVision && futureVision.length > 50) {
    ethos.push(`Vislumbramos um futuro onde nosso impacto cria mudança positiva duradoura`)
  }

  return ethos.slice(0, 6) // Limitar a 6 valores centrais para manter foco
}

function determineBuyerPersona(answers: Record<string, any>): string {
  const demographics = answers.customer_demographics
  const motivation = answers.customer_motivation
  const emotion = answers.target_emotion
  const emotionalPriorities = answers.emotional_priorities || []
  const marketPosition = answers.market_position
  const competitiveAdvantage = answers.competitive_advantage

  // Perfis demográficos mais detalhados
  const demographicProfiles: Record<string, string> = {
    young_professionals: 'Millennials e profissionais da Geração Z ambiciosos (25-35) que são nativos digitais, focados na carreira e valorizam eficiência, crescimento e trabalho significativo. Buscam marcas que entendem seu estilo de vida acelerado, apoiam seu desenvolvimento profissional e se alinham com seus valores progressistas.',
    families: 'Pais e cuidadores reflexivos (30-50) que priorizam bem-estar familiar, segurança e valor a longo prazo. Tomam decisões de compra deliberadas baseadas em confiança, segurança, confiabilidade e impacto positivo em sua casa e comunidade.',
    executives: 'Líderes empresariais seniores e tomadores de decisão (40-60) que valorizam expertise, qualidade premium e status. Têm poder de compra significativo e buscam marcas que reflitam seu sucesso, forneçam serviço excepcional e ofereçam soluções sofisticadas.',
    entrepreneurs: 'Inovadores que assumem riscos e agentes de mudança em todas as faixas etárias que valorizam criatividade, flexibilidade e soluções de ponta. Buscam parceiros que entendem seus desafios únicos, apoiam seus objetivos ambiciosos e podem se adaptar às suas necessidades em rápida mudança.',
    creatives: 'Artistas, designers e profissionais criativos que valorizam autoexpressão, autenticidade e excelência estética. Buscam marcas que inspiram criatividade, apoiam visão artística e entendem os desafios únicos do trabalho criativo.',
    broad_market: 'Uma audiência diversa e inclusiva abrangendo múltiplas demografias, unificada por valores compartilhados e necessidades universais em vez de idade ou renda. Apreciam marcas acessíveis e relacionáveis que falam a experiências humanas comuns e ideais democráticos.'
  }

  // Insights de motivação mais profundos
  const motivationInsights: Record<string, string> = {
    problem_solving: 'Abordam compras analiticamente, buscando soluções comprovadas com ROI claro, resultados mensuráveis e performance confiável. Valorizam funcionalidade, eficiência e tomada de decisão baseada em evidências.',
    status_prestige: 'São motivados por marcas que melhoram sua imagem pessoal ou profissional, sinalizam sucesso para seus pares e refletem suas conquistas. Qualidade, exclusividade e reconhecimento são drivers-chave.',
    convenience: 'Priorizam soluções que economizam tempo, experiências simplificadas e processos simplificados que se integram perfeitamente às suas vidas ocupadas. Eficiência e facilidade de uso são fundamentais.',
    experience: 'Valorizam conexão emocional, interações memoráveis e engajamento significativo sobre benefícios puramente funcionais. Buscam marcas que criam momentos de alegria, inspiração e ressonância pessoal.',
    value: 'São estratégicos sobre gastos, buscando produtos e serviços que entregam valor claro e de longo prazo. Apreciam qualidade a preços justos e marcas que respeitam seu investimento.',
    self_expression: 'Veem compras como extensões de sua identidade e valores. Buscam marcas que os ajudam a comunicar quem são e pelo que defendem ao mundo.'
  }

  // Drivers emocionais aprofundados
  const emotionalDrivers: Record<string, string> = {
    trust: 'Precisam se sentir seguros e confiantes em suas escolhas, frequentemente dependendo de depoimentos, avaliações, históricos comprovados e comunicação transparente. Confiabilidade e consistência são essenciais.',
    excitement: 'São atraídos por marcas que criam antecipação, energia e entusiasmo. Querem se sentir parte de algo dinâmico, progressivo e inovador.',
    comfort: 'Buscam familiaridade, pertencimento e segurança emocional. Preferem marcas que os fazem sentir compreendidos, aceitos e parte de uma comunidade acolhedora.',
    inspiration: 'Querem ser motivados, elevados e desafiados a crescer. Buscam marcas que os ajudam a visualizar e alcançar uma versão melhor de si mesmos e seu futuro.',
    curiosity: 'Gostam de descoberta, aprendizado e exploração. São atraídos por marcas que oferecem novos insights, expandem seus horizontes e satisfazem seu apetite intelectual.',
    prestige: 'Desejam reconhecimento, status e validação social. Escolhem marcas que elevam sua posição e refletem seu sucesso e gosto sofisticado.'
  }

  // Insights de posicionamento de mercado
  const positioningInsights: Record<string, string> = {
    premium: 'Esperam qualidade superior, acesso exclusivo e serviço personalizado que justifica preços premium.',
    accessible: 'Apreciam preços democráticos, mensagens inclusivas e marcas que não os fazem sentir excluídos.',
    innovative: 'São early adopters que gostam de ser os primeiros a experimentar novas tecnologias e soluções de ponta.',
    traditional: 'Valorizam estabilidade, métodos comprovados e marcas com reputações estabelecidas e patrimônio.',
    disruptive: 'São agentes de mudança que apreciam marcas que desafiam o status quo e oferecem abordagens alternativas.'
  }

  // Construir perfil do buyer persona
  let persona = demographicProfiles[demographics] || 'Seus clientes ideais são indivíduos exigentes que valorizam autenticidade e qualidade.'
  
  persona += ` ${motivationInsights[motivation] || 'Buscam valor significativo em suas decisões de compra.'}`
  
  // Adicionar insights emocionais baseados nas prioridades
  if (emotionalPriorities.length > 0) {
    const primaryEmotion = emotionalPriorities[0]
    if (emotionalDrivers[primaryEmotion]) {
      persona += ` ${emotionalDrivers[primaryEmotion]}`
    }
  } else if (emotion && emotionalDrivers[emotion]) {
    persona += ` ${emotionalDrivers[emotion]}`
  }

  // Adicionar insights de posicionamento
  if (marketPosition && positioningInsights[marketPosition]) {
    persona += ` ${positioningInsights[marketPosition]}`
  }

  // Adicionar insights de vantagem competitiva
  const advantageInsights: Record<string, string> = {
    quality: 'Estão dispostos a pagar mais por artesanato e materiais superiores.',
    innovation: 'Ficam empolgados com novos recursos e avanço tecnológico.',
    service: 'Valorizam suporte responsivo e atenção personalizada.',
    customization: 'Apreciam marcas que podem se adaptar às suas necessidades específicas.',
    heritage: 'Respeitam tradição e históricos comprovados.'
  }

  if (competitiveAdvantage && advantageInsights[competitiveAdvantage]) {
    persona += ` ${advantageInsights[competitiveAdvantage]}`
  }

  persona += ' Escolhem marcas que se alinham com seus valores, apoiam seus objetivos e entendem seus desafios e aspirações únicos.'

  return persona
}