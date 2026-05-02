import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LangProvider } from '@/contexts/LangContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HomePage from '@/pages/HomePage'
import CenterDetailPage from '@/pages/CenterDetailPage'
import NotFoundPage from '@/pages/NotFoundPage'

const App = () => (
  <LangProvider>
  <BrowserRouter>
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-sm mx-auto bg-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/center/:id" element={<CenterDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  </BrowserRouter>
  </LangProvider>
)

export default App
