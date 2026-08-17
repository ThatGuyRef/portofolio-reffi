import { useCallback, useState } from "react";
import Preloader from "./components/Preloader";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PlayerStats from "./components/PlayerStats";
import SkillTree from "./components/SkillTree";
import Quests from "./components/Quests";
import Stages from "./components/Stages";
import DevLog from "./components/DevLog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import useRetroMotion from "./hooks/useRetroMotion";

function App({ skipIntro = false }) {
  const [isReady, setIsReady] = useState(skipIntro);
  const [showPreloader, setShowPreloader] = useState(!skipIntro);

  const handlePreloaderFinish = useCallback(() => {
    setIsReady(true);
    window.setTimeout(() => setShowPreloader(false), 550);
  }, []);

  useRetroMotion(isReady);

  return (
    <div className="relative">
      {isReady && (
        <>
          <Header />

          <main style={{ paddingTop: 70 }}>
            <Hero />
            <PlayerStats />
            <SkillTree />
            <Quests />
            <Stages />
            <DevLog />
            <Contact />
          </main>

          <Footer />
        </>
      )}

      {/* CRT OVERLAYS */}
      <div className="crt-scanlines" aria-hidden="true" />
      <div className="crt-flicker" aria-hidden="true" />
      <div className="crt-vignette" aria-hidden="true" />

      {showPreloader && (
        <Preloader
          skipIntro={skipIntro}
          isExiting={isReady}
          onFinish={handlePreloaderFinish}
        />
      )}
    </div>
  );
}

export default App;
