import { Suspense, lazy, useCallback, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import LazySection from './components/LazySection'
import Preloader from './components/Preloader'
import Specs from './components/Specs'
import Hangar from './components/Hangar'

const loadAbout = () => import('./components/About')
const About = lazy(loadAbout)

function App() {
  const [isReady, setIsReady] = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)

  const handlePreloaderFinish = useCallback(() => {
    setIsReady(true)
    window.setTimeout(() => setShowPreloader(false), 650)
  }, [])

  return (
    <div className="relative">
      {isReady && (
        <div className="animate-main-enter">
          <Header />
          <Hero />
          <LazySection
            id="manifest"
            minHeightClassName="min-h-screen px-6 lg:px-12 py-24"
            onVisible={loadAbout}
            placeholder={<div className="h-full w-full" />}
          >
            <Suspense
              fallback={
                <section
                  id="manifest"
                  aria-hidden="true"
                  className="min-h-screen px-6 lg:px-12 py-24"
                />
              }
            >
              <About />
            </Suspense>
          </LazySection>
          <Footer />
          <Specs />
          <Hangar />
        </div>
      )}

      {showPreloader && (
        <Preloader
          isExiting={isReady}
          onFinish={handlePreloaderFinish}
        />
      )}
    </div>
  )
}

export default App
