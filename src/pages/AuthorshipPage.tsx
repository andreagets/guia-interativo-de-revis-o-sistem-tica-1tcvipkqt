import { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserCheck, Copy, Check, ShieldCheck, Cpu, AlertTriangle } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function AuthorshipPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const abntCitation =
    'SILVA, Andréa Soares Rocha da. Infográfico interativo — guia de revisão sistemática da literatura. Fortaleza: autora, 2026. Recurso educacional digital interativo (HTML5). Disponível em: [endereço eletrônico após publicação]. Acesso em: [data de acesso].'

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 space-y-8">
      <Breadcrumbs items={[{ label: 'Autoria, direitos e como citar' }]} />

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <UserCheck className="h-6 w-6 text-sky-600" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Autoria, Direitos e Como Citar
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Identificação institucional, normas para citação acadêmica, declaração sobre o uso de
          inteligência artificial e relatório de verificações do recurso educacional digital.
        </p>
      </div>

      {/* AUTORIA E CONTEXTO */}
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b pb-2">
            Identificação do Recurso Educacional Digital Interativo (REDI)
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-xs text-slate-500 uppercase font-semibold">
                Título do Recurso:
              </span>
              <p className="font-medium text-slate-800 dark:text-slate-200">
                Infográfico Interativo — Guia de Revisão Sistemática da Literatura
              </p>
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase font-semibold">Categoria:</span>
              <p className="font-medium text-slate-800 dark:text-slate-200">
                Recurso Educacional Digital Interativo (REDI) com simuladores de decisões
                metodológicas
              </p>
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase font-semibold">
                Autoria Exclusiva:
              </span>
              <p className="font-bold text-sky-700 dark:text-sky-300">
                Profa. Dra. Andréa Soares Rocha da Silva
              </p>
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase font-semibold">
                Contexto Institucional:
              </span>
              <p className="font-medium text-slate-800 dark:text-slate-200">
                GETS — Grupo Educação Tecnologia e Saúde, Universidade Federal do Ceará (UFC)
              </p>
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase font-semibold">
                Ano de Produção:
              </span>
              <p className="font-medium text-slate-800 dark:text-slate-200">2026</p>
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase font-semibold">Público-alvo:</span>
              <p className="font-medium text-slate-800 dark:text-slate-200">
                Estudantes de graduação, pós-graduação, orientandos de IC, mestrado, doutorado e
                pesquisadores
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* COMO CITAR - ABNT */}
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Como Citar este Recurso (Normas ABNT)
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy('abnt', abntCitation)}
              className="text-xs flex items-center gap-1.5"
            >
              {copiedKey === 'abnt' ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copiar ABNT</span>
                </>
              )}
            </Button>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <p className="font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
              {abntCitation}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-2 text-sm">
            <div className="p-3 rounded-md bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900">
              <span className="text-xs font-semibold text-sky-800 dark:text-sky-300 block mb-1">
                Citação Narrativa no Texto:
              </span>
              <p className="font-mono text-xs">Silva (2026)</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Exemplo: &quot;Conforme apontado por Silva (2026), a desduplicação sistemática é
                pré-requisito...&quot;
              </p>
            </div>

            <div className="p-3 rounded-md bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900">
              <span className="text-xs font-semibold text-indigo-800 dark:text-indigo-300 block mb-1">
                Citação Parentética no Texto:
              </span>
              <p className="font-mono text-xs">(Silva, 2026)</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Exemplo: &quot;...para garantia de transparência na triagem em pares independentes
                (Silva, 2026).&quot;
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DECLARAÇÃO DE IA E DIREITOS AUTORAIS */}
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Declaração sobre Ferramentas de Inteligência Artificial e Direitos
            </h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              <strong>Declaração de Uso de IA:</strong> Em estrito alinhamento com os padrões éticos
              internacionais e diretrizes do COPE (Committee on Publication Ethics), declara-se que
              ferramentas de inteligência artificial generativa foram empregadas como instrumentos
              auxiliares de apoio à codificação de software, formatação SVG de diagramas vetoriais e
              revisão sintática de código.
              <strong>
                {' '}
                Nenhuma autoria intelectual ou científica humana é atribuída a algoritmos ou modelos
                de IA.
              </strong>
            </p>
            <p>
              <strong>Direitos de Distribuição:</strong> Nenhuma licença de distribuição aberta
              (como Creative Commons específica) é pré-definida neste recurso sem decisão e
              manifestação expressa da autora, Profa. Dra. Andréa Soares Rocha da Silva.
            </p>
            <p>
              <strong>Materiais de Terceiros:</strong> Os modelos de fluxograma PRISMA 2020 e a
              Declaração PRISMA 2020 são obras de seus respectivos autores (Page et al., 2021a) e
              utilizados didaticamente em estrita conformidade com a licença CC-BY 4.0
              internacional. As ferramentas JBI e Cochrane pertencem aos seus respectivos
              institutos.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* GUIA BREVE DE UTILIZAÇÃO */}
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-teal-600" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Guia Breve de Utilização do Recurso
            </h2>
          </div>

          <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <li>
              <strong>Navegação Sequencial ou sob Demanda:</strong> Você pode percorrer as 4 Fases
              (Fundamentar, Investigar, Avaliar e Sintetizar, Comunicar) sequencialmente ou acessar
              diretamente os simuladores e laboratórios pelo menu lateral ou pela aba de
              Laboratórios.
            </li>
            <li>
              <strong>Preservação do Ponto de Leitura:</strong> Ao sair de um módulo para consultar
              o Glossário, uma Referência ou um Laboratório, um botão flutuante aparecerá no topo
              permitindo retornar exatamente à seção e à posição de rolagem onde você estava.
            </li>
            <li>
              <strong>Armazenamento 100% Local:</strong> Todas as respostas, preenchimentos de
              matrizes, checklists e contagens do fluxograma PRISMA ficam gravados no armazenamento
              local do seu navegador (localStorage). Você pode fechar a aba e continuar outro dia
              sem perder seu trabalho.
            </li>
            <li>
              <strong>Exportação e Limpeza:</strong> Na aba de{' '}
              <Link to="/configuracoes" className="text-sky-600 underline">
                Configurações
              </Link>
              , você pode baixar uma cópia em JSON de todos os seus dados locais ou apagar tudo com
              segurança.
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* RELATÓRIO DE VERIFICAÇÕES E LIMITAÇÕES CONHECIDAS */}
      <Card className="border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Relatório de Verificações e Limitações Conhecidas
            </h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <p>
              <strong>Verificações Realizadas com Sucesso:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Validação conceitual da distinção entre condução metodológica (JBI/Cochrane) e
                relato (PRISMA 2020).
              </li>
              <li>
                Separação estrita nas contagens entre Registros, Relatórios e Estudos Únicos no
                Construtor PRISMA 2020.
              </li>
              <li>
                Validação matemática automatizada dos 4 modelos oficiais do PRISMA (v1 e v2 para
                novas e atualizadas).
              </li>
              <li>
                Preservação de foco acessível (WCAG 2.2), navegação por teclado e botões com
                confirmação destrutiva.
              </li>
            </ul>

            <p className="pt-2">
              <strong>Pontos que Exigem Validação e Juízo Humano do Pesquisador:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1 text-amber-900 dark:text-amber-300">
              <li>
                A sensibilidade real de uma estratégia de busca bibliográfica requer validação
                empírica com bibliotecário.
              </li>
              <li>
                O julgamento de risco de viés em estudos reais exige interpretação clínica
                aprofundada que nenhum simulador automatizado substitui.
              </li>
              <li>
                A decisão de realizar metanálise depende da homogeneidade clínica e biológica dos
                estudos primários, não apenas de contagens numéricas.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
