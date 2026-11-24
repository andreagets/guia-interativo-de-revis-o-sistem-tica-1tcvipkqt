import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, HelpCircle, ArrowRight } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { GLOSSARY_TERMS } from '@/data/glossary'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('todos')

  const filtered = useMemo(() => {
    return GLOSSARY_TERMS.filter((item) => {
      const matchText =
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.shortDef.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fullDef.toLowerCase().includes(searchTerm.toLowerCase())
      const matchCat = categoryFilter === 'todos' || item.category === categoryFilter
      return matchText && matchCat
    })
  }, [searchTerm, categoryFilter])

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <Breadcrumbs items={[{ label: 'Glossário Científico' }]} />

      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-sky-600" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Glossário de Revisão Sistemática
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-3xl">
          Definições conceituais fundamentadas nas diretrizes PRISMA 2020, JBI, Cochrane e GRADE.
          Preste atenção especial às distinções inegociáveis entre <strong>Registro</strong>,{' '}
          <strong>Relatório</strong> e <strong>Estudo Único</strong>, e entre{' '}
          <strong>Risco de Viés</strong> e <strong>Certeza das Evidências</strong>.
        </p>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar termo ou conceito (ex: registro, risco de viés, PRISMA)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-white dark:bg-slate-900"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'unidade', label: 'Unidades (Estudo/Relatório)' },
            { id: 'conceito', label: 'Conceitos' },
            { id: 'avaliacao', label: 'Avaliação & Viés' },
            { id: 'sintese', label: 'Síntese & Metanálise' },
            { id: 'relato', label: 'Diretrizes de Relato' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                categoryFilter === cat.id
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* LIST OF TERMS */}
      <div className="grid gap-4">
        {filtered.map((item) => (
          <Card
            key={item.id}
            className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
          >
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {item.term}
                    <Badge variant="outline" className="text-[10px] font-normal uppercase">
                      {item.category}
                    </Badge>
                  </h2>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mt-1">
                    {item.shortDef}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.fullDef}
              </p>

              {item.distinction && (
                <div className="p-3 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                  <span className="font-bold flex items-center gap-1 text-[11px] uppercase tracking-wider text-amber-800 dark:text-amber-400">
                    ⚠ Distinção Metodológica Crítica
                  </span>
                  <p>{item.distinction}</p>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800">
                <span>Fonte: {item.citation}</span>
                <Link
                  to="/referencias"
                  className="text-sky-600 hover:text-sky-700 dark:text-sky-400 inline-flex items-center gap-1 font-medium"
                >
                  Ver referência ABNT <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-800">
            Nenhum termo encontrado para &quot;{searchTerm}&quot;. Tente outros termos como
            &quot;estudo&quot;, &quot;relatório&quot;, &quot;viés&quot; ou &quot;PRISMA&quot;.
          </div>
        )}
      </div>
    </div>
  )
}
