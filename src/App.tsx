import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Index from '@/pages/Index'
import NotFound from '@/pages/NotFound'
import ModulePage from '@/pages/ModulePage'
import LabsHubPage from '@/pages/LabsHubPage'
import ReferencesPage from '@/pages/ReferencesPage'
import AuthorshipPage from '@/pages/AuthorshipPage'
import GlossaryPage from '@/pages/GlossaryPage'
import SettingsPage from '@/pages/SettingsPage'

// Laboratories A - K
import LabAPergunta from '@/pages/labs/LabAPergunta'
import LabBMatrizCoerencia from '@/pages/labs/LabBMatrizCoerencia'
import LabCBusca from '@/pages/labs/LabCBusca'
import LabDTriagem from '@/pages/labs/LabDTriagem'
import LabMExtracao from '@/pages/labs/LabMExtracao'
import LabFAvaliacao from '@/pages/labs/LabFAvaliacao'
import LabGFluxograma from '@/pages/labs/LabGFluxograma'
import LabHExtensoes from '@/pages/labs/LabHExtensoes'
import LabIAuditoria from '@/pages/labs/LabIAuditoria'
import LabJCasos from '@/pages/labs/LabJCasos'
import LabKAutoavaliacao from '@/pages/labs/LabKAutoavaliacao'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Core Pages */}
          <Route path="/" element={<Index />} />
          <Route path="/modulo/:slug" element={<ModulePage />} />
          <Route path="/laboratorios" element={<LabsHubPage />} />
          <Route path="/glossario" element={<GlossaryPage />} />
          <Route path="/referencias" element={<ReferencesPage />} />
          <Route path="/autoria" element={<AuthorshipPage />} />
          <Route path="/configuracoes" element={<SettingsPage />} />

          {/* Individual Labs A to K */}
          <Route path="/lab/a-pergunta" element={<LabAPergunta />} />
          <Route path="/lab/b-matriz-coerencia" element={<LabBMatrizCoerencia />} />
          <Route path="/lab/c-busca" element={<LabCBusca />} />
          <Route path="/lab/d-triagem" element={<LabDTriagem />} />
          <Route path="/lab/e-extracao" element={<LabMExtracao />} />
          <Route path="/lab/f-avaliacao" element={<LabFAvaliacao />} />
          <Route path="/lab/g-fluxograma" element={<LabGFluxograma />} />
          <Route path="/lab/h-extensoes" element={<LabHExtensoes />} />
          <Route path="/lab/i-auditoria" element={<LabIAuditoria />} />
          <Route path="/lab/j-casos" element={<LabJCasos />} />
          <Route path="/lab/k-autoavaliacao" element={<LabKAutoavaliacao />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
