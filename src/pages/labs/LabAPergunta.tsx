import { useState, useEffect } from 'react'
import { Copy, Check, Sparkles, BookOpen, RotateCcw } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getLabState, saveLabState, markLabCompleted } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Modality = 'efetividade' | 'prevalencia' | 'qualitativa' | 'acuracia' | 'etiologia'

interface QuestionFormState {
  modality: Modality
  p: string
  i: string
  c: string
  o: string
  context: string
}

const DEFAULT_STATE: QuestionFormState = {
  modality: 'efetividade',
  p: 'Adultos com dor lombar crônica inespecífica',
  i: 'Programa de telereabilitação baseado em exercícios guiados',
  c: 'Fisioterapia presencial convencional ou cuidados habituais',
  o: 'Intensidade da dor (EVA/EVN) e incapacidade funcional (Roland-Morris)',
  context: 'Atenção primária à saúde / contexto comunitário',
}

export default function LabAPergunta() {
  const [form, setForm] = useState<QuestionFormState>(() => getLabState('lab_a', DEFAULT_STATE))
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    saveLabState('lab_a', form)
  }, [form])

  const handleCopy = () => {
    const text = generateSynthesis()
    navigator.clipboard.writeText(text)
    setCopied(true)
    markLabCompleted('a-pergunta')
    setTimeout(() => setCopied(false), 2000)
  }

  const generateSynthesis = () => {
    let questionText = ''
    let suggestedDesigns = ''

    if (form.modality === 'efetividade') {
      questionText = `Em ${form.p || '[População]'}, qual é a efetividade de ${form.i || '[Intervenção]'}, comparado a ${form.c || '[Comparador]'}, para os desfechos de ${form.o || '[Desfechos]'}?`
      suggestedDesigns =
        'Ensaios Clínicos Randomizados (ECR); quando inviáveis eticamente: Estudos Observacionais Analíticos com pareamento por escore de propensão.'
    } else if (form.modality === 'prevalencia') {
      questionText = `Qual é a prevalência/incidência de ${form.i || '[Condição]'} em ${form.p || '[População]'} no contexto de ${form.context || '[Contexto]'}?`
      suggestedDesigns =
        'Estudos observacionais transversais de base populacional ou coortes de incidência.'
    } else if (form.modality === 'qualitativa') {
      questionText = `Como ${form.p || '[População]'} vivenciam e percebem ${form.i || '[Fenômeno de Interesse]'} no contexto de ${form.context || '[Contexto]'}?`
      suggestedDesigns =
        'Estudos qualitativos primários (Fenomenologia, Teoria Fundamentada nos Dados, Etnografia).'
    } else if (form.modality === 'acuracia') {
      questionText = `Qual é a acurácia diagnóstica do teste ${form.i || '[Teste Índice]'}, comparado ao padrão de referência ${form.c || '[Padrão-ouro]'}, para detecção de ${form.o || '[Condição Alvo]'} em ${form.p || '[População]'}?`
      suggestedDesigns =
        'Estudos de acurácia diagnóstica prospectivos pareados e transversais cegados.'
    } else {
      questionText = `Em ${form.p || '[População]'}, a exposição a ${form.i || '[Fator de Risco]'}, comparada a ${form.c || '[Não Expostos]'}, está associada a ${form.o || '[Desfecho]'}?`
      suggestedDesigns = 'Estudos de coorte prospectiva ou estudos de caso-controle bem delineados.'
    }

    return `SÍNTESE METODOLÓGICA DA PERGUNTA DE PESQUISA (REDI 2026)
------------------------------------------------------------
Modalidade de Revisão: ${form.modality.toUpperCase()}
Estrutura Adotada: ${form.modality === 'qualitativa' ? 'PICo / SPIDER' : form.modality === 'prevalencia' ? 'CoCoPop' : 'PICO'}

Componentes Detalhados:
• População/Amostra: ${form.p}
• Intervenção / Fenômeno / Exposição / Condição: ${form.i}
• Comparador / Referência (quando aplicável): ${form.c || 'Não aplicável para este desenho'}
• Desfechos / Avaliação: ${form.o || 'Não aplicável'}
• Contexto / Cenário: ${form.context}

Pergunta Formulada:
"${questionText}"

Delineamentos Primários Sugeridos (a priori):
${suggestedDesigns}

Fundamentação: JBI Manual for Evidence Synthesis (Aromataris et al., 2024).`
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Laboratórios', to: '/laboratorios' },
          { label: 'Laboratório A — Gerador de Pergunta' },
        ]}
      />

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center text-sm">
            A
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Gerador de Pergunta de Pesquisa
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Estruture a pergunta científica da revisão sistemática utilizando o acrônimo correto para
          a sua modalidade (PICO, PICo, CoCoPop). Gere a formulação final e os delineamentos
          primários correspondentes recomendados pelo JBI.
        </p>
      </div>

      {/* SELECTOR DE MODALIDADE */}
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <CardContent className="p-5 space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Passo 1: Selecione a Modalidade de Revisão Sistemática
          </label>
          <Select
            value={form.modality}
            onValueChange={(val: Modality) => setForm((prev) => ({ ...prev, modality: val }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione a modalidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="efetividade">
                Revisão de Efetividade de Intervenções (PICO)
              </SelectItem>
              <SelectItem value="prevalencia">
                Revisão de Prevalência e Incidência (CoCoPop)
              </SelectItem>
              <SelectItem value="qualitativa">
                Revisão Qualitativa / Metassíntese (PICo / SPIDER)
              </SelectItem>
              <SelectItem value="acuracia">Revisão de Acurácia Diagnóstica (PIRT)</SelectItem>
              <SelectItem value="etiologia">
                Revisão de Etiologia e Fatores de Risco (PEO)
              </SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* CAMPOS ESTRUTURADOS */}
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <CardContent className="p-6 space-y-5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Passo 2: Preencha os Componentes Estruturados
          </label>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                <span>População / Participantes (P)</span>
                <span className="text-[11px] text-slate-400 font-normal">
                  Idade, condição, critérios clínicos
                </span>
              </label>
              <Input
                value={form.p}
                onChange={(e) => setForm({ ...form, p: e.target.value })}
                placeholder="Ex: Adultos com diabetes mellitus tipo 2"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                <span>
                  {form.modality === 'qualitativa'
                    ? 'Fenômeno de Interesse (I)'
                    : form.modality === 'prevalencia'
                      ? 'Condição em Saúde (C)'
                      : 'Intervenção / Exposição (I)'}
                </span>
                <span className="text-[11px] text-slate-400 font-normal">
                  Tratamento, vivência ou exposição
                </span>
              </label>
              <Input
                value={form.i}
                onChange={(e) => setForm({ ...form, i: e.target.value })}
                placeholder="Ex: Telereabilitação guiada por fisioterapeuta"
                className="mt-1"
              />
            </div>

            {form.modality !== 'prevalencia' && form.modality !== 'qualitativa' && (
              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                  <span>Comparador ou Padrão de Referência (C)</span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    Placebo, controle ou cuidado habitual
                  </span>
                </label>
                <Input
                  value={form.c}
                  onChange={(e) => setForm({ ...form, c: e.target.value })}
                  placeholder="Ex: Cuidados habituais presenciais"
                  className="mt-1"
                />
              </div>
            )}

            {form.modality !== 'qualitativa' && (
              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                  <span>Desfechos Prioritários (Outcomes - O)</span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    Métricas clínicas, qualidade de vida
                  </span>
                </label>
                <Input
                  value={form.o}
                  onChange={(e) => setForm({ ...form, o: e.target.value })}
                  placeholder="Ex: Dor, capacidade funcional, eventos adversos"
                  className="mt-1"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                <span>Contexto / Cenário de Aplicação</span>
                <span className="text-[11px] text-slate-400 font-normal">
                  Atenção primária, hospitalar, país
                </span>
              </label>
              <Input
                value={form.context}
                onChange={(e) => setForm({ ...form, context: e.target.value })}
                placeholder="Ex: Atenção primária à saúde"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RESULTADO GERADO */}
      <Card className="border-sky-300 dark:border-sky-900 bg-sky-50/40 dark:bg-sky-950/20 shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sky-800 dark:text-sky-300">
              <Sparkles className="h-5 w-5 text-sky-600" />
              <h2 className="text-base font-bold">Síntese Estruturada Gerada</h2>
            </div>

            <Button
              size="sm"
              onClick={handleCopy}
              className="bg-sky-600 hover:bg-sky-700 text-white text-xs gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copiado com Sucesso!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copiar Síntese Completa</span>
                </>
              )}
            </Button>
          </div>

          <pre className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
            {generateSynthesis()}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
