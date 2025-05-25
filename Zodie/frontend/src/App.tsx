import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HeroSection } from './components/blocks/hero-section-2'
import { LandingPage } from './components/Page/LandingPage'
import { PrimeHrPage } from './components/Page/PrimeHrAgent'
import { OptimusPage } from './components/Page/OptimusAgent'
import { NovaPage } from './components/Page/NovaAgent'
import { MaxiPage } from './components/Page/MaxiAgent'
import { ArchiePage } from './components/Page/ArchieAgent'
import { OnixPage } from './components/Page/OnixAgent'
import { Login, Signup } from './components/Page/Login'
import TestPage from './components/TestPage'
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path='/prime' element={<PrimeHrPage/>}/>
        <Route path='/optimus' element={<OptimusPage/>}/>
        <Route path='/nova' element={<NovaPage/>}></Route>
        <Route path='/maxi' element={<MaxiPage/>}></Route>
        <Route path='/archie' element={<ArchiePage/>}/>
        <Route path='/onix' element={<OnixPage/>}/>

        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/test' element={<TestPage/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App