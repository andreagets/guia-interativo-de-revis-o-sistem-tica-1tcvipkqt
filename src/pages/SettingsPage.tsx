import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Settings, Trash2, Download, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { resetAllAppData, exportAllDataAsJson, getProgress } from '@/lib/storage'
import { Button } from '@/components/ui/button'
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

export default function SettingsPage() {
  const [resetSuccess, setResetSuccess] = useState(false)
  const progress = getProgress()

  const handleExport = () => {
    const jsonStr = exportAllDataAsJson()
    const blob = new Blob([jsonStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dados-guia-revisao-sistematica-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    resetAllAppData()
    setResetSuccess(true)
    setTimeout(() => setResetSuccess(false), 4000)
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 space-y-8">
      <Breadcrumbs items={[{ label: 'Configurações e Dados Locais' }]} />

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Settings className="h-6 w-6 text-slate-700 dark:text-slate-300" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Configurações e Gestão de Dados Locais
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Gerencie o armazenamento e a privacidade do seu recurso didático. Todos os dados
          permanecem exclusivamente na memória deste navegador.
        </p>
      </div>

      {resetSuccess && (
        <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>
            Todos os dados e o histórico de progresso foram apagados com sucesso deste dispositivo.
          </span>
        </div>
      )}

      {/* PRIVACIDADE E PERSISTÊNCIA */}
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-sky-600">
            <ShieldCheck className="h-5 w-5" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Privacidade Garantida e Limitações do Navegador
            </h2>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              <strong>Sem banco de dados externo:</strong> Este recurso não possui servidores de
              banco de dados para armazenar respostas, não requer login, e não transmite qualquer
              informação a terceiros.
            </p>
            <p>
              <strong>Persistência no navegador (localStorage):</strong> Suas perguntas geradas,
              contagens do PRISMA, respostas aos casos e progresso nos módulos ficam gravados
              localmente no seu computador ou celular.
            </p>
            <p className="text-amber-800 dark:text-amber-300 flex items-start gap-1.5 pt-1">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>
                <strong>Atenção:</strong> Se você limpar o histórico/cookies do navegador ou usar
                uma janela anônima, os dados preenchidos serão redefinidos. Recomendamos exportar
                seus dados em JSON para garantir um backup.
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* RESUMO DO PROGRESSO ATUAL */}
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Resumo do seu Aprendizado Neste Dispositivo
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900">
              <span className="text-2xl font-bold text-sky-700 dark:text-sky-300">
                {progress.completedModules.length} / 12
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Módulos Concluídos</p>
            </div>

            <div className="p-4 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900">
              <span className="text-2xl font-bold text-teal-700 dark:text-teal-300">
                {progress.visitedModules.length} / 12
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Módulos Visitados</p>
            </div>

            <div className="p-4 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 col-span-2 sm:col-span-1">
              <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                {progress.completedLabs.length} / 11
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Laboratórios Realizados
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* EXPORTAR E LIMPAR DADOS */}
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <CardContent className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Ações de Dados</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Exporte seus dados locais para segurança ou limpe todo o histórico para recomeçar.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              onClick={handleExport}
              className="flex items-center gap-2 border-slate-300 dark:border-slate-700"
            >
              <Download className="h-4 w-4 text-sky-600" />
              <span>Exportar Meus Dados (JSON)</span>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  <span>Apagar Todos os Dados Armazenados</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza que deseja apagar tudo?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação é irreversível. Todos os formulários preenchidos, dados de fluxogramas
                    PRISMA, matrizes de extração, auditoria de 27 itens e progresso nos 12 módulos
                    serão apagados deste navegador.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleReset}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Sim, apagar todos os dados
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
