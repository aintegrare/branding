export interface Question {
  id: string
  category: string
  title: string
  description?: string
  type: 'single-choice' | 'multiple-choice' | 'text' | 'scale' | 'ranking' | 'image-choice'
  options?: Array<{
    value: string
    label: string
    description?: string
    image?: string
  }>
  scaleMax?: number
  scaleLabels?: {
    min: string
    max: string
  }
  weight?: number // Para dar peso diferente às perguntas na análise
}

export const questions: Question[] = [
  {
    id: 'brand_mission',
    category: 'Fundação da Marca',
    title: 'O que impulsiona sua marca em sua essência?',
    description: 'Compreender sua motivação fundamental ajuda a definir seu arquétipo de marca.',
    type: 'image-choice',
    weight: 3,
    options: [
      {
        value: 'innovation',
        label: 'Inovação & Disrupção',
        description: 'Criar soluções revolucionárias e desafiar o status quo',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400'
      },
      {
        value: 'connection',
        label: 'Conexão Humana',
        description: 'Construir relacionamentos significativos e fomentar comunidade',
        image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400'
      },
      {
        value: 'excellence',
        label: 'Excelência & Maestria',
        description: 'Entregar a mais alta qualidade e alcançar a perfeição',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400'
      },
      {
        value: 'empowerment',
        label: 'Empoderamento & Liberdade',
        description: 'Ajudar outros a alcançar independência e realizar seu potencial',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400'
      },
      {
        value: 'adventure',
        label: 'Aventura & Descoberta',
        description: 'Explorar novos territórios e abraçar o desconhecido',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
      },
      {
        value: 'wisdom',
        label: 'Conhecimento & Sabedoria',
        description: 'Compartilhar insights e ajudar outros a tomar decisões informadas',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400'
      }
    ]
  },
  {
    id: 'visual_style_preference',
    category: 'Identidade Visual',
    title: 'Qual estilo visual mais ressoa com sua marca?',
    description: 'A estética visual comunica a personalidade da marca antes das palavras.',
    type: 'image-choice',
    weight: 2,
    options: [
      {
        value: 'minimalist',
        label: 'Minimalista & Limpo',
        description: 'Design simples, elegante e descomplicado',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400'
      },
      {
        value: 'bold',
        label: 'Ousado & Dinâmico',
        description: 'Cores fortes, contrastes dramáticos, energético',
        image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400'
      },
      {
        value: 'organic',
        label: 'Orgânico & Natural',
        description: 'Tons terrosos, formas fluidas, inspirado na natureza',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'
      },
      {
        value: 'luxurious',
        label: 'Luxuoso & Refinado',
        description: 'Materiais premium, paleta sofisticada',
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400'
      },
      {
        value: 'playful',
        label: 'Divertido & Criativo',
        description: 'Cores vibrantes, formas divertidas, experimental',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400'
      }
    ]
  },
  {
    id: 'communication_style',
    category: 'Voz da Marca',
    title: 'Como sua marca se comunica com o mundo?',
    description: 'Seu estilo de comunicação revela a personalidade da sua marca.',
    type: 'single-choice',
    weight: 3,
    options: [
      {
        value: 'authoritative',
        label: 'Autoritativo & Especialista',
        description: 'Confiante, conhecedor e confiável'
      },
      {
        value: 'friendly',
        label: 'Amigável & Acessível',
        description: 'Caloroso, conversacional e relacionável'
      },
      {
        value: 'inspiring',
        label: 'Inspirador & Visionário',
        description: 'Motivacional, aspiracional e progressista'
      },
      {
        value: 'playful',
        label: 'Divertido & Criativo',
        description: 'Divertido, imaginativo e não convencional'
      },
      {
        value: 'sophisticated',
        label: 'Sofisticado & Elegante',
        description: 'Refinado, premium e exclusivo'
      },
      {
        value: 'rebellious',
        label: 'Rebelde & Disruptivo',
        description: 'Desafiando normas, provocativo, ousado'
      }
    ]
  },
  {
    id: 'emotional_priorities',
    category: 'Estratégia Emocional',
    title: 'Classifique essas emoções por importância para sua marca',
    description: 'Ordene da mais importante (topo) para a menos importante (base).',
    type: 'ranking',
    weight: 2,
    options: [
      { value: 'trust', label: 'Confiança & Segurança' },
      { value: 'excitement', label: 'Empolgação & Energia' },
      { value: 'comfort', label: 'Conforto & Pertencimento' },
      { value: 'inspiration', label: 'Inspiração & Esperança' },
      { value: 'curiosity', label: 'Curiosidade & Admiração' },
      { value: 'prestige', label: 'Prestígio & Status' }
    ]
  },
  {
    id: 'target_emotion',
    category: 'Conexão Emocional',
    title: 'Que emoção você quer despertar em sua audiência?',
    description: 'A resposta emocional que sua marca cria define seu impacto.',
    type: 'single-choice',
    weight: 2,
    options: [
      {
        value: 'trust',
        label: 'Confiança & Segurança',
        description: 'Fazer as pessoas se sentirem seguras e confiantes'
      },
      {
        value: 'excitement',
        label: 'Empolgação & Energia',
        description: 'Criar entusiasmo e antecipação'
      },
      {
        value: 'comfort',
        label: 'Conforto & Pertencimento',
        description: 'Fazer as pessoas se sentirem em casa e aceitas'
      },
      {
        value: 'inspiration',
        label: 'Inspiração & Esperança',
        description: 'Motivar as pessoas a sonhar e conquistar'
      },
      {
        value: 'curiosity',
        label: 'Curiosidade & Admiração',
        description: 'Despertar interesse e desejo de explorar'
      },
      {
        value: 'prestige',
        label: 'Prestígio & Status',
        description: 'Elevar posição social e reconhecimento'
      }
    ]
  },
  {
    id: 'brand_values',
    category: 'Valores Centrais',
    title: 'Quais valores são mais importantes para sua marca?',
    description: 'Selecione até 4 valores que melhor representam o ethos da sua marca.',
    type: 'multiple-choice',
    weight: 2,
    options: [
      { value: 'integrity', label: 'Integridade', description: 'Honestidade e princípios morais' },
      { value: 'innovation', label: 'Inovação', description: 'Melhoria contínua e criatividade' },
      { value: 'sustainability', label: 'Sustentabilidade', description: 'Responsabilidade ambiental e social' },
      { value: 'inclusivity', label: 'Inclusividade', description: 'Diversidade e oportunidades iguais' },
      { value: 'quality', label: 'Qualidade', description: 'Excelência em produtos e serviços' },
      { value: 'transparency', label: 'Transparência', description: 'Comunicação aberta e honesta' },
      { value: 'community', label: 'Comunidade', description: 'Construção de relacionamentos fortes' },
      { value: 'growth', label: 'Crescimento', description: 'Desenvolvimento pessoal e profissional' },
      { value: 'courage', label: 'Coragem', description: 'Assumir riscos ousados e defender crenças' },
      { value: 'authenticity', label: 'Autenticidade', description: 'Ser genuíno e fiel à identidade central' }
    ]
  },
  {
    id: 'customer_relationship',
    category: 'Conexão com Cliente',
    title: 'Como você prefere se relacionar com seus clientes?',
    description: 'Seu estilo de relacionamento influencia seu arquétipo de marca.',
    type: 'single-choice',
    weight: 2,
    options: [
      {
        value: 'mentor',
        label: 'Como um Mentor',
        description: 'Orientando e ensinando com sabedoria e experiência'
      },
      {
        value: 'friend',
        label: 'Como um Amigo',
        description: 'Igual, solidário e compreensivo'
      },
      {
        value: 'leader',
        label: 'Como um Líder',
        description: 'Confiante, decisivo e inspirador'
      },
      {
        value: 'partner',
        label: 'Como um Parceiro',
        description: 'Colaborativo e mutuamente benéfico'
      },
      {
        value: 'entertainer',
        label: 'Como um Animador',
        description: 'Divertido, envolvente e memorável'
      },
      {
        value: 'protector',
        label: 'Como um Protetor',
        description: 'Cuidadoso, carinhoso e zelando pelo bem-estar'
      }
    ]
  },
  {
    id: 'market_position',
    category: 'Estratégia de Mercado',
    title: 'Onde sua marca se posiciona no mercado?',
    description: 'Seu posicionamento de mercado influencia as expectativas dos clientes.',
    type: 'single-choice',
    weight: 2,
    options: [
      {
        value: 'premium',
        label: 'Premium/Luxo',
        description: 'Alto padrão, exclusivo, qualidade superior'
      },
      {
        value: 'accessible',
        label: 'Acessível/Mainstream',
        description: 'Disponível para todos, democrático, inclusivo'
      },
      {
        value: 'innovative',
        label: 'Inovador/Vanguarda',
        description: 'Primeiro no mercado, líder tecnológico'
      },
      {
        value: 'traditional',
        label: 'Tradicional/Patrimônio',
        description: 'Testado pelo tempo, confiável, clássico'
      },
      {
        value: 'disruptive',
        label: 'Disruptivo/Alternativo',
        description: 'Desafiando convenções, revolucionário'
      }
    ]
  },
  {
    id: 'innovation_approach',
    category: 'Estilo de Inovação',
    title: 'Como sua marca aborda a inovação?',
    description: 'Sua filosofia de inovação molda sua posição no mercado.',
    type: 'single-choice',
    weight: 2,
    options: [
      {
        value: 'revolutionary',
        label: 'Mudança Revolucionária',
        description: 'Transformando completamente indústrias e paradigmas'
      },
      {
        value: 'evolutionary',
        label: 'Melhoria Evolutiva',
        description: 'Aprimorando gradualmente soluções existentes'
      },
      {
        value: 'adaptive',
        label: 'Resposta Adaptativa',
        description: 'Respondendo rapidamente às necessidades e tendências do mercado'
      },
      {
        value: 'traditional',
        label: 'Excelência Tradicional',
        description: 'Aperfeiçoando abordagens testadas pelo tempo'
      },
      {
        value: 'collaborative',
        label: 'Inovação Colaborativa',
        description: 'Trabalhando com outros para criar soluções revolucionárias'
      }
    ]
  },
  {
    id: 'brand_personality_detailed',
    category: 'Mergulho na Personalidade',
    title: 'Descreva sua marca como se fosse uma pessoa em um jantar',
    description: 'Como ela se comportaria? Sobre o que falaria? Como os outros a perceberiam?',
    type: 'text',
    weight: 2
  },
  {
    id: 'risk_tolerance',
    category: 'Perfil de Risco',
    title: 'Quão confortável sua marca está em assumir riscos?',
    description: 'Avalie a tolerância ao risco da sua marca numa escala de 1-10.',
    type: 'scale',
    scaleMax: 10,
    weight: 1,
    scaleLabels: {
      min: 'Muito Conservadora',
      max: 'Altamente Aventureira'
    }
  },
  {
    id: 'success_metrics',
    category: 'Definição de Sucesso',
    title: 'Como sua marca define sucesso?',
    description: 'O que mais importa ao medir seu impacto?',
    type: 'multiple-choice',
    weight: 1,
    options: [
      { value: 'revenue', label: 'Performance Financeira', description: 'Crescimento de receita e lucratividade' },
      { value: 'impact', label: 'Impacto Social', description: 'Mudança positiva na sociedade ou meio ambiente' },
      { value: 'recognition', label: 'Reconhecimento da Indústria', description: 'Prêmios e reconhecimento dos pares' },
      { value: 'loyalty', label: 'Lealdade do Cliente', description: 'Relacionamentos de longo prazo e retenção' },
      { value: 'innovation', label: 'Liderança em Inovação', description: 'Ser o primeiro com novas ideias' },
      { value: 'market_share', label: 'Dominância de Mercado', description: 'Posição líder no mercado' }
    ]
  },
  {
    id: 'customer_demographics',
    category: 'Público-Alvo',
    title: 'Quem é seu público-alvo principal?',
    description: 'Compreender sua audiência ajuda a definir sua buyer persona.',
    type: 'single-choice',
    weight: 2,
    options: [
      {
        value: 'young_professionals',
        label: 'Jovens Profissionais (25-35)',
        description: 'Focados na carreira, tech-savvy, ambiciosos'
      },
      {
        value: 'families',
        label: 'Famílias (30-50)',
        description: 'Pais focados no bem-estar familiar e segurança'
      },
      {
        value: 'executives',
        label: 'Executivos Seniores (40-60)',
        description: 'Tomadores de decisão buscando soluções premium'
      },
      {
        value: 'entrepreneurs',
        label: 'Empreendedores & Inovadores',
        description: 'Assumem riscos e agentes de mudança de todas as idades'
      },
      {
        value: 'creatives',
        label: 'Criativos & Artistas',
        description: 'Artistas, designers e profissionais criativos'
      },
      {
        value: 'broad_market',
        label: 'Apelo Amplo de Mercado',
        description: 'Audiência diversa através de demografias'
      }
    ]
  },
  {
    id: 'customer_motivation',
    category: 'Psicologia do Cliente',
    title: 'O que motiva principalmente seus clientes a escolher sua marca?',
    description: 'Compreender a motivação do cliente define sua proposta de valor.',
    type: 'single-choice',
    weight: 2,
    options: [
      {
        value: 'problem_solving',
        label: 'Resolução de Problemas',
        description: 'Eles precisam de uma solução para um desafio específico'
      },
      {
        value: 'status_prestige',
        label: 'Status & Prestígio',
        description: 'Eles querem melhorar sua imagem e posição social'
      },
      {
        value: 'convenience',
        label: 'Conveniência & Eficiência',
        description: 'Eles valorizam economia de tempo e simplicidade'
      },
      {
        value: 'experience',
        label: 'Experiência Única',
        description: 'Eles buscam interações memoráveis e significativas'
      },
      {
        value: 'value',
        label: 'Valor & Economia',
        description: 'Eles priorizam custo-benefício e gastos inteligentes'
      },
      {
        value: 'self_expression',
        label: 'Autoexpressão',
        description: 'Eles querem mostrar sua identidade e valores'
      }
    ]
  },
  {
    id: 'competitive_advantage',
    category: 'Estratégia Competitiva',
    title: 'O que diferencia sua marca dos concorrentes?',
    description: 'Seu diferencial único no mercado.',
    type: 'single-choice',
    weight: 2,
    options: [
      {
        value: 'quality',
        label: 'Qualidade Superior',
        description: 'Melhores materiais, artesanato ou performance'
      },
      {
        value: 'innovation',
        label: 'Inovação de Ponta',
        description: 'Tecnologia mais recente e recursos revolucionários'
      },
      {
        value: 'service',
        label: 'Serviço Excepcional',
        description: 'Experiência e suporte ao cliente excepcionais'
      },
      {
        value: 'price',
        label: 'Preço Competitivo',
        description: 'Melhor custo-benefício'
      },
      {
        value: 'customization',
        label: 'Personalização',
        description: 'Soluções sob medida para necessidades individuais'
      },
      {
        value: 'heritage',
        label: 'Patrimônio da Marca',
        description: 'Longa história e histórico comprovado'
      }
    ]
  },
  {
    id: 'future_vision',
    category: 'Perspectiva Futura',
    title: 'Descreva a visão da sua marca para o futuro',
    description: 'Onde você vê sua marca em 5-10 anos? Que impacto terá causado?',
    type: 'text',
    weight: 1
  }
]