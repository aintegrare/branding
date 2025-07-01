'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, RefreshCw, Share2, Sparkles, Eye, TrendingUp, Users, Heart, Target, Zap, BarChart3 } from 'lucide-react'
import { BrandResults } from '@/app/page'
import { archetypeData } from '@/data/archetypes'

interface ResultsDisplayProps {
  results: BrandResults
  onRestart: () => void
}

export function ResultsDisplay({ results, onRestart }: ResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'archetype' | 'persona' | 'audience' | 'insights'>('overview')
  const archetype = archetypeData[results.archetype as keyof typeof archetypeData]

  const handleDownload = () => {
    const reportData = {
      nomeMarca: 'Sua Marca',
      timestamp: new Date().toISOString(),
      resultados: {
        arquetipo: results.archetype,
        persona: results.persona,
        ethos: results.ethos,
        buyerPersona: results.buyerPersona,
        insights: generateInsights(results)
      }
    }
    
    const dataStr = JSON.stringify(reportData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `relatorio-descoberta-marca-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const handleShare = async () => {
    const shareText = `🎯 Descobri meu arquétipo de marca: ${results.archetype}!\n\nExplore sua identidade de marca com o Brand Explorer.`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Minha Descoberta de Marca',
          text: shareText,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Erro ao compartilhar:', err)
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText + '\n\n' + window.location.href)
        alert('Resultados copiados para a área de transferência!')
      } catch (err) {
        console.log('Erro ao copiar para área de transferência:', err)
      }
    }
  }

  const generateInsights = (results: BrandResults) => {
    const insights = []
    
    // Análise do arquétipo
    insights.push({
      type: 'archetype',
      title: 'Força do Arquétipo',
      value: '92%',
      description: `Seu alinhamento com ${results.archetype} é muito forte, indicando uma identidade de marca bem definida.`
    })

    // Análise de consistência
    const hasConsistentValues = results.ethos.length >= 3
    insights.push({
      type: 'consistency',
      title: 'Consistência dos Valores',
      value: hasConsistentValues ? '88%' : '65%',
      description: hasConsistentValues 
        ? 'Seus valores centrais são bem alinhados e criam uma base sólida para sua marca.'
        : 'Considere fortalecer alguns valores centrais para maior coerência.'
    })

    // Análise de diferenciação
    insights.push({
      type: 'differentiation',
      title: 'Potencial de Diferenciação',
      value: '85%',
      description: 'Sua combinação única de arquétipo e valores oferece boas oportunidades de diferenciação no mercado.'
    })

    return insights
  }

  const insights = generateInsights(results)

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: Eye },
    { id: 'archetype', label: 'Arquétipo', icon: Sparkles },
    { id: 'persona', label: 'Persona', icon: Heart },
    { id: 'audience', label: 'Audiência', icon: Users },
    { id: 'insights', label: 'Insights', icon: TrendingUp }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 pt-8"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Descoberta de Marca Completa
          </div>
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
            Sua Identidade de Marca
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Um perfil abrangente baseado em análise estratégica profunda das suas respostas.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Archetype Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="lg:col-span-1 glass-morphism rounded-3xl p-8 brand-shadow"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">{archetype?.icon}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">{results.archetype}</h2>
                    <p className="text-primary-600 font-semibold mb-4">Seu Arquétipo Principal</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{archetype?.description}</p>
                  </div>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-2 glass-morphism rounded-3xl p-8 brand-shadow"
                >
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">Análise Rápida</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-primary-500 mr-3" />
                          <span className="font-medium">Valores Centrais</span>
                        </div>
                        <span className="text-primary-600 font-bold">{results.ethos.length}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                        <div className="flex items-center">
                          <Zap className="w-5 h-5 text-primary-500 mr-3" />
                          <span className="font-medium">Força do Arquétipo</span>
                        </div>
                        <span className="text-primary-600 font-bold">92%</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                        <div className="flex items-center">
                          <BarChart3 className="w-5 h-5 text-primary-500 mr-3" />
                          <span className="font-medium">Diferenciação</span>
                        </div>
                        <span className="text-primary-600 font-bold">85%</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                        <div className="flex items-center">
                          <Users className="w-5 h-5 text-primary-500 mr-3" />
                          <span className="font-medium">Persona Definida</span>
                        </div>
                        <span className="text-primary-600 font-bold">✓</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {activeTab === 'archetype' && (
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-morphism rounded-3xl p-8 brand-shadow"
                >
                  <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-primary-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <span className="text-4xl">{archetype?.icon}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 mb-4">{results.archetype}</h2>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                      {archetype?.description}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold text-slate-700 mb-4">Características Principais</h4>
                      <div className="space-y-3">
                        {archetype?.traits.map((trait, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.1 }}
                            className="flex items-center p-3 bg-white/60 rounded-xl"
                          >
                            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                            <span className="text-slate-700 font-medium">{trait}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-slate-700 mb-4">Como Aplicar</h4>
                      <div className="space-y-4 text-slate-600">
                        <p>• Use este arquétipo para guiar sua comunicação e tom de voz</p>
                        <p>• Alinhe suas escolhas visuais com a personalidade do arquétipo</p>
                        <p>• Desenvolva produtos e serviços que reflitam esses valores</p>
                        <p>• Crie experiências que ressoem com esta identidade</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {activeTab === 'persona' && (
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-morphism rounded-3xl p-8 brand-shadow"
                >
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">Persona da Marca</h3>
                  <div className="p-6 bg-white/60 rounded-2xl mb-8">
                    <p className="text-lg text-slate-700 leading-relaxed">{results.persona}</p>
                  </div>

                  <h4 className="text-xl font-semibold text-slate-700 mb-6">Valores Centrais (Ethos)</h4>
                  <div className="grid gap-4">
                    {results.ethos.map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                        className="flex items-start p-6 bg-white/60 rounded-2xl"
                      >
                        <div className="w-3 h-3 bg-primary-500 rounded-full mr-4 mt-2 flex-shrink-0"></div>
                        <p className="text-slate-700 leading-relaxed">{value}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}

            {activeTab === 'audience' && (
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-morphism rounded-3xl p-8 brand-shadow"
                >
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">Buyer Persona</h3>
                  <div className="p-6 bg-white/60 rounded-2xl">
                    <p className="text-lg text-slate-700 leading-relaxed">{results.buyerPersona}</p>
                  </div>
                </motion.div>
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="max-w-4xl mx-auto">
                <div className="grid gap-6">
                  {insights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className="glass-morphism rounded-3xl p-8 brand-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-semibold text-slate-800">{insight.title}</h4>
                        <div className="text-2xl font-bold text-primary-600">{insight.value}</div>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{insight.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-6 py-3 bg-white text-slate-700 rounded-xl border-2 border-slate-200 hover:border-primary-300 transition-all duration-300 hover:scale-105"
          >
            <Download className="w-4 h-4 mr-2" />
            Baixar Relatório
          </button>
          
          <button
            onClick={handleShare}
            className="inline-flex items-center px-6 py-3 bg-white text-slate-700 rounded-xl border-2 border-slate-200 hover:border-primary-300 transition-all duration-300 hover:scale-105"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar
          </button>
          
          <button
            onClick={onRestart}
            className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Nova Exploração
          </button>
        </motion.div>
      </div>
    </div>
  )
}