import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  CheckCircle2,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  FlaskConical,
  RotateCcw,
} from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { MODULES_DATA, PHASES } from '@/data/modules'
import { LABS_DATA } from '@/data/labs'
import {
  markModuleVisited,
  toggleModuleCompleted,
  setReadingAnchor,
  getProgress,
} from '@/lib/storage'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function ModulePage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const moduleData = MODULES_DATA.find((m) => m.slug === slug)

  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    if (moduleData) {
      markModuleVisited(moduleData.id, `/modulo/${moduleData.slug}`, moduleData.title)
      const p = getProgress()
      setIsCompleted(p.completedModules.includes(moduleData.id))
      window.scrollTo(0, 0)
    }
  }, [moduleData])

  if (!moduleData) {
    return (
      <div className="container max-w-4xl mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Módulo não encontrado</h1>
        <p className="text-slate-600 mb-6">
          O módulo solicitado não existe ou o endereço foi alterado.
        </p>
        <Link to="/" className="text-sky-600 font-semibold underline">
          Voltar para o início
        </Link>
      </div>
    )
  }

  const phase = PHASES.find((p) => p.number === moduleData.phaseNumber)
  const linkedLab = moduleData.linkedLabId
    ? LABS_DATA.find((l) => l.id === moduleData.linkedLabId)
    : null

  const handleToggleComplete = () => {
    toggleModuleCompleted(moduleData.id)
    setIsCompleted((prev) => !prev)
  }

  const handleOpenLab = (labPath: string) => {
    // Record current scroll position to allow returning back seamlessly
    setReadingAnchor({
      moduleSlug: moduleData.slug,
      scrollY: window.scrollY,
      title: moduleData.title,
    })
    navigate(labPath)
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 space-y-8">
      {/* BREADCRUMB */}
      <Breadcrumbs
        items={[
          { label: `Fase ${phase?.roman}: ${phase?.title}`, to: '/' },
          { label: moduleData.title },
        ]}
      />

      {/* HEADER DO MÓDULO */}
      <div className="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge
            className="text-xs font-semibold px-2.5 py-0.5 text-white"
            style={{ backgroundColor: phase?.color }}
          >
            FASE {phase?.roman} — {phase?.title}
          </Badge>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">
              ~{moduleData.estimatedMinutes} min de leitura
            </span>
            <Button
              variant={isCompleted ? 'default' : 'outline'}
              size="sm"
              onClick={handleToggleComplete}
              className={`text-xs gap-1.5 ${
                isCompleted
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'border-slate-300 dark:border-slate-700'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{isCompleted ? 'Módulo Concluído' : 'Marcar como Concluído'}</span>
            </Button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {moduleData.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium">
          {moduleData.subtitle}
        </p>
      </div>

      {/* 1. O QUE VOCÊ APRENDERÁ */}
      <Card className="border-sky-200 dark:border-sky-900/60 bg-sky-50/50 dark:bg-sky-950/20 shadow-xs">
        <CardContent className="p-5 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-sky-600" />
            1. O Que Você Aprenderá Neste Módulo
          </h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {moduleData.learningObjectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* 2. FUNDAMENTAÇÃO CONCEITUAL */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
          <BookOpen className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            2. Fundamentação Conceitual
          </h2>
        </div>

        <div className="grid gap-4">
          {moduleData.conceptualBlocks.map((block, idx) => (
            <Card
              key={idx}
              className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs"
            >
              <CardContent className="p-5 space-y-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white text-indigo-900 dark:text-indigo-300">
                  {block.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {block.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. EXPLICAÇÃO EM LINGUAGEM DIALÓGICA ACESSÍVEL (6 QUESTÕES OBRIGATÓRIAS) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
          <HelpCircle className="h-5 w-5 text-teal-600" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            3. Explicação em Linguagem Científica Acessível
          </h2>
        </div>

        <Accordion
          type="multiple"
          defaultValue={['oQueE', 'paraQueServe', 'comoAplicar', 'queErrosEvitar']}
          className="w-full space-y-2"
        >
          <AccordionItem
            value="oQueE"
            className="border rounded-lg px-4 bg-white dark:bg-slate-900"
          >
            <AccordionTrigger className="text-sm font-semibold text-slate-900 dark:text-slate-100 hover:no-underline">
              O que é?
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {moduleData.dialogicQuestions.oQueE}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="paraQueServe"
            className="border rounded-lg px-4 bg-white dark:bg-slate-900"
          >
            <AccordionTrigger className="text-sm font-semibold text-slate-900 dark:text-slate-100 hover:no-underline">
              Para que serve?
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {moduleData.dialogicQuestions.paraQueServe}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="quandoUtilizar"
            className="border rounded-lg px-4 bg-white dark:bg-slate-900"
          >
            <AccordionTrigger className="text-sm font-semibold text-slate-900 dark:text-slate-100 hover:no-underline">
              Quando utilizar?
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {moduleData.dialogicQuestions.quandoUtilizar}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="comoAplicar"
            className="border rounded-lg px-4 bg-white dark:bg-slate-900"
          >
            <AccordionTrigger className="text-sm font-semibold text-slate-900 dark:text-slate-100 hover:no-underline">
              Como aplicar na prática da pesquisa?
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {moduleData.dialogicQuestions.comoAplicar}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="queDecisaoTomar"
            className="border rounded-lg px-4 bg-white dark:bg-slate-900"
          >
            <AccordionTrigger className="text-sm font-semibold text-slate-900 dark:text-slate-100 hover:no-underline">
              Que decisão metodológica precisa ser tomada?
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {moduleData.dialogicQuestions.queDecisaoTomar}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="queErrosEvitar"
            className="border rounded-lg px-4 bg-white dark:bg-slate-900"
          >
            <AccordionTrigger className="text-sm font-semibold text-slate-900 dark:text-slate-100 hover:no-underline text-rose-600">
              Que erros devem ser rigorosamente evitados?
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {moduleData.dialogicQuestions.queErrosEvitar}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* 4. EXEMPLO APLICADO */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
          4. Exemplo Aplicado na Área da Saúde
        </h2>

        <Card className="border-teal-200 dark:border-teal-900/60 bg-teal-50/40 dark:bg-teal-950/20">
          <CardContent className="p-5 space-y-3">
            <div className="font-semibold text-xs uppercase tracking-wider text-teal-800 dark:text-teal-300">
              Cenário Clínico / Epidemiológico Realista
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
              {moduleData.appliedExample.context}
            </p>
            <div className="p-3 rounded-md bg-white/80 dark:bg-slate-900/80 border border-teal-100 dark:border-teal-900/50 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Aplicação do método:</strong> {moduleData.appliedExample.scenario}
            </div>
            <p className="text-xs text-teal-900 dark:text-teal-200 italic">
              <strong>Análise metodológica:</strong> {moduleData.appliedExample.analysis}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 5. ERROS METODOLÓGICOS FREQUENTES (PEGADINHAS) */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          5. Erros Metodológicos Frequentes (&quot;Pegadinhas&quot;)
        </h2>

        <div className="grid gap-3">
          {moduleData.commonErrors.map((err, idx) => (
            <Card
              key={idx}
              className="border-rose-200 dark:border-rose-900/60 bg-white dark:bg-slate-900 shadow-xs"
            >
              <CardContent className="p-4 space-y-2 text-xs sm:text-sm">
                <div className="flex items-start gap-2 text-rose-700 dark:text-rose-400 font-semibold">
                  <span className="shrink-0 text-base">✕</span>
                  <span>Erro comum: &quot;{err.wrong}&quot;</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 pl-5">
                  <strong>Por que está errado:</strong> {err.why}
                </p>
                <div className="pl-5 pt-1 text-emerald-700 dark:text-emerald-400 font-medium flex items-start gap-1.5">
                  <span className="shrink-0">✓</span>
                  <span>
                    <strong>Conduta metodológica correta:</strong> {err.correct}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 6. ATIVIDADE / SIMULAÇÃO VINCULADA */}
      {linkedLab && (
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-teal-600" />
            6. Atividade e Simulação Interativa
          </h2>

          <Card className="border-2 border-teal-500/40 bg-gradient-to-br from-teal-50/60 to-white dark:from-teal-950/40 dark:to-slate-900 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-xs">
                  {linkedLab.letter}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {linkedLab.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {linkedLab.shortDesc}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => handleOpenLab(linkedLab.path)}
                  className="bg-teal-600 hover:bg-teal-700 text-white gap-2 font-semibold shadow-xs"
                >
                  <FlaskConical className="h-4 w-4" />
                  Abrir Laboratório {linkedLab.letter}
                </Button>
                <span className="text-xs text-slate-500">
                  Seu ponto de leitura será preservado para você retornar quando concluir a
                  simulação.
                </span>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* 7. FEEDBACK FUNDAMENTADO */}
      <section className="space-y-3 p-4 rounded-lg bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm">
        <h3 className="font-bold text-slate-800 dark:text-slate-200">
          7. Diretriz de Feedback Metodológico
        </h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Nenhuma resposta neste ambiente didático recebe apenas notas ou mensagens vazias de
          &quot;correto/incorreto&quot;. Todas as avaliações no simulador apontam a justificativa
          conceitual e a norma correspondente (Cochrane, JBI ou PRISMA 2020), preparando você para
          fundamentar sua metodologia perante bancas e pareceristas.
        </p>
      </section>

      {/* 8. REFERÊNCIAS CORRESPONDENTES DO MÓDULO */}
      <section className="space-y-3 border-t border-slate-200 dark:border-slate-800 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            8. Referências Citadas Neste Módulo
          </h3>
          <Link
            to="/referencias"
            className="text-xs text-sky-600 hover:text-sky-700 dark:text-sky-400 inline-flex items-center gap-1 font-medium underline"
          >
            Ver todas as referências ABNT <ExternalLink className="h-3 w-3" />
          </Link>
        </div>

        <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
          {moduleData.references.map((refId) => (
            <li
              key={refId}
              className="p-2.5 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            >
              <span className="font-semibold text-slate-800 dark:text-slate-200">Ref: </span>
              {refId} · Consulte o acervo completo para o registro ABNT com DOI.
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
