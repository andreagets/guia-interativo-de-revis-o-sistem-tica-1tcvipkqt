import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
import {
  Menu,
  X,
  BookOpen,
  FlaskConical,
  HelpCircle,
  FileText,
  UserCheck,
  Settings,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  RotateCcw,
} from 'lucide-react'
import { PHASES, MODULES_DATA } from '@/data/modules'
import { LABS_DATA } from '@/data/labs'
import { getProgress, getReadingAnchor, clearReadingAnchor, ProgressState } from '@/lib/storage'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [phasesExpanded, setPhasesExpanded] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
  })
  const [labsExpanded, setLabsExpanded] = useState(true)
  const [progress, setProgress] = useState<ProgressState>(getProgress())
  const [readingAnchor, setAnchor] = useState(getReadingAnchor())

  useEffect(() => {
    const handleProgress = (e: Event) => {
      const custom = e as CustomEvent<ProgressState>
      if (custom.detail) setProgress(custom.detail)
      else setProgress(getProgress())
    }
    window.addEventListener('sr-progress-change', handleProgress)
    window.addEventListener('storage', () => setProgress(getProgress()))
    return () => {
      window.removeEventListener('sr-progress-change', handleProgress)
    }
  }, [])

  useEffect(() => {
    // Check reading anchor on location change
    setAnchor(getReadingAnchor())
    // Close sidebar on navigation on mobile
    setSidebarOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  const togglePhase = (pNum: number) => {
    setPhasesExpanded((prev) => ({ ...prev, [pNum]: !prev[pNum] }))
  }

  const handleReturnToAnchor = () => {
    if (readingAnchor) {
      navigate(`/modulo/${readingAnchor.moduleSlug}`)
      setTimeout(() => {
        window.scrollTo({ top: readingAnchor.scrollY, behavior: 'smooth' })
        clearReadingAnchor()
        setAnchor(null)
      }, 100)
    }
  }

  const totalModules = 12
  const completedCount = progress.completedModules.length
  const progressPercent = Math.round((completedCount / totalModules) * 100)

  // Current module detection for return bar
  const currentModuleMatch = location.pathname.match(/^\/modulo\/([^/]+)/)
  const currentModule = currentModuleMatch
    ? MODULES_DATA.find((m) => m.slug === currentModuleMatch[1])
    : null

  const prevModule = currentModule
    ? currentModule.id > 1
      ? MODULES_DATA.find((m) => m.id === currentModule.id - 1)
      : null
    : null

  const nextModule = currentModule
    ? currentModule.id < 12
      ? MODULES_DATA.find((m) => m.id === currentModule.id + 1)
      : null
    : null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased">
      {/* Skip link for WCAG keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg outline-none ring-2 ring-offset-2 ring-primary"
      >
        Pular para o conteúdo principal
      </a>

      {/* TOP BAR */}
      <header className="sticky top-0 z-40 h-16 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 px-4 flex items-center justify-between transition-all">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label={sidebarOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <Link to="/" className="flex items-center gap-2.5 group">
            {/* Logo Mark: SVG monogram of stacked evidence synthesis layers */}
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-sky-600 via-teal-600 to-indigo-700 p-1.5 flex items-center justify-center shadow-sm shadow-sky-600/20 group-hover:shadow-md transition-shadow">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-full w-full text-white"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" fill="currentColor" fillOpacity="0.2" />
                <polyline points="2 12 12 17 22 12" />
                <polyline points="2 17 12 22 22 17" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base leading-tight tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                Guia de Revisão Sistemática
                <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 hidden sm:inline-block">
                  REDI 2026
                </span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[200px] sm:max-w-none">
                Profa. Dra. Andréa Soares Rocha da Silva · GETS/UFC
              </span>
            </div>
          </Link>
        </div>

        {/* Right side actions & progress ring */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Circular progress badge */}
          <div
            className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
            title={`${completedCount} de ${totalModules} módulos concluídos neste navegador`}
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <svg className="w-5 h-5 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200 dark:text-slate-700"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-teal-600 dark:text-teal-400 transition-all duration-500"
                  strokeDasharray={`${progressPercent}, 100`}
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
            <span className="hidden md:inline text-slate-700 dark:text-slate-300">
              {progressPercent}%
            </span>
          </div>

          <Link
            to="/glossario"
            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Glossário Científico"
            aria-label="Acessar Glossário"
          >
            <HelpCircle className="h-5 w-5" />
          </Link>

          <Link
            to="/configuracoes"
            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Configurações e Gestão de Dados Locais"
            aria-label="Acessar Configurações"
          >
            <Settings className="h-5 w-5" />
          </Link>
        </div>
      </header>

      {/* BODY WITH COLLAPSIBLE SIDEBAR */}
      <div className="flex-1 flex w-full relative">
        {/* Backdrop on mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* SIDEBAR NAVIGATION */}
        <aside
          className={`fixed top-16 bottom-0 left-0 z-40 w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:w-72'
          }`}
          aria-label="Menu principal de navegação"
        >
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
            {/* Quick Link Início */}
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                location.pathname === '/'
                  ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <BookOpen className="h-4 w-4 text-sky-600" />
              <span>Página Inicial</span>
            </Link>

            {/* SEÇÃO DE FASES E MÓDULOS */}
            <div className="pt-2">
              <div className="px-2 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Percurso Formativo (12 Módulos)
              </div>
              <div className="space-y-2">
                {PHASES.map((phase) => {
                  const isExpanded = phasesExpanded[phase.number]
                  return (
                    <div
                      key={phase.number}
                      className="rounded-lg border border-slate-200/80 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-900/50"
                    >
                      <button
                        type="button"
                        onClick={() => togglePhase(phase.number)}
                        className="w-full flex items-center justify-between p-2.5 text-left hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors"
                        aria-expanded={isExpanded}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold text-white shadow-xs"
                            style={{ backgroundColor: phase.color }}
                          >
                            {phase.roman}
                          </span>
                          <span className="font-semibold text-xs tracking-tight text-slate-800 dark:text-slate-200">
                            FASE {phase.roman} — {phase.title}
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-slate-400" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-slate-400" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-1 space-y-0.5 border-t border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900">
                          {phase.modules.map((mId) => {
                            const mod = MODULES_DATA.find((m) => m.id === mId)
                            if (!mod) return null
                            const isCurrent = location.pathname === `/modulo/${mod.slug}`
                            const isCompleted = progress.completedModules.includes(mId)
                            const isVisited = progress.visitedModules.includes(mId)
                            return (
                              <Link
                                key={mId}
                                to={`/modulo/${mod.slug}`}
                                className={`flex items-start justify-between gap-2 px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                                  isCurrent
                                    ? 'bg-sky-50 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 font-semibold'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                                }`}
                              >
                                <span className="line-clamp-1">{mod.title}</span>
                                {isCompleted ? (
                                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                ) : isVisited ? (
                                  <span
                                    className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5"
                                    title="Visitado"
                                  />
                                ) : null}
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* SEÇÃO DE LABORATÓRIOS (A - K) */}
            <div className="pt-2">
              <div className="rounded-lg border border-slate-200/80 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-900/50">
                <button
                  type="button"
                  onClick={() => setLabsExpanded((prev) => !prev)}
                  className="w-full flex items-center justify-between p-2.5 text-left hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors"
                  aria-expanded={labsExpanded}
                >
                  <div className="flex items-center gap-2">
                    <FlaskConical className="h-4 w-4 text-teal-600" />
                    <span className="font-semibold text-xs tracking-tight text-slate-800 dark:text-slate-200">
                      Laboratórios e Simuladores (A–K)
                    </span>
                  </div>
                  {labsExpanded ? (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  )}
                </button>

                {labsExpanded && (
                  <div className="p-1 space-y-0.5 border-t border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900">
                    <Link
                      to="/laboratorios"
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        location.pathname === '/laboratorios'
                          ? 'bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <FlaskConical className="h-3.5 w-3.5 text-teal-600" />
                      <span>Visão Geral dos Laboratórios</span>
                    </Link>

                    {LABS_DATA.map((lab) => {
                      const isCurrent = location.pathname === lab.path
                      const isCompleted = progress.completedLabs.includes(lab.id)
                      return (
                        <Link
                          key={lab.id}
                          to={lab.path}
                          className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                            isCurrent
                              ? 'bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 font-semibold'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="font-bold text-[10px] px-1 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
                              {lab.letter}
                            </span>
                            <span className="truncate">{lab.title}</span>
                          </div>
                          {isCompleted && (
                            <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                          )}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* SEÇÃO INSTITUCIONAL E SUPORTE */}
            <div className="pt-2 space-y-1">
              <div className="px-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Apoio e Referências
              </div>
              <Link
                to="/glossario"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors ${
                  location.pathname === '/glossario'
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <HelpCircle className="h-3.5 w-3.5 text-slate-500" />
                <span>Glossário Científico</span>
              </Link>
              <Link
                to="/referencias"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors ${
                  location.pathname === '/referencias'
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <FileText className="h-3.5 w-3.5 text-slate-500" />
                <span>Referências ABNT</span>
              </Link>
              <Link
                to="/autoria"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors ${
                  location.pathname === '/autoria'
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <UserCheck className="h-3.5 w-3.5 text-slate-500" />
                <span>Autoria, direitos e como citar</span>
              </Link>
              <Link
                to="/configuracoes"
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors ${
                  location.pathname === '/configuracoes'
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Settings className="h-3.5 w-3.5 text-slate-500" />
                <span>Configurações e Dados Locais</span>
              </Link>
            </div>
          </div>

          {/* SIDEBAR FOOTER */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-[11px] text-slate-500 dark:text-slate-400">
            <p className="font-semibold text-slate-700 dark:text-slate-300">GETS / UFC — 2026</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Sem cadastro · 100% no navegador</p>
          </div>
        </aside>

        {/* MAIN CONTENT WRAPPER */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-72 transition-all">
          {/* FLOATING RETURN-TO-READING PILL (WHEN NAVIGATED AWAY FROM A MODULE) */}
          {readingAnchor && !location.pathname.startsWith('/modulo') && (
            <div className="sticky top-16 z-30 bg-amber-50 dark:bg-amber-950/80 border-b border-amber-200 dark:border-amber-900 px-4 py-2 flex items-center justify-between text-xs text-amber-900 dark:text-amber-200 shadow-sm animate-in fade-in duration-300">
              <div className="flex items-center gap-2">
                <RotateCcw className="h-3.5 w-3.5 text-amber-700 dark:text-amber-400" />
                <span>
                  Você veio do módulo: <strong>{readingAnchor.title}</strong>
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReturnToAnchor}
                className="h-7 text-xs bg-white dark:bg-slate-900 border-amber-300 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900"
              >
                Retornar ao ponto de leitura
              </Button>
            </div>
          )}

          {/* MAIN OUTLET CONTAINER */}
          <main id="main-content" className="flex-1 w-full pb-20 focus:outline-none" tabIndex={-1}>
            <Outlet />
          </main>

          {/* PERSISTENT READING RETURN BAR (WHEN IN MODULES) */}
          {currentModule && (
            <div className="sticky bottom-0 z-30 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-200 dark:border-slate-800 px-4 py-3 shadow-lg">
              <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 text-xs sm:text-sm">
                {prevModule ? (
                  <Link
                    to={`/modulo/${prevModule.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium text-slate-700 dark:text-slate-200 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Módulo anterior:</span> M{prevModule.id}
                  </Link>
                ) : (
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium text-slate-700 dark:text-slate-200 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Início
                  </Link>
                )}

                <Link
                  to="/"
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                >
                  <Menu className="h-4 w-4" />
                  <span>Menu</span>
                </Link>

                {nextModule ? (
                  <Link
                    to={`/modulo/${nextModule.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white font-medium shadow-sm transition-colors"
                  >
                    <span className="hidden sm:inline">Próximo: M{nextModule.id}</span>
                    <span className="sm:hidden">M{nextModule.id}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <Link
                    to="/laboratorios"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-teal-600 hover:bg-teal-700 text-white font-medium shadow-sm transition-colors"
                  >
                    <span>Laboratórios</span>
                    <FlaskConical className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* FOOTER */}
          <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 px-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="max-w-5xl mx-auto space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                    Autoria do recurso educacional digital interativo: Profa. Dra. Andréa Soares
                    Rocha da Silva
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                    GETS — Grupo Educação Tecnologia e Saúde, Universidade Federal do Ceará (UFC) ·
                    2026
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link to="/autoria" className="hover:text-sky-600 underline underline-offset-4">
                    Autoria, direitos e como citar
                  </Link>
                  <span>·</span>
                  <Link
                    to="/referencias"
                    className="hover:text-sky-600 underline underline-offset-4"
                  >
                    Referências ABNT
                  </Link>
                  <span>·</span>
                  <a
                    href="https://www.prisma-statement.org/prisma-2020-flow-diagram"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-sky-600 inline-flex items-center gap-1 underline underline-offset-4"
                  >
                    PRISMA Statement Oficial <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-400">
                <p>
                  Privacidade: Todos os simuladores funcionam exclusivamente no seu navegador.
                  Nenhum dado pessoal é transmitido a servidores externos.
                </p>
                <Badge variant="outline" className="text-[10px] font-normal text-slate-500">
                  REDI HTML5 / React / SVG
                </Badge>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
