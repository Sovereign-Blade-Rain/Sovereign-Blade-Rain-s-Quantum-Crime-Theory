import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { MAP_PRESETS } from '../constants/worlds';
import { MapPreset, WorldPreset } from '../types';
import { GlobeIcon, SparklesIcon, ChevronRightIcon, ChevronLeftIcon } from './Icons';

export const WorldSelector: React.FC = () => {
    const { currentSessionId, handleSessionSelect } = useAppContext();
    const [selectedMapId, setSelectedMapId] = useState<string>(MAP_PRESETS[0].id);

    const selectedMap = MAP_PRESETS.find(m => m.id === selectedMapId) || MAP_PRESETS[0];

    return (
        <div className="flex flex-col h-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-cyan-900/20 to-purple-900/20">
                <div className="flex items-center gap-3 mb-2">
                    <GlobeIcon className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-xl font-bold text-white tracking-tight">Nexus Navigation</h2>
                </div>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">Select a map and destination planet</p>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Maps Sidebar */}
                <div className="w-48 border-r border-white/10 bg-black/20 overflow-y-auto no-scrollbar">
                    {MAP_PRESETS.map((map) => (
                        <button
                            key={map.id}
                            onClick={() => setSelectedMapId(map.id)}
                            className={`w-full p-4 text-left transition-all relative group ${
                                selectedMapId === map.id 
                                ? 'bg-cyan-500/10 text-cyan-400' 
                                : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
                            }`}
                        >
                            {selectedMapId === map.id && (
                                <motion.div 
                                    layoutId="map-active-indicator"
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                                />
                            )}
                            <div className="text-xs font-bold uppercase tracking-wider mb-1">{map.name}</div>
                            <div className="text-[10px] opacity-60 line-clamp-1">{map.planets.length} Planets</div>
                        </button>
                    ))}
                </div>

                {/* Planets Grid */}
                <div className="flex-1 p-6 overflow-y-auto no-scrollbar bg-gradient-to-br from-transparent to-cyan-900/5">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedMapId}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 gap-4"
                        >
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-white mb-1">{selectedMap.name}</h3>
                                <p className="text-sm text-gray-400">{selectedMap.description}</p>
                            </div>

                            {selectedMap.planets.map((planet) => (
                                <button
                                    key={planet.id}
                                    onClick={() => handleSessionSelect(planet.id)}
                                    className={`p-4 rounded-xl border text-left transition-all group relative overflow-hidden ${
                                        currentSessionId === planet.id
                                        ? 'bg-cyan-500/20 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                    }`}
                                >
                                    {currentSessionId === planet.id && (
                                        <div className="absolute top-0 right-0 p-2">
                                            <div className="bg-cyan-500 text-black text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">Current</div>
                                        </div>
                                    )}
                                    
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${
                                            currentSessionId === planet.id ? 'bg-cyan-500/20 border-cyan-500' : 'bg-white/5 border-white/20'
                                        }`}>
                                            <GlobeIcon className={`w-6 h-6 ${currentSessionId === planet.id ? 'text-cyan-400' : 'text-gray-500'}`} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{planet.name}</div>
                                            <div className="text-xs text-gray-400 line-clamp-2">{planet.description}</div>
                                        </div>
                                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ChevronRightIcon className="w-5 h-5 text-cyan-400" />
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
