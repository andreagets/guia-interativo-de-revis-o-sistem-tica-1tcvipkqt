import { useState } from 'react'
import { Check, Copy, ExternalLink, Sparkles, BookOpen, Layers } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { markLabCompleted } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PrismaExtension {
  id: string
  name: string
  year: string
  citation: string
  targetContext: string
  whyUse: string
  link: string
}

const EXTENSIONS: PrismaExtension[] = [
  {
    id: 'prisma-p',
    name: 'PRISMA-P (Protocolos)',
    year: '2015',
    citation: 'Shamseer et al. (2015)',
    targetContext:
      'Elaboração e publicação de protocolos prévios de revisão sistemática e metanálise.',
    whyUse:
      'Padroniza os 17 itens obrigatórios do protocolo antes do início das buscas, evitando relato seletivo e desvios de desfechos.',
    link: 'https://www.prisma-statement.org/protocols',
  },
  {
    id: 'prisma-s',
    name: 'PRISMA-S (Estratégias de Busca)',
    year: '2021',
    citation: 'Rethlefsen et al. (2021)',
    targetContext:
      'Relato exaustivo e reprodutível de buscas bibliográficas em bases, literatura cinzenta e registros.',
    whyUse:
      'Fornece checklist com 16 itens para detalhar nomes exatos de interfaces, sintaxes literais, limites e filtros utilizados.',
    link: 'https://www.prisma-statement.org/prisma-search',
  },
  {
    id: 'prisma-c',
    name: 'PRISMA-C (Crianças e Adolescentes)',
    year: '2026',
    citation: 'PRISMA Statement (2026)',
    targetContext:
      'Revisões sistemáticas focadas em populações pediátricas, neonatos ou adolescentes.',
    whyUse:
      'Considera consentimento/assentimento, faixas etárias de desenvolvimento biológico e desfechos pediátricos específicos.',
    link: 'https://www.prisma-statement.org/children',
  },
  {
    id: 'prisma-dta',
    name: 'PRISMA-DTA (Acurácia Diagnóstica)',
    year: '2018',
    citation: 'Salameh et al. (2020)',
    targetContext:
      'Revisões que avaliam sensibilidade, especificidade e curvas ROC de testes diagnósticos.',
    whyUse:
      'Adapta itens do PRISMA para os conceitos de Teste Índice e Teste de Referência (Padrão-ouro).',
    link: 'https://www.prisma-statement.org/diagnostic-test-accuracy',
  },
  {
    id: 'prisma-nma',
    name: 'PRISMA-NMA (Metanálise em Rede)',
    year: '2015',
    citation: 'Hutton et al. (2015)',
    targetContext:
      'Comparações indiretas e simultâneas de múltiplos tratamentos concorrentes em uma rede de evidências.',
    whyUse:
      'Orienta o relato da geometria da rede, pressupostos de transitividade e consistência direta/indireta.',
    link: 'https://www.prisma-statement.org/network-meta-analysis',
  },
  {
    id: 'prisma-scr',
    name: 'PRISMA-ScR (Revisões de Escopo)',
    year: '2018',
    citation: 'Tricco et al. (2018)',
    targetContext:
      'Mapeamento amplo de conceitos e lacunas do conhecimento (não é revisão sistemática).',
    whyUse:
      'Atenção metodológica: não inclui itens de avaliação de risco de viés de estudos individuais.',
    link: 'https://www.prisma-statement.org/scoping-reviews',
  },
]

export default function LabHExtensoes() {
  const [selectedExtension, setSelectedExtension] = useState<PrismaExtension>(EXTENSIONS[0])
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const text = `DIRETRIZ COMPLEMENTAR SELECIONADA: ${selectedExtension.name} (${selectedExtension.year})
Citação Formal: ${selectedExtension.citation}
Contexto de Aplicação: ${selectedExtension.targetContext}
Justificativa de Uso: ${selectedExtension.whyUse}
Disponível em: ${selectedExtension.link}
Aviso: Esta extensão complementa as orientações gerais da Declaração PRISMA 2020 (Page et al., 2021a), não a substituindo.`
    navigator.clipboard.writeText(text)
    setCopied(true)
    markLabCompleted('h-extensoes')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Laboratórios', to: '/laboratorios' },
          { label: 'Laboratório H — Seletor de Extensões PRISMA' },
        ]}
      />

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
            H
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Seletor de Extensões da Declaração PRISMA
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Identifique quais diretrizes complementares oficiais são aplicáveis ao contexto da sua
          revisão sistemática (como PRISMA-P para protocolos, PRISMA-S para estratégias de busca e
          PRISMA-C 2026 para populações pediátricas).
        </p>
      </div>

      {/* SELETOR DE CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {EXTENSIONS.map((ext) => {
          const isSelected = selectedExtension.id === ext.id
          return (
            <button
              key={ext.id}
              type="button"
              onClick={() => setSelectedExtension(ext)}
              className={`text-left p-4 rounded-xl border transition-all ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60 ring-2 ring-indigo-500 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {ext.name}
                </span>
                <Badge variant="outline" className="text-[10px]">
                  {ext.year}
                </Badge>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2">{ext.targetContext}</p>
            </button>
          )
        })}
      </div>

      {/* DETALHE DA EXTENSÃO SELECIONADA */}
      <Card className="border-indigo-300 dark:border-indigo-900 bg-indigo-50/40 dark:bg-indigo-950/20 shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
            <div>
              <span className="text-xs uppercase font-bold text-indigo-700 dark:text-indigo-400">
                Diretriz de Relato Complementar
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {selectedExtension.name}
              </h2>
              <span className="text-xs text-slate-500 font-mono">
                Citação formal: {selectedExtension.citation}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={handleCopy}
                className="text-xs gap-1.5 bg-indigo-600 hover:bg-indigo-700"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Copiada!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copiar Justificativa</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <div>
              <strong className="block text-slate-900 dark:text-white mb-0.5">
                Quando e por que utilizar esta extensão?
              </strong>
              <p>{selectedExtension.whyUse}</p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border text-xs space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                Relação com a Declaração PRISMA 2020 Geral:
              </span>
              <p className="text-slate-600 dark:text-slate-400">
                Esta extensão suplementa e aprofunda os itens correspondentes do checklist de 27
                itens. Em publicações acadêmicas de alto impacto, o uso combinado do PRISMA 2020 e
                de suas extensões pertinentes é padrão de excelência metodológica.
              </p>
            </div>

            <div className="pt-2">
              <a
                href={selectedExtension.link}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-indigo-600 hover:underline inline-flex items-center gap-1 font-medium"
              >
                Acessar documentação oficial da extensão no PRISMA Statement{' '}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
