export interface PhaseInfo {
  number: number
  roman: string
  title: string
  color: string
  bgLight: string
  borderColor: string
  modules: number[]
}

export const PHASES: PhaseInfo[] = [
  {
    number: 1,
    roman: 'I',
    title: 'FUNDAMENTAR',
    color: '#0284c7', // sky-600
    bgLight: 'bg-sky-50 dark:bg-sky-950/30',
    borderColor: 'border-sky-300 dark:border-sky-800',
    modules: [1, 2, 3],
  },
  {
    number: 2,
    roman: 'II',
    title: 'INVESTIGAR',
    color: '#0d9488', // teal-600
    bgLight: 'bg-teal-50 dark:bg-teal-950/30',
    borderColor: 'border-teal-300 dark:border-teal-800',
    modules: [4, 5, 6],
  },
  {
    number: 3,
    roman: 'III',
    title: 'AVALIAR E SINTETIZAR',
    color: '#d97706', // amber-600
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
    borderColor: 'border-amber-300 dark:border-amber-800',
    modules: [7, 8, 9],
  },
  {
    number: 4,
    roman: 'IV',
    title: 'COMUNICAR',
    color: '#4f46e5', // indigo-600
    bgLight: 'bg-indigo-50 dark:bg-indigo-950/30',
    borderColor: 'border-indigo-300 dark:border-indigo-800',
    modules: [10, 11, 12],
  },
]

export interface ModuleData {
  id: number
  slug: string
  phaseNumber: number
  title: string
  subtitle: string
  estimatedMinutes: number
  linkedLabId?: string
  learningObjectives: string[]
  dialogicQuestions: {
    oQueE: string
    paraQueServe: string
    quandoUtilizar: string
    comoAplicar: string
    queDecisaoTomar: string
    queErrosEvitar: string
    ondeConsultar: { title: string; url: string; citation: string }
  }
  conceptualBlocks: { title: string; content: string }[]
  appliedExample: {
    context: string
    scenario: string
    analysis: string
  }
  commonErrors: {
    wrong: string
    why: string
    correct: string
  }[]
  references: string[] // citation IDs from references.ts
}

export const MODULES_DATA: ModuleData[] = [
  {
    id: 1,
    slug: 'tipos-de-revisao-e-viabilidade',
    phaseNumber: 1,
    title: 'Módulo 1. Tipos de revisão e viabilidade',
    subtitle: 'Conceito, modalidades, viabilidade, recursos e verificação de duplicidade',
    estimatedMinutes: 25,
    linkedLabId: 'a-pergunta',
    learningObjectives: [
      'Diferenciar revisão sistemática de revisões narrativa, integrativa e de escopo.',
      'Compreender as 7 modalidades de revisão sistemática e suas características metodológicas específicas.',
      'Avaliar criticamente a viabilidade de tempo, equipe multidisciplinar, idioma e acesso a bases.',
      'Verificar a existência e o andamento de revisões sistemáticas em registros internacionais antes de iniciar.',
    ],
    conceptualBlocks: [
      {
        title: 'O que define uma Revisão Sistemática?',
        content:
          'Uma revisão sistemática é uma síntese estruturada de evidências primárias orientada por uma pergunta de pesquisa formulada com rigor metodológico. Exige protocolo registrado previamente, busca exaustiva e transparente em múltiplas bases, seleção e extração em pares independentes, avaliação crítica do risco de viés de cada estudo incluído e síntese qualitativa ou quantitativa dos achados (Aromataris et al., 2024; Cochrane, 2024).',
      },
      {
        title: 'Diferenciação: Sistemática vs. Narrativa vs. Integrativa vs. Escopo',
        content:
          'A revisão narrativa apresenta síntese opinativa de literatura selecionada sem método explícito. A integrativa combina dados empíricos e teóricos de diversos delineamentos. A revisão de escopo (Scoping Review) mapeia a amplitude, natureza e lacunas da evidência em uma área sem avaliar o risco de viés dos estudos (Silva, 2026b). A revisão sistemática responde a perguntas específicas, exige avaliação crítica minuciosa e visa orientar a tomada de decisão em saúde.',
      },
      {
        title: 'As 7 Principais Modalidades de Revisão Sistemática',
        content:
          '1. Efetividade: avalia o efeito benéfico ou adverso de intervenções (PICO; ensaios clínicos ou estudos observacionais analíticos).\n2. Prevalência e Incidência: estima proporções populacionais de condições em saúde (CoCoPop; estudos transversais).\n3. Etiologia e Fatores de Risco: investiga determinantes e fatores associados (PEO; coorte, caso-controle).\n4. Acurácia Diagnóstica: sensibilidade, especificidade e razões de verossimilhança de testes (PIRT; estudos transversais ou caso-controle pareado).\n5. Prognóstico: estima curso longitudinal de uma condição (PICOTS; coortes prospectivas).\n6. Qualitativa (Metassíntese): experiências, percepções e significados vividos (PICo/SPIDER; fenomenologia, grounded theory, etnografia).\n7. Métodos Mistos: integra evidências quantitativas e qualitativas em sínteses convergentes ou sequenciais.',
      },
      {
        title: 'Viabilidade e Verificação de Duplicidade',
        content:
          'Antes de iniciar, é mandatória a busca por revisões concluídas ou protocolos em andamento no PROSPERO, Cochrane Database of Systematic Reviews, Open Science Framework (OSF) e bases como MEDLINE/PubMed. Conduzir uma revisão idêntica sem justificativa de atualização consome meses de trabalho e gera desperdício na pesquisa científica.',
      },
    ],
    dialogicQuestions: {
      oQueE:
        'A etapa inicial em que o pesquisador delimita o tipo exato de síntese e confirma se a investigação é viável, original e necessária.',
      paraQueServe:
        'Evita desperdício científico, impede duplicações desnecessárias e estabelece se a pergunta exige métodos de efetividade, prevalência, qualitativos ou outro desenho.',
      quandoUtilizar:
        'No primeiro momento do planejamento, antes de redigir qualquer linha de protocolo ou submeter registros.',
      comoAplicar:
        'Realize busca sensível no PROSPERO e no PubMed por revisões anteriores; elabore checklist de recursos (mínimo de 2 revisores independentes, software de referências, acesso a periódicos, tempo de 6 a 18 meses).',
      queDecisaoTomar:
        'Decidir se a revisão deve prosseguir, ser refinada para um subgrupo/contexto original, ser convertida em atualização ou ser descartada.',
      queErrosEvitar:
        'Iniciar uma revisão sistemática individualmente (sem segundo revisor); confundir revisão sistemática com scoping review; não consultar registros prévios.',
      ondeConsultar: {
        title: 'JBI Manual for Evidence Synthesis (2024) - Chapter 1 & Cochrane Handbook (2024)',
        url: 'https://synthesismanual.jbi.global',
        citation: 'Aromataris et al. (2024)',
      },
    },
    appliedExample: {
      context:
        'Pesquisador em Fisioterapia deseja investigar o efeito da telereabilitação em dor lombar crônica.',
      scenario:
        'Antes de formular o protocolo, realiza busca no PROSPERO por "telerehabilitation" AND "low back pain". Encontra uma revisão publicada em 2021 com estudos até 2020. Decide realizar uma atualização metodológica ou focar em subgrupos específicos não contemplados (ex.: idosos acima de 65 anos na atenção primária).',
      analysis:
        'A verificação de viabilidade poupou a equipe de conduzir trabalho redundante e direcionou o foco da investigação para uma lacuna real do conhecimento científico.',
    },
    commonErrors: [
      {
        wrong: 'Conduzir revisão sistemática sozinho, sem dupla revisão independente.',
        why: 'Viola os padrões da Cochrane e do JBI, aumentando substancialmente o risco de viés de seleção e erro de extração.',
        correct:
          'Equipe mínima de pelo menos dois revisores independentes e um terceiro avaliador sênior para desempate.',
      },
      {
        wrong: 'Chamar de revisão sistemática uma revisão bibliográfica narrativa.',
        why: 'Revisão narrativa não possui critérios de elegibilidade predefinidos, busca abrangente reprodutível nem avaliação de risco de viés.',
        correct:
          'Designar corretamente como revisão narrativa ou adotar a metodologia estrita de síntese de evidências.',
      },
      {
        wrong: 'Avaliar risco de viés em uma revisão de escopo.',
        why: 'Revisões de escopo mapeiam literatura sem julgamento de validade interna metodológica (Silva, 2026b).',
        correct:
          'Se a avaliação crítica e síntese de efeito são necessárias, o delineamento correto é revisão sistemática.',
      },
    ],
    references: ['aromataris-2024', 'cochrane-2024', 'page-prisma-2020', 'silva-escopo-2026'],
  },
  {
    id: 2,
    slug: 'pergunta-objetivos-e-delineamentos',
    phaseNumber: 1,
    title: 'Módulo 2. Pergunta, objetivos e delineamentos',
    subtitle: 'Estruturação PICO, PICo, SPIDER, CoCoPop e escolha de delineamentos primários',
    estimatedMinutes: 30,
    linkedLabId: 'a-pergunta',
    learningObjectives: [
      'Estruturar perguntas com base nos acrônimos apropriados a cada modalidade de revisão.',
      'Garantir a coerência unívoca entre problema, pergunta, objetivos e critérios de elegibilidade.',
      'Definir a priori os delineamentos de estudos primários elegíveis e justificar a escolha metodológica.',
    ],
    conceptualBlocks: [
      {
        title: 'A Pergunta como Núcleo da Revisão',
        content:
          'Uma pergunta vaga gera buscas ruidosas, critérios de inclusão inconsistentes e sínteses incoerentes. A pergunta orienta todos os passos subsequentes: estratégias de busca, critérios de inclusão, instrumentos de extração e métodos de síntese (Aromataris et al., 2024).',
      },
      {
        title: 'Acrônimos de Estruturação Metodológica',
        content:
          '• PICO: População, Intervenção, Comparador, Outcomes (Desfechos) — indicado para ensaios clínicos e efetividade.\n• PICo: População, Fenômeno de Interesse, Contexto — indicado para revisões qualitativas.\n• SPIDER: Sample, Phenomenon of Interest, Design, Evaluation, Research type — alternativo em qualitativas e métodos mistos.\n• CoCoPop: Condição, Contexto, População — indicado para estudos de prevalência e incidência.\n• PIRT: População, Índice (teste), Referência (padrão-ouro), Target (condição alvo) — acurácia diagnóstica.',
      },
      {
        title: 'Seleção dos Delineamentos dos Estudos Primários',
        content:
          'Para avaliar intervenções farmacológicas ou comportamentais, ensaios clínicos randomizados (ECR) são padrão-ouro para minimizar viés de confusão. Quando ECRs são antiéticos ou inviáveis (ex.: exposição a poluentes, tabagismo), estudos observacionais longitudinais (coorte prospectiva ou caso-controle) são os desenhos apropriados.',
      },
    ],
    dialogicQuestions: {
      oQueE:
        'A formalização conceitual e operacional do que se deseja investigar e quais tipos de estudos primários podem responder a essa dúvida.',
      paraQueServe:
        'Define de forma inequívoca o escopo da revisão, os limites de inclusão e a comparabilidade dos dados extraídos.',
      quandoUtilizar: 'Na fase de planejamento inicial, antes da redação do protocolo.',
      comoAplicar:
        'Selecione o acrônimo correspondente à modalidade de revisão; preencha cada elemento com precisão; redija a pergunta por extenso; verifique se há comparador obrigatório ou não.',
      queDecisaoTomar:
        'Estabelecer se apenas ensaios randomizados serão elegíveis ou se estudos observacionais analíticos serão incluídos.',
      queErrosEvitar:
        'Incluir estudos transversais em revisões de efetividade de intervenções; usar PICO em revisões qualitativas onde não há intervenção.',
      ondeConsultar: {
        title: 'JBI Manual for Evidence Synthesis - Developing the question',
        url: 'https://synthesismanual.jbi.global',
        citation: 'Aromataris et al. (2024)',
      },
    },
    appliedExample: {
      context: 'Revisão sobre efetividade do exercício resistido em sarcopenia de idosos.',
      scenario:
        'P: Idosos comunitários ≥ 65 anos com sarcopenia confirmada; I: Treinamento com pesos/resistência elástica por ≥ 8 semanas; C: Cuidados habituais ou nenhum exercício; O: Força muscular (dinamometria manual) e massa muscular apendicular (DEXA); Delineamento elegível: apenas ECRs.',
      analysis:
        'A estrutura PICO é nítida, métricas de desfecho são objetivas e o comparador é bem delimitado, permitindo estratégia de busca focada e síntese quantitativa viável.',
    },
    commonErrors: [
      {
        wrong: 'Definir desfechos (Outcomes) como critério de busca ou exclusão precoce.',
        why: 'Muitos artigos não mencionam todos os desfechos secundários no título/resumo; excluir no título gera perda de estudos relevantes.',
        correct:
          'Foque a triagem de título/resumo em População, Intervenção e Comparador; avalie desfechos na leitura completa.',
      },
      {
        wrong:
          'Formular objetivos que prometem investigar mecanismos biológicos em uma revisão de ensaios clínicos.',
        why: 'O objetivo da revisão sistemática deve se limitar estritamente àquilo que os delineamentos primários coletam.',
        correct:
          'Alinhar objetivos a estimativas de efetividade, segurança e magnitude clínica dos efeitos.',
      },
    ],
    references: ['aromataris-2024', 'cochrane-2024', 'page-prisma-2020'],
  },
  {
    id: 3,
    slug: 'protocolo-e-registro',
    phaseNumber: 1,
    title: 'Módulo 3. Protocolo e registro',
    subtitle: 'Planejamento prévio, critérios, PRISMA-P e registro em plataformas públicas',
    estimatedMinutes: 25,
    linkedLabId: 'b-matriz-coerencia',
    learningObjectives: [
      'Compreender a necessidade científica do protocolo como salvaguarda contra o viés de relato seletivo.',
      'Conhecer e aplicar os 17 itens da diretriz PRISMA-P (Shamseer et al., 2015).',
      'Identificar as plataformas de registro cabíveis (PROSPERO, OSF, ReBEC) e suas regras de elegibilidade.',
      'Documentar e justificar formalmente futuros desvios do protocolo original.',
    ],
    conceptualBlocks: [
      {
        title: 'Por que o Protocolo é Inegociável?',
        content:
          'O protocolo é o plano de trabalho formalizado antes do início da seleção. Ele impede decisões oportunistas — como alterar critérios de inclusão após ver os resultados dos artigos ou selecionar apenas desfechos com valores de p estatisticamente significantes (Shamseer et al., 2015).',
      },
      {
        title: 'PRISMA-P: A Diretriz de Relato de Protocolos',
        content:
          'O PRISMA-P conta com 17 itens agrupados em seções: Informações Administrativas (título, registro, autores, financiamento), Introdução (justificativa e objetivos), e Métodos (elegibilidade, busca, seleção, extração, risco de viés, síntese quantitativa planejada e avaliação da certeza da evidência) (Shamseer et al., 2015).',
      },
      {
        title: 'Onde Registrar o Protocolo?',
        content:
          '• PROSPERO (CRD/York): aceita revisões com desfechos em saúde humana. Deve ser submetido antes de iniciar a triagem de elegibilidade.\n• Open Science Framework (OSF): aceita protocolos de qualquer área do conhecimento, incluindo revisões de escopo e revisões não biomédicas.\n• Periódicos científicos com formato de artigo de protocolo (ex.: Systematic Reviews, BMJ Open): permite revisão por pares formal.',
      },
    ],
    dialogicQuestions: {
      oQueE:
        'O documento formal que registra todas as etapas, critérios e análises planejadas antes da execução da revisão.',
      paraQueServe:
        'Garante transparência, reprodutibilidade, evita duplicidade de esforços e impede que pesquisadores adaptem critérios ao sabor dos achados.',
      quandoUtilizar:
        'Obrigatoriamente antes de iniciar a triagem de títulos e resumos das buscas.',
      comoAplicar:
        'Redija o protocolo seguindo o checklist PRISMA-P; submeta ao PROSPERO ou publique na OSF; anote o número de registro.',
      queDecisaoTomar:
        'Definir antecipadamente o método de síntese estatística (modelo de efeitos fixos ou aleatórios) e os subgrupos planejados.',
      queErrosEvitar:
        'Registrar a revisão no PROSPERO após já ter concluído a extração dos dados (prática rejeitada pelas diretrizes).',
      ondeConsultar: {
        title: 'PRISMA-P Statement & Explanation (Shamseer et al., 2015)',
        url: 'https://www.bmj.com/content/349/bmj.g7647',
        citation: 'Shamseer et al. (2015)',
      },
    },
    appliedExample: {
      context: 'Equipe de pesquisa submete protocolo de revisão de efetividade.',
      scenario:
        'No protocolo, definem previamente que a metanálise considerará modelo de efeitos aleatórios de DerSimonian-Laird e subgrupos por faixa etária (< 60 anos vs. ≥ 60 anos). Quando encontram heterogeneidade nos resultados, a análise de subgrupo é legítima porque foi pré-especificada.',
      analysis:
        'A pré-especificação no protocolo protege o manuscrito contra a acusação de "data dredging" (mineração oportunista de subgrupos estatisticamente significantes).',
    },
    commonErrors: [
      {
        wrong: 'Omitir no artigo final os desvios que foram necessários em relação ao protocolo.',
        why: 'Impedir o leitor e os revisores de auditar a integridade metodológica da revisão.',
        correct:
          'Dedicar uma subseção transparente no manuscrito aos "Desvios do Protocolo", justificando cada alteração.',
      },
      {
        wrong: 'Registrar scoping review no PROSPERO.',
        why: 'O PROSPERO rejeita categoricamente registros de revisões de escopo.',
        correct: 'Registrar revisões de escopo na plataforma Open Science Framework (OSF).',
      },
    ],
    references: ['shamseer-prisma-p-2015', 'prisma-p-statement', 'page-prisma-2020'],
  },
  {
    id: 4,
    slug: 'estrategias-de-busca',
    phaseNumber: 2,
    title: 'Módulo 4. Estratégias de busca',
    subtitle: 'Bases de dados, MeSH/DeCS, operadores booleanos, busca complementar e PRISMA-S',
    estimatedMinutes: 30,
    linkedLabId: 'c-busca',
    learningObjectives: [
      'Diferenciar termos controlados (MeSH, DeCS, Emtree) de termos livres (palavras no título e resumo).',
      'Construir blocos de busca utilizando operadores booleanos (OR dentro do bloco, AND entre blocos).',
      'Executar busca complementar (busca em citações, literatura cinzenta, registros de ensaios).',
      'Documentar integralmente a estratégia de busca de acordo com o checklist PRISMA-S (Rethlefsen et al., 2021).',
    ],
    conceptualBlocks: [
      {
        title: 'A Lógica dos Blocos Conceituais',
        content:
          'Uma estratégia de alta sensibilidade combina vocabulário controlado e sinônimos de texto livre. Cada componente do acrônimo (ex.: População, Intervenção) forma um bloco conceitual. Dentro de cada bloco, os termos sinônimos são conectados pelo operador booleano OR. Os diferentes blocos conceituais são conectados pelo operador AND.',
      },
      {
        title: 'Termos Controlados vs. Termos Livres',
        content:
          '• Termos controlados (MeSH no PubMed, DeCS na BVS, Emtree no Embase): atribuídos por indexadores humanos; padronizam variações ortográficas, plurais e sinônimos.\n• Termos livres (title/abstract/keywords): capturam estudos recentes ainda não indexados e termos emergentes. A combinação de ambos é mandatória para garantir sensibilidade.',
      },
      {
        title: 'PRISMA-S: Padrão Ouro para Relato de Buscas',
        content:
          'O PRISMA-S (Rethlefsen et al., 2021) é uma extensão com 16 itens que exige: nome completo de todas as bases e plataformas (ex.: MEDLINE via PubMed; Embase via Elsevier); datas exatas em que cada busca foi rodada; a estratégia de busca completa e literal copiada e colada para cada base; estratégias de literatura cinzenta e busca em listas de referências.',
      },
    ],
    dialogicQuestions: {
      oQueE:
        'A formulação e execução dos algoritmos de recuperação de literatura nas bases de dados bibliográficas e fontes complementares.',
      paraQueServe:
        'Identificar a totalidade dos estudos potencialmente elegíveis, minimizando viés de publicação e omissão de literatura relevante.',
      quandoUtilizar: 'Na fase de investigação ativa, após aprovação do protocolo.',
      comoAplicar:
        'Elabore a estratégia na base principal (ex.: PubMed); valide com bibliotecário ou especialista; adapte a sintaxe e truncamentos (*, $, quotes) para as demais bases (Embase, Cochrane Library, CINAHL, SciELO).',
      queDecisaoTomar:
        'Definir quais filtros metodológicos (se algum) podem ser aplicados sem comprometer perigosamente a sensibilidade.',
      queErrosEvitar:
        'Usar operador NOT em estratégias de revisão sistemática; limitar a busca ao idioma inglês sem justificativa plausível.',
      ondeConsultar: {
        title: 'PRISMA-S Statement: reporting literature searches (Rethlefsen et al., 2021)',
        url: 'https://doi.org/10.1186/s13643-020-01542-z',
        citation: 'Rethlefsen et al. (2021)',
      },
    },
    appliedExample: {
      context: 'Busca para "exercício físico" em sarcopenia.',
      scenario:
        'Bloco 1 (População): ("Sarcopenia"[Mesh] OR sarcopeni*[tiab] OR "muscle loss"[tiab]) AND Bloco 2 (Intervenção): ("Exercise Therapy"[Mesh] OR "Resistance Training"[Mesh] OR exercis*[tiab] OR "strength training"[tiab]). Testada no PubMed e adaptada para Embase.',
      analysis:
        'O uso de truncamento (*) captura variantes (sarcopenia, sarcopenic, exercise, exercises) e a união com termos MeSH garante que artigos antigos e recentes sejam recuperados.',
    },
    commonErrors: [
      {
        wrong: 'Usar o operador booleano NOT para excluir estudos em animais.',
        why: 'O operador NOT descarta inadvertidamente estudos com humanos que apenas citam modelos animais na introdução ou discussão.',
        correct:
          'Utilize os filtros metodológicos validados pela Cochrane ou JBI para refinamento seguro de população humana.',
      },
      {
        wrong:
          'Copiar e colar a mesma estratégia do PubMed diretamente no Embase ou SciELO sem adaptar a sintaxe.',
        why: 'Cada base possui operadores, truncamentos e tesauros proprietários; a sintaxe do PubMed gera erros silenciosos ou resultados incorretos em outras bases.',
        correct:
          'Traduzir a estratégia para a sintaxe e vocabulário de cada interface específica (Emtree para Embase, DeCS para BVS).',
      },
    ],
    references: ['rethlefsen-prisma-s-2021', 'prisma-s-statement', 'cochrane-2024'],
  },
  {
    id: 5,
    slug: 'selecao-dos-estudos',
    phaseNumber: 2,
    title: 'Módulo 5. Seleção dos estudos',
    subtitle:
      'Gerenciamento, desduplicação, triagem de títulos/resumos, recuperação e elegibilidade',
    estimatedMinutes: 25,
    linkedLabId: 'd-triagem',
    learningObjectives: [
      'Executar a desduplicação sistemática de registros importados de múltiplas bases de dados.',
      'Conduzir triagem em duas etapas: triagem de títulos/resumos e avaliação de texto completo.',
      'Garantir a seleção independente por pares cegos com protocolo de resolução de divergências.',
      'Registrar detalhadamente os motivos formais de exclusão na etapa de leitura de texto completo.',
    ],
    conceptualBlocks: [
      {
        title: 'As Duas Etapas da Seleção',
        content:
          'A seleção ocorre em duas etapas estritas:\nEtapa 1 (Triagem rápida): leitura de título e resumo para excluir estudos que claramente não atendem aos critérios de inclusão. Na dúvida, o registro SEMPRE avança para a próxima etapa.\nEtapa 2 (Elegibilidade): recuperação e leitura crítica do relatório completo para confirmação final dos critérios.',
      },
      {
        title: 'A Regra da Seleção Independente em Dupla',
        content:
          'Todos os registros devem ser avaliados por pelo menos dois pesquisadores de maneira mascarada/independente (Aromataris et al., 2024; Cochrane, 2024). Ferramentas como Rayyan, Covidence ou planilhas codificadas são recomendadas para manter o cegamento até a fase de consenso.',
      },
      {
        title: 'Documentação dos Motivos de Exclusão (PRISMA 2020)',
        content:
          'Na leitura de texto completo, cada exclusão DEVE ter um motivo específico documentado (ex.: "População pediátrica", "Delineamento observacional não elegível", "Intervenção sem grupo comparador"). Esses motivos alimentam diretamente o ramo de Elegibilidade do fluxograma PRISMA 2020.',
      },
    ],
    dialogicQuestions: {
      oQueE:
        'O processo de filtragem metódico que identifica quais estudos recuperados atendem aos critérios pré-definidos no protocolo.',
      paraQueServe:
        'Reduz o universo de milhares de registros brutos ao conjunto exato de estudos que comporão o corpo de evidências da revisão.',
      quandoUtilizar:
        'Logo após o encerramento das buscas nas bases e a remoção das referências duplicadas.',
      comoAplicar:
        'Importe os arquivos RIS/BibTeX para um gerenciador; execute desduplicação automatizada seguida de conferência manual; calibre a triagem inicial com 50 registros entre os revisores; trie em pares independentes; reúna-se para resolver divergências.',
      queDecisaoTomar:
        'Classificar cada registro em "Incluir", "Excluir" (com motivo) ou "Dúvida/Texto Completo".',
      queErrosEvitar:
        'Excluir um estudo na triagem de resumo quando há dúvida sobre um critério; não documentar o motivo numérico exato das exclusões de texto completo.',
      ondeConsultar: {
        title: 'JBI Manual for Evidence Synthesis - Study selection',
        url: 'https://synthesismanual.jbi.global',
        citation: 'Aromataris et al. (2024)',
      },
    },
    appliedExample: {
      context: 'Triagem de 1.450 registros recuperados sobre reabilitação.',
      scenario:
        'Dois revisores triam os 1.450 títulos e resumos cegamente. O revisor A marca 85 para texto completo; o revisor B marca 92. A concordância é de 94% (Kappa = 0,81). Para os 15 registros divergentes, reúnem-se com o revisor sênior e decidem incluir 10 para leitura completa.',
      analysis:
        'A resolução formal de divergências garantiu rigor científico e evitou perdas acidentais de estudos elegíveis.',
    },
    commonErrors: [
      {
        wrong:
          'Registrar motivos de exclusão detalhados para cada estudo excluído na fase de título e resumo.',
        why: 'O PRISMA 2020 exige a contagem total de excluídos no resumo, mas NÃO exige justificativas pormenorizadas nessa fase (exigidas apenas na fase de texto completo).',
        correct:
          'Justificar os motivos específicos de exclusão exclusivamente para os relatórios avaliados na fase de texto completo.',
      },
      {
        wrong:
          'Desistir de buscar o texto completo se o artigo não estiver disponível imediatamente em acesso aberto.',
        why: 'Viola a integridade metodológica da revisão, favorecendo estudos de periódicos abertos em detrimento de publicações essenciais.',
        correct:
          'Utilizar empréstimo entre bibliotecas (COMUT), contato formal com os autores por e-mail e plataformas acadêmicas.',
      },
    ],
    references: ['aromataris-2024', 'cochrane-2024', 'page-prisma-2020', 'page-prisma-ee-2021'],
  },
  {
    id: 6,
    slug: 'extracao-e-organizacao-dos-dados',
    phaseNumber: 2,
    title: 'Módulo 6. Extração e organização dos dados',
    subtitle:
      'Instrumentos padronizados, estudo vs. relatório, características PICO e dados ausentes',
    estimatedMinutes: 25,
    linkedLabId: 'e-extracao',
    learningObjectives: [
      'Construir e pilotar um formulário estruturado de extração de dados antes da coleta definitiva.',
      'Identificar e vincular múltiplos relatórios pertencentes a um mesmo estudo primário único.',
      'Extrair sistematicamente características dos participantes, intervenções, comparadores e desfechos.',
      'Manejar com transparência a falta de relato e dados ausentes, estabelecendo contato com autores.',
    ],
    conceptualBlocks: [
      {
        title: 'Distinção Crucial: Estudo vs. Relatório',
        content:
          'Um "estudo" é a investigação experimental ou observacional realizada com uma coorte de participantes. Um "relatório" é o documento físico que relata o estudo (artigo, tese, resumo de congresso). Um estudo com 500 pacientes pode ter gerado 4 artigos científicos diferentes. Na extração, esses 4 relatórios devem ser combinados em uma única ficha de estudo, evitando inflar artificialmente o número de participantes na síntese (Page et al., 2021b).',
      },
      {
        title: 'O Teste Piloto da Extração',
        content:
          'Antes de iniciar a extração de toda a amostra incluída, os revisores devem testar o formulário em pelo menos 3 a 5 estudos incluídos de complexidade variada. Esse piloto alinha o entendimento de termos dúbios, padroniza as unidades de medida (ex.: transformar semanas em meses) e aprimora a planilha de coleta.',
      },
      {
        title: 'Manejo de Informações Ausentes',
        content:
          'Quando um dado crítico não estiver relatado (ex.: desvio-padrão de um desfecho contínuo, tempo exato de seguimento), deve-se registrar formalmente "não relatado" e efetuar tentativa documentada de contato com o autor correspondente. Não impute valores numéricos sem fundamentação estatística prévia.',
      },
    ],
    dialogicQuestions: {
      oQueE:
        'A transcrição fidedigna das variáveis de interesse dos artigos selecionados para um repositório estruturado e padronizado.',
      paraQueServe:
        'Organiza as informações para alimentar a tabela de características dos estudos, a avaliação de viés e a síntese estatística/narrativa.',
      quandoUtilizar: 'Após a finalização da lista definitiva de estudos e relatórios elegíveis.',
      comoAplicar:
        'Elabore ficha de extração (eletrônica ou em software especializado); pilote em 5 estudos; extraia em duplicata independente; confronte os valores numéricos; codifique variáveis contínuas e dicotômicas.',
      queDecisaoTomar:
        'Definir qual valor estatístico extrair quando o artigo relata medianas com intervalo interquartil em vez de médias com desvio-padrão.',
      queErrosEvitar:
        'Inserir o mesmo ensaio clínico duas vezes na metanálise por ter sido publicado em periódicos diferentes.',
      ondeConsultar: {
        title: 'Cochrane Handbook - Chapter 5: Collecting data',
        url: 'https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current',
        citation: 'Cochrane (2024)',
      },
    },
    appliedExample: {
      context: 'Ensaio clínico multicêntrico com publicação de 2020 e subestudo de 2022.',
      scenario:
        'A equipe identifica o estudo "PROGRESS-Trial" em dois artigos: o artigo primário relatando sobrevida em 12 meses e um artigo subsequente com análise de biomarcadores aos 24 meses. Os revisores criam o registro único "PROGRESS (2020/2022)" contendo as duas publicações vinculadas.',
      analysis:
        'O fluxograma PRISMA registrará: 1 estudo único incluído representado por 2 relatórios. Os cálculos amostrais permanecem exatos.',
    },
    commonErrors: [
      {
        wrong: 'Considerar cada artigo publicado como um estudo diferente.',
        why: 'Duplica os dados de pacientes em metanálises, falseando o poder estatístico e a precisão das estimativas.',
        correct: 'Agrupar todos os artigos de um mesmo ensaio sob o mesmo código de estudo único.',
      },
      {
        wrong: 'Substituir dados ausentes por suposições sem validação com os autores primários.',
        why: 'Gera contaminação e estimativas não fidedignas dos desfechos analisados.',
        correct:
          'Tentar contato com autores primários e, na ausência de resposta, relatar explicitamente a limitação.',
      },
    ],
    references: ['aromataris-2024', 'cochrane-2024', 'page-prisma-2020', 'page-prisma-ee-2021'],
  },
  {
    id: 7,
    slug: 'avaliacao-critica-e-risco-de-vies',
    phaseNumber: 3,
    title: 'Módulo 7. Avaliação crítica e risco de viés',
    subtitle: 'Instrumentos JBI, ferramentas Cochrane, RoB 2, domínios e justificativas',
    estimatedMinutes: 30,
    linkedLabId: 'f-avaliacao',
    learningObjectives: [
      'Selecionar a ferramenta adequada ao delineamento do estudo primário (RoB 2, ROBINS-I, checklists JBI).',
      'Compreender os 5 domínios da ferramenta RoB 2 da Cochrane para ensaios clínicos randomizados.',
      'Fundamentar cada julgamento com citações textuais diretas do relatório primário avaliado.',
      'Reconhecer as limitações de ferramentas automatizadas e escores numéricos arbitrários de qualidade.',
    ],
    conceptualBlocks: [
      {
        title: 'Avaliação Crítica não é Escores Numéricos Arbitrários',
        content:
          'Diretrizes internacionais consolidadas (Cochrane, JBI) desaprovam enfaticamente o uso de escalas numéricas que atribuem uma nota geral aos estudos (como a escala de Jadad). Estudos com a mesma nota numérica podem ter falhas metodológicas letais em pontos completamente diferentes. A avaliação de risco de viés é feita por domínios estruturados, avaliando mecanismos específicos de distorção (Cochrane, 2024; JBI, [s. d.]).',
      },
      {
        title: 'A Ferramenta Cochrane RoB 2 para Ensaio Clínico',
        content:
          'O RoB 2 avalia o risco de viés para um resultado específico de um ensaio clínico em 5 domínios:\n1. Processo de randomização e ocultação da alocação.\n2. Desvios das intervenções pretendidas (efeito da atribuição ou da adesão).\n3. Dados ausentes do desfecho (atrito e perdas de seguimento).\n4. Medição do desfecho (cegamento de avaliadores de desfecho).\n5. Seleção dos resultados relatados (relato seletivo).\nJulgamentos possíveis: Baixo risco, Algumas preocupações (Some concerns) ou Alto risco de viés.',
      },
      {
        title: 'Checklists Críticos do JBI por Delineamento',
        content:
          'O JBI fornece ferramentas dedicadas para diversos tipos de estudos primários: coorte, caso-controle, transversal analítico, prevalência, quase-experimental, relatos de caso e estudos qualitativos. Cada item deve ser pontuado com "Sim", "Não", "Pouco claro" ou "Não aplicável", sempre acompanhado da justificativa metodológica explícita (JBI, [s. d.]).',
      },
    ],
    dialogicQuestions: {
      oQueE:
        'O julgamento metódico da validade interna de cada estudo primário elegível incluído na revisão.',
      paraQueServe:
        'Determina a confiabilidade dos achados individuais e orienta análises de sensibilidade no momento da síntese das evidências.',
      quandoUtilizar:
        'Após a inclusão definitiva dos estudos e paralelamente ou logo após a extração dos dados.',
      comoAplicar:
        'Identifique o desenho do estudo; aplique a ferramenta recomendada correspondente; avalie domínio a domínio com base em evidências textuais do artigo; realize em dupla mascarada; justifique cada decisão.',
      queDecisaoTomar:
        'Classificar o risco de viés global do resultado como baixo, com preocupações ou alto.',
      queErrosEvitar:
        'Confundir falta de relato com presença de viés sem ponderar; utilizar a ferramenta errada para o delineamento do artigo.',
      ondeConsultar: {
        title: 'Cochrane RoB 2 & JBI Critical Appraisal Tools',
        url: 'https://methods.cochrane.org/bias/resources/rob-2-revised-cochrane-risk-bias-tool-randomized-trials',
        citation: 'Cochrane (RoB 2); JBI (Critical appraisal tools)',
      },
    },
    appliedExample: {
      context: 'Avaliação de um ECR de fisioterapia motora para AVC.',
      scenario:
        'O artigo relata geração de sequência aleatória por computador, mas não menciona envelopes selados ou alocação centralizada (ocultação da alocação incerta). No domínio 1 do RoB 2, os revisores assinalam "Algumas preocupações", citando o trecho do artigo e apontando a ausência de detalhes sobre ocultação.',
      analysis:
        'A justificativa documental permite que qualquer leitor da revisão compreenda a razão exata do julgamento.',
    },
    commonErrors: [
      {
        wrong: 'Atribuir uma nota de 0 a 10 para a qualidade metodológica dos artigos.',
        why: 'Escores numéricos mascaram vieses críticos e são reprovados pela Cochrane e JBI.',
        correct:
          'Apresentar a avaliação por domínios estruturados em tabelas ou gráficos de semáforo.',
      },
      {
        wrong:
          'Julgar automaticamente como "alto risco de viés" qualquer artigo que não cegou terapeutas em intervenções físicas.',
        why: 'Em reabilitação e cirurgia, cegar o profissional que aplica a intervenção é frequentemente impossível; o foco deve recair no cegamento do avaliador do desfecho.',
        correct:
          'Ponderar o impacto plausível da ausência de cegamento no desfecho em questão (desfechos objetivos vs. subjetivos).',
      },
    ],
    references: ['cochrane-rob2', 'jbi-appraisal', 'aromataris-2024', 'cochrane-2024'],
  },
  {
    id: 8,
    slug: 'sintese-das-evidencias',
    phaseNumber: 3,
    title: 'Módulo 8. Síntese das evidências',
    subtitle: 'Síntese narrativa/SwiM, metanálise, heterogeneidade, modelos estatísticos e limites',
    estimatedMinutes: 30,
    linkedLabId: 'b-matriz-coerencia',
    learningObjectives: [
      'Definir quando a combinação quantitativa de estudos (metanálise) é metodologicamente justificável ou imprópria.',
      'Aplicar as diretrizes de Síntese sem Metanálise (SwiM) de forma transparente e estruturada.',
      'Identificar e interpretar medidas de efeito para variáveis contínuas (MD, SMD) e dicotômicas (RR, OR).',
      'Avaliar e explorar a heterogeneidade clínica, metodológica e estatística (I², Chi², Tau²).',
    ],
    conceptualBlocks: [
      {
        title: 'Quando Metanalisar? Evitando a Síntese Inadequada',
        content:
          'Uma metanálise só deve ser conduzida quando os estudos primários forem suficientemente semelhantes em termos de população, intervenções, comparadores e medição de desfechos. Combinar estudos clinicamente díspares (ex.: misturar pacientes hospitalizados graves com pacientes ambulatoriais leves) gera um resultado numérico artificial desprovido de sentido clínico prático ("misturar maçãs e laranjas") (Cochrane, 2024).',
      },
      {
        title: 'Modelos Estatísticos: Efeitos Fixos vs. Aleatórios',
        content:
          '• Efeitos Fixos: pressupõe que todos os estudos compartilham um único efeito verdadeiro e que as variações decorrem exclusivamente do erro amostral dentro do estudo.\n• Efeitos Aleatórios: assume que o efeito real varia de estudo para estudo devido a diferenças de doses, populações e contextos. É o modelo mais realista e recomendado na imensa maioria das revisões sistemáticas em saúde.',
      },
      {
        title: 'Síntese sem Metanálise (SwiM)',
        content:
          'Quando a metanálise é inviável devido à alta heterogeneidade clínica ou dados insuficientes, realiza-se uma síntese qualitativa formal estruturada. Não se trata de um texto desorganizado: segue as diretrizes SwiM, agrupando estudos por tipos de intervenção, apresentando tabelas estruturadas e descrevendo direção e magnitude dos efeitos observados (Page et al., 2021a).',
      },
    ],
    dialogicQuestions: {
      oQueE:
        'A combinação e integração lógica ou estatística dos achados dos estudos primários para responder à pergunta da revisão.',
      paraQueServe:
        'Gera uma resposta consolidada sobre a direção, magnitude e consistência do efeito da intervenção ou exposição.',
      quandoUtilizar: 'Na fase final de análise, após extração e avaliação crítica concluídas.',
      comoAplicar:
        'Julgue primeiro a comparabilidade clínica; se adequada, selecione o software estatístico (RevMan, R); calcule tamanhos de efeito padronizados; gere o gráfico de floresta (forest plot); se inadequada, elabore síntese qualitativa conforme SwiM.',
      queDecisaoTomar:
        'Optar justificadamente entre metanálise estatística ou síntese sem metanálise.',
      queErrosEvitar:
        'Forçar uma metanálise de estudos com populações heterogêneas apenas para "ter um número no artigo"; interpretar I² isoladamente sem intervalo de confiança.',
      ondeConsultar: {
        title: 'Cochrane Handbook - Chapter 10: Analysing data and undertaking meta-analyses',
        url: 'https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current',
        citation: 'Cochrane (2024)',
      },
    },
    appliedExample: {
      context: 'Revisão com 4 estudos avaliando dor.',
      scenario:
        'Estudo 1 usou escala visual analógica (0-10 cm); Estudo 2 usou escala numérica (0-100 pontos); Estudos 3 e 4 usaram questionários multidimensionais com escalas ordinais distintas. Os pesquisadores utilizam a Diferença de Médias Padronizada (SMD - Hedges g) no modelo de efeitos aleatórios para unificar as escalas métricas.',
      analysis:
        'O uso de SMD permitiu a combinação matemática de instrumentos de mensuração clinicamente comparáveis que utilizavam réguas de pontuação diferentes.',
    },
    commonErrors: [
      {
        wrong: 'Realizar contagem de votos baseada exclusivamente em quais estudos deram p < 0,05.',
        why: 'Contagem de votos ignora o tamanho da amostra e a magnitude do efeito, penalizando estudos pequenos com grande benefício clínico.',
        correct:
          'Priorizar síntese de direção de efeito e estimativas de tamanho de efeito com intervalos de confiança.',
      },
      {
        wrong: 'Omitir a avaliação de heterogeneidade estatística ao publicar um forest plot.',
        why: 'Impede o leitor de saber se os estudos convergem ou se apontam resultados conflitantes.',
        correct:
          'Relatar e interpretar expressamente a estatística I², o valor de p do teste qui-quadrado e Tau².',
      },
    ],
    references: ['cochrane-2024', 'page-prisma-2020', 'page-prisma-ee-2021'],
  },
  {
    id: 9,
    slug: 'certeza-e-interpretacao',
    phaseNumber: 3,
    title: 'Módulo 9. Certeza e interpretação',
    subtitle:
      'Sistema GRADE, os 5 domínios de rebaixamento, relevância clínica e conclusões proporcionais',
    estimatedMinutes: 30,
    linkedLabId: 'j-casos',
    learningObjectives: [
      'Diferenciar taxativamente risco de viés em estudo individual da certeza das evidências no conjunto de estudos.',
      'Compreender os 5 fatores que podem rebaixar a certeza no sistema GRADE (Risco de viés, Inconsistência, Indireção, Imprecisão e Viés de publicação).',
      'Distinguir significância estatística (p < 0,05) de relevância clínica prática (Diferença Mínima Importante - MID).',
      'Formular conclusões proporcionais à certeza das evidências sem extrapolações abusivas.',
    ],
    conceptualBlocks: [
      {
        title: 'Risco de Viés ≠ Certeza das Evidências (GRADE)',
        content:
          'Um erro recorrente na pós-graduação é confundir a avaliação de risco de viés com a avaliação do GRADE. O risco de viés analisa a integridade metodológica de CADA estudo primário isolado. O sistema GRADE analisa a confiança no corpo conjunto de evidências para CADA DESFECHO específico de interesse na revisão (GRADE Working Group; Aromataris et al., 2024).',
      },
      {
        title: 'Os 5 Domínios de Rebaixamento do GRADE',
        content:
          'Para ensaios clínicos, a certeza inicia em ALTA e pode ser rebaixada por:\n1. Risco de Viés: grande proporção dos estudos com alto risco de viés.\n2. Inconsistência: heterogeneidade estatística ou clínica inexplicada entre os achados.\n3. Indireção: participantes, intervenções ou desfechos dos estudos diferem da pergunta clínica formulada.\n4. Imprecisão: poucos eventos, amostras pequenas ou intervalos de confiança amplos que cruzam a linha da nulidade e os limites de relevância clínica.\n5. Viés de Publicação: suspeita fundada de que estudos com achados nulos ou negativos não foram publicados.',
      },
      {
        title: 'Os 4 Níveis de Certeza da Evidência',
        content:
          '• Alta: extrema confiança de que o efeito real está muito próximo do efeito estimado.\n• Moderada: confiança moderada; é provável que o efeito real esteja próximo, mas há possibilidade substancial de ser diferente.\n• Baixa: confiança limitada; o efeito real pode ser substancialmente diferente do efeito estimado.\n• Muito Baixa: temos pouquíssima confiança na estimativa; o efeito real provavelmente é substancialmente diferente.',
      },
    ],
    dialogicQuestions: {
      oQueE:
        'O julgamento transparente do nível de confiança que a comunidade científica e tomadores de decisão podem depositar nas estimativas de efeito.',
      paraQueServe:
        'Permite que diretrizes clínicas e governos decidam sobre incorporação de tecnologias com base na solidez do conjunto probatório.',
      quandoUtilizar:
        'Na conclusão da síntese, para cada um dos desfechos críticos e importantes priorizados na revisão.',
      comoAplicar:
        'Crie uma Tabela de Sumário dos Achados (Summary of Findings - SoF Table) no GRADEpro; avalie os 5 domínios; defina a certeza final; redija as conclusões calibrando a força dos verbos ("a evidência demonstra" vs. "a evidência sugere" vs. "é incerto se").',
      queDecisaoTomar:
        'Rebaixar em 1 ou 2 níveis a certeza da evidência para cada domínio problemático justificado.',
      queErrosEvitar:
        'Afirmar que uma intervenção é plenamente eficaz quando a certeza da evidência no GRADE é Muito Baixa.',
      ondeConsultar: {
        title: 'GRADE Working Group handbook (GRADE book)',
        url: 'https://book.gradepro.org/',
        citation: 'GRADE Working Group',
      },
    },
    appliedExample: {
      context: 'Metanálise de 2 estudos com 45 pacientes sobre um novo fitoterápico.',
      scenario:
        'A metanálise mostra RR = 0,65 (IC 95%: 0,40 a 1,05; p = 0,08). A certeza GRADE foi classificada como Muito Baixa devido a sério risco de viés (falta de alocação sigilosa) e séria imprecisão (amostra diminuta e IC cruzando a linha do benefício e ausência de efeito).',
      analysis:
        'Conclusão proporcional: "A evidência sobre a eficácia do fitoterápico é muito incerta devido ao pequeno número de pacientes e limitações metodológicas dos estudos primários." Jamais concluir que a intervenção é inútil ou excelente.',
    },
    commonErrors: [
      {
        wrong: 'Confundir "ausência de evidência" com "evidência de ausência".',
        why: 'Quando um estudo não encontra diferença estatisticamente significante por falta de poder amostral, não significa que a intervenção não funciona.',
        correct:
          'Concluir que as evidências atuais são insuficientes para confirmar ou descartar benefício clínico.',
      },
      {
        wrong:
          'Rebaixar a certeza da evidência por imprecisão e também por amostra pequena como se fossem critérios separados.',
        why: 'No GRADE, a amostra pequena e o baixo número de eventos já são o motivo do rebaixamento no domínio Imprecisão; penalizar duas vezes gera distorção.',
        correct:
          'Aplicar o rebaixamento de forma parcimoniosa, fundamentando cada decisão nos manuais oficiais.',
      },
    ],
    references: ['grade-book', 'aromataris-2024', 'cochrane-2024', 'jbi-effectiveness-2024'],
  },
  {
    id: 10,
    slug: 'relato-conforme-prisma-2020',
    phaseNumber: 4,
    title: 'Módulo 10. Relato conforme PRISMA 2020',
    subtitle: 'Checklist de 27 itens, redação de métodos/resultados, fluxograma e extensões',
    estimatedMinutes: 35,
    linkedLabId: 'g-fluxograma',
    learningObjectives: [
      'Conhecer e auditar os 27 itens e respectivos subitens da Declaração PRISMA 2020.',
      'Redigir seções de Métodos e Resultados em estrita conformidade com a transparência científica exigida.',
      'Construir e interpretar o Fluxograma PRISMA 2020 em suas 4 variantes oficiais (v1/v2 para novas e atualizadas).',
      'Identificar as extensões PRISMA pertinentes ao contexto da revisão (PRISMA-P, PRISMA-S, PRISMA-C 2026, etc.).',
    ],
    conceptualBlocks: [
      {
        title: 'PRISMA 2020 é Diretriz de RELATO, não de Condução',
        content:
          'É fundamental consolidar o princípio inegociável: a Declaração PRISMA 2020 (Page et al., 2021a) não diz como você deve planejar ou conduzir sua pesquisa; ela determina COMO você deve RELATAR o que foi feito para garantir que revisores e leitores possam auditar os passos metodológicos. A condução metodológica se baseia nos manuais da Cochrane ou JBI.',
      },
      {
        title: 'A Estrutura dos 27 Itens do PRISMA 2020',
        content:
          'Os itens distribuem-se nas seções:\n• Título (Item 1): identificar como revisão sistemática.\n• Resumo (Item 2): resumo estruturado conforme PRISMA para resumos.\n• Introdução (Itens 3-4): justificativa e objetivos com pergunta explícita.\n• Métodos (Itens 5-15): elegibilidade, fontes de informação, estratégias de busca, seleção, extração, risco de viés, medidas de efeito, síntese e certeza.\n• Resultados (Itens 16-22): fluxo dos estudos, características, risco de viés, resultados de estudos individuais e sínteses.\n• Discussão (Item 23): interpretação, limitações do corpo de evidências e da revisão.\n• Outras informações (Itens 24-27): registro, financiamento, conflito de interesses e compartilhamento de dados.',
      },
      {
        title: 'O Fluxograma PRISMA 2020 e suas 4 Variantes',
        content:
          'O fluxograma ilustra o fluxo de registros desde a busca até a inclusão final. Existem 4 modelos Word oficiais:\n1. Revisões Novas - v1: apenas bases de dados e registros.\n2. Revisões Novas - v2: bases de dados/registros E outras fontes (websites, organizações, busca em citações).\n3. Revisões Atualizadas - v1: apenas bases e registros, integrando os estudos da versão anterior.\n4. Revisões Atualizadas - v2: bases/registros e outras fontes na atualização.',
      },
    ],
    dialogicQuestions: {
      oQueE:
        'A diretriz internacionalmente aceita para apresentação transparente, completa e auditável do relatório final de revisões sistemáticas.',
      paraQueServe:
        'Permite que leitores, clínicos, pareceristas e editores avaliem a validade e a aplicabilidade dos resultados.',
      quandoUtilizar:
        'Durante a redação do manuscrito final e na conferência de submissão a periódicos.',
      comoAplicar:
        'Utilize o checklist de 27 itens; anote a página e linha onde cada requisito é atendido; gere o fluxograma com o simulador (Lab G) mantendo contagens matematicamente consistentes; anexe o checklist como arquivo suplementar.',
      queDecisaoTomar:
        'Selecionar qual dos 4 modelos de fluxograma corresponde exatamente às fontes utilizadas na sua revisão.',
      queErrosEvitar:
        'Declarar que "seguiu o PRISMA" sem disponibilizar o checklist preenchido ou com o fluxograma contendo números inconsistentes.',
      ondeConsultar: {
        title: 'The PRISMA 2020 statement (Page et al., 2021a)',
        url: 'https://www.bmj.com/content/372/bmj.n71',
        citation: 'Page et al. (2021a)',
      },
    },
    appliedExample: {
      context: 'Submissão de artigo para periódico internacional.',
      scenario:
        'Os revisores do periódico solicitam o checklist PRISMA 2020 preenchido com localização precisa no manuscrito e a conferência do fluxograma. O autor utiliza a Auditoria PRISMA (Lab I) para gerar o relatório com 100% de conformidade documental.',
      analysis:
        'A transparência documental acelera o processo editorial e evita questionamentos sobre desvios metodológicos.',
    },
    commonErrors: [
      {
        wrong:
          'Apresentar um fluxograma em que a soma dos estudos excluídos não bate com os relatórios avaliados.',
        why: 'Inconsistência matemática no fluxograma é motivo comum de rejeição imediata em periódicos de alto impacto.',
        correct:
          'Utilizar mecanismos de validação matemática estrita em que: avaliados − excluídos = incluídos.',
      },
      {
        wrong: 'Omitir a declaração de registro do protocolo no resumo e no corpo do texto.',
        why: 'O PRISMA 2020 (Item 24) considera o registro prévio elemento indispensável de transparência.',
        correct:
          'Citar o número de registro (ex.: PROSPERO CRD42026XXXXXX) logo no início do método e no resumo.',
      },
    ],
    references: ['page-prisma-2020', 'page-prisma-ee-2021', 'prisma-flow-diagram', 'prisma-c-2026'],
  },
  {
    id: 11,
    slug: 'transparencia-e-integridade',
    phaseNumber: 4,
    title: 'Módulo 11. Transparência e integridade',
    subtitle: 'Desvios de protocolo, estratégias completas, ciência aberta e uso ético de IA',
    estimatedMinutes: 20,
    linkedLabId: 'i-auditoria',
    learningObjectives: [
      'Relatar formalmente quaisquer desvios metodológicos ocorridos durante a execução da revisão.',
      'Disponibilizar materiais suplementares completos (estratégias de busca, fichas de extração brutas, matrizes de risco de viés).',
      'Declarar de forma explícita fontes de financiamento e potenciais conflitos de interesse da equipe de autores.',
      'Declarar o uso responsável de ferramentas de inteligência artificial sem atribuir autoria a algoritmos.',
    ],
    conceptualBlocks: [
      {
        title: 'Desvios do Protocolo: Transparência acima da Perfeição',
        content:
          'É comum e esperado que imprevistos ocorram durante uma revisão sistemática (ex.: impossibilidade de contatar autores, necessidade de agrupar desfechos devido à heterogeneidade dos dados). O erro ético não é desviar, mas ocultar o desvio. Todos os ajustes metodológicos devem ser explicitados e justificados em seção específica do manuscrito (Page et al., 2021b).',
      },
      {
        title: 'Práticas de Ciência Aberta e Dados Abertos',
        content:
          'O compartilhamento das estratégias de busca completas (PRISMA-S), dados brutos extraídos (em repositórios como Zenodo, OSF ou Figshare) e scripts estatísticos (R ou RevMan) permite a auditoria independente e fortalece a reprodutibilidade da ciência em saúde.',
      },
      {
        title: 'Uso Ético e Responsável de Inteligência Artificial',
        content:
          'Ferramentas de IA (ex.: grandes modelos de linguagem ou classificadores automáticos de triagem) podem apoiar tarefas secundárias (revisão gramatical, organização de planilhas ou triagem piloto). No entanto, modelos de IA NUNCA podem ser listados como coautores de artigos acadêmicos (pois não possuem responsabilidade jurídica ou científica) e seu uso deve ser expressamente declarado nas seções de métodos do manuscrito.',
      },
    ],
    dialogicQuestions: {
      oQueE:
        'O compromisso ético e operacional com a fidedignidade, auditabilidade e reprodutibilidade de todas as etapas da revisão.',
      paraQueServe:
        'Protege a comunidade contra fraudes, manipulação de dados, conflitos de interesse ocultos e conclusões enviesadas.',
      quandoUtilizar:
        'Durante todo o ciclo da pesquisa e de modo especial na fase de submissão e publicação.',
      comoAplicar:
        'Descreva detalhadamente qualquer divergência entre o protocolo e a execução; deposite dados suplementares em repositório aberto; assine declarações de conflito de interesses; declare se alguma ferramenta de IA foi utilizada e para qual finalidade específica.',
      queDecisaoTomar:
        'Definir o repositório público ideal para arquivar materiais suplementares perenes com DOI.',
      queErrosEvitar:
        'Atribuir coautoria humana a ferramentas de IA generativa; esconder financiamento recebido da indústria cujos produtos estão sendo avaliados.',
      ondeConsultar: {
        title: 'PRISMA 2020 Explanation and Elaboration (Page et al., 2021b)',
        url: 'https://www.bmj.com/content/372/bmj.n160',
        citation: 'Page et al. (2021b)',
      },
    },
    appliedExample: {
      context: 'Declaração formal de uso de ferramenta de triagem automatizada.',
      scenario:
        'A equipe utilizou o recurso de classificação por aprendizado de máquina do Rayyan para ordenar os registros por plausibilidade antes da triagem humana. No método, declaram: "Utilizou-se a classificação preditiva do software Rayyan para ordenação preliminar; contudo, todos os 2.300 registros foram triados integralmente por dois revisores humanos independentes."',
      analysis:
        'A transparência preservou a credibilidade metodológica e esclareceu que nenhuma decisão final foi delegada de forma cega a algoritmos.',
    },
    commonErrors: [
      {
        wrong:
          'Omitir que um dos autores da revisão é consultor pago da empresa fabricante do medicamento em teste.',
        why: 'Grave violação de integridade científica que pode levar à retratação do artigo.',
        correct:
          'Declarar expressamente todas as relações de consultoria, bolsas e suporte financeiro recebidos.',
      },
      {
        wrong:
          'Disponibilizar a estratégia de busca apenas em formato de imagem ou texto truncado.',
        why: 'Impede que outro pesquisador copie e reproduza a busca para auditoria ou atualização.',
        correct:
          'Fornecer o texto completo e copiado de cada base no material suplementar conforme o PRISMA-S.',
      },
    ],
    references: ['page-prisma-ee-2021', 'rethlefsen-prisma-s-2021', 'page-prisma-2020'],
  },
  {
    id: 12,
    slug: 'redacao-e-divulgacao',
    phaseNumber: 4,
    title: 'Módulo 12. Redação e divulgação',
    subtitle:
      'Estruturação do manuscrito, limitações, implicações práticas e comunicação responsável',
    estimatedMinutes: 25,
    linkedLabId: 'j-casos',
    learningObjectives: [
      'Estruturar o manuscrito científico de modo coerente com a narrativa lógica da síntese de evidências.',
      'Redigir uma discussão crítica focada em limitações metodológicas e incertezas do corpo de estudos.',
      'Diferenciar implicações para a prática clínica de implicações para futuras pesquisas científicas.',
      'Formular conclusões proporcionais às evidências e planejar divulgação científica acessível e responsável.',
    ],
    conceptualBlocks: [
      {
        title: 'A Estrutura do Artigo de Revisão Sistemática',
        content:
          'O manuscrito segue a estrutura tradicional IMRAD (Introdução, Métodos, Resultados e Discussão). A introdução deve ser concisa, culminando na justificativa de por que a revisão foi necessária e na pergunta de pesquisa. A seção de métodos deve ser exaustiva e auditável. Os resultados devem apresentar primeiro o fluxo dos estudos (fluxograma), características dos estudos, risco de viés e os resultados por desfecho.',
      },
      {
        title: 'A Redação Crítica da Discussão',
        content:
          'A discussão não deve se limitar a repetir os números dos resultados. Deve confrontar os achados com a literatura prévia, explorar razões para discrepâncias entre ensaios, discutir as limitações do corpo de evidências (ex.: poucos pacientes, acompanhamento curto) e as limitações da própria revisão (ex.: literatura cinzenta não recuperada).',
      },
      {
        title: 'Divulgação Científica Responsável',
        content:
          'Ao comunicar os achados ao público leigo, redes sociais ou mídia em geral, nunca sensacionalize os resultados. Uma revisão sistemática que aponta benefício modesto com evidência de baixa certeza jamais deve ser noticiada como "Cura milagrosa descoberta por pesquisadores". A comunicação deve preservar as nuances, advertências e limitações da evidência original.',
      },
    ],
    dialogicQuestions: {
      oQueE:
        'A redação final do manuscrito e a disseminação planejada dos achados para a comunidade científica e para a sociedade.',
      paraQueServe:
        'Traduz meses de trabalho metodológico rigoroso em conhecimento acionável para aprimorar a saúde da população.',
      quandoUtilizar:
        'Na fase final do projeto e após a publicação do manuscrito revisado por pares.',
      comoAplicar:
        'Elabore a primeira versão com base no PRISMA 2020; submeta a periódicos indexados no escopo do tema; prepare resumos visuais (visual abstracts) e infográficos didáticos com linguagem simplificada para pacientes e profissionais de saúde.',
      queDecisaoTomar:
        'Definir o formato mais adequado de divulgação para tomadores de decisão (políticas públicas) vs. comunidade acadêmica.',
      queErrosEvitar:
        'Fazer recomendações clínicas prescritivas taxativas em revisões que apresentaram evidência incerta ou de baixa qualidade.',
      ondeConsultar: {
        title: 'PRISMA 2020 Explanation and Elaboration (Page et al., 2021b)',
        url: 'https://www.bmj.com/content/372/bmj.n160',
        citation: 'Page et al. (2021b)',
      },
    },
    appliedExample: {
      context: 'Publicação de revisão sistemática em revista médica de alto prestígio.',
      scenario:
        'A equipe prepara um resumo em linguagem simples (Plain Language Summary) e um infográfico visual das principais estimativas. Ao invés de manchete sensacionalista, divulgam: "Exercício físico supervisionado reduz moderadamente o risco de quedas em idosos, embora mais pesquisas sejam necessárias em idosos fragilizados."',
      analysis:
        'A divulgação responsável protegeu os pacientes contra falsas expectativas e valorizou a integridade científica da equipe.',
    },
    commonErrors: [
      {
        wrong:
          'Recomendar a adoção irrestrita de uma nova terapia em nível populacional quando todos os estudos eram pequenos e com risco de viés.',
        why: 'Extrapolação abusiva que pode colocar pacientes em risco e descredibilizar a prática baseada em evidências.',
        correct:
          'Calibrar as conclusões com a certeza do GRADE, indicando explicitamente que os achados são preliminares.',
      },
      {
        wrong: 'Omitir as limitações metodológicas da própria revisão na discussão final.',
        why: 'Transmite falsa impressão de perfeição metodológica e compromete a transparência científica exigida pelo PRISMA 2020.',
        correct:
          'Dedicar parágrafo honesto e específico para descrever as limitações operacionais da revisão conduzida.',
      },
    ],
    references: ['page-prisma-2020', 'page-prisma-ee-2021', 'cochrane-2024', 'silva-escopo-2026'],
  },
]
