'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  Globe,
  Smartphone,
  Cpu,
  Layers,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { portfolioData, Service } from '@/data/portfolio';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6 text-blue-400" />,
  Smartphone: <Smartphone className="w-6 h-6 text-purple-400" />,
  Cpu: <Cpu className="w-6 h-6 text-emerald-400" />,
  Layers: <Layers className="w-6 h-6 text-amber-400" />,
};

export const Services = () => {
  const { services, contacts } = portfolioData;

  return (
    <section id="services" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-3">
            <span>WHAT I DO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Specialized Services & Offerings
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            High-impact technical capabilities designed to solve operational bottlenecks, accelerate product launches, and automate manual tasks.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service: Service, idx: number) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle Corner Glow on Hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors pointer-events-none" />

              <div>
                {/* Icon Box */}
                <div className="w-12 h-12 rounded-xl bg-zinc-900/80 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  {iconMap[service.iconName] || <Globe className="w-6 h-6 text-blue-400" />}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Key Highlights */}
                <div className="space-y-2.5 pt-4 border-t border-white/5">
                  <span className="text-xs uppercase tracking-wider font-mono text-zinc-400 block mb-2">
                    Key Deliverables:
                  </span>
                  {service.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-8 pt-4 border-t border-white/5">
                <a
                  href={`https://wa.me/${contacts.whatsappRaw}?text=Hello%20Triono,%20I'm%20interested%20in%20your%20${encodeURIComponent(service.title)}%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 group-hover:translate-x-1 transition-all"
                >
                  <span>Discuss a {service.title} Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
