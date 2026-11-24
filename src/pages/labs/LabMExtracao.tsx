import { useState, useEffect } from 'react'
import { Plus, Trash2, Copy, Check, Table, AlertTriangle, FileSpreadsheet } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getLabState, saveLabState, markLabCompleted } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export interface ExtractionRow {
  id: string
  studyCode: string
  reportsList: string // List of report citations/DOIs for this single study
  yearCountry: string
  design: string
  sampleSize: string
  intervention: string
  comparator: string
  outcomes: string
  missingInfo: string
}

const DEFAULT_ROWS: ExtractionRow[] = [
  {
    id: 'row_1',
    studyCode: 'TELE-BACK (2023)',
    reportsList: 'Artigo principal (Santos et al., 2023) + Protocolo prévio (Santos et al., 2021)',
    yearCountry: '2023 / Brasil',
    design: 'ECR Paralelo 1:1',
    sampleSize: 'n = 140 (70 telereab / 70 presencial)',
    intervention: '12 sem de telereabilitação síncrona 2x/sem',
    comparator: 'Fisioterapia convencional presencial',
    outcomes: 'Dor (EVA: -2.3 vs -2.1; p=0.45); Roland-Morris (-4.5 vs -4.2)',
    missingInfo: 'Adesão por sessão não relatada no artigo principal',
  },
  {
    id: 'row_2',
    studyCode: 'VIRTUAL-SPINE (2024)',
    reportsList: 'Relatório clínico multicêntrico (Martins et al., 2024)',
    yearCountry: '2024 / Austrália',
    design: 'ECR Multicêntrico',
    sampleSize: 'n = 340 (170 telereab / 170 cuidados habituais)',
    intervention: 'Teleconsulta semanal individualizada + exercícios assíncronos',
    comparator: 'Cuidados médicos habituais',
    outcomes: 'Redução da incapacidade em 12 meses (MD -3.1; IC 95% -4.2 a -2.0)',
    missingInfo: 'Nenhuma informação crítica ausente',
  },
]

export default function LabMExtracao() {
  const [rows, setRows] = useState<ExtractionRow[]>(() => getLabState('lab_e_rows', DEFAULT_ROWS))
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    saveLabState('lab_e_rows', rows)
    markLabCompleted('e-extracao')
  }, [rows])

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: `row_${Date.now()}`,
        studyCode: `NOVO ESTUDO (${new Date().getFullYear()})`,
        reportsList: 'Relatório único',
        yearCountry: 'Ano / País',
        design: 'Ensaio Clínico Randomizado',
        sampleSize: 'n = ',
        intervention: '',
        comparator: '',
        outcomes: '',
        missingInfo: 'Não relatado',
      },
    ])
  }

  const deleteRow = (id: string) => {
    setRows(rows.filter((r) => r.id !== id))
  }

  const updateRow = (id: string, field: keyof ExtractionRow, val: string) => {
    setRows(rows.map((r) => (r.id === id ? { ...r, [field]: val } : r)))
  }

  const handleCopyTable = () => {
    const header =
      'Estudo Único\tRelatórios Vinculados\tAno/País\tDelineamento\tAmostra (n)\tIntervenção\tComparador\tDesfechos Principais\tDados Ausentes\n'
    const body = rows
      .map(
        (r) =>
          `${r.studyCode}\t${r.reportsList}\t${r.yearCountry}\t${r.design}\t${r.sampleSize}\t${r.intervention}\t${r.comparator}\t${r.outcomes}\t${r.missingInfo}`,
      )
      .join('\n')
    navigator.clipboard.writeText(header + body)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Laboratórios', to: '/laboratorios' },
          { label: 'Laboratório E — Matriz de Extração' },
        ]}
      />

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-sm">
            E
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Matriz de Extração e Organização de Dados
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Cadastre, edite e organize os dados primários extraídos. Observe a regra essencial: cada
          linha representa um <strong>Estudo Único</strong>, que pode conter{' '}
          <strong>múltiplos relatórios</strong> vinculados (evitando a duplicação artificial de
          participantes em metanálises).
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          onClick={addRow}
          className="bg-teal-600 hover:bg-teal-700 text-white text-xs gap-1.5 font-semibold"
        >
          <Plus className="h-4 w-4" />
          <span>Adicionar Linha de Estudo</span>
        </Button>

        <Button
          variant="outline"
          onClick={handleCopyTable}
          className="text-xs gap-1.5 border-slate-300 dark:border-slate-700"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-600" />
              <span className="text-emerald-600 font-semibold">Tabela Copiada (TSV/Excel)!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copiar Tabela Estruturada (TSV)</span>
            </>
          )}
        </Button>
      </div>

      {/* LISTA / TABELA EDITÁVEL DE EXTRAÇÃO */}
      <div className="space-y-4">
        {rows.map((row, idx) => (
          <Card
            key={row.id}
            className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
          >
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <Input
                    value={row.studyCode}
                    onChange={(e) => updateRow(row.id, 'studyCode', e.target.value)}
                    className="font-bold text-sm bg-transparent border-none p-0 focus-visible:ring-0 w-64"
                  />
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Excluir registro de extração?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação removerá os dados extraídos de &quot;{row.studyCode}&quot;.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteRow(row.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="lg:col-span-2">
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Relatórios Vinculados (Artigos, Anais, Registros)
                  </label>
                  <Input
                    value={row.reportsList}
                    onChange={(e) => updateRow(row.id, 'reportsList', e.target.value)}
                    placeholder="Artigo de resultados + publicação de protocolo"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Ano / País
                  </label>
                  <Input
                    value={row.yearCountry}
                    onChange={(e) => updateRow(row.id, 'yearCountry', e.target.value)}
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Delineamento
                  </label>
                  <Input
                    value={row.design}
                    onChange={(e) => updateRow(row.id, 'design', e.target.value)}
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Tamanho da Amostra (n)
                  </label>
                  <Input
                    value={row.sampleSize}
                    onChange={(e) => updateRow(row.id, 'sampleSize', e.target.value)}
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Intervenção / Exposição
                  </label>
                  <Input
                    value={row.intervention}
                    onChange={(e) => updateRow(row.id, 'intervention', e.target.value)}
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Comparador
                  </label>
                  <Input
                    value={row.comparator}
                    onChange={(e) => updateRow(row.id, 'comparator', e.target.value)}
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Informações Ausentes
                  </label>
                  <Input
                    value={row.missingInfo}
                    onChange={(e) => updateRow(row.id, 'missingInfo', e.target.value)}
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-4">
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Desfechos e Resultados Extraídos (Médias, DP, IC 95%)
                  </label>
                  <Input
                    value={row.outcomes}
                    onChange={(e) => updateRow(row.id, 'outcomes', e.target.value)}
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
