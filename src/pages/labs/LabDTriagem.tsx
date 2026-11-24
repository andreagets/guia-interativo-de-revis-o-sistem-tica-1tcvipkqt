import { useState, useEffect } from 'react'
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Layers,
  AlertCircle,
} from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getLabState, saveLabState, markLabCompleted } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

interface FictionalStudy {
  id: number
  title: string
  authors: string
  year: number
  journal: string
  abstractSnippet: string
  designHint: string
  targetDecision: 'incluir' | 'excluir' | 'duvida'
  recommendedReason?: string
  adjudicationFeedback: string
}

const FICTIONAL_STUDIES: FictionalStudy[] = [
  {
    id: 1,
    title:
      'Telereabilitação domiciliar síncrona versus fisioterapia convencional em adultos com dor lombar crônica: ensaio clínico randomizado controlado',
    authors: 'Santos, M. A. et al.',
    year: 2023,
    journal: 'Journal of Physiotherapy',
    abstractSnippet:
      'Ensaio clínico randomizado com 140 adultos (idade 18-65 anos) com dor lombar inespecífica há mais de 12 semanas. Grupo intervenção recebeu 12 semanas de sessões síncronas de exercícios por videoconferência com fisioterapeuta; grupo controle recebeu fisioterapia convencional presencial. Desfecho primário: EVA e Roland-Morris aos 3 e 6 meses.',
    designHint:
      'Ensaio Clínico Randomizado (ECR) · Intervenção e comparador claros · Desfechos adequados.',
    targetDecision: 'incluir',
    adjudicationFeedback:
      'Decisão correta: INCLUIR. O estudo preenche perfeitamente os critérios PICO da revisão de efetividade (população adulta com dor crônica, intervenção de telereabilitação síncrona, comparador ativo presencial e desenho de ECR).',
  },
  {
    id: 2,
    title:
      'Prevalência de sintomas musculoesqueléticos e fatores associados em profissionais de enfermagem de um hospital universitário: estudo transversal',
    authors: 'Oliveira, R. C. et al.',
    year: 2022,
    journal: 'Revista Latino-Americana de Enfermagem',
    abstractSnippet:
      'Estudo epidemiológico transversal com 320 técnicos e enfermeiros. Avaliou a prevalência de dor lombar e cervical utilizando o Questionário Nórdico de Sintomas Osteomusculares. Não houve aplicação de intervenção terapêutica.',
    designHint: 'Estudo Transversal Observacional · Não avalia intervenção · Foco em prevalência.',
    targetDecision: 'excluir',
    recommendedReason:
      'Delineamento não elegível para revisão de efetividade (estudo observacional sem intervenção)',
    adjudicationFeedback:
      'Decisão correta: EXCLUIR para revisão de efetividade de telereabilitação (delineamento transversal sem intervenção nem comparador). Caso fosse uma revisão de prevalência, seria elegível.',
  },
  {
    id: 3,
    title:
      'Eficácia de aplicativo de smartphone com lembretes diários para dor lombar aguda: ensaio piloto não cego',
    authors: 'Chen, L. & Zhang, Y.',
    year: 2024,
    journal: 'Digital Health',
    abstractSnippet:
      'Investigou 45 pacientes com dor lombar de início recente (< 4 semanas) que receberam mensagens automatizadas por aplicativo sem supervisão de profissional. Grupo controle recebeu folheto educativo.',
    designHint:
      'Dor AGUDA (< 4 semanas) · Sem telereabilitação supervisionada · População pediátrica/adulta mista.',
    targetDecision: 'excluir',
    recommendedReason:
      'População não elegível (dor aguda < 4 semanas; critério exige dor crônica ≥ 12 semanas)',
    adjudicationFeedback:
      'Decisão correta: EXCLUIR. A população estudada tem dor lombar AGUDA (< 4 semanas), violando o critério estrito de dor CRÔNICA (≥ 12 semanas) estipulado no protocolo.',
  },
  {
    id: 4,
    title:
      'Experiências e percepções de cuidadores familiares no suporte a pacientes com incapacidade crônica: metassíntese qualitativa',
    authors: 'Pereira, T. S. et al.',
    year: 2021,
    journal: 'Qualitative Health Research',
    abstractSnippet:
      'Revisão com síntese temática de 18 estudos qualitativos explorando a sobrecarga emocional e barreiras de acesso aos serviços de reabilitação física.',
    designHint: 'Revisão da literatura secundária · Abordagem qualitativa.',
    targetDecision: 'excluir',
    recommendedReason:
      'Tipo de publicação não elegível (estudo secundário/revisão de literatura prévia)',
    adjudicationFeedback:
      'Decisão correta: EXCLUIR. Trata-se de uma revisão de literatura (estudo secundário), e não de um estudo primário empírico elegível.',
  },
  {
    id: 5,
    title:
      'Telereabilitação baseada em exercícios assíncronos versus lista de espera em dor lombar crônica: protocolo de ensaio randomizado',
    authors: 'Miller, K. et al.',
    year: 2023,
    journal: 'BMJ Open',
    abstractSnippet:
      'Apresenta a fundamentação e o protocolo metodológico detalhado de um ensaio clínico que está em fase de recrutamento de pacientes em Melbourne. Sem dados empíricos publicados até o momento.',
    designHint: 'Protocolo de estudo · Sem resultados empíricos relatados.',
    targetDecision: 'duvida',
    recommendedReason:
      'Protocolo sem resultados primários publicados (buscar se já foram concluídos e contatar autores)',
    adjudicationFeedback:
      'Decisão recomendada: DÚVIDA / BUSCAR COMPLETO. Por ser um protocolo de ensaio clínico em andamento, deve-se verificar se os resultados já foram publicados ou contatar os autores antes de descartar definitivamente.',
  },
  {
    id: 6,
    title:
      'Efeito de um programa multimodal de telereabilitação na dor, qualidade de vida e custos em trabalhadores com lombalgia crônica: ensaio randomizado pragmático',
    authors: 'Almeida, F. G. et al.',
    year: 2023,
    journal: 'Spine',
    abstractSnippet:
      'Ensaio clínico pragmático randomizado com 210 adultos acompanhados por 12 meses. Intervenção consistiu em consultas virtuais com fisioterapeuta, exercícios guiados e módulo educativo. Comparador: acompanhamento médico habitual.',
    designHint: 'Ensaio Clínico Randomizado · Dor lombar crônica · Telereabilitação completa.',
    targetDecision: 'incluir',
    adjudicationFeedback:
      'Decisão correta: INCLUIR. Atende com precisão aos critérios PICO da pergunta de pesquisa.',
  },
  {
    id: 7,
    title:
      'Impacto da acupuntura tradicional versus telereabilitação em dor cervical crônica: ensaio clínico randomizado piloto',
    authors: 'Kim, H. et al.',
    year: 2022,
    journal: 'Complementary Therapies in Medicine',
    abstractSnippet:
      'Estudo piloto randomizado com 60 pacientes com dor CERVICAL crônica persistente. Grupo intervenção recebeu acupuntura e grupo controle recebeu exercícios virtuais.',
    designHint: 'Condição: dor CERVICAL (pescoço), não dor lombar.',
    targetDecision: 'excluir',
    recommendedReason: 'População/Condição não elegível (dor cervical e não dor lombar)',
    adjudicationFeedback:
      'Decisão correta: EXCLUIR. O estudo avaliou dor cervical (cervicalgia), violando o critério anatômico de dor lombar crônica.',
  },
  {
    id: 8,
    title:
      'Reabilitação virtual imersiva por realidade virtual em comparação a exercícios convencionais: estudo quase-experimental não randomizado',
    authors: 'Silva, B. N. et al.',
    year: 2024,
    journal: 'Gait & Posture',
    abstractSnippet:
      'Estudo quase-experimental com alocação por conveniência (pacientes que possuíam óculos de VR em casa versus pacientes sem o dispositivo). Não houve randomização verdadeira.',
    designHint: 'Quase-experimental · Alocação por conveniência sem randomização.',
    targetDecision: 'excluir',
    recommendedReason:
      'Delineamento não elegível (estudo quase-experimental sem randomização pré-especificado como exclusão)',
    adjudicationFeedback:
      'Decisão correta: EXCLUIR caso o protocolo tenha restrito exclusivamente a ensaios randomizados para minimizar viés de seleção.',
  },
  {
    id: 9,
    title:
      'Intervenção híbrida (presencial + telessaúde) para dor lombar crônica inespecífica em idosos fragilizados: ensaio clínico randomizado',
    authors: 'Costa, E. M. et al.',
    year: 2023,
    journal: 'Archives of Physical Medicine and Rehabilitation',
    abstractSnippet:
      'ECR com 90 idosos (≥ 65 anos). Grupo intervenção recebeu 2 sessões presenciais de calibração seguidas de 10 semanas de telereabilitação síncrona. Comparador: fisioterapia presencial 2x/semana. Desfechos aos 3 e 6 meses.',
    designHint: 'ECR · Adultos/idosos com dor lombar crônica · Telereabilitação supervisionada.',
    targetDecision: 'incluir',
    adjudicationFeedback:
      'Decisão correta: INCLUIR. Intervenção predominantemente de telereabilitação com desenho randomizado rigoroso.',
  },
  {
    id: 10,
    title:
      'Treinamento de força muscular em atletas jovens de futebol com dor lombar: série de casos',
    authors: 'Ribeiro, P. H. & Lima, D.',
    year: 2021,
    journal: 'Revista Brasileira de Medicina do Esporte',
    abstractSnippet:
      'Série de casos acompanhando 8 atletas adolescentes (15-17 anos) submetidos a protocolo de fortalecimento do core. Sem grupo controle.',
    designHint: 'Série de casos sem controle (n = 8) · Adolescentes (< 18 anos).',
    targetDecision: 'excluir',
    recommendedReason:
      'População pediátrica (< 18 anos) e desenho de série de casos sem comparador',
    adjudicationFeedback:
      'Decisão correta: EXCLUIR. Duplo critério de exclusão: população pediátrica (< 18 anos) e desenho de série de casos sem grupo controle.',
  },
  {
    id: 11,
    title:
      'Eficácia de plataforma digital de teleconsulta versus folheto educativo para dores musculoesqueléticas inespecíficas na coluna vertebral: ensaio randomizado',
    authors: 'Vargas, C. et al.',
    year: 2023,
    journal: 'Telemedicine and e-Health',
    abstractSnippet:
      'Estudo randomizado com 180 adultos com dor na coluna (coluna cervical, torácica e lombar combinadas). Não estratifica claramente na triagem inicial a proporção de pacientes lombalgicos.',
    designHint: 'População mista (coluna vertebral em geral) · Exige leitura completa.',
    targetDecision: 'duvida',
    recommendedReason:
      'População mista na triagem de resumo (necessária leitura de texto completo para confirmar estratificação lombar)',
    adjudicationFeedback:
      'Decisão recomendada: DÚVIDA / AVANÇAR PARA TEXTO COMPLETO. Na dúvida na fase de resumo se os dados de dor lombar podem ser extraídos separadamente, a diretriz metodológica manda avançar para a leitura completa.',
  },
  {
    id: 12,
    title:
      'Sessões de telessaúde com fisioterapeuta versus cuidados médicos habituais para redução da dor e incapacidade na dor lombar crônica: ensaio clínico randomizado multicêntrico',
    authors: 'Martins, R. A. et al.',
    year: 2024,
    journal: 'The Lancet Digital Health',
    abstractSnippet:
      'Ensaio clínico randomizado multicêntrico envolvendo 340 adultos de 12 centros de saúde. Telereabilitação semanal individualizada com fisioterapeuta versus cuidados médicos gerais. Acompanhamento rigoroso de 12 meses.',
    designHint: 'ECR Multicêntrico de alto rigor · Adultos com dor crônica · PICO perfeito.',
    targetDecision: 'incluir',
    adjudicationFeedback:
      'Decisão correta: INCLUIR. Estudo padrão-ouro para o escopo da revisão de efetividade.',
  },
]

interface DecisionRecord {
  decision: 'incluir' | 'excluir' | 'duvida'
  justification: string
}

export default function LabDTriagem() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [decisions, setDecisions] = useState<Record<number, DecisionRecord>>(() =>
    getLabState('lab_d_decisions', {}),
  )
  const [currentDecision, setCurrentDecision] = useState<'incluir' | 'excluir' | 'duvida'>(
    'incluir',
  )
  const [justification, setJustification] = useState('')
  const [reviewed, setReviewed] = useState(false)

  const study = FICTIONAL_STUDIES[currentIndex]

  useEffect(() => {
    saveLabState('lab_d_decisions', decisions)
    if (Object.keys(decisions).length >= FICTIONAL_STUDIES.length) {
      markLabCompleted('d-triagem')
    }
  }, [decisions])

  const handleSaveDecision = () => {
    const updated = {
      ...decisions,
      [study.id]: {
        decision: currentDecision,
        justification: justification.trim() || 'Sem anotações complementares.',
      },
    }
    setDecisions(updated)
    setJustification('')

    if (currentIndex < FICTIONAL_STUDIES.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setReviewed(true)
    }
  }

  const handleReset = () => {
    setDecisions({})
    setCurrentIndex(0)
    setReviewed(false)
  }

  const completedCount = Object.keys(decisions).length

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Laboratórios', to: '/laboratorios' },
          { label: 'Laboratório D — Simulador de Triagem' },
        ]}
      />

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-sm">
            D
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Simulador de Triagem de Estudos
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Trie 12 estudos fictícios realistas com base no título, resumo e pistas metodológicas.
          Exercite a tomada de decisão fundamentada e a regra de ouro: &quot;na dúvida na triagem de
          resumo, o artigo avança para leitura completa&quot;.
        </p>
      </div>

      {/* PROGRESS TRACKER */}
      <div className="flex items-center justify-between text-xs text-slate-500 border-b pb-3">
        <span>
          Estudo {currentIndex + 1} de {FICTIONAL_STUDIES.length}
        </span>
        <span>
          {completedCount} triagens registradas (
          {Math.round((completedCount / FICTIONAL_STUDIES.length) * 100)}%)
        </span>
      </div>

      {!reviewed ? (
        /* CARD DO ESTUDO ATUAL */
        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <CardContent className="p-6 space-y-5">
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Registro #{study.id} · {study.journal} ({study.year})
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {study.title}
              </h2>
              <p className="text-xs text-slate-500 italic">Autores: {study.authors}</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
              <span className="font-bold text-slate-900 dark:text-white block text-xs uppercase tracking-wider">
                Resumo (Abstract Snippet):
              </span>
              <p>{study.abstractSnippet}</p>
            </div>

            <div className="p-3 rounded-md bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900 text-xs text-sky-900 dark:text-sky-300">
              <strong>Pista Metodológica:</strong> {study.designHint}
            </div>

            {/* FORMULÁRIO DE DECISÃO */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                Sua Decisão Metodológica de Triagem:
              </label>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentDecision('incluir')}
                  className={`p-3 rounded-lg border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    currentDecision === 'incluir'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 ring-2 ring-emerald-500'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700 dark:border-slate-700 dark:text-slate-300'
                  }`}
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span>INCLUIR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentDecision('duvida')}
                  className={`p-3 rounded-lg border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    currentDecision === 'duvida'
                      ? 'border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 ring-2 ring-amber-500'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700 dark:border-slate-700 dark:text-slate-300'
                  }`}
                >
                  <HelpCircle className="h-5 w-5 text-amber-600" />
                  <span>DÚVIDA (AVANÇAR)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentDecision('excluir')}
                  className={`p-3 rounded-lg border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    currentDecision === 'excluir'
                      ? 'border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-300 ring-2 ring-rose-500'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700 dark:border-slate-700 dark:text-slate-300'
                  }`}
                >
                  <XCircle className="h-5 w-5 text-rose-600" />
                  <span>EXCLUIR</span>
                </button>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Justificativa científica / Motivo de exclusão:
                </label>
                <Textarea
                  rows={2}
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  placeholder="Explique o motivo da decisão com base nos critérios PICO ou no delineamento..."
                  className="text-xs sm:text-sm"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  className="text-xs"
                >
                  ← Estudo Anterior
                </Button>

                <Button
                  onClick={handleSaveDecision}
                  className="bg-teal-600 hover:bg-teal-700 text-white text-xs gap-1.5 font-semibold"
                >
                  <span>
                    {currentIndex === FICTIONAL_STUDIES.length - 1
                      ? 'Concluir e Ver Adjudicação'
                      : 'Salvar Decisão e Avançar'}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* PAINEL DE ADJUDICAÇÃO E REVISÃO */
        <div className="space-y-6">
          <Card className="border-teal-300 dark:border-teal-900 bg-teal-50/40 dark:bg-teal-950/20 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-teal-600" />
                  Relatório Consolidado de Adjudicação Metodológica
                </h2>
                <Button variant="outline" size="sm" onClick={handleReset} className="text-xs gap-1">
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reiniciar Simulação</span>
                </Button>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Compare as suas decisões com o julgamento metodológico de referência baseado no
                manual JBI e Cochrane.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {FICTIONAL_STUDIES.map((st) => {
              const userDec = decisions[st.id]
              const match = userDec?.decision === st.targetDecision

              return (
                <Card
                  key={st.id}
                  className={`border ${
                    match
                      ? 'border-emerald-200 dark:border-emerald-900 bg-white dark:bg-slate-900'
                      : 'border-amber-200 dark:border-amber-900 bg-white dark:bg-slate-900'
                  }`}
                >
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          Estudo #{st.id} · {st.journal}
                        </span>
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                          {st.title}
                        </h3>
                      </div>
                      <Badge
                        variant={match ? 'default' : 'destructive'}
                        className={`text-[10px] shrink-0 ${
                          match ? 'bg-emerald-600' : 'bg-amber-600'
                        }`}
                      >
                        {match ? 'Concordância' : 'Divergência'}
                      </Badge>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 text-xs pt-1 border-t">
                      <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800">
                        <span className="font-semibold text-slate-500 block">Sua Decisão:</span>
                        <p className="font-bold uppercase text-slate-900 dark:text-white">
                          {userDec?.decision || 'Não respondido'}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1 italic">
                          &quot;{userDec?.justification}&quot;
                        </p>
                      </div>

                      <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800">
                        <span className="font-semibold text-slate-500 block">
                          Decisão de Referência:
                        </span>
                        <p className="font-bold uppercase text-slate-900 dark:text-white">
                          {st.targetDecision}
                        </p>
                        {st.recommendedReason && (
                          <p className="text-[11px] text-rose-600 mt-1">
                            Motivo: {st.recommendedReason}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="p-3 rounded bg-teal-50 dark:bg-teal-950/40 text-xs text-teal-900 dark:text-teal-200">
                      <strong>Feedback Metodológico:</strong> {st.adjudicationFeedback}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
