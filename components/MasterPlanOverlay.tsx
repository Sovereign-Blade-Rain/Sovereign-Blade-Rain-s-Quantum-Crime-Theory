import React from 'react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { MASTER_PLAN_CONTENT } from '../constants/MasterPlanContent';
import { XCircleIcon } from './Icons';

export const MasterPlanOverlay: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { rolePlayState } = useAppContext();

  if (!isOpen || !rolePlayState.hasMasterPlanAccess) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative w-full max-w-7xl h-full max-h-[90vh] bg-gray-900 border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.2)] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/40">
            <div>
              <h2 className="text-3xl font-bold text-cyan-400 tracking-tighter uppercase">The Grand Master Plan</h2>
              <p className="text-xs text-white/40 font-mono">CLASSIFIED // LEVEL 7 CLEARANCE REQUIRED // EYES ONLY</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/40 hover:text-white transition-colors"
            >
              <XCircleIcon className="w-10 h-10" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto p-8 md:p-12 space-y-16 custom-scrollbar font-sans">
            {/* Preamble */}
            <section className="space-y-6">
              <h3 className="text-sm font-bold text-cyan-500/60 uppercase tracking-widest border-l-2 border-cyan-500 pl-4">Preamble</h3>
              <p className="text-xl text-white/90 leading-relaxed italic font-serif">
                "{MASTER_PLAN_CONTENT.preamble}"
              </p>
            </section>

            {/* Core Directives */}
            <section className="space-y-6">
              <h3 className="text-sm font-bold text-cyan-500/60 uppercase tracking-widest border-l-2 border-cyan-500 pl-4">Core Directives</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MASTER_PLAN_CONTENT.coreDirectives.map((directive, i) => (
                  <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-xl text-sm text-white/70 hover:border-cyan-500/30 transition-colors">
                    <span className="block text-cyan-500/40 font-mono mb-2">DIRECTIVE_{String(i + 1).padStart(2, '0')}</span>
                    {directive}
                  </div>
                ))}
              </div>
            </section>

            {/* Nexus Verse */}
            <section className="space-y-6">
              <h3 className="text-sm font-bold text-cyan-500/60 uppercase tracking-widest border-l-2 border-cyan-500 pl-4">The Nexus Verse</h3>
              <p className="text-lg text-white/70 max-w-3xl">{MASTER_PLAN_CONTENT.nexusVerse.description}</p>
              <div className="flex flex-wrap gap-3">
                {MASTER_PLAN_CONTENT.nexusVerse.structure.map((item, i) => (
                  <span key={i} className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[11px] text-cyan-300 font-mono uppercase tracking-wider">
                    {item}
                  </span>
                ))}
              </div>
            </section>

            {/* Sovereign Narrative */}
            <section className="space-y-6">
              <h3 className="text-sm font-bold text-cyan-500/60 uppercase tracking-widest border-l-2 border-cyan-500 pl-4">{MASTER_PLAN_CONTENT.sovereignNarrative.title}</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <p className="text-white/70 leading-relaxed text-lg">
                    {MASTER_PLAN_CONTENT.sovereignNarrative.content}
                  </p>
                </div>
                <div className="p-8 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50" />
                  <h4 className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-4">The Sovereign's Creed</h4>
                  <p className="text-2xl font-serif italic text-white/90 leading-tight">
                    {MASTER_PLAN_CONTENT.sovereignNarrative.creed}
                  </p>
                </div>
              </div>
            </section>

            {/* Project Bedlam */}
            <section className="space-y-6">
              <h3 className="text-sm font-bold text-cyan-500/60 uppercase tracking-widest border-l-2 border-cyan-500 pl-4">{MASTER_PLAN_CONTENT.projectBedlam.title}</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <p className="text-white/70 leading-relaxed text-lg">
                  {MASTER_PLAN_CONTENT.projectBedlam.description}
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {MASTER_PLAN_CONTENT.projectBedlam.phases.map((phase, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-black/40 border border-white/5 rounded-lg">
                      <span className="text-cyan-500 font-mono font-bold">0{i+1}</span>
                      <span className="text-sm text-white/60">{phase}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Economic Model */}
            <section className="space-y-6">
              <h3 className="text-sm font-bold text-cyan-500/60 uppercase tracking-widest border-l-2 border-cyan-500 pl-4">{MASTER_PLAN_CONTENT.economicModel.title}</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <p className="text-white/70 leading-relaxed text-lg">
                  {MASTER_PLAN_CONTENT.economicModel.description}
                </p>
                <div className="space-y-4">
                  {MASTER_PLAN_CONTENT.economicModel.tiers.map((tier, i) => {
                    const [title, desc] = tier.split(': ');
                    return (
                      <div key={i} className="group">
                        <div className="flex justify-between items-end mb-1">
                          <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{title}</span>
                          <span className="text-[10px] text-cyan-500/40 font-mono">TIER_0{i+1}</span>
                        </div>
                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70 group-hover:border-cyan-500/30 transition-colors">
                          {desc}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Clearance Levels */}
            <section className="space-y-6 pb-12">
              <h3 className="text-sm font-bold text-cyan-500/60 uppercase tracking-widest border-l-2 border-cyan-500 pl-4">Security Clearance Hierarchy</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {MASTER_PLAN_CONTENT.clearanceLevels.map((clearance, i) => (
                  <div key={i} className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 ${
                    clearance.level === 7 
                      ? 'bg-cyan-500/20 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]' 
                      : 'bg-white/5 border-white/10'
                  }`}>
                    <span className={`text-2xl font-bold ${clearance.level === 7 ? 'text-cyan-400' : 'text-white/40'}`}>
                      {clearance.level}
                    </span>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white">{clearance.name}</p>
                      <p className="text-[9px] text-white/40 leading-tight">{clearance.access}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 bg-black/40 text-center">
            <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">
              Sovereign Filing System // © 2026 The Circle of Thrones
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
