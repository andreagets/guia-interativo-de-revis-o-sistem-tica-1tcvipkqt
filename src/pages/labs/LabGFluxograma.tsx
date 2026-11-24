import { useState, useRef, useEffect } from 'react'
import {
  FileSpreadsheet,
  Download,
  Copy,
  Check,
  AlertCircle,
  HelpCircle,
  Maximize2,
  Minimize2,
  RefreshCw,
  ExternalLink,
  Plus,
  Trash2,
  Sparkles,
} from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import PrismaSvgDiagram from '@/components/PrismaSvgDiagram'
import {
  PrismaFormData,
  PrismaTemplateId,
  DEFAULT_PRISMA_NEW_V1,
  DEFAULT_PRISMA_NEW_V2,
  DEFAULT_PRISMA_UPDATED_V1,
  DEFAULT_PRISMA_UPDATED_V2,
  validatePrismaData,
  ValidationError,
  ExclusionReason,
} from '@/data/prismaTypes'
import { getLabState, saveLabState, markLabCompleted } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function LabGFluxograma() {
  // Two sequential guided selection questions (prompt item 6.2)
  const [reviewSituation, setReviewSituation] = useState<'new' | 'updated'>('new')
  const [sourcesUsed, setSourcesUsed] = useState<'databases_only' | 'databases_and_others'>(
    'databases_only',
  )

  // Auto-computed templateId based on answers
  const computedTemplateId: PrismaTemplateId =
    reviewSituation === 'new'
      ? sourcesUsed === 'databases_only'
        ? 'new_v1'
        : 'new_v2'
      : sourcesUsed === 'databases_only'
        ? 'updated_v1'
        : 'updated_v2'

  // Per-template state persistence in localStorage
  const [formData, setFormData] = useState<PrismaFormData>(() => {
    const saved = getLabState<PrismaFormData | null>(`lab_g_${computedTemplateId}`, null)
    if (saved) return saved
    if (computedTemplateId === 'new_v1') return DEFAULT_PRISMA_NEW_V1
    if (computedTemplateId === 'new_v2') return DEFAULT_PRISMA_NEW_V2
    if (computedTemplateId === 'updated_v1') return DEFAULT_PRISMA_UPDATED_V1
    return DEFAULT_PRISMA_UPDATED_V2
  })

  // When selection changes, switch form data accordingly
  useEffect(() => {
    const saved = getLabState<PrismaFormData | null>(`lab_g_${computedTemplateId}`, null)
    if (saved) {
      setFormData(saved)
    } else {
      if (computedTemplateId === 'new_v1') setFormData(DEFAULT_PRISMA_NEW_V1)
      else if (computedTemplateId === 'new_v2') setFormData(DEFAULT_PRISMA_NEW_V2)
      else if (computedTemplateId === 'updated_v1') setFormData(DEFAULT_PRISMA_UPDATED_V1)
      else setFormData(DEFAULT_PRISMA_UPDATED_V2)
    }
  }, [computedTemplateId])

  // Save changes
  useEffect(() => {
    saveLabState(`lab_g_${formData.templateId}`, formData)
    const errs = validatePrismaData(formData)
    if (errs.length === 0) {
      markLabCompleted('g-fluxograma')
    }
  }, [formData])

  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
  const [fullscreenOpen, setFullscreenOpen] = useState(false)
  const [copiedText, setCopiedText] = useState(false)
  const svgRef = useRef<SVGSVGElement | null>(null)

  // Realtime validation
  useEffect(() => {
    setValidationErrors(validatePrismaData(formData))
  }, [formData])

  const isValid = validationErrors.length === 0

  const updateField = (field: keyof PrismaFormData, val: number) => {
    setFormData((prev) => ({ ...prev, [field]: isNaN(val) ? 0 : val }))
  }

  // Exclusion reasons helpers (Branch 1)
  const addExclusionReason = () => {
    const newReason: ExclusionReason = {
      id: String(Date.now()),
      reason: 'Outro motivo metodológico específico',
      count: 0,
    }
    setFormData((prev) => ({
      ...prev,
      exclusionReasons: [...prev.exclusionReasons, newReason],
    }))
  }

  const removeExclusionReason = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      exclusionReasons: prev.exclusionReasons.filter((r) => r.id !== id),
    }))
  }

  const updateExclusionReason = (id: string, text: string, count: number) => {
    setFormData((prev) => ({
      ...prev,
      exclusionReasons: prev.exclusionReasons.map((r) =>
        r.id === id ? { ...r, reason: text, count: isNaN(count) ? 0 : count } : r,
      ),
    }))
  }

  // Export as PNG (High resolution via Canvas)
  const handleExportRaster = (format: 'png' | 'jpeg') => {
    if (!svgRef.current) return
    const svgElement = svgRef.current
    const svgData = new XMLSerializer().serializeToString(svgElement)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const blobURL = window.URL.createObjectURL(svgBlob)

    const img = new Image()
    img.onload = () => {
      const scale = 2.5 // High-res export factor
      const canvas = document.createElement('canvas')
      canvas.width = svgElement.viewBox.baseVal.width * scale
      canvas.height = svgElement.viewBox.baseVal.height * scale
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png'
      const dataUri = canvas.toDataURL(mime, 0.95)
      const a = document.createElement('a')
      a.href = dataUri
      a.download = `prisma-2020-${computedTemplateId}.${format === 'jpeg' ? 'jpg' : 'png'}`
      a.click()
      window.URL.revokeObjectURL(blobURL)
    }
    img.src = blobURL
  }

  // Export as SVG directly
  const handleExportSvg = () => {
    if (!svgRef.current) return
    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `prisma-2020-${computedTemplateId}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Copiar síntese textual das contagens
  const handleCopyTextSynthesis = () => {
    const isV2 = computedTemplateId.includes('v2')
    const isUp = computedTemplateId.includes('updated')

    const reasonsText = formData.exclusionReasons
      .map((r) => `    - ${r.reason}: n = ${r.count}`)
      .join('\n')

    const text = `SÍNTESE TEXTUAL DO FLUXOGRAMA PRISMA 2020
--------------------------------------------------------
Modelo: ${computedTemplateId.toUpperCase()} (${isUp ? 'Revisão Atualizada' : 'Revisão Nova'}, ${isV2 ? 'Bases + Outras Fontes' : 'Apenas Bases/Registros'})
Status de Validação Numérica: ${isValid ? 'VÁLIDO' : 'PENDENTE DE CORREÇÃO'}

1. IDENTIFICAÇÃO (BASES DE DADOS E REGISTROS)
  • Registros em bases de dados: ${formData.recDatabases}
  • Registros em registros de ensaios: ${formData.recRegisters}
  • Total identificado: ${formData.recDatabases + formData.recRegisters}
  • Duplicatas removidas: ${formData.dupRemoved}
  • Inelegíveis por automação: ${formData.ineligibleAutomation}
  • Removidos por outros motivos: ${formData.removedOtherReasons}

2. TRIAGEM
  • Registros triados (títulos/resumos): ${formData.recScreened}
  • Registros excluídos na triagem: ${formData.recExcluded}

3. RECUPERAÇÃO
  • Relatórios procurados para recuperação: ${formData.repSought}
  • Relatórios não recuperados: ${formData.repNotRetrieved}

4. ELEGIBILIDADE
  • Relatórios avaliados para elegibilidade: ${formData.repAssessed}
  • Relatórios excluídos na elegibilidade: ${formData.repExcluded}
  • Motivos de exclusão:
${reasonsText}

${
  isV2
    ? `OUTRAS FONTES (WEBSITES, ORGANIZAÇÕES, CITAÇÕES):
  • Relatórios avaliados: ${formData.otherRepAssessed}
  • Relatórios excluídos: ${formData.otherRepExcluded}`
    : ''
}

5. INCLUSÃO FINAL
  • Estudos únicos incluídos: ${formData.studiesIncluded}
  • Relatórios dos estudos incluídos: ${formData.reportsIncluded}
${
  isUp
    ? `  • Total de estudos na revisão atualizada: ${formData.totalStudies}
  • Total de relatórios: ${formData.totalReports}`
    : ''
}

Referência: Page MJ, et al. The PRISMA 2020 statement. BMJ 2021;372:n71.`

    navigator.clipboard.writeText(text)
    setCopiedText(true)
    setTimeout(() => setCopiedText(false), 2000)
  }

  // Load consistent example
  const handleLoadConsistentExample = () => {
    if (computedTemplateId === 'new_v1') setFormData(DEFAULT_PRISMA_NEW_V1)
    else if (computedTemplateId === 'new_v2') setFormData(DEFAULT_PRISMA_NEW_V2)
    else if (computedTemplateId === 'updated_v1') setFormData(DEFAULT_PRISMA_UPDATED_V1)
    else setFormData(DEFAULT_PRISMA_UPDATED_V2)
  }

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Laboratórios', to: '/laboratorios' },
          { label: 'Laboratório G — Construtor PRISMA 2020' },
        ]}
      />

      {/* HEADER PRINCIPAL */}
      <div className="space-y-2 border-b pb-4">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center text-sm">
            G
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Construtor Didático de Fluxograma PRISMA 2020
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-4xl">
          Selecione o modelo oficial a partir de duas perguntas orientadas, preencha os dados por
          fases, valide a coerência algébrica com mensagens claras e exporte o diagrama em SVG, PNG
          de alta resolução ou JPEG.
        </p>
      </div>

      {/* 6.7 CONTEXTO DE APRENDIZAGEM ANTES DO PREENCHIMENTO */}
      <Card className="border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 shadow-xs">
        <CardContent className="p-5 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold uppercase tracking-wider text-xs">
            <HelpCircle className="h-4 w-4 text-amber-600" />
            <span>Fundamentação do Fluxograma PRISMA 2020 (Page et al., 2021a)</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1">
              <strong>Por que existem 4 modelos oficiais?</strong>
              <p className="text-slate-600 dark:text-slate-400">
                Porque revisões novas diferem de atualizações (que já herdam estudos anteriores), e
                buscas que usam apenas bases indexadas diferem daquelas que usam outros métodos
                (websites, organizações, busca em citações).
              </p>
            </div>
            <div className="space-y-1">
              <strong>A distinção inegociável de unidades:</strong>
              <p className="text-slate-600 dark:text-slate-400">
                <strong>Registro:</strong> metadados da busca. <strong>Relatório:</strong> o artigo
                ou documento completo.
                <strong> Estudo:</strong> a investigação em si. Um estudo pode ter 2 ou mais
                relatórios, por isso estudos incluídos ≤ relatórios incluídos.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 6.2 SELEÇÃO ORIENTADA DO MODELO EM 2 PERGUNTAS */}
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <CardContent className="p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Seleção Orientada do Modelo Oficial
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Responda às 2 perguntas sequenciais para determinar o modelo PRISMA 2020 exato para a
              sua revisão.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Pergunta 1 */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                Pergunta 1 — Qual é a situação da revisão?
              </label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setReviewSituation('new')}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
                    reviewSituation === 'new'
                      ? 'border-sky-500 bg-sky-50 text-sky-900 dark:bg-sky-950 dark:text-sky-200 ring-1 ring-sky-500 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700 dark:border-slate-700 dark:text-slate-300'
                  }`}
                >
                  Estou conduzindo uma <strong>revisão sistemática nova</strong>
                </button>

                <button
                  type="button"
                  onClick={() => setReviewSituation('updated')}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
                    reviewSituation === 'updated'
                      ? 'border-sky-500 bg-sky-50 text-sky-900 dark:bg-sky-950 dark:text-sky-200 ring-1 ring-sky-500 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700 dark:border-slate-700 dark:text-slate-300'
                  }`}
                >
                  Estou conduzindo uma <strong>atualização de revisão prévia</strong>
                </button>
              </div>
            </div>

            {/* Pergunta 2 */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                Pergunta 2 — Quais fontes de identificação foram utilizadas?
              </label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setSourcesUsed('databases_only')}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
                    sourcesUsed === 'databases_only'
                      ? 'border-teal-500 bg-teal-50 text-teal-900 dark:bg-teal-950 dark:text-teal-200 ring-1 ring-teal-500 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700 dark:border-slate-700 dark:text-slate-300'
                  }`}
                >
                  Apenas <strong>bases de dados e registros</strong> de ensaios (v1)
                </button>

                <button
                  type="button"
                  onClick={() => setSourcesUsed('databases_and_others')}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
                    sourcesUsed === 'databases_and_others'
                      ? 'border-teal-500 bg-teal-50 text-teal-900 dark:bg-teal-950 dark:text-teal-200 ring-1 ring-teal-500 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700 dark:border-slate-700 dark:text-slate-300'
                  }`}
                >
                  Bases/registros <strong>E outras fontes</strong> (websites, organizações, citações
                  - v2)
                </button>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-100 dark:bg-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-semibold text-slate-500">Modelo Oficial Selecionado:</span>{' '}
              <strong className="text-slate-900 dark:text-white uppercase font-mono">
                {computedTemplateId === 'new_v1' && 'PRISMA_2020_flow_diagram_new_SRs_v1.docx'}
                {computedTemplateId === 'new_v2' && 'PRISMA_2020_flow_diagram_new_SRs_v2.docx'}
                {computedTemplateId === 'updated_v1' &&
                  'PRISMA_2020_flow_diagram_updated_SRs_v1.docx'}
                {computedTemplateId === 'updated_v2' &&
                  'PRISMA_2020_flow_diagram_updated_SRs_v2.docx'}
              </strong>
            </div>

            <a
              href="https://www.prisma-statement.org/prisma-2020-flow-diagram"
              target="_blank"
              rel="noreferrer"
              className="text-sky-600 hover:underline inline-flex items-center gap-1 font-medium"
            >
              Consultar Word oficial no PRISMA Statement <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </CardContent>
      </Card>

      {/* STATUS DE VALIDAÇÃO NUMÉRICA */}
      {validationErrors.length > 0 ? (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
            <span>
              Fluxograma com Inconsistências Matemáticas ({validationErrors.length} erros):
            </span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">
            O PRISMA 2020 exige que nenhuma conta apresente divergência entre etapas. O diagrama NÃO
            pode ser considerado validado até que todas as inconsistências sejam corrigidas.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            {validationErrors.map((err, idx) => (
              <li key={idx}>
                <strong>{err.field}:</strong> {err.message}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-semibold">
            <Check className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>
              Fluxograma 100% matematicamente consistente e validado segundo as diretrizes PRISMA
              2020!
            </span>
          </div>
          <Badge className="bg-emerald-600 text-white text-[10px]">Validado</Badge>
        </div>
      )}

      {/* ÁREA PRINCIPAL: FORMULÁRIO DE PREENCHIMENTO + VISUALIZAÇÃO SVG */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* COLUNA ESQUERDA: CAMPOS ORGANIZADOS POR FASES (prompt item 6.3) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Campos de Preenchimento Numérico
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLoadConsistentExample}
              className="text-xs gap-1"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Carregar Exemplo Consistente</span>
            </Button>
          </div>

          {/* FASE: IDENTIFICAÇÃO */}
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <CardContent className="p-4 space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5 border-b pb-1.5">
                <span>1. Identificação (Bases & Registros)</span>
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Bases de dados (n)
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={formData.recDatabases}
                    onChange={(e) => updateField('recDatabases', parseInt(e.target.value, 10))}
                  />
                </div>
                <div>
                  <label className="font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Registros de ensaios (n)
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={formData.recRegisters}
                    onChange={(e) => updateField('recRegisters', parseInt(e.target.value, 10))}
                  />
                </div>

                <div>
                  <label className="font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Duplicatas removidas (n)
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={formData.dupRemoved}
                    onChange={(e) => updateField('dupRemoved', parseInt(e.target.value, 10))}
                  />
                </div>

                <div>
                  <label className="font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Inelegíveis por automação (n)
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={formData.ineligibleAutomation}
                    onChange={(e) =>
                      updateField('ineligibleAutomation', parseInt(e.target.value, 10))
                    }
                  />
                </div>

                <div className="col-span-2">
                  <label className="font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Removidos por outros motivos (n)
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={formData.removedOtherReasons}
                    onChange={(e) =>
                      updateField('removedOtherReasons', parseInt(e.target.value, 10))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FASE: TRIAGEM & RECUPERAÇÃO */}
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <CardContent className="p-4 space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-teal-800 dark:text-teal-400 flex items-center gap-1.5 border-b pb-1.5">
                <span>2. Triagem e Recuperação</span>
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Registros triados (n)
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={formData.recScreened}
                    onChange={(e) => updateField('recScreened', parseInt(e.target.value, 10))}
                  />
                </div>
                <div>
                  <label className="font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Registros excluídos (n)
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={formData.recExcluded}
                    onChange={(e) => updateField('recExcluded', parseInt(e.target.value, 10))}
                  />
                </div>

                <div>
                  <label className="font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Relatórios procurados (n)
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={formData.repSought}
                    onChange={(e) => updateField('repSought', parseInt(e.target.value, 10))}
                  />
                </div>
                <div>
                  <label className="font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Não recuperados (n)
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={formData.repNotRetrieved}
                    onChange={(e) => updateField('repNotRetrieved', parseInt(e.target.value, 10))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FASE: ELEGIBILIDADE E MOTIVOS DE EXCLUSÃO */}
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <CardContent className="p-4 space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-indigo-800 dark:text-indigo-400 flex items-center gap-1.5 border-b pb-1.5">
                <span>3. Elegibilidade e Motivos de Exclusão</span>
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Relatórios avaliados (n)
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={formData.repAssessed}
                    onChange={(e) => updateField('repAssessed', parseInt(e.target.value, 10))}
                  />
                </div>
                <div>
                  <label className="font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Total excluídos (n)
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={formData.repExcluded}
                    onChange={(e) => updateField('repExcluded', parseInt(e.target.value, 10))}
                  />
                </div>
              </div>

              {/* Lista dinâmica de motivos de exclusão */}
              <div className="pt-2 border-t space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                    Motivos específicos de exclusão:
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={addExclusionReason}
                    className="h-6 text-[10px] text-indigo-600 gap-1"
                  >
                    <Plus className="h-3 w-3" /> Adicionar Motivo
                  </Button>
                </div>

                {formData.exclusionReasons.map((r) => (
                  <div key={r.id} className="flex items-center gap-2">
                    <Input
                      value={r.reason}
                      onChange={(e) => updateExclusionReason(r.id, e.target.value, r.count)}
                      placeholder="Motivo..."
                      className="text-xs flex-1"
                    />
                    <Input
                      type="number"
                      min={0}
                      value={r.count}
                      onChange={(e) =>
                        updateExclusionReason(r.id, r.reason, parseInt(e.target.value, 10))
                      }
                      className="w-20 text-xs"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExclusionReason(r.id)}
                      className="h-8 w-8 p-0 text-rose-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* FASE: INCLUSÃO */}
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <CardContent className="p-4 space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5 border-b pb-1.5">
                <span>4. Inclusão de Estudos e Relatórios</span>
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Estudos únicos incluídos (n)
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={formData.studiesIncluded}
                    onChange={(e) => updateField('studiesIncluded', parseInt(e.target.value, 10))}
                  />
                </div>
                <div>
                  <label className="font-medium text-slate-700 dark:text-slate-300 block mb-1">
                    Relatórios incluídos (n)
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={formData.reportsIncluded}
                    onChange={(e) => updateField('reportsIncluded', parseInt(e.target.value, 10))}
                  />
                </div>
              </div>

              {/* CAMPOS DE REVISÃO ATUALIZADA (SE APLICÁVEL) */}
              {(computedTemplateId === 'updated_v1' || computedTemplateId === 'updated_v2') && (
                <div className="pt-2 border-t grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-medium text-slate-700 dark:text-slate-300 block mb-1">
                      Estudos versão anterior (n)
                    </label>
                    <Input
                      type="number"
                      min={0}
                      value={formData.prevStudies}
                      onChange={(e) => updateField('prevStudies', parseInt(e.target.value, 10))}
                    />
                  </div>
                  <div>
                    <label className="font-medium text-slate-700 dark:text-slate-300 block mb-1">
                      Relatórios versão anterior (n)
                    </label>
                    <Input
                      type="number"
                      min={0}
                      value={formData.prevReports}
                      onChange={(e) => updateField('prevReports', parseInt(e.target.value, 10))}
                    />
                  </div>

                  <div>
                    <label className="font-medium text-slate-700 dark:text-slate-300 block mb-1">
                      Novos estudos atualização (n)
                    </label>
                    <Input
                      type="number"
                      min={0}
                      value={formData.newStudies}
                      onChange={(e) => updateField('newStudies', parseInt(e.target.value, 10))}
                    />
                  </div>
                  <div>
                    <label className="font-medium text-slate-700 dark:text-slate-300 block mb-1">
                      Novos relatórios atualização (n)
                    </label>
                    <Input
                      type="number"
                      min={0}
                      value={formData.newReports}
                      onChange={(e) => updateField('newReports', parseInt(e.target.value, 10))}
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-900 dark:text-white block mb-1">
                      Total estudos revisão (n)
                    </label>
                    <Input
                      type="number"
                      min={0}
                      value={formData.totalStudies}
                      onChange={(e) => updateField('totalStudies', parseInt(e.target.value, 10))}
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-900 dark:text-white block mb-1">
                      Total relatórios revisão (n)
                    </label>
                    <Input
                      type="number"
                      min={0}
                      value={formData.totalReports}
                      onChange={(e) => updateField('totalReports', parseInt(e.target.value, 10))}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* COLUNA DIREITA: RENDERIZAÇÃO SVG E BOTÕES DE EXPORTAÇÃO */}
        <div className="lg:col-span-7 space-y-4 sticky top-20">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Prévia Vetorial SVG (PRISMA 2020)
              </h2>
              <Badge variant={isValid ? 'default' : 'destructive'} className="text-[10px]">
                {isValid ? 'Válido' : 'Inconsistente'}
              </Badge>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setFullscreenOpen(true)}
              className="text-xs gap-1"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Ampliar</span>
            </Button>
          </div>

          {/* RENDERIZAÇÃO DO DIAGRAMA SVG */}
          <div className="w-full bg-slate-100 dark:bg-slate-800/40 p-2 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
            <PrismaSvgDiagram data={formData} svgRef={svgRef} />
          </div>

          {/* BARRA DE AÇÕES DE EXPORTAÇÃO */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="font-bold text-xs uppercase tracking-wider text-slate-500">
              Opções de Exportação em Alta Resolução:
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={() => handleExportRaster('png')}
                className="bg-amber-600 hover:bg-amber-700 text-white text-xs gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Exportar PNG (Alta Resolução)</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExportRaster('jpeg')}
                className="text-xs gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Exportar JPEG</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleExportSvg}
                className="text-xs gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Baixar SVG Vetorial</span>
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopyTextSynthesis}
                className="text-xs gap-1.5"
              >
                {copiedText ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">Síntese Copiada!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copiar Síntese Textual</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL FULLSCREEN AMPLIAÇÃO */}
      <Dialog open={fullscreenOpen} onOpenChange={setFullscreenOpen}>
        <DialogContent className="max-w-6xl max-h-[92vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Visualização Ampliada — Fluxograma PRISMA 2020</DialogTitle>
          </DialogHeader>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg">
            <PrismaSvgDiagram data={formData} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
