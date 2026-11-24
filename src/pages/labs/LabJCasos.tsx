import { useState, useEffect } from 'react'
import {
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  RotateCcw,
  BookOpen,
  HelpCircle,
} from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getLabState, saveLabState, markLabCompleted } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Stage {
  stageId: number
  stageTitle: string
  contextText: string
  decisionQuestion: string
  options: {
    id: string
    text: string
    isCorrect: boolean
    feedback: string
  }[]
}

interface CaseScenario {
  id: string
  title: string
  modality: string
  overview: string
  stages: Stage[]
}

const CASE_SCENARIOS: CaseScenario[] = [
  {
    id: 'caso-telereab',
    title: 'Cenário 1: Efetividade da Telereabilitação na Dor Lombar Crônica',
    modality: 'Revisão Sistemática de Efetividade (PICO)',
    overview:
      'Acompanhe uma equipe de pesquisa desde a formulação da pergunta até o relato das conclusões proporcionais com GRADE.',
    stages: [
      {
        stageId: 1,
        stageTitle: 'Etapa 1: Estruturação PICO e Delineamento',
        contextText:
          'A equipe precisa formular a pergunta de pesquisa. Alguns membros sugerem incluir estudos observacionais transversais para "aumentar o número de artigos achados".',
        decisionQuestion:
          'Como o pesquisador sênior deve orientar a escolha do delineamento primário elegível?',
        options: [
          {
            id: 'a',
            text: 'Concordar e incluir transversais, pois mais artigos sempre tornam a revisão mais forte.',
            isCorrect: false,
            feedback:
              'Incorreto. Estudos transversais não medem causa e efeito nem têm acompanhamento temporal. Em efetividade de intervenções terapêuticas, ensaios clínicos randomizados (ECR) são padrão-ouro.',
          },
          {
            id: 'b',
            text: 'Restringir a elegibilidade a Ensaios Clínicos Randomizados (ECR), assegurando comparabilidade e minimização de viés de confusão.',
            isCorrect: true,
            feedback:
              'Correto! O JBI Manual for Evidence Synthesis (2024) e a Cochrane estabelecem que revisões de eficácia de intervenções devem priorizar ensaios randomizados para garantir validade interna.',
          },
        ],
      },
      {
        stageId: 2,
        stageTitle: 'Etapa 2: Avaliação de Risco de Viés',
        contextText:
          'Os artigos elegíveis foram recuperados. O assistente de pesquisa sugere usar a Escala de Jadad (0 a 5 pontos) para dar uma "nota geral de qualidade".',
        decisionQuestion: 'Qual é a conduta metodológica correta recomendada internacionalmente?',
        options: [
          {
            id: 'a',
            text: 'Adotar a ferramenta Cochrane RoB 2, avaliando domínios metodológicos específicos em vez de escores numéricos arbitrários.',
            isCorrect: true,
            feedback:
              'Correto! Cochrane e JBI desaprovam escalas de pontos sumárias (como Jadad), pois mascaram falhas metodológicas graves. A avaliação estruturada por domínios (RoB 2) é mandatória.',
          },
          {
            id: 'b',
            text: 'Usar Jadad porque é mais rápida e dá uma nota numérica fácil de publicar em gráficos.',
            isCorrect: false,
            feedback:
              'Incorreto. Escores numéricos foram formalmente abandonados na metodologia Cochrane desde 2008.',
          },
        ],
      },
      {
        stageId: 3,
        stageTitle: 'Etapa 3: Metanálise e Certeza das Evidências (GRADE)',
        contextText:
          'A metanálise mostra benefício estatisticamente significante (p = 0,03), mas a amostra total somada foi de apenas 65 pacientes e o intervalo de confiança é muito amplo.',
        decisionQuestion: 'Como calibrar a certeza no sistema GRADE e a conclusão final?',
        options: [
          {
            id: 'a',
            text: 'Declarar Alta certeza porque o valor de p foi menor que 0,05.',
            isCorrect: false,
            feedback:
              'Incorreto. Significância estatística não é sinônimo de certeza da evidência nem de relevância clínica. Amostras diminutas geram rebaixamento por Imprecisão grave.',
          },
          {
            id: 'b',
            text: 'Rebaixar a certeza para Baixa ou Muito Baixa no domínio Imprecisão, redigindo conclusões comedidas e proporcionais.',
            isCorrect: true,
            feedback:
              'Correto! No GRADE, um tamanho amostral pequeno associado a IC amplo que tangencia o limiar clínico exige rebaixamento por Imprecisão.',
          },
        ],
      },
    ],
  },
  {
    id: 'caso-prevalencia',
    title: 'Cenário 2: Prevalência de Sintomas Musculoesqueléticos em Enfermagem',
    modality: 'Revisão Sistemática de Prevalência (CoCoPop)',
    overview:
      'Percurso metodológico para síntese de proporções e frequências populacionais sem confundir com intervenção.',
    stages: [
      {
        stageId: 1,
        stageTitle: 'Etapa 1: Estrutura da Pergunta (CoCoPop)',
        contextText:
          'Um mestrando insiste em usar o acrônimo PICO para uma revisão de prevalência de dor em técnicos de enfermagem, buscando definir um "comparador".',
        decisionQuestion: 'Qual estrutura deve ser recomendada para esta revisão segundo o JBI?',
        options: [
          {
            id: 'a',
            text: 'Adotar CoCoPop (Condição, Contexto e População), dispensando intervenção e comparador.',
            isCorrect: true,
            feedback:
              'Correto! O JBI estipula o mnemônico CoCoPop para revisões de prevalência e incidência.',
          },
          {
            id: 'b',
            text: 'Forçar o PICO colocando "não usar EPI" como intervenção e "usar EPI" como controle.',
            isCorrect: false,
            feedback:
              'Incorreto. Isso transformaria artificialmente a revisão em um estudo de fatores de risco/etiologia, desvirtuando a pergunta original de prevalência.',
          },
        ],
      },
      {
        stageId: 2,
        stageTitle: 'Etapa 2: Síntese e Heterogeneidade Extrema',
        contextText:
          'Ao combinar 10 estudos transversais em metanálise de proporções, a heterogeneidade estatística atinge I² = 96% devido a diferentes definições de turno e tempo de dor.',
        decisionQuestion: 'Qual decisão metodológica de síntese deve ser adotada?',
        options: [
          {
            id: 'a',
            text: 'Apresentar a estimativa combinada global e ignorar o I².',
            isCorrect: false,
            feedback:
              'Incorreto. Combinar proporções com I² = 96% sem explorar causas clínicas produz um número médio que não reflete a realidade de nenhum hospital.',
          },
          {
            id: 'b',
            text: 'Investigar heterogeneidade por análises de subgrupo (ex: enfermeiros de UTI vs. enfermeiros de ambulatório) ou apresentar síntese sem metanálise.',
            isCorrect: true,
            feedback:
              'Correto! O Cochrane Handbook e o JBI recomendam fortemente investigar fontes clínicas e metodológicas de variação antes de interpretar qualquer metanálise.',
          },
        ],
      },
    ],
  },
  {
    id: 'caso-qualitativa',
    title: 'Cenário 3: Experiências de Cuidadores Familiares de Idosos Dependentes',
    modality: 'Revisão Sistemática Qualitativa / Metassíntese (PICo)',
    overview:
      'Percurso para síntese de significados, fenômenos vividos e aplicação de metodologias compreensivas.',
    stages: [
      {
        stageId: 1,
        stageTitle: 'Etapa 1: Delimitação e Ferramenta Crítica',
        contextText:
          'A equipe reuniu estudos fenomenológicos e etnográficos com transcrições de entrevistas em profundidade.',
        decisionQuestion: 'Qual ferramenta de avaliação crítica é recomendada pelo JBI?',
        options: [
          {
            id: 'a',
            text: 'JBI Critical Appraisal Checklist for Qualitative Research (10 itens de coerência filosófica e metodológica).',
            isCorrect: true,
            feedback:
              'Correto! O checklist qualitativo do JBI avalia congruência metodológica, posição do pesquisador e representação ética das vozes dos participantes.',
          },
          {
            id: 'b',
            text: 'Cochrane RoB 2 para ensaios clínicos.',
            isCorrect: false,
            feedback:
              'Incorreto. RoB 2 é exclusivo para ensaios clínicos randomizados; não tem qualquer aplicabilidade em pesquisa qualitativa.',
          },
        ],
      },
    ],
  },
]

export default function LabJCasos() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CASE_SCENARIOS[0].id)
  const [userChoices, setUserChoices] = useState<Record<string, Record<number, string>>>(() =>
    getLabState('lab_j_choices', {}),
  )

  const activeCase = CASE_SCENARIOS.find((c) => c.id === selectedCaseId) || CASE_SCENARIOS[0]
  const currentCaseChoices = userChoices[activeCase.id] || {}

  useEffect(() => {
    saveLabState('lab_j_choices', userChoices)
    // Check if at least scenario 1 is finished
    if (Object.keys(userChoices['caso-telereab'] || {}).length >= 3) {
      markLabCompleted('j-casos')
    }
  }, [userChoices])

  const handleSelectOption = (stageId: number, optId: string) => {
    setUserChoices((prev) => ({
      ...prev,
      [activeCase.id]: {
        ...(prev[activeCase.id] || {}),
        [stageId]: optId,
      },
    }))
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Laboratórios', to: '/laboratorios' },
          { label: 'Laboratório J — Casos Integradores' },
        ]}
      />

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
            J
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Casos Integradores Progressivos
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Acompanhe 3 cenários clínicos e epidemiológicos realistas da pergunta ao relato final:
          Efetividade (telereabilitação), Prevalência (enfermagem) e Metassíntese qualitativa
          (cuidadores).
        </p>
      </div>

      {/* SELECTOR DE CASOS */}
      <div className="grid sm:grid-cols-3 gap-3">
        {CASE_SCENARIOS.map((cs) => {
          const isSelected = selectedCaseId === cs.id
          const choices = userChoices[cs.id] || {}
          const isDone = Object.keys(choices).length >= cs.stages.length

          return (
            <button
              key={cs.id}
              type="button"
              onClick={() => setSelectedCaseId(cs.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60 ring-2 ring-indigo-500 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <Badge variant="outline" className="text-[10px]">
                  {cs.modality.split(' ')[0]}
                </Badge>
                {isDone && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                {cs.title}
              </h3>
            </button>
          )
        })}
      </div>

      {/* DETALHE DO CASO ATIVO */}
      <Card className="border-indigo-300 dark:border-indigo-900 bg-indigo-50/40 dark:bg-indigo-950/20 shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div>
            <Badge className="bg-indigo-600 text-white text-[10px] mb-2">
              {activeCase.modality}
            </Badge>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{activeCase.title}</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              {activeCase.overview}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ETAPAS PROGRESSIVAS */}
      <div className="space-y-6">
        {activeCase.stages.map((st, idx) => {
          const selected = currentCaseChoices[st.stageId]
          const chosenOpt = st.options.find((o) => o.id === selected)

          return (
            <Card
              key={st.stageId}
              className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 border-b pb-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    {st.stageTitle}
                  </h3>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white uppercase text-[10px] tracking-wider block">
                    Situação Metodológica da Equipe:
                  </span>
                  <p>{st.contextText}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {st.decisionQuestion}
                  </h4>

                  <div className="space-y-2">
                    {st.options.map((opt) => {
                      const isOptSelected = selected === opt.id

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectOption(st.stageId, opt.id)}
                          className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all ${
                            isOptSelected
                              ? opt.isCorrect
                                ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/60 ring-1 ring-emerald-500'
                                : 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/60 ring-1 ring-rose-500'
                              : 'border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="font-bold uppercase shrink-0 mt-0.5">({opt.id})</span>
                            <span>{opt.text}</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {chosenOpt && (
                  <div
                    className={`p-3.5 rounded-lg border text-xs leading-relaxed space-y-1 ${
                      chosenOpt.isCorrect
                        ? 'border-emerald-300 bg-emerald-50/80 dark:border-emerald-900 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200'
                        : 'border-rose-300 bg-rose-50/80 dark:border-rose-900 dark:bg-rose-950 text-rose-900 dark:text-rose-200'
                    }`}
                  >
                    <span className="font-bold block uppercase tracking-wider text-[11px]">
                      {chosenOpt.isCorrect
                        ? 'Decisão Metodologicamente Fundamentada'
                        : 'Equívoco Identificado'}
                    </span>
                    <p>{chosenOpt.feedback}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
