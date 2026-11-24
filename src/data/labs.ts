export interface LabInfo {
  id: string
  letter: string
  title: string
  shortDesc: string
  phaseNumber: number
  accompaniedModule: number
  path: string
}

export const LABS_DATA: LabInfo[] = [
  {
    id: 'a-pergunta',
    letter: 'A',
    title: 'Gerador de pergunta de pesquisa',
    shortDesc:
      'Estruture perguntas em PICO, PICo, SPIDER e CoCoPop com síntese copiável e desenhos sugeridos.',
    phaseNumber: 1,
    accompaniedModule: 2,
    path: '/lab/a-pergunta',
  },
  {
    id: 'b-matriz-coerencia',
    letter: 'B',
    title: 'Matriz de coerência metodológica',
    shortDesc:
      'Relacione problema, pergunta, elegibilidade, busca, extração e síntese sem notas artificiais.',
    phaseNumber: 1,
    accompaniedModule: 3,
    path: '/lab/b-matriz-coerencia',
  },
  {
    id: 'c-busca',
    letter: 'C',
    title: 'Construtor de busca bibliográfica',
    shortDesc:
      'Combine blocos conceituais, termos MeSH/DeCS, termos livres e operadores booleanos com orientação para bases.',
    phaseNumber: 2,
    accompaniedModule: 4,
    path: '/lab/c-busca',
  },
  {
    id: 'd-triagem',
    letter: 'D',
    title: 'Simulador de triagem',
    shortDesc:
      'Trie 12 estudos fictícios realistas com decisões justificadas, motivos PRISMA e feedback individual.',
    phaseNumber: 2,
    accompaniedModule: 5,
    path: '/lab/d-triagem',
  },
  {
    id: 'e-extracao',
    letter: 'E',
    title: 'Matriz de extração',
    shortDesc:
      'Organize dados extraídos, diferencie múltiplos relatórios por estudo e gere tabela copiável.',
    phaseNumber: 2,
    accompaniedModule: 6,
    path: '/lab/e-extracao',
  },
  {
    id: 'f-avaliacao',
    letter: 'F',
    title: 'Avaliação crítica',
    shortDesc:
      'Consulte instrumentos JBI e Cochrane RoB 2, analise 6 casos com distratores plausíveis e feedback fundamentado.',
    phaseNumber: 3,
    accompaniedModule: 7,
    path: '/lab/f-avaliacao',
  },
  {
    id: 'g-fluxograma',
    letter: 'G',
    title: 'Construtor de fluxograma PRISMA 2020',
    shortDesc:
      'Selecione entre os 4 modelos oficiais, preencha contagens validadas, renderize SVG fiel e exporte em alta resolução.',
    phaseNumber: 4,
    accompaniedModule: 10,
    path: '/lab/g-fluxograma',
  },
  {
    id: 'h-extensoes',
    letter: 'H',
    title: 'Seletor de extensões PRISMA',
    shortDesc:
      'Escolha fundamentada de extensões como PRISMA-P, PRISMA-S, PRISMA-C 2026, PRISMA-DTA e PRISMA-NMA.',
    phaseNumber: 4,
    accompaniedModule: 10,
    path: '/lab/h-extensoes',
  },
  {
    id: 'i-auditoria',
    letter: 'I',
    title: 'Auditoria PRISMA 2020',
    shortDesc:
      'Checklist completo dos 27 itens e subitens com status, localização no manuscrito e exportação.',
    phaseNumber: 4,
    accompaniedModule: 10,
    path: '/lab/i-auditoria',
  },
  {
    id: 'j-casos',
    letter: 'J',
    title: 'Casos integradores',
    shortDesc:
      '3 cenários progressivos (telereabilitação, prevalência e qualitativa) da pergunta ao relato final.',
    phaseNumber: 4,
    accompaniedModule: 12,
    path: '/lab/j-casos',
  },
  {
    id: 'k-autoavaliacao',
    letter: 'K',
    title: 'Autoavaliação',
    shortDesc:
      'Questões de média e alta complexidade com situações-problema reais, distratores plausíveis e feedback por alternativa.',
    phaseNumber: 4,
    accompaniedModule: 12,
    path: '/lab/k-autoavaliacao',
  },
]
