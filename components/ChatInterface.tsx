import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { chatWithGemini, transcribeAudio, textToSpeech, lowLatencyResponse } from '../services/GeminiService';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SparklesIcon, SendIcon, SearchIcon, MapPinIcon, BrainIcon, UserIcon, BotIcon, MicIcon, PaperclipIcon, Volume2Icon, TrashIcon } from './Icons';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: any;
  isThinking?: boolean;
  media?: { data: string, mimeType: string }[];
  groundingMetadata?: any;
}

export const ChatInterface: React.FC = () => {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useGrounding, setUseGrounding] = useState(false);
  const [useHighThinking, setUseHighThinking] = useState(false);
  const [useFastMode, setUseFastMode] = useState(false);
  const [attachedMedia, setAttachedMedia] = useState<{ data: string, mimeType: string }[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    files.forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachedMedia(prev => [...prev, { data: reader.result as string, mimeType: file.type }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e: BlobEvent) => {
        audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current as BlobPart[], { type: 'audio/wav' });
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64 = reader.result as string;
          setIsLoading(true);
          try {
            const transcription = await transcribeAudio(base64);
            setInput(prev => prev + (prev ? ' ' : '') + transcription);
          } catch (error) {
            console.error('Transcription failed:', error);
          } finally {
            setIsLoading(false);
          }
        };
        reader.readAsDataURL(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Microphone access denied:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playTTS = async (text: string) => {
    try {
      const url = await textToSpeech(text);
      const audio = new Audio(url);
      audio.play();
    } catch (error) {
      console.error('TTS failed:', error);
    }
  };

  useEffect(() => {
    if (!user) return;

    const chatPath = `chats/${user.uid}/messages`;
    const q = query(collection(db, chatPath), orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(msgs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, chatPath);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if ((!input.trim() && attachedMedia.length === 0) || !user) return;

    const userMessage = input;
    const media = [...attachedMedia];
    setInput('');
    setAttachedMedia([]);
    setIsLoading(true);

    const chatPath = `chats/${user.uid}/messages`;

    try {
      // Add user message to Firestore
      await addDoc(collection(db, chatPath), {
        role: 'user',
        content: userMessage,
        media: media,
        timestamp: serverTimestamp()
      });

      const chatHistory = messages.map(m => ({ role: m.role, content: m.content, media: m.media }));
      chatHistory.push({ role: 'user', content: userMessage, media: media });
      
      const systemInstruction = "You are the Nexus-Verse AI assistant. You are helpful, slightly mysterious, and deeply integrated into the ship's systems. You can help with shader code, lore, and ship operations. You can analyze images, videos, and audio.";
      
      let responseText = '';
      let groundingMetadata = null;

      if (useFastMode) {
        responseText = await lowLatencyResponse(userMessage);
      } else {
        const result = await chatWithGemini(chatHistory, systemInstruction, useGrounding, useHighThinking);
        responseText = result.text;
        groundingMetadata = result.groundingMetadata;
      }

      // Add model response to Firestore
      await addDoc(collection(db, chatPath), {
        role: 'model',
        content: responseText,
        timestamp: serverTimestamp(),
        isThinking: useHighThinking,
        groundingMetadata: groundingMetadata
      });

    } catch (error) {
      console.error('Error in chat:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/40 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-bottom border-white/10 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-2">
          <BotIcon className="w-5 h-5 text-cyan-400" />
          <span className="text-sm font-bold tracking-widest text-white uppercase">Nexus Intelligence</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setUseFastMode(!useFastMode)}
            className={`p-2 rounded-lg transition-all ${useFastMode ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' : 'text-white/40 hover:text-white/60'}`}
            title="Toggle Fast Mode (Low Latency)"
          >
            <SparklesIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setUseGrounding(!useGrounding)}
            className={`p-2 rounded-lg transition-all ${useGrounding ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'text-white/40 hover:text-white/60'}`}
            title="Toggle Search/Maps Grounding"
          >
            <SearchIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setUseHighThinking(!useHighThinking)}
            className={`p-2 rounded-lg transition-all ${useHighThinking ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' : 'text-white/40 hover:text-white/60'}`}
            title="Toggle High Thinking Mode"
          >
            <BrainIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-cyan-600/20 border border-cyan-500/30 text-cyan-50 rounded-tr-none' 
                  : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  {msg.role === 'user' ? (
                    <UserIcon className="w-3 h-3 text-cyan-400" />
                  ) : (
                    <BotIcon className="w-3 h-3 text-purple-400" />
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-tighter opacity-50">
                    {msg.role === 'user' ? 'Pilot' : 'Nexus'}
                    {msg.isThinking && ' • Thinking'}
                  </span>
                  {msg.role === 'model' && (
                    <button 
                      onClick={() => playTTS(msg.content)}
                      className="ml-auto p-1 hover:text-cyan-400 transition-colors"
                    >
                      <Volume2Icon className="w-3 h-3" />
                    </button>
                  )}
                </div>
                {msg.media && msg.media.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {msg.media.map((m, i) => (
                      <div key={i} className="w-20 h-20 rounded-lg overflow-hidden border border-white/10">
                        {m.mimeType.startsWith('image') ? (
                          <img src={m.data} alt="Media" className="w-full h-full object-cover" />
                        ) : m.mimeType.startsWith('video') ? (
                          <video src={m.data} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-white/5">
                            <Volume2Icon className="w-6 h-6 text-white/20" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </div>
                {msg.groundingMetadata?.groundingChunks && (
                  <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Sources</p>
                    <div className="flex flex-wrap gap-2">
                      {msg.groundingMetadata.groundingChunks.map((chunk: any, i: number) => (
                        chunk.web && (
                          <a 
                            key={i} 
                            href={chunk.web.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1 bg-cyan-500/10 px-2 py-1 rounded"
                          >
                            <SearchIcon className="w-3 h-3" />
                            {chunk.web.title || 'Source'}
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white/5 border-top border-white/10 space-y-3">
        {attachedMedia.length > 0 && (
          <div className="flex flex-wrap gap-2 pb-2">
            {attachedMedia.map((m, i) => (
              <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-cyan-500/30">
                {m.mimeType.startsWith('image') ? (
                  <img src={m.data} alt="Media" className="w-full h-full object-cover" />
                ) : m.mimeType.startsWith('video') ? (
                  <video src={m.data} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/5">
                    <Volume2Icon className="w-4 h-4 text-white/20" />
                  </div>
                )}
                <button 
                  onClick={() => setAttachedMedia(prev => prev.filter((_, idx) => idx !== i))}
                  className="absolute top-0 right-0 p-0.5 bg-black/60 text-white rounded-bl-lg"
                >
                  <TrashIcon className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="relative flex items-end gap-2">
          <button
            onClick={() => mediaInputRef.current?.click()}
            className="p-3 bg-white/5 hover:bg-white/10 text-white/60 rounded-xl transition-all border border-white/10"
          >
            <PaperclipIcon className="w-4 h-4" />
          </button>
          <input 
            type="file" 
            ref={mediaInputRef} 
            onChange={handleMediaUpload} 
            className="hidden" 
            multiple 
            accept="image/*,video/*,audio/*"
          />
          
          <div className="relative flex-grow">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Transmit command..."
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 resize-none min-h-[44px] max-h-[120px]"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || (!input.trim() && attachedMedia.length === 0)}
              className="absolute right-2 bottom-2 p-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-white/5 disabled:text-white/20 text-white rounded-lg transition-all"
            >
              <SendIcon className="w-4 h-4" />
            </button>
          </div>

          <button
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onMouseLeave={stopRecording}
            className={`p-3 rounded-xl transition-all border ${isRecording ? 'bg-red-500/20 text-red-400 border-red-500/50 animate-pulse' : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'}`}
          >
            <MicIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
