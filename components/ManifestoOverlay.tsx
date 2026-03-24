import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MANIFESTO_CONTENT } from '../constants/ManifestoContent';
import { XCircleIcon, ShieldCheckIcon, CodeIcon, GlobeIcon, UserIcon } from './Icons';

interface ManifestoOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManifestoOverlay: React.FC<ManifestoOverlayProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-2xl"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="relative w-full max-w-7xl max-h-[90vh] bg-gray-900/50 border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.1)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex-shrink-0 p-6 border-b border-cyan-500/20 bg-cyan-950/20 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-black text-white tracking-tighter uppercase flex items-center gap-3">
                  <ShieldCheckIcon className="w-8 h-8 text-cyan-400" />
                  QUANTUM CRIME THEORY: THE MASTER MANIFESTO
                </h1>
                <div className="flex gap-4 mt-1">
                  <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    VERSION: {MANIFESTO_CONTENT.version}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    AUTHORITY: {MANIFESTO_CONTENT.authority}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                <XCircleIcon className="w-8 h-8" />
              </button>
            </div>

            {/* Content Container */}
            <div className="flex-grow overflow-y-auto p-8 md:p-12 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {MANIFESTO_CONTENT.sections.map((section) => (
                  <div key={section.id} className="space-y-6">
                    <div className="border-l-4 border-cyan-500 pl-6 py-2">
                      <h2 className="text-xl font-bold text-cyan-400 uppercase tracking-tight">{section.title}</h2>
                      <p className="text-sm text-gray-400 mt-2 leading-relaxed italic">
                        {section.content}
                      </p>
                    </div>

                    {section.subsections?.map((sub, idx) => (
                      <div key={idx} className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 space-y-4">
                        <h3 className="text-md font-bold text-white uppercase tracking-wider flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                          {sub.title}
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed">{sub.content}</p>
                        
                        {sub.points && (
                          <div className="space-y-3 pt-2">
                            {sub.points.map((p, pIdx) => (
                              <div key={pIdx} className="flex gap-3 text-xs">
                                <span className="text-cyan-500 font-bold whitespace-nowrap">[{p.label}]</span>
                                <span className="text-gray-400">{p.text}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {sub.options && (
                          <div className="grid grid-cols-1 gap-3 pt-2">
                            {sub.options.map((opt, oIdx) => (
                              <div key={oIdx} className="p-3 bg-black/40 rounded border border-cyan-500/10 hover:border-cyan-500/30 transition-colors">
                                <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{opt.name}</div>
                                <div className="text-[11px] text-gray-500 mt-1">{opt.description}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {sub.example && (
                          <div className="mt-4 p-3 bg-cyan-500/5 border border-cyan-500/20 rounded text-[11px] font-mono text-cyan-400/80">
                            <span className="text-cyan-500 font-bold uppercase mr-2">Example:</span>
                            {sub.example}
                          </div>
                        )}

                        {sub.actions && (
                          <div className="grid grid-cols-1 gap-3 pt-2">
                            {sub.actions.map((act, aIdx) => (
                              <div key={aIdx} className="flex items-start gap-3">
                                <CodeIcon className="w-4 h-4 text-cyan-500 mt-0.5" />
                                <div>
                                  <div className="text-xs font-bold text-gray-200 uppercase">{act.name}</div>
                                  <div className="text-[11px] text-gray-500">{act.description}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {sub.tasks && (
                          <div className="grid grid-cols-1 gap-3 pt-2">
                            {sub.tasks.map((task, tIdx) => (
                              <div key={tIdx} className="flex items-start gap-3">
                                <GlobeIcon className="w-4 h-4 text-cyan-500 mt-0.5" />
                                <div>
                                  <div className="text-xs font-bold text-gray-200 uppercase">{task.name}</div>
                                  <div className="text-[11px] text-gray-500">{task.description}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    {section.details && (
                      <div className="space-y-4">
                        {section.details.map((d, dIdx) => (
                          <div key={dIdx} className="flex gap-4 p-4 bg-gray-800/20 rounded-lg border border-gray-700/30">
                            <div className="text-xs font-bold text-cyan-500 uppercase whitespace-nowrap min-w-[120px]">{d.label}</div>
                            <div className="text-sm text-gray-400">{d.text}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.levels && (
                      <div className="grid grid-cols-3 gap-2">
                        {section.levels.map((l, lIdx) => (
                          <div key={lIdx} className="p-3 bg-black/40 rounded border border-cyan-500/10 text-center">
                            <div className="text-[10px] text-cyan-500 font-mono">LVL {l.level}</div>
                            <div className="text-xs font-bold text-white uppercase mt-1">{l.name}</div>
                            <div className="text-[9px] text-gray-500 mt-1 leading-tight">{l.description}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.mandates && (
                      <div className="space-y-3">
                        {section.mandates.map((m, mIdx) => (
                          <div key={mIdx} className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex gap-4 items-center">
                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                              <UserIcon className="w-5 h-5 text-red-400" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-red-400 uppercase tracking-widest">{m.name}</div>
                              <div className="text-[11px] text-gray-500 mt-0.5">{m.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

              </div>

              {/* Footer Note */}
              <div className="mt-16 pt-8 border-t border-cyan-500/20 text-center">
                <p className="text-[10px] font-mono text-cyan-500/50 uppercase tracking-[0.3em]">
                  [ END OF MANIFEST - AUTHORITY OF THE CIRCLE OF THRONES ]
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
