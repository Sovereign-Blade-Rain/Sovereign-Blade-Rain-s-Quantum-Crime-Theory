import React from 'react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';

export const RolePlayHUD: React.FC = () => {
    const { rolePlayState, isHudEnabled } = useAppContext();

    if (!isHudEnabled) return null;

    const { role, isInsideShip, isLanded, prisonerStatus, fuel, isDetected, isAdmin } = rolePlayState;

    return (
        <div className="fixed top-20 left-4 z-50 pointer-events-none flex flex-col gap-2 font-mono text-xs">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-black/60 backdrop-blur-md border border-white/20 p-3 rounded-lg text-white min-w-[200px]"
            >
                <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-1">
                    <span className="uppercase tracking-widest opacity-50">Role Play Status</span>
                    <div className="flex gap-1">
                        {isAdmin && (
                            <span className="px-1.5 py-0.5 bg-red-500/40 text-white rounded text-[8px] uppercase font-bold border border-red-500/50">
                                ADMIN
                            </span>
                        )}
                        <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${
                            role === 'pilot' ? 'bg-blue-500/20 text-blue-400' :
                            role === 'passenger' ? 'bg-green-500/20 text-green-400' :
                            'bg-red-500/20 text-red-400'
                        }`}>
                            {role}
                        </span>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="flex justify-between">
                        <span className="opacity-70">Location:</span>
                        <span>{isInsideShip ? 'Inside Ship' : 'Outside Ship'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="opacity-70">Status:</span>
                        <span className={isLanded ? 'text-green-400' : 'text-blue-400'}>
                            {isLanded ? 'Landed' : 'In Flight'}
                        </span>
                    </div>
                    
                    {role === 'prisoner' && (
                        <div className="flex justify-between">
                            <span className="opacity-70">Prisoner:</span>
                            <span className={
                                prisonerStatus === 'imprisoned' ? 'text-red-400' :
                                prisonerStatus === 'hidden' ? 'text-yellow-400' : 'text-green-400'
                            }>
                                {prisonerStatus.toUpperCase()}
                            </span>
                        </div>
                    )}

                    <div className="mt-2">
                        <div className="flex justify-between mb-1">
                            <span className="opacity-70 text-[10px]">FUEL RESERVE</span>
                            <span className={`text-[10px] ${fuel < 20 ? 'text-red-400 animate-pulse' : ''}`}>
                                {Math.round(fuel)}%
                            </span>
                        </div>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                                className={`h-full ${fuel < 20 ? 'bg-red-500' : 'bg-blue-400'}`}
                                initial={{ width: '100%' }}
                                animate={{ width: `${fuel}%` }}
                            />
                        </div>
                    </div>

                    <AnimatePresence>
                        {isDetected && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="mt-2 bg-red-500/40 border border-red-500 p-1.5 text-center text-[10px] font-bold animate-pulse"
                            >
                                !!! DETECTED BY CREW !!!
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-black/40 backdrop-blur-sm border border-white/10 p-2 rounded-lg text-[10px] text-white/60"
            >
                <div className="uppercase tracking-widest opacity-40 mb-1 text-[9px]">Keybinds</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <div className="flex justify-between"><span>[L]</span> <span className="text-white/80">Land</span></div>
                    <div className="flex justify-between"><span>[T]</span> <span className="text-white/80">Takeoff</span></div>
                    <div className="flex justify-between"><span>[X]</span> <span className="text-white/80">Exit</span></div>
                    <div className="flex justify-between"><span>[E]</span> <span className="text-white/80">Enter</span></div>
                    <div className="flex justify-between"><span>[R]</span> <span className="text-white/80">Refuel</span></div>
                    {role === 'prisoner' && (
                        <>
                            <div className="flex justify-between"><span>[U]</span> <span className="text-white/80">Escape</span></div>
                            <div className="flex justify-between"><span>[H]</span> <span className="text-white/80">Hide</span></div>
                        </>
                    )}
                    {role === 'pilot' && (
                        <>
                            <div className="flex justify-between"><span>[C]</span> <span className="text-white/80">Capture</span></div>
                            <div className="flex justify-between"><span>[V]</span> <span className="text-white/80">Release</span></div>
                            <div className="flex justify-between"><span>[K]</span> <span className="text-white/80">Execute</span></div>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
