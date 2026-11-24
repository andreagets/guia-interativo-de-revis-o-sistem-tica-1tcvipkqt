export interface GlossaryTerm {
  id: string
  term: string
  shortDef: string
  fullDef: string
  distinction?: string
  citation: string
  refId: string
  category: 'conceito' | 'unidade' | 'avaliacao' | 'sintese' | 'relato'
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'registro',
    term: 'Registro (Record)',
    shortDef:
      'Informação bibliográfica ou descritiva identificada durante a busca nas bases de dados.',
    fullDef:
      'Título, resumo, autores, periódicos e metadados de uma publicação indexada ou capturada por estratégias de busca em bases de dados ou registros de ensaios.',
    distinction:
      'Diferente de estudo (a investigação em si) e relatório (o documento completo). Um estudo pode gerar múltiplos registros e relatórios.',
    citation: 'Page et al. (2021b)',
    refId: 'page-prisma-ee-2021',
    category: 'unidade',
  },
  {
    id: 'relatorio',
    term: 'Relatório (Report)',
    shortDef: 'Documento que apresenta informações sobre determinado estudo.',
    fullDef:
      'Pode ser um artigo científico completo publicado em periódico, resumo de anais de conferência, dissertação, tese, relatório de ensaio clínico em registro (ClinicalTrials.gov, ReBEC) ou relatório de agência regulatória.',
    distinction:
      'Um mesmo estudo (ex.: ensaio clínico com 1.000 pacientes) pode gerar múltiplos relatórios (artigo de protocolo, artigo de resultados primários, artigo de seguimento a longo prazo e subanálise de subgrupos).',
    citation: 'Page et al. (2021b)',
    refId: 'page-prisma-ee-2021',
    category: 'unidade',
  },
  {
    id: 'estudo',
    term: 'Estudo único (Study)',
    shortDef:
      'A investigação científica propriamente dita, que pode estar representada por mais de um relatório.',
    fullDef:
      'A unidade essencial de síntese em uma revisão sistemática. É o experimento, ensaio clínico, estudo de coorte ou investigação conduzida com uma amostra definida de participantes.',
    distinction:
      'Nunca some múltiplos relatórios do mesmo estudo nas metanálises como se fossem populações diferentes: isso superestimaria o peso amostral da intervenção (dupla contagem).',
    citation: 'Page et al. (2021b)',
    refId: 'page-prisma-ee-2021',
    category: 'unidade',
  },
  {
    id: 'revisao-sistematica',
    term: 'Revisão Sistemática',
    shortDef:
      'Síntese de evidências que utiliza métodos explícitos, reprodutíveis e sistemáticos para responder a uma pergunta claramente formulada.',
    fullDef:
      'Pesquisa secundária estruturada com critérios de elegibilidade predefinidos, busca abrangente, seleção e extração independentes, avaliação crítica da qualidade metodológica/risco de viés dos estudos incluídos e síntese qualitativa e/ou quantitativa das evidências.',
    distinction:
      'Distingue-se de revisão narrativa (não sistemática, subjetiva), integrativa (combina literatura teórica e empírica com metodologias variadas) e de escopo (mapeia amplitude de conceitos sem avaliação de risco de viés).',
    citation: 'Aromataris et al. (2024); Cochrane (2024)',
    refId: 'aromataris-2024',
    category: 'conceito',
  },
  {
    id: 'prisma-2020',
    term: 'PRISMA 2020 (Diretriz de Relato)',
    shortDef:
      'Diretriz de relato científico com 27 itens e fluxograma para apresentação transparente de revisões sistemáticas.',
    fullDef:
      'O Preferred Reporting Items for Systematic Reviews and Meta-Analyses (PRISMA 2020) orienta como relatar o que foi planejado e executado. Não é um guia metodológico de condução, nem uma ferramenta de avaliação de qualidade do estudo.',
    distinction:
      'PRISMA é para RELATAR. JBI e Cochrane são para CONDUZIR (planejar, buscar, avaliar criticamente e sintetizar).',
    citation: 'Page et al. (2021a)',
    refId: 'page-prisma-2020',
    category: 'relato',
  },
  {
    id: 'risco-de-vies',
    term: 'Risco de Viés (Risk of Bias)',
    shortDef:
      'Probabilidade de que falhas no desenho, condução ou relato de um estudo gerem estimativas sistematicamente distorcidas do efeito.',
    fullDef:
      'Avaliado em estudos primários individuais por meio de ferramentas estruturadas com domínios pré-definidos (ex.: RoB 2 da Cochrane para ensaios randomizados; ferramentas JBI por delineamento). Avalia a validade interna do estudo.',
    distinction:
      'Risco de viés do estudo individual NÃO se confunde com a certeza das evidências (GRADE) do corpo conjunto de estudos, nem com a qualidade do relato (clareza da redação).',
    citation: 'Cochrane (RoB 2); Aromataris et al. (2024)',
    refId: 'cochrane-rob2',
    category: 'avaliacao',
  },
  {
    id: 'certeza-da-evidencia',
    term: 'Certeza da Evidência (GRADE)',
    shortDef:
      'Confiança de que a estimativa conjunta do efeito calculada na revisão reflete o efeito real na população de interesse.',
    fullDef:
      'Julgada para cada desfecho crítico de acordo com os 5 domínios do GRADE: risco de viés dos estudos, inconsistência (heterogeneidade inexplicada), evidência indireta (indireção), imprecisão (intervalos de confiança amplos) e viés de publicação.',
    distinction:
      'Avalia o CONJUNTO de evidências para um desfecho, e não um artigo isolado. Um estudo individual pode ter baixo risco de viés, mas a certeza final ser baixa por imprecisão ou inconsistência.',
    citation: 'GRADE Working Group (GRADE book)',
    refId: 'grade-book',
    category: 'avaliacao',
  },
  {
    id: 'pico',
    term: 'Acrônimo PICO / PICo / SPIDER',
    shortDef: 'Estruturas de formulação da pergunta de pesquisa e critérios de elegibilidade.',
    fullDef:
      'PICO (População, Intervenção, Comparador, Outcomes/Desfechos) para revisões de intervenção/efetividade; PICo (População, Fenômeno de Interesse, Contexto) para qualitativas; SPIDER (Sample, Phenomenon of Interest, Design, Evaluation, Research type); CoCoPop (Condição, Contexto, População) para prevalência.',
    distinction:
      'Cada modalidade de revisão exige a estrutura correspondente. Não force PICO onde não há comparador ou intervenção.',
    citation: 'Aromataris et al. (2024)',
    refId: 'aromataris-2024',
    category: 'conceito',
  },
  {
    id: 'prospero',
    term: 'PROSPERO (Registro de Protocolos)',
    shortDef:
      'Registro prospectivo internacional aberto para revisões sistemáticas com desfecho relacionado à saúde humana.',
    fullDef:
      'Base mantida pelo Centre for Reviews and Dissemination (CRD/University of York) para registro prévio de protocolos de revisão sistemática, visando evitar duplicidade desnecessária e permitir auditoria de desvios de protocolo.',
    distinction:
      'Não aceita revisões de escopo nem revisões sem desfechos em saúde (essas utilizam Open Science Framework - OSF, Figshare ou Zenodo). O registro deve ser feito ANTES de iniciar a triagem de elegibilidade.',
    citation: 'Shamseer et al. (2015)',
    refId: 'shamseer-prisma-p-2015',
    category: 'conceito',
  },
  {
    id: 'heterogeneidade',
    term: 'Heterogeneidade Clínica, Metodológica e Estatística',
    shortDef: 'Variabilidade entre os estudos incluídos na revisão sistemática.',
    fullDef:
      'Clínica: diferenças nos participantes, intervenções ou desfechos. Metodológica: diferenças nos delineamentos, tempo de seguimento ou risco de viés. Estatística: variabilidade nos efeitos observados maior do que a esperada pelo acaso (medida por I², Chi² ou Tau²).',
    distinction:
      'Quando a heterogeneidade clínica ou metodológica é substancial, a metanálise quantitativa pode ser inadequada ou enganosa (efeito "misturar maçãs e laranjas").',
    citation: 'Cochrane (2024)',
    refId: 'cochrane-2024',
    category: 'sintese',
  },
  {
    id: 'metanalise',
    term: 'Metanálise',
    shortDef:
      'Técnica estatística que combina quantitativamente os resultados de dois ou mais estudos primários independentes.',
    fullDef:
      'Calcula uma estimativa ponderada global do efeito da intervenção ou exposição. Exige homogeneidade clínica, metodológica e conceitual suficiente entre os estudos para ser defensável.',
    distinction:
      'Toda metanálise deve estar no contexto de uma revisão sistemática, mas nem toda revisão sistemática pode ou deve realizar metanálise.',
    citation: 'Cochrane (2024); Page et al. (2021a)',
    refId: 'cochrane-2024',
    category: 'sintese',
  },
  {
    id: 'prisma-s',
    term: 'PRISMA-S (Extensão para Buscas)',
    shortDef:
      'Extensão da declaração PRISMA focada na transparência e reprodutibilidade do relato de estratégias de busca.',
    fullDef:
      'Checklist de 16 itens que detalha como relatar bases de dados, registros, interfaces de busca, sintaxe completa com operadores booleanos, datas de cobertura, limites, termos controlados e estratégias complementares.',
    distinction:
      'Permite que outro pesquisador replique exatamente a estratégia em qualquer biblioteca/plataforma sem ambiguidades.',
    citation: 'Rethlefsen et al. (2021)',
    refId: 'rethlefsen-prisma-s-2021',
    category: 'relato',
  },
  {
    id: 'prisma-p',
    term: 'PRISMA-P (Diretriz para Protocolos)',
    shortDef:
      'Diretriz de relato com 17 itens para protocolos de revisão sistemática e metanálise.',
    fullDef:
      'Orienta o relato prévio e detalhado dos métodos planejados antes do início da coleta de dados, reduzindo o risco de viés de publicação e mudanças oportunistas de desfechos.',
    distinction:
      'Aplica-se ao PROTOCOLO (planejamento prévio), enquanto o PRISMA 2020 aplica-se ao RELATÓRIO FINAL da revisão concluída.',
    citation: 'Shamseer et al. (2015)',
    refId: 'shamseer-prisma-p-2015',
    category: 'relato',
  },
  {
    id: 'prisma-c',
    term: 'PRISMA-C 2026 (Crianças e Adolescentes)',
    shortDef:
      'Extensão do PRISMA voltada especificamente para revisões envolvendo populações pediátricas e adolescentes.',
    fullDef:
      'Lançada em 2026, fornece recomendações de relato que consideram especificidades de faixas etárias de desenvolvimento, consentimento e assentimento, dosagens ponderadas e desfechos pediátricos específicos.',
    citation: 'PRISMA (2026)',
    refId: 'prisma-c-2026',
    category: 'relato',
  },
  {
    id: 'triagem-independente',
    term: 'Seleção / Triagem Independente em Pares',
    shortDef:
      'Procedimento metodológico no qual dois revisores avaliam de forma cega e autônoma cada registro identificado.',
    fullDef:
      'Reduz o erro humano e o viés de seleção na triagem de títulos, resumos e textos completos. Divergências são resolvidas por consenso ou por um terceiro revisor sênior.',
    citation: 'Aromataris et al. (2024); Cochrane (2024)',
    refId: 'aromataris-2024',
    category: 'conceito',
  },
  {
    id: 'sintese-sem-metanalise',
    term: 'Síntese sem Metanálise (SwiM)',
    shortDef:
      'Abordagem estruturada para resumir e apresentar resultados quando a metanálise quantitativa não é viável ou apropriada.',
    fullDef:
      'Baseia-se em agrupamento de estudos por intervenções/desfechos, métricas padronizadas de resumo (ex.: direção do efeito, contagem de votos fundamentada com tamanhos de efeito) e apresentação transparente de tabelas estruturadas.',
    citation: 'Cochrane (2024); Page et al. (2021a)',
    refId: 'cochrane-2024',
    category: 'sintese',
  },
  {
    id: 'vies-de-publicacao',
    term: 'Viés de Publicação e do Relato Seletivo',
    shortDef:
      'Tendência de estudos com resultados estatisticamente significantes e favoráveis serem publicados com maior probabilidade.',
    fullDef:
      'Gera uma superestimação do benefício de uma intervenção na literatura publicada. Pode ser investigado graficamente por gráficos de funil (funnel plots) quando há ≥ 10 estudos e avaliado no domínio correspondente do GRADE.',
    citation: 'Page et al. (2021b); Cochrane (2024)',
    refId: 'cochrane-2024',
    category: 'avaliacao',
  },
]
