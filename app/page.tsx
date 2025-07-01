'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrandExplorerIntro } from '@/components/BrandExplorerIntro'
import { QuestionnaireFlow } from '@/components/QuestionnaireFlow'
import { ResultsDisplay } from '@/components/ResultsDisplay'

export type ExplorationPhase = 'intro' | 'questionnaire' | 'results'

export interface BrandResults {
  archetype: string
  persona: string
  ethos: string[]
  buyerPersona: string
  answers: Record<string, any>
}

export default function HomePage() {
  const [currentPhase, setCurrentPhase] = useState<ExplorationPhase>('intro')
  const [brandResults, setBrandResults] = useState<BrandResults | null>(null)

  const handleStartExploration = () => {
    setCurrentPhase('questionnaire')
  }

  const handleQuestionnaireComplete = (results: BrandResults) => {
    setBrandResults(results)
    setCurrentPhase('results')
  }

  const handleRestart = () => {
    setCurrentPhase('intro')
    setBrandResults(null)
  }

  return (
    <main className="min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {currentPhase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <BrandExplorerIntro onStart={handleStartExploration} />
          </motion.div>
        )}
        
        {currentPhase === 'questionnaire' && (
          <motion.div
            key="questionnaire"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
          >
            <QuestionnaireFlow onComplete={handleQuestionnaireComplete} />
          </motion.div>
        )}
        
        {currentPhase === 'results' && brandResults && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
          >
            <ResultsDisplay results={brandResults} onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}