import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { connectLiveAPI } from '../services/GeminiService';
import { MicIcon, MicOffIcon, Volume2Icon, VolumeXIcon, ActivityIcon, BotIcon, UserIcon } from './Icons';

export const LiveAudioInterface: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  const startSession = async () => {
    try {
      const session = await connectLiveAPI({
        onopen: () => {
          setIsConnected(true);
          startAudioCapture();
        },
        onmessage: async (message: any) => {
          if (message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data) {
            const base64Audio = message.serverContent.modelTurn.parts[0].inlineData.data;
            playAudio(base64Audio);
          }
          if (message.serverContent?.modelTurn?.parts?.[0]?.text) {
            setTranscript(prev => [...prev, `Nexus: ${message.serverContent.modelTurn.parts[0].text}`]);
          }
          if (message.serverContent?.interrupted) {
            stopAudioPlayback();
          }
        },
        onclose: () => {
          setIsConnected(false);
          stopAudioCapture();
        },
        onerror: (error: any) => {
          console.error('Live API Error:', error);
          setIsConnected(false);
        }
      });
      sessionRef.current = session;
    } catch (error) {
      console.error('Failed to start Live session:', error);
    }
  };

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    setIsConnected(false);
    stopAudioCapture();
  };

  const startAudioCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext({ sampleRate: 16000 });
      const source = audioContextRef.current.createMediaStreamSource(stream);
      processorRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);

      processorRef.current.onaudioprocess = (e) => {
        if (isMuted) return;
        const inputData = e.inputBuffer.getChannelData(0);
        const pcmData = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7FFF;
        }
        const base64Data = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)));
        sessionRef.current?.sendRealtimeInput({
          audio: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
        });
      };

      source.connect(processorRef.current);
      processorRef.current.connect(audioContextRef.current.destination);
    } catch (error) {
      console.error('Audio capture failed:', error);
    }
  };

  const stopAudioCapture = () => {
    processorRef.current?.disconnect();
    audioContextRef.current?.close();
    processorRef.current = null;
    audioContextRef.current = null;
  };

  const playAudio = async (base64Data: string) => {
    if (!audioContextRef.current) return;
    setIsSpeaking(true);
    const binaryData = atob(base64Data);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryData.length; i++) {
      view[i] = binaryData.charCodeAt(i);
    }
    
    // Manual PCM decoding (simplified)
    const audioBuffer = audioContextRef.current.createBuffer(1, view.length / 2, 16000);
    const channelData = audioBuffer.getChannelData(0);
    const int16View = new Int16Array(arrayBuffer);
    for (let i = 0; i < int16View.length; i++) {
      channelData[i] = int16View[i] / 0x7FFF;
    }

    sourceRef.current = audioContextRef.current.createBufferSource();
    sourceRef.current.buffer = audioBuffer;
    sourceRef.current.connect(audioContextRef.current.destination);
    sourceRef.current.onended = () => setIsSpeaking(false);
    sourceRef.current.start();
  };

  const stopAudioPlayback = () => {
    sourceRef.current?.stop();
    sourceRef.current = null;
    setIsSpeaking(false);
  };

  return (
    <div className="flex flex-col h-full bg-black/40 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-bottom border-white/10 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-2">
          <ActivityIcon className={`w-5 h-5 ${isConnected ? 'text-green-400 animate-pulse' : 'text-white/20'}`} />
          <span className="text-sm font-bold tracking-widest text-white uppercase">Neural Link</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded-lg transition-all ${isMuted ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'text-white/40 hover:text-white/60'}`}
            title={isMuted ? "Unmute Neural Link" : "Mute Neural Link"}
          >
            {isMuted ? <MicOffIcon className="w-4 h-4" /> : <MicIcon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Visualization / Status */}
      <div className="flex-grow flex flex-col items-center justify-center p-8 space-y-8 relative overflow-hidden">
        {/* Background Glow */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isConnected ? 'opacity-20' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-radial-gradient from-cyan-500/30 to-transparent blur-3xl" />
        </div>

        {/* Visualizer Orb */}
        <div className="relative">
          <motion.div
            animate={{
              scale: isSpeaking ? [1, 1.2, 1] : 1,
              boxShadow: isSpeaking 
                ? ["0 0 20px rgba(34,211,238,0.2)", "0 0 60px rgba(34,211,238,0.4)", "0 0 20px rgba(34,211,238,0.2)"]
                : "0 0 20px rgba(255,255,255,0.05)"
            }}
            transition={{ duration: 1, repeat: Infinity }}
            className={`w-32 h-32 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${isConnected ? 'border-cyan-400 bg-cyan-400/10' : 'border-white/10 bg-white/5'}`}
          >
            {isConnected ? (
              <BotIcon className={`w-12 h-12 ${isSpeaking ? 'text-cyan-400' : 'text-cyan-400/40'}`} />
            ) : (
              <VolumeXIcon className="w-12 h-12 text-white/10" />
            )}
          </motion.div>
          
          {/* Pulse Rings */}
          {isConnected && (
            <>
              <motion.div
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 border border-cyan-400/30 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 border border-cyan-400/20 rounded-full"
              />
            </>
          )}
        </div>

        <div className="text-center space-y-2">
          <h3 className={`text-lg font-bold uppercase tracking-[0.2em] transition-colors ${isConnected ? 'text-white' : 'text-white/20'}`}>
            {isConnected ? (isSpeaking ? 'Nexus Transmitting...' : 'Nexus Listening...') : 'Link Offline'}
          </h3>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
            {isConnected ? 'Biometric Data Synced' : 'Awaiting Neural Handshake'}
          </p>
        </div>

        {/* Transcript Preview */}
        <div ref={scrollRef} className="w-full max-h-32 overflow-y-auto p-4 bg-white/5 border border-white/10 rounded-xl custom-scrollbar">
          {transcript.length === 0 ? (
            <p className="text-[10px] text-white/20 text-center uppercase tracking-widest italic">No neural data recorded</p>
          ) : (
            <div className="space-y-2">
              {transcript.map((line, i) => (
                <p key={i} className="text-[10px] text-white/60 font-mono leading-tight">
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer / Toggle */}
      <div className="p-6 bg-white/5 border-top border-white/10 flex justify-center">
        <button
          onClick={isConnected ? stopSession : startSession}
          className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-xl ${isConnected ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30' : 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-cyan-500/20'}`}
        >
          {isConnected ? 'Terminate Neural Link' : 'Establish Neural Link'}
        </button>
      </div>
    </div>
  );
};
