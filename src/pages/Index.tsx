import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FlaskConical,
  Sparkles,
  ShieldCheck,
  Compass,
  FileSpreadsheet,
  AlertCircle,
  HelpCircle,
  Clock,
  Layers,
} from 'lucide-react'
import { PHASES, MODULES_DATA } from '@/data/modules'
import { LABS_DATA } from '@/data/labs'
import { getProgress, ProgressState } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export default function Index() {
  const [progress, setProgress] = useState<ProgressState>(getProgress())
  const [showNotice, setShowNotice] = useState(true)

  useEffect(() => {
    const handleProgress = (e: Event) => {
      const custom = e as CustomEvent<ProgressState>
      if (custom.detail) setProgress(custom.detail)
    }
    window.addEventListener('sr-progress-change', handleProgress)
    return () => window.removeEventListener('sr-progress-change', handleProgress)
  }, [])

  const completedCount = progress.completedModules.length
  const totalModules = 12
  const progressPercent = Math.round((completedCount / totalModules) * 100)

  return (
    <div className="w-full space-y-12">
      {/* PERSISTENCE NOTICE BANNER */}
      {showNotice && (
        <aside
          aria-label="Aviso de Privacidade e Armazenamento Local"
          className="bg-sky-50 dark:bg-sky-950/70 border-b border-sky-200 dark:border-sky-900 px-4 py-2.5 text-xs text-sky-900 dark:text-sky-200"
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-sky-600 shrink-0" />
              <span>
                <strong>Aviso de Privacidade:</strong> Seus dados, respostas e fluxogramas ficam
                gravados apenas neste navegador. Sem login, sem coleta de dados em servidores
                externos.
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link to="/configuracoes" className="underline font-semibold hover:text-sky-700">
                Gerenciar dados
              </Link>
              <button
                type="button"
                onClick={() => setShowNotice(false)}
                className="text-sky-600 hover:text-sky-900 font-bold px-1"
                aria-label="Fechar aviso"
              >
                ✕
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800 py-12 md:py-20 px-4">
        {/* Subtle SVG funnel background motif */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.07] flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <svg viewBox="0 0 800 800" className="w-[800px] h-[800px]">
            <circle cx="400" cy="400" r="380" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="400" cy="400" r="280" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="400" cy="400" r="180" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="400" cy="400" r="80" stroke="currentColor" strokeWidth="2" fill="none" />
            <line x1="100" y1="100" x2="700" y2="700" stroke="currentColor" strokeWidth="1.5" />
            <line x1="700" y1="100" x2="100" y2="700" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto space-y-6 relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Recurso Educacional Digital Interativo (REDI) · 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Infográfico Interativo — <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
              Guia de Revisão Sistemática da Literatura
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            Aprenda os fundamentos, decisões metodológicas e o relato científico transparente de
            revisões sistemáticas em saúde e ciências correlatas. Com simuladores de decisão,
            laboratórios interativos e o construtor didático do fluxograma PRISMA 2020.
          </p>

          <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs max-w-3xl space-y-2 text-xs sm:text-sm">
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              Autoria exclusiva: Profa. Dra. Andréa Soares Rocha da Silva
            </p>
            <p className="text-slate-500 dark:text-slate-400">
              Contexto institucional: GETS — Grupo Educação Tecnologia e Saúde, Universidade Federal
              do Ceará (UFC) · 2026. Destinado a estudantes de graduação, pós-graduação, orientandos
              de IC, mestrado, doutorado e pesquisadores.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
            <Link to="/modulo/tipos-de-revisao-e-viabilidade">
              <Button
                size="lg"
                className="bg-sky-600 hover:bg-sky-700 text-white font-semibold gap-2 shadow-sm"
              >
                <span>Começar pela Fase I (Fundamentar)</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <Link to="/laboratorios">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 dark:border-slate-700 font-semibold gap-2"
              >
                <FlaskConical className="h-4 w-4 text-teal-600" />
                <span>Ir direto aos Laboratórios (A–K)</span>
              </Button>
            </Link>

            <Link to="/lab/g-fluxograma">
              <Button
                size="lg"
                variant="secondary"
                className="font-semibold gap-2 bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200"
              >
                <FileSpreadsheet className="h-4 w-4" />
                <span>Construtor PRISMA 2020</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 space-y-12">
        {/* CARD CONTINUAR DE ONDE PAREI */}
        {progress.visitedModules.length > 0 && (
          <Card className="border-sky-300 dark:border-sky-800 bg-sky-50/70 dark:bg-sky-950/40 shadow-xs">
            <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-800 dark:text-sky-300">
                  <Clock className="h-4 w-4 text-sky-600" />
                  <span>Continuar de Onde Parei</span>
                </div>
                <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                  {progress.lastVisitedTitle || 'Módulo 1: Tipos de revisão e viabilidade'}
                </h3>
                <p className="text-xs text-slate-500">
                  {completedCount} de {totalModules} módulos concluídos ({progressPercent}% do
                  percurso)
                </p>
              </div>

              <Link to={progress.lastVisitedPath || '/modulo/tipos-de-revisao-e-viabilidade'}>
                <Button className="bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs gap-1.5 shrink-0">
                  <span>Retomar Leitura</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* PRINCÍPIOS CIENTÍFICOS INEGOCIÁVEIS (STRIP) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Pilares Metodológicos Inegociáveis
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <Badge className="bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 text-[10px]">
                Condução ≠ Relato
              </Badge>
              <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                PRISMA é para Relatar
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                A condução científica fundamenta-se nos manuais JBI e Cochrane. O PRISMA 2020
                padroniza a transparência do relato.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 text-[10px]">
                7 Modalidades
              </Badge>
              <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                Além do Ensaio Clínico
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Contempla efetividade, prevalência, etiologia/risco, acurácia diagnóstica,
                prognóstico, qualitativa e métodos mistos.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-[10px]">
                Unidades Distintas
              </Badge>
              <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                Registro vs. Relatório vs. Estudo
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Um estudo clínico pode estar descrito em múltiplos relatórios. Nunca os confunda nas
                contagens ou metanálises.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 text-[10px]">
                Validade ≠ Certeza
              </Badge>
              <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                Risco de Viés ≠ GRADE
              </h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Risco de viés avalia cada estudo isolado. O sistema GRADE julga a confiança no
                conjunto do corpo de evidências.
              </p>
            </div>
          </div>
        </section>

        {/* O PERCURSO FORMATIVO: 4 FASES */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                O Percurso Formativo em 4 Fases
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                12 módulos sequenciais com fundamentação teórica, exemplos em saúde e atividades
                práticas.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              {completedCount} / {totalModules} Módulos Concluídos
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PHASES.map((phase) => (
              <div
                key={phase.number}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs"
              >
                <div
                  className="p-4 flex items-center justify-between text-white"
                  style={{ backgroundColor: phase.color }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-md bg-white/20 font-bold flex items-center justify-center text-sm">
                      {phase.roman}
                    </span>
                    <h3 className="font-extrabold text-sm sm:text-base tracking-tight">
                      FASE {phase.roman} — {phase.title}
                    </h3>
                  </div>
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-medium">
                    3 Módulos
                  </span>
                </div>

                <div className="p-4 divide-y divide-slate-100 dark:divide-slate-800">
                  {phase.modules.map((mId) => {
                    const mod = MODULES_DATA.find((m) => m.id === mId)
                    if (!mod) return null
                    const isCompleted = progress.completedModules.includes(mId)
                    const isVisited = progress.visitedModules.includes(mId)

                    return (
                      <Link
                        key={mId}
                        to={`/modulo/${mod.slug}`}
                        className="py-3 first:pt-1 last:pb-1 flex items-start justify-between gap-3 group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 px-2 rounded-lg transition-colors"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-sky-600 transition-colors">
                              {mod.title}
                            </span>
                            {isCompleted && (
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{mod.subtitle}</p>
                        </div>

                        <span className="text-xs text-slate-400 group-hover:text-sky-600 shrink-0 font-medium">
                          Abrir →
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LABORATÓRIOS OBRIGATÓRIOS HIGHLIGHT */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FlaskConical className="h-6 w-6 text-teal-600" />
                Simuladores e Laboratórios Interativos (A–K)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Treine tomada de decisão metodológica em situações realistas de pesquisa.
              </p>
            </div>
            <Link
              to="/laboratorios"
              className="text-xs text-teal-600 hover:text-teal-700 font-semibold inline-flex items-center gap-1"
            >
              Ver todos (11) <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LABS_DATA.slice(0, 6).map((lab) => (
              <Card
                key={lab.id}
                className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-teal-500 transition-all group"
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold text-xs flex items-center justify-center">
                      {lab.letter}
                    </span>
                    <span className="text-[10px] text-slate-400">Fase {lab.phaseNumber}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                      {lab.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {lab.shortDesc}
                    </p>
                  </div>
                  <Link to={lab.path} className="block pt-1">
                    <span className="text-[11px] font-semibold text-teal-600 hover:underline inline-flex items-center gap-1">
                      Acessar simulador <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300 dark:border-amber-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 dark:text-amber-400">
                Componente Central de Relato
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Laboratório G: Construtor de Fluxograma PRISMA 2020
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl">
                Selecione entre os 4 modelos oficiais Word (novos e atualizados, v1 e v2), valide
                todas as contagens com álgebra estrita e exporte imagens de alta resolução em SVG,
                PNG ou JPEG.
              </p>
            </div>
            <Link to="/lab/g-fluxograma" className="shrink-0">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs gap-1.5">
                <span>Construir Fluxograma</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
