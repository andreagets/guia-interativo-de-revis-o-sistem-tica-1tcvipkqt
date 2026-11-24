import { useState, useEffect } from 'react'
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Info,
} from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getLabState, saveLabState, markLabCompleted } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface AppraisalCase {
  id: number
  title: string
  design: string
  tool: string
  toolUrl: string
  scenario: string
  questionText: string
  options: {
    id: string
    text: string
    isCorrect: boolean
    feedback: string
  }[]
}

const APPRAISAL_CASES: AppraisalCase[] = [
  {
    id: 1,
    title: 'Caso 1: Ocultação da Alocação em ECR (Cochrane RoB 2 - Domínio 1)',
    design: 'Ensaio Clínico Randomizado',
    tool: 'Cochrane RoB 2 (Domínio 1: Processo de Randomização)',
    toolUrl:
      'https://methods.cochrane.org/bias/resources/rob-2-revised-cochrane-risk-bias-tool-randomized-trials',
    scenario:
      'Um ensaio clínico de fisioterapia relata que "os participantes foram randomizados por uma lista gerada por computador". No entanto, o artigo não menciona envelopes selados opacos, alocação centralizada ou sistema web sigiloso. O pesquisador que recrutava os participantes tinha acesso livre à folha impressa de alocação na recepção do ambulatório.',
    questionText:
      'Qual deve ser o julgamento metodológico para o Domínio 1 (Processo de Randomização) segundo o RoB 2?',
    options: [
      {
        id: 'a',
        text: 'Baixo risco de viés, pois a sequência foi gerada por computador.',
        isCorrect: false,
        feedback:
          'Incorreto. A geração da sequência é apenas a primeira metade do domínio. Se quem recruta sabe previamente qual será o próximo grupo (falha de ocultação da alocação), pode direcionar pacientes mais graves para determinado braço, gerando viés de seleção grave.',
      },
      {
        id: 'b',
        text: 'Algumas preocupações (Some concerns) ou Alto risco de viés, devido à ausência de sigilo/ocultação da alocação.',
        isCorrect: true,
        feedback:
          'Correto! O RoB 2 estabelece expressamente que uma sequência randômica sem ocultação da alocação confiável compromete a integridade do processo de alocação, exigindo classificação de alto risco de viés ou preocupações substanciais.',
      },
      {
        id: 'c',
        text: 'Não aplicável, pois estudos de fisioterapia não precisam de alocação sigilosa.',
        isCorrect: false,
        feedback:
          'Incorreto. A ocultação da alocação (allocation concealment) é estritamente viável e mandatória em qualquer ensaio clínico randomizado, independentemente de a intervenção ser farmacológica ou comportamental.',
      },
    ],
  },
  {
    id: 2,
    title:
      'Caso 2: Ausência de Cegamento em Intervenção Não Farmacológica (Cochrane RoB 2 - Domínio 2)',
    design: 'Ensaio Clínico Randomizado',
    tool: 'Cochrane RoB 2 (Domínio 2: Desvios das Intervenções Pretendidas)',
    toolUrl:
      'https://methods.cochrane.org/bias/resources/rob-2-revised-cochrane-risk-bias-tool-randomized-trials',
    scenario:
      'Em um estudo de telereabilitação motora versus cuidados habituais, terapeutas e pacientes não eram cegos (impossibilidade inerente ao tipo de exercício). Contudo, o protocolo foi rigorosamente cumprido sem desvios, cointervenções não foram permitidas e a análise foi por intenção de tratar.',
    questionText:
      'Como avaliar o risco de viés decorrente da falta de cegamento dos participantes neste contexto?',
    options: [
      {
        id: 'a',
        text: 'Classificar automaticamente como Alto Risco de Viés em todos os domínios porque o estudo não foi duplo-cego.',
        isCorrect: false,
        feedback:
          'Incorreto. O RoB 2 proíbe o rebaixamento automático e cego. Deve-se avaliar se a falta de cegamento motivou desvios não usuais do protocolo ou contaminação entre os grupos.',
      },
      {
        id: 'b',
        text: 'Baixo Risco de Viés para este domínio se não houve desvios substanciais da intervenção pretendida.',
        isCorrect: true,
        feedback:
          'Correto! O RoB 2 reconhece que o não cegamento dos pacientes é inevitável em certas intervenções; se o protocolo foi seguido e não houve cointervenções diferenciais entre os grupos, o julgamento pode ser de baixo risco de viés.',
      },
      {
        id: 'c',
        text: 'Excluir o estudo da revisão imediatamente.',
        isCorrect: false,
        feedback:
          'Incorreto. Estudos não cegos de intervenções físicas não devem ser descartados a priori, sob risco de inviabilizar toda a síntese na área.',
      },
    ],
  },
  {
    id: 3,
    title: 'Caso 3: Checklist JBI para Estudos de Prevalência (Representatividade)',
    design: 'Estudo Observacional Transversal',
    tool: 'JBI Critical Appraisal Checklist for Prevalence Studies',
    toolUrl: 'https://jbi.global/critical-appraisal-tools',
    scenario:
      'Um estudo avaliou a prevalência de cefaleia em trabalhadores industriais. A amostra foi recrutada por convite voluntário no refeitório da fábrica durante 3 dias. Apenas 15% dos trabalhadores participaram.',
    questionText:
      'No Checklist do JBI, como pontuar o item 1: "O quadro amostral foi apropriado para a população-alvo?"',
    options: [
      {
        id: 'a',
        text: 'Sim, porque qualquer trabalhador da fábrica podia comparecer ao refeitório.',
        isCorrect: false,
        feedback:
          'Incorreto. Amostragem por voluntariado e conveniência no refeitório com baixa adesão gera viés do trabalhador sadio ou viés de autosseleção.',
      },
      {
        id: 'b',
        text: 'Não / Pouco claro, pois a amostragem foi por conveniência e com baixa taxa de resposta, comprometendo a representatividade.',
        isCorrect: true,
        feedback:
          'Correto! O JBI exige que o quadro amostral cubra adequadamente a população-alvo sem sobre-representar voluntários com características peculiares.',
      },
      {
        id: 'c',
        text: 'Atribuir nota 7 de 10 na pontuação geral.',
        isCorrect: false,
        feedback:
          'Incorreto. O JBI desaprova escores numéricos agregados de qualidade; a avaliação deve analisar criticamente item a item.',
      },
    ],
  },
  {
    id: 4,
    title: 'Caso 4: Medição do Desfecho - Dor Subjetiva vs. Avaliador Cego (RoB 2 - Domínio 4)',
    design: 'Ensaio Clínico Randomizado',
    tool: 'Cochrane RoB 2 (Domínio 4: Medição do Desfecho)',
    toolUrl:
      'https://methods.cochrane.org/bias/resources/rob-2-revised-cochrane-risk-bias-tool-randomized-trials',
    scenario:
      'O desfecho de dor foi auto-relatado pelo paciente (Escala Visual Analógica - EVA). Como os pacientes sabiam a qual grupo pertenciam (sabiam que estavam no grupo telereabilitação inovadora), pode haver expectativa de melhora subjetiva.',
    questionText:
      'Qual é o impacto provável da ausência de cegamento quando o desfecho é subjetivo auto-relatado?',
    options: [
      {
        id: 'a',
        text: 'Nenhum impacto, pois a dor relatada pelo paciente é sempre imune a viés.',
        isCorrect: false,
        feedback:
          'Incorreto. Desfechos subjetivos (como dor, fadiga e qualidade de vida) são altamente suscetíveis a expectativas psicológicas e viés de resposta quando o participante não é cego.',
      },
      {
        id: 'b',
        text: 'Pode justificar "Algumas preocupações" no Domínio 4 do RoB 2, devendo ser documentado na justificativa.',
        isCorrect: true,
        feedback:
          'Correto! No RoB 2, a mensuração de desfechos subjetivos por avaliadores (ou pacientes) não cegos exige ponderação crítica do risco de superestimação do efeito.',
      },
    ],
  },
  {
    id: 5,
    title: 'Caso 5: Conflito de Interesses e Patrocínio da Indústria em Estudos Primários',
    design: 'Ensaio Clínico Randomizado Farmacológico',
    tool: 'Cochrane Handbook - Chapter 7 (Funding bias)',
    toolUrl: 'https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current',
    scenario:
      'Um ensaio clínico de um novo medicamento biológico foi 100% financiado pelo laboratório fabricante, e a análise estatística foi realizada diretamente pela equipe da indústria.',
    questionText: 'Onde e como essa limitação deve ser tratada na revisão sistemática?',
    options: [
      {
        id: 'a',
        text: 'Não deve ser mencionada, pois o RoB 2 não possui um domínio específico chamado "patrocínio".',
        isCorrect: false,
        feedback:
          'Incorreto. Embora o RoB 2 se concentre em domínios metodológicos específicos (randomização, atrito, desfecho), a Cochrane recomenda que fontes de financiamento sejam extraídas e investigadas em análises de subgrupo ou sensibilidade.',
      },
      {
        id: 'b',
        text: 'Deve ser registrada na tabela de características dos estudos e avaliada em análises de sensibilidade para verificar se os estudos patrocinados mostram efeitos maiores.',
        isCorrect: true,
        feedback:
          'Correto! A transparência sobre o financiamento é exigida pelo PRISMA 2020 e permite avaliar se há viés de patrocínio corporativo distorcendo os achados.',
      },
    ],
  },
  {
    id: 6,
    title: 'Caso 6: Limites de Classificações Automatizadas por Inteligência Artificial',
    design: 'Ferramentas de IA em Revisão Sistemática',
    tool: 'Cochrane & PRISMA 2020 Ethics',
    toolUrl: 'https://synthesismanual.jbi.global',
    scenario:
      'Um pesquisador usou uma ferramenta de inteligência artificial generativa comercial para avaliar o risco de viés de 30 artigos. A IA classificou todos os 30 como "Baixo Risco de Viés" em 10 segundos, sem fornecer citações exatas dos trechos dos artigos.',
    questionText:
      'Por que essa abordagem é metodologicamente inaceitável em uma revisão sistemática?',
    options: [
      {
        id: 'a',
        text: 'Porque ferramentas automatizadas não têm responsabilidade jurídica nem capacidade de auditar nuances contextuais sem conferência humana minuciosa.',
        isCorrect: true,
        feedback:
          'Correto! As diretrizes científicas atuais determinam que julgamentos de risco de viés exigem fundamentação textual documental verificável por humanos. A IA pode ser usada como apoio auxiliar preliminar, mas nunca substituir a avaliação crítica independente em pares.',
      },
      {
        id: 'b',
        text: 'Porque a inteligência artificial só pode ser utilizada se pagar licença acadêmica.',
        isCorrect: false,
        feedback:
          'Incorreto. A limitação é de natureza metodológica e de integridade científica, não comercial.',
      },
    ],
  },
]

export default function LabFAvaliacao() {
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>(() =>
    getLabState('lab_f_answers', {}),
  )

  useEffect(() => {
    saveLabState('lab_f_answers', userAnswers)
    if (Object.keys(userAnswers).length >= APPRAISAL_CASES.length) {
      markLabCompleted('f-avaliacao')
    }
  }, [userAnswers])

  const handleSelectOption = (caseId: number, optId: string) => {
    setUserAnswers((prev) => ({ ...prev, [caseId]: optId }))
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Laboratórios', to: '/laboratorios' },
          { label: 'Laboratório F — Avaliação Crítica' },
        ]}
      />

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center text-sm">
            F
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Avaliação Crítica e Risco de Viés
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Analise 6 casos fictícios metodologicamente plausíveis envolvendo os domínios do Cochrane
          RoB 2, checklists do JBI e limites de ferramentas automatizadas. Cada julgamento apresenta
          feedback fundamentado por alternativa.
        </p>
      </div>

      {/* AVISO METODOLÓGICO OBRIGATÓRIO */}
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
        <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold uppercase tracking-wider block">
            Aviso: Exercícios Didáticos não Substituem os Instrumentos Oficiais
          </span>
          <p className="mt-0.5">
            Estes casos destinam-se ao desenvolvimento do raciocínio crítico em cenários comuns. Em
            revisões sistemáticas reais, você deve baixar e preencher na íntegra as ferramentas
            oficiais disponíveis nas páginas da Cochrane (RoB 2) e do JBI (Critical Appraisal
            Tools).
          </p>
        </div>
      </div>

      {/* CASOS DE AVALIAÇÃO CRÍTICA */}
      <div className="space-y-6">
        {APPRAISAL_CASES.map((cs) => {
          const selected = userAnswers[cs.id]
          const chosenOpt = cs.options.find((o) => o.id === selected)

          return (
            <Card
              key={cs.id}
              className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {cs.title}
                  </span>
                  <a
                    href={cs.toolUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-sky-600 hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    Consultar instrumento oficial <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Cenário do Estudo Primário:
                  </span>
                  <p>{cs.scenario}</p>
                </div>

                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-2">
                    {cs.questionText}
                  </h3>

                  <div className="space-y-2">
                    {cs.options.map((opt) => {
                      const isThisSelected = selected === opt.id

                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectOption(cs.id, opt.id)}
                          className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all ${
                            isThisSelected
                              ? opt.isCorrect
                                ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-500'
                                : 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 ring-1 ring-rose-500'
                              : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
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

                {/* FEEDBACK EXPLICATIVO PARA A ALTERNATIVA ESCOLHIDA */}
                {chosenOpt && (
                  <div
                    className={`p-3.5 rounded-lg border text-xs leading-relaxed space-y-1 animate-in fade-in duration-200 ${
                      chosenOpt.isCorrect
                        ? 'border-emerald-300 bg-emerald-50/80 dark:border-emerald-900 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200'
                        : 'border-rose-300 bg-rose-50/80 dark:border-rose-900 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                      {chosenOpt.isCorrect ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          <span>Julgamento Metodológico Fundamentado</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-rose-600" />
                          <span>Equívoco Metodológico Identificado</span>
                        </>
                      )}
                    </div>
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
