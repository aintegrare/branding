'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Question } from '@/data/questions'
import { ChevronUp, ChevronDown, GripVertical } from 'lucide-react'
import Image from 'next/image'

interface QuestionStepProps {
  question: Question
  answer: any
  onAnswer: (questionId: string, answer: any) => void
}

export function QuestionStep({ question, answer, onAnswer }: QuestionStepProps) {
  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  const handleOptionSelect = (optionValue: string) => {
    onAnswer(question.id, optionValue)
  }

  const handleTextInput = (value: string) => {
    onAnswer(question.id, value)
  }

  const handleMultiSelect = (optionValue: string) => {
    const currentAnswers = answer || []
    const maxSelections = question.id === 'brand_values' ? 4 : 100
    
    const newAnswers = currentAnswers.includes(optionValue)
      ? currentAnswers.filter((a: string) => a !== optionValue)
      : currentAnswers.length < maxSelections 
        ? [...currentAnswers, optionValue]
        : currentAnswers
    
    onAnswer(question.id, newAnswers)
  }

  const handleRankingChange = (fromIndex: number, toIndex: number) => {
    const currentRanking = answer || question.options?.map(opt => opt.value) || []
    const newRanking = [...currentRanking]
    const [moved] = newRanking.splice(fromIndex, 1)
    newRanking.splice(toIndex, 0, moved)
    onAnswer(question.id, newRanking)
  }

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex >= 0 && newIndex < (question.options?.length || 0)) {
      handleRankingChange(index, newIndex)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto text-center"
    >
      {/* Category Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6"
      >
        {question.category}
      </motion.div>

      {/* Question Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 text-balance"
      >
        {question.title}
      </motion.h2>

      {/* Question Description */}
      {question.description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-slate-600 mb-12 text-balance max-w-2xl mx-auto"
        >
          {question.description}
        </motion.p>
      )}

      {/* Question Input */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {question.type === 'single-choice' && (
          <div className="grid gap-4 max-w-3xl mx-auto">
            {question.options?.map((option, index) => (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => handleOptionSelect(option.value)}
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] group ${
                  answer === option.value
                    ? 'border-primary-500 bg-primary-50 text-primary-800 shadow-lg'
                    : 'border-slate-200 bg-white hover:border-primary-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors">
                      {option.label}
                    </h3>
                    {option.description && (
                      <p className="text-slate-600 text-sm leading-relaxed">{option.description}</p>
                    )}
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ml-4 ${
                    answer === option.value
                      ? 'border-primary-500 bg-primary-500 scale-110'
                      : 'border-slate-300 group-hover:border-primary-400'
                  }`}>
                    {answer === option.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-white rounded-full mx-auto mt-1"
                      />
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {question.type === 'image-choice' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {question.options?.map((option, index) => (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => handleOptionSelect(option.value)}
                className={`relative overflow-hidden rounded-2xl border-3 transition-all duration-300 hover:scale-105 group ${
                  answer === option.value
                    ? 'border-primary-500 shadow-2xl'
                    : 'border-slate-200 hover:border-primary-300'
                }`}
              >
                <div className="relative h-48">
                  <Image
                    src={option.image || ''}
                    alt={option.label}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 transition-all duration-300 ${
                    answer === option.value
                      ? 'bg-primary-500/20'
                      : 'bg-black/20 group-hover:bg-black/10'
                  }`} />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-lg mb-2">{option.label}</h3>
                  <p className="text-slate-600 text-sm">{option.description}</p>
                </div>
                {answer === option.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center"
                  >
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        )}

        {question.type === 'multiple-choice' && (
          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-sm text-slate-500 mb-6">
              {question.id === 'brand_values' ? 'Selecione até 4 valores' : 'Selecione todas as opções aplicáveis'}
            </p>
            <div className="grid gap-4">
              {question.options?.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  onClick={() => handleMultiSelect(option.value)}
                  disabled={question.id === 'brand_values' && !answer?.includes(option.value) && answer?.length >= 4}
                  className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] group disabled:opacity-50 disabled:cursor-not-allowed ${
                    answer?.includes(option.value)
                      ? 'border-primary-500 bg-primary-50 text-primary-800 shadow-lg'
                      : 'border-slate-200 bg-white hover:border-primary-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{option.label}</h3>
                      {option.description && (
                        <p className="text-slate-600 text-sm">{option.description}</p>
                      )}
                    </div>
                    <div className={`w-6 h-6 rounded border-2 transition-colors ${
                      answer?.includes(option.value)
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-slate-300'
                    }`}>
                      {answer?.includes(option.value) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-white rounded mx-auto mt-1"
                        />
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {question.type === 'ranking' && (
          <div className="max-w-2xl mx-auto">
            <p className="text-sm text-slate-500 mb-6">Arraste ou use as setas para reordenar por importância</p>
            <div className="space-y-3">
              {(answer || question.options?.map(opt => opt.value))?.map((value: string, index: number) => {
                const option = question.options?.find(opt => opt.value === value)
                return (
                  <motion.div
                    key={value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center p-4 bg-white rounded-xl border-2 border-slate-200 shadow-sm"
                  >
                    <div className="flex flex-col mr-3">
                      <button
                        onClick={() => moveItem(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button
                        onClick={() => moveItem(index, 'down')}
                        disabled={index === (answer?.length || question.options?.length || 0) - 1}
                        className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>
                    <div className="flex items-center flex-1">
                      <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">
                        {index + 1}
                      </div>
                      <span className="font-medium">{option?.label}</span>
                    </div>
                    <GripVertical className="text-slate-400 ml-auto cursor-move" size={20} />
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {question.type === 'text' && (
          <div className="max-w-3xl mx-auto">
            <textarea
              value={answer || ''}
              onChange={(e) => handleTextInput(e.target.value)}
              placeholder="Compartilhe seus pensamentos em detalhes..."
              className="w-full p-6 rounded-2xl border-2 border-slate-200 focus:border-primary-500 focus:outline-none resize-none text-lg leading-relaxed transition-all duration-300 focus:shadow-lg"
              rows={6}
            />
            <div className="text-right text-sm text-slate-400 mt-2">
              {answer?.length || 0} caracteres
            </div>
          </div>
        )}

        {question.type === 'scale' && (
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8 text-sm text-slate-600">
              <span className="text-left">{question.scaleLabels?.min}</span>
              <span className="text-right">{question.scaleLabels?.max}</span>
            </div>
            <div className="flex justify-center space-x-3 mb-6">
              {Array.from({ length: question.scaleMax || 10 }, (_, i) => i + 1).map((value) => (
                <motion.button
                  key={value}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + value * 0.05 }}
                  onClick={() => handleOptionSelect(value.toString())}
                  className={`w-14 h-14 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-110 ${
                    answer === value.toString()
                      ? 'bg-primary-500 text-white shadow-lg scale-110'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {value}
                </motion.button>
              ))}
            </div>
            {answer && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-slate-600"
              >
                Selecionado: <span className="font-semibold text-primary-600">{answer}</span>
              </motion.p>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}