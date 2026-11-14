import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './cmponent/Home'
import About from './cmponent/About'
import Contact from './cmponent/Contact'
import Classes from './cmponent/Classes'
import Terms from './cmponent/legal/Terms'
import Privacy from './cmponent/legal/Privacy'
import Splash from './cmponent/common/Splash'

// Code-split the dashboard route so public marketing pages don't load admin JS (Task 7)
const Dashboard = lazy(() => import('./cmponent/dashboard/Dashboard'))

function DashboardLoading() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F7EFE3',
      color: '#172033',
      fontFamily: "'Cairo', sans-serif",
      fontSize: '16px',
      fontWeight: '700',
    }}>
      جاري تحميل لوحة التحكم...
    </div>
  )
}

function App() {
  return (
    <>
      {/* First-load Splash screen (Task 3) */}
      <Splash />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Classes" element={<Classes />} />
          <Route path="/classes" element={<Classes />} />

          {/* Legal routes (Task 10 & 13) */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/Terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/Privacy" element={<Privacy />} />

          {/* Code-split Dashboard routes (Task 7) */}
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<DashboardLoading />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/Dashboard"
            element={
              <Suspense fallback={<DashboardLoading />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <Suspense fallback={<DashboardLoading />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/Dashboard/*"
            element={
              <Suspense fallback={<DashboardLoading />}>
                <Dashboard />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App