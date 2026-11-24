import { useState, useEffect } from 'react'
import { Plus, Trash2, Copy, Check, Info, AlertTriangle } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getLabState, saveLabState, markLabCompleted } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface SearchConcept {
  id: string
  label: string
  meshTerms: string[]
  freeTerms: string[]
}

const DEFAULT_CONCEPTS: SearchConcept[] = [
  {
    id: 'c1',
    label: 'Conceito 1 — População (Idosos com sarcopenia)',
    meshTerms: ['"Sarcopenia"[Mesh]', '"Aged"[Mesh]', '"Frail Elderly"[Mesh]'],
    freeTerms: ['sarcopeni*[tiab]', 'muscle loss[tiab]', '"muscle wasting"[tiab]', 'elderly[tiab]'],
  },
  {
    id: 'c2',
    label: 'Conceito 2 — Intervenção (Exercício resistido)',
    meshTerms: ['"Resistance Training"[Mesh]', '"Exercise Therapy"[Mesh]'],
    freeTerms: [
      '"strength training"[tiab]',
      'exercis*[tiab]',
      'weight-bearing[tiab]',
      '"resistance exercise"[tiab]',
    ],
  },
]

export default function LabCBusca() {
  const [concepts, setConcepts] = useState<SearchConcept[]>(() =>
    getLabState('lab_c', DEFAULT_CONCEPTS),
  )
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    saveLabState('lab_c', concepts)
    markLabCompleted('c-busca')
  }, [concepts])

  const addConcept = () => {
    const nextNum = concepts.length + 1
    setConcepts([
      ...concepts,
      {
        id: `c_${Date.now()}`,
        label: `Conceito ${nextNum} — Novo Bloco`,
        meshTerms: [],
        freeTerms: [],
      },
    ])
  }

  const removeConcept = (id: string) => {
    if (concepts.length <= 1) return
    setConcepts(concepts.filter((c) => c.id !== id))
  }

  // Build Boolean strategy
  const buildStrategy = () => {
    return concepts
      .map((c) => {
        const terms = [...c.meshTerms, ...c.freeTerms]
        if (terms.length === 0) return '( )'
        return `(\n  ${terms.join(' OR \n  ')}\n)`
      })
      .join('\nAND\n')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(buildStrategy())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Laboratórios', to: '/laboratorios' },
          { label: 'Laboratório C — Construtor de Busca' },
        ]}
      />

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-sm">
            C
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Construtor de Busca Bibliográfica
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Combine blocos conceituais com termos MeSH/DeCS, termos livres e operadores booleanos.
          Gere sintaxe estruturada conforme as recomendações do PRISMA-S (Rethlefsen et al., 2021).
        </p>
      </div>

      {/* AVISO METODOLÓGICO OBRIGATÓRIO */}
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
        <div className="font-bold flex items-center gap-1.5 uppercase tracking-wide">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          Aviso de Validação Científica
        </div>
        <p>
          Este simulador organiza a lógica conceitual booleana (OR dentro dos blocos, AND entre
          blocos).
          <strong>
            {' '}
            O aplicativo não declara a estratégia automaticamente como &quot;validada&quot;.
          </strong>{' '}
          Toda busca real precisa ser adaptada às sintaxes específicas de cada base (PubMed, Embase,
          Cochrane Library, BVS) e revisada criticamente por um bibliotecário especialista conforme
          o PRISMA-S.
        </p>
      </div>

      {/* CONCEITOS */}
      <div className="space-y-4">
        {concepts.map((concept, idx) => (
          <Card
            key={concept.id}
            className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
          >
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <Input
                  value={concept.label}
                  onChange={(e) => {
                    const next = [...concepts]
                    next[idx].label = e.target.value
                    setConcepts(next)
                  }}
                  className="font-bold text-xs sm:text-sm max-w-md bg-transparent border-none shadow-none p-0 focus-visible:ring-0"
                />
                {concepts.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeConcept(concept.id)}
                    className="h-7 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Termos Controlados (MeSH / DeCS / Emtree)
                  </label>
                  <p className="text-[11px] text-slate-400 mb-1.5">
                    Insira um termo por linha com aspas e tag de campo (ex: &quot;Aged&quot;[Mesh])
                  </p>
                  <textarea
                    rows={4}
                    value={concept.meshTerms.join('\n')}
                    onChange={(e) => {
                      const next = [...concepts]
                      next[idx].meshTerms = e.target.value
                        .split('\n')
                        .filter((t) => t.trim().length > 0)
                      setConcepts(next)
                    }}
                    className="w-full font-mono text-xs p-2 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Termos Livres (Título, Resumo, Palavras-chave)
                  </label>
                  <p className="text-[11px] text-slate-400 mb-1.5">
                    Insira sinônimos e truncamentos (ex: exercis*[tiab], &quot;physical
                    activity&quot;[tiab])
                  </p>
                  <textarea
                    rows={4}
                    value={concept.freeTerms.join('\n')}
                    onChange={(e) => {
                      const next = [...concepts]
                      next[idx].freeTerms = e.target.value
                        .split('\n')
                        .filter((t) => t.trim().length > 0)
                      setConcepts(next)
                    }}
                    className="w-full font-mono text-xs p-2 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          variant="outline"
          onClick={addConcept}
          className="w-full border-dashed border-slate-300 dark:border-slate-700 text-xs gap-1.5"
        >
          <Plus className="h-4 w-4" />
          <span>Adicionar Outro Bloco Conceitual (Conectado via AND)</span>
        </Button>
      </div>

      {/* PREVIEW DA SINTAXE BOOLEANA */}
      <Card className="border-teal-300 dark:border-teal-900 bg-teal-50/40 dark:bg-teal-950/20 shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-teal-900 dark:text-teal-200">
              Sintaxe Booleana Consolidada
            </h2>

            <Button
              size="sm"
              onClick={handleCopy}
              className="bg-teal-600 hover:bg-teal-700 text-white text-xs gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copiada!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copiar Estratégia</span>
                </>
              )}
            </Button>
          </div>

          <pre className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 whitespace-pre leading-relaxed overflow-x-auto">
            {buildStrategy()}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
