'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Check, Brain, Sparkles as Sparkles2 } from 'lucide-react'
import { BrandResults } from '@/app/page'
import { QuestionStep } from './QuestionStep'
import { questions } from '@/data/questions'
import { analyzeBrandResults } from '@/utils/brandAnalysis'

interface QuestionnaireFlowProps {
  onComplete: (results: BrandResults) => void
}

export function QuestionnaireFlow({ onComplete }: QuestionnaireFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStage, setAnalysisStage] = useState('')

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleComplete = async () => {
    setIsAnalyzing(true)
    
    // Simulação de análise com múltiplas etapas
    const stages = [
      'Analisando arquétipos de marca...',
      'Identificando persona única...',
      'Definindo valores centrais...',
      'Mapeando buyer persona...',
      'Gerando insights estratégicos...',
      'Finalizando relatório...'
    ]

    for (let i = 0; i < stages.length; i++) {
      setAnalysisStage(stages[i])
      await new Promise(resolve => setTimeout(resolve, 800))
    }
    
    const results = analyzeBrandResults(answers)
    onComplete(results)
  }

  const canProceed = answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== ''

  // Calcular progresso por categoria
  const categories = [...new Set(questions.map(q => q.category))]
  const currentCategory = currentQuestion.category
  const categoryProgress = categories.indexOf(currentCategory) / (categories.length - 1) * 100

  if (isAnalyzing) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1, repeat: Infinity }
            }}
            className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <Brain className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl md:text-3xl font-bold text-slate-800 mb-4"
          >
            Analisando seu DNA de Marca
          </motion.h2>
          
          <motion.p
            key={analysisStage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-slate-600 mb-8"
          >
            {analysisStage}
          </motion.p>

          <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
            <motion.div
              className="h-2 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 4.8, ease: "easeInOut" }}
            />
          </div>

          <p className="text-sm text-slate-500">
            Processando suas respostas com IA avançada...
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-1 fixed top-0 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-morphism border-b border-slate-200/50 p-4 sticky top-0 z-40"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-800 flex items-center">
              <Sparkles2 className="w-5 h-5 mr-2 text-primary-500" />
              Brand Explorer
            </h1>
            <p className="text-sm text-slate-600">
              {currentCategory} • Pergunta {currentStep + 1} de {questions.length}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-primary-600">
              {Math.round(progress)}% Completo
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {questions.length - currentStep - 1} restantes
            </div>
          </div>
        </div>

        {/* Category Progress */}
        <div className="max-w-6xl mx-auto mt-4">
          <div className="flex items-center space-x-2 text-xs">
            {categories.map((category, index) => (
              <div
                key={category}
                className={`px-2 py-1 rounded-full transition-all duration-300 ${
                  category === currentCategory
                    ? 'bg-primary-500 text-white'
                    : index < categories.indexOf(currentCategory)
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Question Content */}
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="max-w-6xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <QuestionStep
                question={currentQuestion}
                answer={answers[currentQuestion.id]}
                onAnswer={handleAnswer}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-morphism border-t border-slate-200/50 p-4"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="inline-flex items-center px-6 py-3 text-slate-600 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </button>

          <div className="flex items-center space-x-2">
            {questions.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index <= currentStep ? 'bg-primary-500 scale-125' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>

          <motion.button
            onClick={handleNext}
            disabled={!canProceed}
            whileHover={{ scale: canProceed ? 1.05 : 1 }}
            whileTap={{ scale: canProceed ? 0.95 : 1 }}
            className={`inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              canProceed
                ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {currentStep === questions.length - 1 ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Finalizar Análise
              </>
            ) : (
              <>
                Próxima
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}