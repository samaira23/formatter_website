// src/pages/HomePage.jsx
import { useRef } from 'react';
import Navbar           from '../components/Navbar/Navbar';
import Hero             from '../components/Hero/Hero';
import PipelineStrip    from '../components/PipelineStrip/PipelineStrip';
import FormatterSection from '../components/FormatterPanel/FormatterSection';
import Features         from '../components/Features/Features';
import Footer           from '../components/Footer/Footer';
import { useState }     from 'react';

export default function HomePage() {
  const formatterRef = useRef(null);

  // Lifted stageStates so PipelineStrip at top can reflect state from FormatterSection
  // In a real app you'd use context or Zustand; for now pass a setter down
  const [pipelineStages, setPipelineStages] = useState({});

  function scrollToFormatter() {
    formatterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      <Navbar />

      <main>
        <Hero onScrollToFormatter={scrollToFormatter} />

        {/* Pipeline strip shows live stage progress */}
        <PipelineStrip stageStates={pipelineStages} />

        <div ref={formatterRef}>
          <FormatterSection onStageChange={setPipelineStages} />
        </div>

        <Features />
      </main>

      <Footer />
    </>
  );
}
