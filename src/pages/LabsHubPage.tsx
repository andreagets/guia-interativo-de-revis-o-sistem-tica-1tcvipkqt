import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FlaskConical, CheckCircle2, ArrowRight, BookOpen, Layers, Sparkles } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { LABS_DATA } from '@/data/labs'
import { PHASES, MODULES_DATA } from '@/data/modules'
import { getProgress, ProgressState } from '@/lib/storage'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function LabsHubPage() {
  const [progress, setProgress] = useState<ProgressState>(getProgress())

  useEffect(() => {
    const handleProgress = (e: Event) => {
      const custom = e as CustomEvent<ProgressState>
      if (custom.detail) setProgress(custom.detail)
    }
    window.addEventListener('sr-progress-change', handleProgress)
    return () => window.removeEventListener('sr-progress-change', handleProgress)
  }, [])

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4 space-y-8">
      <Breadcrumbs items={[{ label: 'Laboratórios e Simuladores' }]} />

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-7 w-7 text-teal-600" />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Laboratórios e Simuladores de Decisão (A–K)
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-3xl">
          11 ambientes interativos para aplicação prática de raciocínio científico. Construa
          perguntas, teste matrizes de coerência, simule triagens com 12 estudos realistas, extraia
          dados, realize avaliação crítica por domínios e gere fluxogramas PRISMA 2020 vetoriais
          matematicamente validados.
        </p>
      </div>

      {/* OVERVIEW CHIPS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-sky-600 text-white font-bold text-xs">A–F</div>
          <div className="text-xs">
            <span className="font-bold text-slate-900 dark:text-white block">
              Fases I e II: Investigação
            </span>
            <span className="text-slate-500">Pergunta, Coerência, Busca, Triagem e Extração</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-600 text-white font-bold text-xs">G–I</div>
          <div className="text-xs">
            <span className="font-bold text-slate-900 dark:text-white block">
              Fase IV: Relato PRISMA
            </span>
            <span className="text-slate-500">Fluxograma 2020, Extensões e Auditoria 27 itens</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-600 text-white font-bold text-xs">J–K</div>
          <div className="text-xs">
            <span className="font-bold text-slate-900 dark:text-white block">
              Integração & Autoavaliação
            </span>
            <span className="text-slate-500">
              3 Casos clínicos progressivos e simulado de alta complexidade
            </span>
          </div>
        </div>
      </div>

      {/* LABS GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {LABS_DATA.map((lab) => {
          const isCompleted = progress.completedLabs.includes(lab.id)
          const phase = PHASES.find((p) => p.number === lab.phaseNumber)
          const mod = MODULES_DATA.find((m) => m.id === lab.accompaniedModule)

          return (
            <Card
              key={lab.id}
              className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-xs"
                      style={{ backgroundColor: phase?.color || '#0d9488' }}
                    >
                      {lab.letter}
                    </span>
                    <Badge variant="outline" className="text-[10px] font-medium">
                      Fase {phase?.roman} · M{lab.accompaniedModule}
                    </Badge>
                  </div>

                  {isCompleted ? (
                    <Badge className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] gap-1 font-semibold">
                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                      Concluído
                    </Badge>
                  ) : (
                    <span className="text-[10px] text-slate-400">Não finalizado</span>
                  )}
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    Laboratório {lab.letter} — {lab.title}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {lab.shortDesc}
                  </p>
                </div>

                {mod && (
                  <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
                    Acompanha o <strong>Módulo {mod.id}:</strong>{' '}
                    {mod.title.replace(/^Módulo \d+\.\s*/, '')}
                  </p>
                )}
              </CardContent>

              <div className="p-4 pt-0">
                <Link to={lab.path} className="w-full block">
                  <Button
                    variant="default"
                    className="w-full text-xs font-semibold gap-1.5 bg-slate-900 hover:bg-teal-700 dark:bg-slate-800 dark:hover:bg-teal-600 text-white transition-colors"
                  >
                    <span>Abrir Laboratório</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
