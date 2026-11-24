import { useState, useEffect } from 'react'
import { CheckCircle2, XCircle, HelpCircle, Copy, Check, Download, Filter } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getLabState, saveLabState, markLabCompleted } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export interface PrismaAuditItem {
  id: number
  section: string
  itemNumber: string
  topic: string
  description: string
  status: 'atendido' | 'parcial' | 'nao_atendido' | 'nao_se_aplica'
  location: string
  notes: string
}

const PRISMA_27_ITEMS: Omit<PrismaAuditItem, 'status' | 'location' | 'notes'>[] = [
  {
    id: 1,
    section: 'TÍTULO',
    itemNumber: '1',
    topic: 'Título',
    description: 'Identificar o relatório como uma revisão sistemática.',
  },
  {
    id: 2,
    section: 'RESUMO',
    itemNumber: '2',
    topic: 'Resumo estruturado',
    description:
      'Fornecer um resumo estruturado incluindo contexto, objetivos, fontes, critérios, síntese, conclusões e registro.',
  },
  {
    id: 3,
    section: 'INTRODUÇÃO',
    itemNumber: '3',
    topic: 'Justificativa',
    description: 'Descrever a justificativa da revisão no contexto do que já é conhecido.',
  },
  {
    id: 4,
    section: 'INTRODUÇÃO',
    itemNumber: '4',
    topic: 'Objetivos',
    description:
      'Apresentar uma declaração explícita das questões abordadas com base nos componentes PICO.',
  },
  {
    id: 5,
    section: 'MÉTODOS',
    itemNumber: '5',
    topic: 'Critérios de elegibilidade',
    description:
      'Especificar os critérios de inclusão e exclusão e como os estudos foram agrupados para a síntese.',
  },
  {
    id: 6,
    section: 'MÉTODOS',
    itemNumber: '6',
    topic: 'Fontes de informação',
    description:
      'Especificar todas as bases de dados, registros, websites e outras fontes consultadas com datas de cobertura.',
  },
  {
    id: 7,
    section: 'MÉTODOS',
    itemNumber: '7',
    topic: 'Estratégia de busca',
    description:
      'Apresentar a estratégia de busca completa para todas as bases de dados e registros consultados (PRISMA-S).',
  },
  {
    id: 8,
    section: 'MÉTODOS',
    itemNumber: '8',
    topic: 'Processo de seleção',
    description:
      'Especificar os métodos usados para selecionar estudos (dupla triagem independente, ferramentas de automação).',
  },
  {
    id: 9,
    section: 'MÉTODOS',
    itemNumber: '9',
    topic: 'Processo de extração de dados',
    description:
      'Especificar os métodos de extração de dados (em duplicata independente, processos de consenso).',
  },
  {
    id: 10,
    section: 'MÉTODOS',
    itemNumber: '10a',
    topic: 'Itens de dados (desfechos)',
    description:
      'Listar e definir todos os desfechos para os quais os dados foram buscados e medidas de efeito.',
  },
  {
    id: 11,
    section: 'MÉTODOS',
    itemNumber: '10b',
    topic: 'Itens de dados (outras variáveis)',
    description:
      'Listar todas as outras variáveis buscadas (características dos participantes, intervenções, financiamento).',
  },
  {
    id: 12,
    section: 'MÉTODOS',
    itemNumber: '11',
    topic: 'Avaliação de risco de viés',
    description:
      'Especificar as ferramentas usadas para avaliar o risco de viés dos estudos incluídos (ex: RoB 2, JBI).',
  },
  {
    id: 13,
    section: 'MÉTODOS',
    itemNumber: '12',
    topic: 'Medidas de efeito',
    description:
      'Especificar para cada desfecho a medida de efeito utilizada (ex: RR, OR, MD, SMD).',
  },
  {
    id: 14,
    section: 'MÉTODOS',
    itemNumber: '13a',
    topic: 'Síntese (critérios de agrupamento)',
    description:
      'Descrever os critérios para agrupar estudos em comparações para metanálise ou síntese sem metanálise.',
  },
  {
    id: 15,
    section: 'MÉTODOS',
    itemNumber: '13b',
    topic: 'Síntese (métodos estatísticos)',
    description:
      'Descrever os métodos para sintetizar dados numericamente (modelo de efeitos fixos ou aleatórios, I²).',
  },
  {
    id: 16,
    section: 'MÉTODOS',
    itemNumber: '13c',
    topic: 'Síntese (apresentação tabular)',
    description:
      'Descrever métodos para tabular ou apresentar graficamente os resultados quando metanálise não for viável.',
  },
  {
    id: 17,
    section: 'MÉTODOS',
    itemNumber: '14',
    topic: 'Avaliação de viés no relato',
    description:
      'Descrever os métodos para avaliar viés de publicação (funnel plots, teste de Egger).',
  },
  {
    id: 18,
    section: 'MÉTODOS',
    itemNumber: '15',
    topic: 'Certeza da evidência',
    description:
      'Descrever os métodos para avaliar a certeza do corpo de evidências (ex: sistema GRADE).',
  },
  {
    id: 19,
    section: 'RESULTADOS',
    itemNumber: '16a',
    topic: 'Fluxo dos estudos (fluxograma)',
    description: 'Descrever os resultados da busca e seleção com o fluxograma PRISMA 2020.',
  },
  {
    id: 20,
    section: 'RESULTADOS',
    itemNumber: '16b',
    topic: 'Exclusões de texto completo',
    description:
      'Citar os relatórios excluídos na avaliação de elegibilidade e os motivos específicos da exclusão.',
  },
  {
    id: 21,
    section: 'RESULTADOS',
    itemNumber: '17',
    topic: 'Características dos estudos',
    description: 'Apresentar as características dos estudos incluídos em tabela estruturada.',
  },
  {
    id: 22,
    section: 'RESULTADOS',
    itemNumber: '18',
    topic: 'Risco de viés nos estudos',
    description: 'Apresentar a avaliação do risco de viés para cada estudo incluído por domínio.',
  },
  {
    id: 23,
    section: 'RESULTADOS',
    itemNumber: '19',
    topic: 'Resultados de estudos individuais',
    description:
      'Para todos os desfechos, apresentar as estimativas pontuais e intervalos de confiança de cada estudo.',
  },
  {
    id: 24,
    section: 'RESULTADOS',
    itemNumber: '20',
    topic: 'Resultados das sínteses',
    description:
      'Apresentar os resultados consolidados de cada metanálise ou síntese qualitativa e a heterogeneidade.',
  },
  {
    id: 25,
    section: 'RESULTADOS',
    itemNumber: '21',
    topic: 'Viés de relato',
    description: 'Apresentar a avaliação de viés decorrente de estudos não publicados.',
  },
  {
    id: 26,
    section: 'RESULTADOS',
    itemNumber: '22',
    topic: 'Certeza da evidência (GRADE)',
    description:
      'Apresentar a avaliação da certeza da evidência em Tabela de Resumo dos Achados (SoF Table).',
  },
  {
    id: 27,
    section: 'DISCUSSÃO & OUTRAS',
    itemNumber: '23-27',
    topic: 'Discussão, limitações e transparência',
    description:
      'Interpretar achados, discutir limitações, implicações, declarar registro do protocolo (Item 24), financiamento e conflitos.',
  },
]

export default function LabIAuditoria() {
  const [items, setItems] = useState<PrismaAuditItem[]>(() => {
    const saved = getLabState<PrismaAuditItem[] | null>('lab_i_items', null)
    if (saved && saved.length === PRISMA_27_ITEMS.length) return saved
    return PRISMA_27_ITEMS.map((it) => ({
      ...it,
      status: 'nao_atendido',
      location: '',
      notes: '',
    }))
  })

  const [copied, setCopied] = useState(false)

  useEffect(() => {
    saveLabState('lab_i_items', items)
    const completed = items.filter((i) => i.status === 'atendido').length
    if (completed >= 15) {
      markLabCompleted('i-auditoria')
    }
  }, [items])

  const updateItem = (id: number, field: 'status' | 'location' | 'notes', val: string) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: val } : it)))
  }

  const handleCopyTable = () => {
    const header =
      'Item PRISMA\tSeção\tTópico\tStatus\tLocalização no Manuscrito\tJustificativas/Notas\n'
    const body = items
      .map(
        (it) =>
          `Item ${it.itemNumber}\t${it.section}\t${it.topic}\t${it.status.toUpperCase()}\t${it.location || '-'}\t${it.notes || '-'}`,
      )
      .join('\n')
    navigator.clipboard.writeText(header + body)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const countAtendido = items.filter((i) => i.status === 'atendido').length
  const countParcial = items.filter((i) => i.status === 'parcial').length

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Laboratórios', to: '/laboratorios' },
          { label: 'Laboratório I — Auditoria PRISMA 2020' },
        ]}
      />

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
            I
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Auditoria de Conformidade PRISMA 2020
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Checklist interativo com os 27 itens essenciais da Declaração PRISMA 2020 (Page et al.,
          2021a). Registre o status, a página/linha de atendimento no manuscrito e exporte a tabela
          de conformidade para anexar à submissão do periódico.
        </p>
      </div>

      {/* METRIC STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-center">
          <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
            {countAtendido} / 27
          </span>
          <p className="text-xs text-slate-600 mt-0.5">Totalmente Atendidos</p>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-center">
          <span className="text-2xl font-bold text-amber-700 dark:text-amber-300">
            {countParcial} / 27
          </span>
          <p className="text-xs text-slate-600 mt-0.5">Parcialmente Atendidos</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center col-span-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-slate-500 font-semibold">Progresso da Auditoria:</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {Math.round(((countAtendido + countParcial * 0.5) / 27) * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mt-2">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-300"
              style={{
                width: `${Math.round(((countAtendido + countParcial * 0.5) / 27) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center justify-end gap-3">
        <Button
          onClick={handleCopyTable}
          className="text-xs gap-1.5 bg-indigo-600 hover:bg-indigo-700 font-semibold"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              <span>Tabela Copiada (TSV/Excel)!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copiar Checklist Completo (TSV)</span>
            </>
          )}
        </Button>
      </div>

      {/* ITEMS LIST */}
      <div className="space-y-4">
        {items.map((it) => (
          <Card
            key={it.id}
            className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
          >
            <CardContent className="p-5 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-2 border-b pb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    Item {it.itemNumber}
                  </Badge>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {it.section}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{it.topic}</h3>
                </div>

                <div className="flex items-center gap-1">
                  {(
                    [
                      { id: 'atendido', label: 'Atendido' },
                      { id: 'parcial', label: 'Parcial' },
                      { id: 'nao_atendido', label: 'Não Atendido' },
                      { id: 'nao_se_aplica', label: 'N/A' },
                    ] as const
                  ).map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => updateItem(it.id, 'status', st.id)}
                      className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors ${
                        it.status === st.id
                          ? st.id === 'atendido'
                            ? 'bg-emerald-600 text-white'
                            : st.id === 'parcial'
                              ? 'bg-amber-600 text-white'
                              : st.id === 'nao_se_aplica'
                                ? 'bg-slate-600 text-white'
                                : 'bg-rose-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {it.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 text-xs pt-1">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Localização no Manuscrito (Seção, Página, Parágrafo):
                  </label>
                  <Input
                    value={it.location}
                    onChange={(e) => updateItem(it.id, 'location', e.target.value)}
                    placeholder="Ex: Métodos, pág. 4, parágrafo 2"
                    className="text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Justificativa ou Notas da Equipe:
                  </label>
                  <Input
                    value={it.notes}
                    onChange={(e) => updateItem(it.id, 'notes', e.target.value)}
                    placeholder="Ex: Detalhado em material suplementar 1"
                    className="text-xs"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
