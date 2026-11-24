import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, ExternalLink, Copy, Check } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { REFERENCES_DATA } from '@/data/references'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export default function ReferencesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Sorted alphabetically by ABNT citation
  const sorted = [...REFERENCES_DATA].sort((a, b) => a.abnt.localeCompare(b.abnt, 'pt-BR'))

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <Breadcrumbs items={[{ label: 'Referências ABNT' }]} />

      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-indigo-600" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Fontes e Referências Científicas
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-3xl">
          Relação de referências primárias e complementares que fundamentam este recurso didático,
          organizadas em ordem alfabética segundo as normas da ABNT. Todas as decisões metodológicas
          e diretrizes citadas no aplicativo derivam estritamente destas fontes públicas e
          verificáveis.
        </p>
      </div>

      <div className="space-y-4">
        {sorted.map((ref) => (
          <Card
            key={ref.id}
            className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
          >
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <Badge
                  variant={ref.category === 'principal' ? 'default' : 'secondary'}
                  className="text-[11px]"
                >
                  {ref.category === 'principal'
                    ? 'Referência Principal'
                    : ref.category === 'identidade'
                      ? 'Identidade Visual & Didática'
                      : 'Fonte Complementar'}
                </Badge>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(ref.id, ref.abnt)}
                  className="h-7 text-xs flex items-center gap-1.5"
                >
                  {copiedId === ref.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copiar ABNT</span>
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-mono leading-relaxed pl-3 border-l-2 border-indigo-300 dark:border-indigo-800">
                {ref.abnt}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs pt-2">
                <span className="text-slate-500">
                  Citação sugerida no texto: <strong>{ref.citation}</strong>
                </span>

                {ref.url && (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-600 hover:text-sky-700 dark:text-sky-400 inline-flex items-center gap-1 font-medium underline underline-offset-2"
                  >
                    Acessar documento oficial <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-2">
        <p className="font-semibold text-slate-800 dark:text-slate-200">
          Nota sobre integridade científica e autoria:
        </p>
        <p>
          A autoria das diretrizes científicas (PRISMA 2020, PRISMA-P, PRISMA-S, PRISMA-C, manuais
          JBI, Cochrane Handbook e ferramentas GRADE/RoB 2) pertence exclusivamente aos seus
          respectivos autores e grupos de trabalho internacionais, devidamente citados acima. A
          autoria didática e pedagógica do recurso interativo é de Andréa Soares Rocha da Silva
          (GETS/UFC, 2026).
        </p>
        <p>
          Para citar este recurso didático em trabalhos acadêmicos, consulte a seção{' '}
          <Link to="/autoria" className="text-indigo-600 font-medium underline">
            Autoria, direitos e como citar
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
