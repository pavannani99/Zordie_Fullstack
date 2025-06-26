import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './components/Page/LandingPage'
import { PrimeHrPage } from './components/Page/PrimeHrAgent'
import { OptimusPage } from './components/Page/OptimusAgent'
import { NovaPage } from './components/Page/NovaAgent'
import { MaxiPage } from './components/Page/MaxiAgent'
import { ArchiePage } from './components/Page/ArchieAgent'
import { OnixPage } from './components/Page/OnixAgent'
import Login from './components/Page/Login'
import TestPage from './components/TestPage'
import { AboutUs } from './components/Page/AboutUs'
import { Resource } from './components/Page/ResourcePage'
import { WaitlistPage } from './components/Page/Waitlist'
import WorkspaceDashboard from '../../../app/workspace/WorkspaceDashboard'
import AIChatBot from '../../../app/AIChatBot/page'; // adjust path if needed


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/prime" element={<PrimeHrPage />} />
          <Route path="/optimus" element={<OptimusPage />} />
          <Route path="/nova" element={<NovaPage />} />
          <Route path="/maxi" element={<MaxiPage />} />
          <Route path="/archie" element={<ArchiePage />} />
          <Route path="/onix" element={<OnixPage />} />
          <Route path="/ai-chatbot" element={<AIChatBot />} />

          <Route path="/login" element={<Login />} />
          <Route path="/waitlist" element={<WaitlistPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/resource" element={<Resource />} />
          <Route path="/workspace" element={<WorkspaceDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
