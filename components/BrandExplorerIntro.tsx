'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, Sparkles, Target, Users, Brain, Zap, TrendingUp, Award } from 'lucide-react'
import Image from 'next/image'

interface BrandExplorerIntroProps {
  onStart: () => void
}

export function BrandExplorerIntro({ onStart }: BrandExplorerIntroProps) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const features = [
    {
      icon: Compass,
      title: "Arquétipos de Marca",
      description: "Descubra os padrões fundamentais que definem a personalidade da sua marca",
      details: "12 arquétipos únicos baseados em psicologia comportamental"
    },
    {
      icon: Sparkles,
      title: "Persona de Marca",
      description: "Revele o caráter único e a voz autêntica da sua marca",
      details: "Análise detalhada de personalidade e tom de comunicação"
    },
    {
      icon: Target,
      title: "Ethos de Marca",
      description: "Defina os valores centrais e crenças que impulsionam sua missão",
      details: "Até 6 valores fundamentais com definições estratégicas"
    },
    {
      icon: Users,
      title: "Buyer Persona",
      description: "Identifique e compreenda o perfil do seu cliente ideal",
      details: "Perfil psicográfico e demográfico detalhado"
    }
  ]

  const stats = [
    { icon: Brain, number: '16+', label: 'Perguntas Estratégicas', color: 'text-primary-500' },
    { icon: Zap, number: '12', label: 'Arquétipos de Marca', color: 'text-emerald-500' },
    { icon: TrendingUp, number: '95%', label: 'Taxa de Precisão', color: 'text-blue-500' },
    { icon: Award, number: '∞', label: 'Insights Únicos', color: 'text-purple-500' }
  ]

  const benefits = [
    "Identidade de marca clara e consistente",
    "Estratégia de comunicação alinhada",
    "Diferenciação competitiva efetiva",
    "Conexão emocional com audiência",
    "Direcionamento de marketing preciso",
    "Base sólida para crescimento"
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-400 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-3xl mb-8 brand-shadow overflow-hidden"
          >
            <Image
              src="https://integrare.b-cdn.net/Ativo%202%20-%20Copia.png"
              alt="Integrare Logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text text-balance"
          >
            Brand Explorer
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-slate-600 mb-8 max-w-4xl mx-auto text-balance font-light"
          >
            Embarque numa jornada transformadora para descobrir a verdadeira identidade da sua marca através de questionamento estratégico e análise profunda
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={onStart}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-2xl transition-all duration-300 brand-shadow hover:scale-105 text-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Iniciar Exploração
            </button>
            <p className="text-sm text-slate-500">
              • Gratuito • 5-8 minutos • Relatório detalhado
            </p>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              onHoverStart={() => setHoveredFeature(index)}
              onHoverEnd={() => setHoveredFeature(null)}
              className="group cursor-pointer"
            >
              <div className="glass-morphism rounded-3xl p-8 hover:bg-white/50 transition-all duration-500 h-full relative overflow-hidden">
                <motion.div
                  animate={{ 
                    scale: hoveredFeature === index ? 1.1 : 1,
                    rotateY: hoveredFeature === index ? 5 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-xl transition-all duration-300"
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>

                <AnimatePresence>
                  {hoveredFeature === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-primary-600 font-medium"
                    >
                      {feature.details}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="text-center p-6 glass-morphism rounded-2xl hover:scale-105 transition-transform duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={`text-3xl font-bold mb-2 ${stat.color}`}>{stat.number}</div>
                <div className="text-slate-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-8">
            O que você descobrirá sobre sua marca
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="flex items-center p-4 glass-morphism rounded-xl hover:bg-white/60 transition-all duration-300"
              >
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-4 flex-shrink-0"></div>
                <span className="text-slate-700 font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-16 pt-12 border-t border-slate-200/50"
        >
          <p className="text-slate-600 mb-6 text-lg">
            Pronto para descobrir o DNA da sua marca?
          </p>
          <button
            onClick={onStart}
            className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-2xl transition-all duration-300 brand-shadow hover:scale-105 text-xl"
          >
            <Brain className="w-6 h-6 mr-3" />
            Começar Agora
          </button>
        </motion.div>
      </div>
    </div>
  )
}