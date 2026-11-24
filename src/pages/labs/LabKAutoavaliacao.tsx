import { useState, useEffect } from 'react'
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Sparkles, BookOpen } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getLabState, saveLabState, markLabCompleted } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ExamQuestion {
  id: number
  theme: string
  difficulty: 'Média' | 'Alta'
  question: string
  options: {
    id: string
    text: string
    isCorrect: boolean
    feedback: string
  }[]
}

const HIGH_COMPLEXITY_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    theme: 'Unidades do Fluxograma PRISMA 2020',
    difficulty: 'Alta',
    question:
      'Uma equipe de pós-graduação concluiu uma revisão sistemática e identificou 4 artigos científicos de alta qualidade que reportavam diferentes desfechos (em 1 ano, 2 anos e subgrupo genético) de um mesmo ensaio clínico multicêntrico conduzido com 500 pacientes. Como esses números devem ser registrados no fluxograma PRISMA 2020 e na metanálise?',
    options: [
      {
        id: 'a',
        text: 'Devem ser registrados como 4 estudos únicos incluídos e 4 relatórios, somando 2.000 pacientes na metanálise.',
        isCorrect: false,
        feedback:
          'Incorreto e grave! Somar 4 vezes os mesmos 500 pacientes (dupla contagem) quadruplica artificialmente o peso amostral na metanálise e falseia os intervalos de confiança.',
      },
      {
        id: 'b',
        text: 'Devem ser registrados como 1 estudo único incluído representado por 4 relatórios; na metanálise, a amostra real de 500 pacientes é considerada uma única vez.',
        isCorrect: true,
        feedback:
          'Correto! Page et al. (2021b) estabelecem a distinção entre estudo (a investigação) e relatório (os artigos). O PRISMA 2020 reporta explicitamente: "1 estudo incluído (4 relatórios correspondentes)".',
      },
      {
        id: 'c',
        text: 'Três artigos devem ser descartados como duplicatas na busca inicial e apenas o mais recente mantido.',
        isCorrect: false,
        feedback:
          'Incorreto. Publicações secundárias de um estudo não são duplicatas eletrônicas de busca; elas contêm dados legítimos de desfechos complementares e devem ser vinculadas ao estudo.',
      },
    ],
  },
  {
    id: 2,
    theme: 'Estatística I² vs. Heterogeneidade Clínica',
    difficulty: 'Alta',
    question:
      'Um revisor observa que a estatística I² em uma metanálise de 5 estudos foi de 0% (p = 0,65). No entanto, um estudo incluiu recém-nascidos prematuros em UTI e os outros quatro incluíram idosos comunitários com osteoartrite. É metodologicamente apropriado sintetizar esses estudos em uma metanálise única com base no I² baixo?',
    options: [
      {
        id: 'a',
        text: 'Sim, porque I² = 0% prova matematicamente que não há qualquer heterogeneidade.',
        isCorrect: false,
        feedback:
          'Incorreto. O I² mede apenas heterogeneidade estatística (variabilidade maior que o acaso). Ele é cego à incoerência clínica. Juntar prematuros e idosos é o exemplo clássico de "misturar maçãs e laranjas" reprovado pela Cochrane.',
      },
      {
        id: 'b',
        text: 'Não, porque a heterogeneidade clínica é gritante. A comparabilidade clínica precede e condiciona a validade de qualquer cálculo estatístico.',
        isCorrect: true,
        feedback:
          'Correto! O Cochrane Handbook (2024, cap. 10) orienta taxativamente que a semelhança clínica e biológica é pré-requisito indispensável antes de rodar qualquer síntese quantitativa.',
      },
    ],
  },
  {
    id: 3,
    theme: 'Avaliação de Viés vs. Certeza GRADE',
    difficulty: 'Alta',
    question:
      'Três ensaios clínicos randomizados foram avaliados pelo RoB 2 e todos receberam a classificação de "Baixo Risco de Viés" em todos os 5 domínios. A conclusão automática da revisão deve ser que a evidência tem "Alta Certeza" no GRADE?',
    options: [
      {
        id: 'a',
        text: 'Não necessariamente. O risco de viés é apenas 1 dos 5 domínios do GRADE; a certeza pode ser rebaixada por imprecisão, inconsistência, indireção ou viés de publicação.',
        isCorrect: true,
        feedback:
          'Correto! O GRADE Working Group alerta que estudos de alta validade interna individual podem sofrer rebaixamento se o número total de eventos for pequeno (imprecisão) ou se a população diferir do foco (indireção).',
      },
      {
        id: 'b',
        text: 'Sim, porque o RoB 2 e o GRADE são sinônimos.',
        isCorrect: false,
        feedback:
          'Incorreto. RoB 2 avalia a validade de cada estudo primário. O GRADE avalia a confiança no corpo conjunto de evidências para determinado desfecho.',
      },
    ],
  },
  {
    id: 4,
    theme: 'PRISMA 2020: Função Metodológica',
    difficulty: 'Média',
    question:
      'Em uma qualificação de mestrado, o aluno afirma: "Minha revisão sistemática foi conduzida estritamente segundo a metodologia do PRISMA 2020". O parecerista da banca deve:',
    options: [
      {
        id: 'a',
        text: 'Elogiar o aluno, pois o PRISMA 2020 é o manual metodológico mais abrangente de condução de pesquisas.',
        isCorrect: false,
        feedback:
          'Incorreto. O PRISMA 2020 é uma diretriz de RELATO científico transparente. Não ensina como conduzir buscas, extrair ou sintetizar evidências.',
      },
      {
        id: 'b',
        text: 'Corrigir o aluno, esclarecendo que o PRISMA 2020 é uma diretriz de relato científico, enquanto a condução metodológica deve se apoiar em manuais como JBI ou Cochrane.',
        isCorrect: true,
        feedback:
          'Correto! Princípio inegociável da prática baseada em evidências: conduzir com JBI/Cochrane; relatar com PRISMA 2020.',
      },
    ],
  },
]

export default function LabKAutoavaliacao() {
  const [answers, setAnswers] = useState<Record<number, string>>(() =>
    getLabState('lab_k_answers', {}),
  )

  useEffect(() => {
    saveLabState('lab_k_answers', answers)
    if (Object.keys(answers).length >= HIGH_COMPLEXITY_QUESTIONS.length) {
      markLabCompleted('k-autoavaliacao')
    }
  }, [answers])

  const handleSelect = (qId: number, optId: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: optId }))
  }

  const handleReset = () => {
    setAnswers({})
  }

  const answeredCount = Object.keys(answers).length
  const correctCount = HIGH_COMPLEXITY_QUESTIONS.filter((q) => {
    const chosen = answers[q.id]
    const opt = q.options.find((o) => o.id === chosen)
    return opt?.isCorrect
  }).length

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Laboratórios', to: '/laboratorios' },
          { label: 'Laboratório K — Autoavaliação de Alta Complexidade' },
        ]}
      />

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
            K
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Autoavaliação de Alta Complexidade
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Questões com situações-problema desafiadoras e distratores metodologicamente plausíveis.
          Receba feedback detalhado justificando cada alternativa escolhida com base na literatura
          científica.
        </p>
      </div>

      {/* PLACAR */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div>
          <span className="font-semibold text-slate-500">Seu Desempenho:</span>{' '}
          <strong className="text-slate-900 dark:text-white text-sm">
            {correctCount} de {HIGH_COMPLEXITY_QUESTIONS.length} acertos
          </strong>{' '}
          ({answeredCount} de {HIGH_COMPLEXITY_QUESTIONS.length} respondidas)
        </div>

        {answeredCount > 0 && (
          <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs gap-1">
            <RotateCcw className="h-3 w-3" /> Reiniciar Simulado
          </Button>
        )}
      </div>

      {/* LISTA DE QUESTÕES */}
      <div className="space-y-6">
        {HIGH_COMPLEXITY_QUESTIONS.map((q, idx) => {
          const chosenOptId = answers[q.id]
          const chosenOpt = q.options.find((o) => o.id === chosenOptId)

          return (
            <Card
              key={q.id}
              className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-400">
                      Questão {idx + 1}
                    </span>
                    <Badge variant="outline" className="text-[10px]">
                      {q.theme}
                    </Badge>
                  </div>
                  <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 text-[10px]">
                    Complexidade {q.difficulty}
                  </Badge>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                  {q.question}
                </p>

                <div className="space-y-2 pt-1">
                  {q.options.map((opt) => {
                    const isSelected = chosenOptId === opt.id

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelect(q.id, opt.id)}
                        className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all ${
                          isSelected
                            ? opt.isCorrect
                              ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/60 ring-1 ring-emerald-500 text-emerald-950 dark:text-emerald-200'
                              : 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/60 ring-1 ring-rose-500 text-rose-950 dark:text-rose-200'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
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

                {/* FEEDBACK EXPLICATIVO */}
                {chosenOpt && (
                  <div
                    className={`p-3.5 rounded-lg border text-xs leading-relaxed space-y-1 ${
                      chosenOpt.isCorrect
                        ? 'border-emerald-300 bg-emerald-50/80 dark:border-emerald-900 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200'
                        : 'border-rose-300 bg-rose-50/80 dark:border-rose-900 dark:bg-rose-950 text-rose-900 dark:text-rose-200'
                    }`}
                  >
                    <span className="font-bold block uppercase tracking-wider text-[11px]">
                      {chosenOpt.isCorrect ? 'Resposta Correta' : 'Alternativa Incorreta'}
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
