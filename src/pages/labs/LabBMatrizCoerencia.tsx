import { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle2, RotateCcw, ShieldAlert, BookOpen } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getLabState, saveLabState, markLabCompleted } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface MatrixState {
  problema: string
  pergunta: string
  objetivos: string
  elegibilidade: string
  delineamentos: string
  busca: string
  extracao: string
  avaliacaoCritica: string
  sintese: string
}

const DEFAULT_STATE: MatrixState = {
  problema: 'Aumento da prevalência de dor musculoesquelética crônica em profissionais da saúde.',
  pergunta:
    'Qual é a prevalência de dor lombar em profissionais de enfermagem na atenção hospitalar?',
  objetivos: 'Comparar a eficácia de intervenções ergonômicas contra placebo em enfermagem.', // Intentionally slightly misaligned for testing!
  elegibilidade: 'Estudos observacionais transversais com profissionais de enfermagem atuantes.',
  delineamentos: 'Estudos transversais e coortes de base hospitalar.',
  busca: 'Estratégia sensível combinando termos DeCS para enfermagem e dor lombar no PubMed e BVS.',
  extracao: 'Planilha pilotada com prevalência bruta, IC 95%, faixa etária e turno de trabalho.',
  avaliacaoCritica: 'Checklist do JBI para Estudos de Prevalência (9 itens estruturados).',
  sintese: 'Síntese descritiva e metanálise de proporções com modelo de efeitos aleatórios.',
}

export default function LabBMatrizCoerencia() {
  const [matrix, setMatrix] = useState<MatrixState>(() => getLabState('lab_b', DEFAULT_STATE))

  useEffect(() => {
    saveLabState('lab_b', matrix)
    markLabCompleted('b-matriz-coerencia')
  }, [matrix])

  // Rule-based deterministic consistency check (no artificial quality scores)
  const warnings: { field: string; message: string }[] = []

  const isPrevalence =
    matrix.pergunta.toLowerCase().includes('prevalência') ||
    matrix.pergunta.toLowerCase().includes('prevalencia')

  const hasCompareObjective =
    matrix.objetivos.toLowerCase().includes('comparar') ||
    matrix.objetivos.toLowerCase().includes('eficácia') ||
    matrix.objetivos.toLowerCase().includes('efetividade')

  if (isPrevalence && hasCompareObjective) {
    warnings.push({
      field: 'Objetivos vs. Pergunta',
      message:
        'A sua pergunta é de prevalência/frequência, mas os objetivos mencionam "comparar eficácia/efetividade". Perguntas de prevalência exigem objetivos descritivos de estimativa pontual e por intervalo, não testes comparativos de intervenção.',
    })
  }

  const isEfficacy =
    matrix.pergunta.toLowerCase().includes('eficácia') ||
    matrix.pergunta.toLowerCase().includes('efetividade') ||
    matrix.pergunta.toLowerCase().includes('efeito')

  const mentionsCrossSectional =
    matrix.delineamentos.toLowerCase().includes('transversal') ||
    matrix.delineamentos.toLowerCase().includes('cross-sectional')

  if (isEfficacy && mentionsCrossSectional) {
    warnings.push({
      field: 'Delineamentos vs. Pergunta de Efetividade',
      message:
        'A pergunta busca avaliar efetividade ou efeito de intervenção, mas os delineamentos elegíveis incluem estudos transversais. Estudos transversais não estabelecem relação temporal de causa e efeito.',
    })
  }

  const mentionsRob2InQual =
    matrix.pergunta.toLowerCase().includes('qualitativa') ||
    matrix.pergunta.toLowerCase().includes('percepção') ||
    matrix.pergunta.toLowerCase().includes('vivência')

  const isUsingRob2 = matrix.avaliacaoCritica.toLowerCase().includes('rob 2')

  if (mentionsRob2InQual && isUsingRob2) {
    warnings.push({
      field: 'Avaliação Crítica vs. Modalidade',
      message:
        'Em revisões qualitativas, a ferramenta Cochrane RoB 2 não é aplicável (ela destina-se a ensaios randomizados). Adote o Checklist do JBI para Pesquisa Qualitativa.',
    })
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Laboratórios', to: '/laboratorios' },
          { label: 'Laboratório B — Matriz de Coerência' },
        ]}
      />

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center text-sm">
            B
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Matriz de Coerência Metodológica
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Alinhe cada componente do protocolo de revisão sistemática. O verificador lógico
          identifica inconsistências metodológicas sem atribuir notas numéricas artificiais
          (princípio científico inegociável).
        </p>
      </div>

      {/* ALERT BOX WHEN WARNINGS DETECTED */}
      {warnings.length > 0 ? (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 space-y-2">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-sm">
            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
            <span>Inconsistências Metodológicas Detectadas ({warnings.length}):</span>
          </div>
          <ul className="space-y-1.5 pl-6 list-disc text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
            {warnings.map((w, idx) => (
              <li key={idx}>
                <strong>{w.field}:</strong> {w.message}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Coerência preliminar adequada:</strong> Pergunta, objetivos, delineamentos e
            ferramentas de avaliação apresentam alinhamento metodológico conceitual consistente.
          </span>
        </div>
      )}

      {/* MATRIX FIELDS */}
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <CardContent className="p-6 space-y-5">
          <div className="grid gap-5">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                1. Problema de Pesquisa / Justificativa
              </label>
              <Textarea
                rows={2}
                value={matrix.problema}
                onChange={(e) => setMatrix({ ...matrix, problema: e.target.value })}
                className="mt-1 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                2. Pergunta Científica Estruturada
              </label>
              <Textarea
                rows={2}
                value={matrix.pergunta}
                onChange={(e) => setMatrix({ ...matrix, pergunta: e.target.value })}
                className="mt-1 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                3. Objetivos Gerais e Específicos
              </label>
              <Textarea
                rows={2}
                value={matrix.objetivos}
                onChange={(e) => setMatrix({ ...matrix, objetivos: e.target.value })}
                className="mt-1 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                4. Critérios de Elegibilidade (Inclusão e Exclusão)
              </label>
              <Textarea
                rows={2}
                value={matrix.elegibilidade}
                onChange={(e) => setMatrix({ ...matrix, elegibilidade: e.target.value })}
                className="mt-1 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                5. Delineamentos dos Estudos Primários Elegíveis
              </label>
              <Textarea
                rows={2}
                value={matrix.delineamentos}
                onChange={(e) => setMatrix({ ...matrix, delineamentos: e.target.value })}
                className="mt-1 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                6. Fontes e Estratégia de Busca
              </label>
              <Textarea
                rows={2}
                value={matrix.busca}
                onChange={(e) => setMatrix({ ...matrix, busca: e.target.value })}
                className="mt-1 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                7. Plano de Extração e Organização de Dados
              </label>
              <Textarea
                rows={2}
                value={matrix.extracao}
                onChange={(e) => setMatrix({ ...matrix, extracao: e.target.value })}
                className="mt-1 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                8. Instrumento de Avaliação Crítica / Risco de Viés
              </label>
              <Textarea
                rows={2}
                value={matrix.avaliacaoCritica}
                onChange={(e) => setMatrix({ ...matrix, avaliacaoCritica: e.target.value })}
                className="mt-1 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                9. Plano de Síntese (Narrativa / Metanálise / GRADE)
              </label>
              <Textarea
                rows={2}
                value={matrix.sintese}
                onChange={(e) => setMatrix({ ...matrix, sintese: e.target.value })}
                className="mt-1 text-xs sm:text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
