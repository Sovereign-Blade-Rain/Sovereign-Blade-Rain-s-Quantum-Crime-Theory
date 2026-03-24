import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { generateImage, editImage, generateVideo, analyzeMedia, textToSpeech } from '../services/GeminiService';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ImageIcon, MovieIcon, SparklesIcon, MicIcon, Volume2Icon, CameraIcon, UploadIcon, WandIcon, TrashIcon, DownloadIcon, BrainIcon } from './Icons';

export const AssetGenerator: React.FC = () => {
  const [user] = useAuthState(auth);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [assetType, setAssetType] = useState<'image' | 'video'>('image');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [imageSize, setImageSize] = useState('1K');
  const [quality, setQuality] = useState<'standard' | 'high' | 'studio'>('standard');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || !user) return;
    setIsGenerating(true);
    setGeneratedUrl(null);
    setAnalysisResult(null);

    try {
      let url = '';
      if (assetType === 'image') {
        if (uploadedImage) {
          url = await editImage(prompt, uploadedImage);
        } else {
          url = await generateImage(prompt, { aspectRatio, imageSize, quality });
        }
      } else {
        url = await generateVideo(prompt, uploadedImage || undefined, aspectRatio as any);
      }

      setGeneratedUrl(url);

      // Save to Firestore
      const assetPath = 'assets';
      await addDoc(collection(db, assetPath), {
        id: crypto.randomUUID(),
        type: assetType,
        url: url,
        prompt: prompt,
        ownerUid: user.uid,
        createdAt: serverTimestamp()
      });

    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedImage || !user) return;
    setIsGenerating(true);
    try {
      const result = await analyzeMedia(prompt || "Analyze this image in detail.", [{ data: uploadedImage, mimeType: 'image/png' }]);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTTS = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      const url = await textToSpeech(prompt);
      const audio = new Audio(url);
      audio.play();
    } catch (error) {
      console.error('TTS failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/40 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-bottom border-white/10 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-2">
          <SparklesIcon className="w-5 h-5 text-cyan-400" />
          <span className="text-sm font-bold tracking-widest text-white uppercase">Nexus Forge</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setAssetType('image')}
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${assetType === 'image' ? 'bg-cyan-500 text-black' : 'bg-white/5 text-white/40 hover:text-white/60'}`}
          >
            Image
          </button>
          <button
            onClick={() => setAssetType('video')}
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${assetType === 'video' ? 'bg-purple-500 text-black' : 'bg-white/5 text-white/40 hover:text-white/60'}`}
          >
            Video
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {/* Upload Area */}
        <div className="relative group">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`aspect-video rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-3 overflow-hidden ${uploadedImage ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-white/10 hover:border-white/20 bg-white/5'}`}
          >
            {uploadedImage ? (
              <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover" />
            ) : (
              <>
                <UploadIcon className="w-8 h-8 text-white/20 group-hover:text-white/40" />
                <span className="text-xs text-white/40 font-bold uppercase tracking-widest">Upload Reference</span>
              </>
            )}
          </div>
          {uploadedImage && (
            <button 
              onClick={(e) => { e.stopPropagation(); setUploadedImage(null); }}
              className="absolute top-2 right-2 p-2 bg-black/60 hover:bg-red-500/40 text-white rounded-lg backdrop-blur-md transition-all"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          )}
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-white/40 tracking-widest">Aspect Ratio</label>
              <select 
                value={aspectRatio} 
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyan-500/50"
              >
                <option value="1:1">1:1 Square</option>
                <option value="16:9">16:9 Landscape</option>
                <option value="9:16">9:16 Portrait</option>
                <option value="4:3">4:3 Classic</option>
                <option value="3:4">3:4 Portrait</option>
                <option value="2:3">2:3 Portrait</option>
                <option value="3:2">3:2 Landscape</option>
                <option value="21:9">21:9 UltraWide</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-white/40 tracking-widest">Resolution</label>
              <select 
                value={imageSize} 
                onChange={(e) => setImageSize(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cyan-500/50"
              >
                <option value="1K">1K Standard</option>
                <option value="2K">2K High</option>
                <option value="4K">4K Ultra</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setQuality('standard')}
              className={`flex-grow py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${quality === 'standard' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'bg-white/5 text-white/40 border border-transparent'}`}
            >
              Standard
            </button>
            <button
              onClick={() => setQuality('high')}
              className={`flex-grow py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${quality === 'high' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' : 'bg-white/5 text-white/40 border border-transparent'}`}
            >
              High Quality
            </button>
            <button
              onClick={() => setQuality('studio')}
              className={`flex-grow py-2 rounded-lg text-[10px] font-bold uppercase transition-all ${quality === 'studio' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' : 'bg-white/5 text-white/40 border border-transparent'}`}
            >
              Studio
            </button>
          </div>
        </div>

        {/* Prompt Input */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase text-white/40 tracking-widest">Manifestation Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the anomaly..."
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 resize-none min-h-[80px]"
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="flex items-center justify-center gap-2 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-white/5 disabled:text-white/20 text-white text-xs font-bold uppercase rounded-xl transition-all shadow-lg shadow-cyan-500/10"
          >
            {isGenerating ? <SparklesIcon className="w-4 h-4 animate-spin" /> : <WandIcon className="w-4 h-4" />}
            {assetType === 'image' ? 'Manifest Image' : 'Generate Video'}
          </button>
          <button
            onClick={handleAnalyze}
            disabled={isGenerating || !uploadedImage}
            className="flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:text-white/20 text-white text-xs font-bold uppercase rounded-xl transition-all border border-white/10"
          >
            <CameraIcon className="w-4 h-4" />
            Analyze Image
          </button>
          <button
            onClick={handleTTS}
            disabled={isGenerating || !prompt.trim()}
            className="col-span-2 flex items-center justify-center gap-2 py-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 text-xs font-bold uppercase rounded-xl transition-all border border-purple-500/50"
          >
            <Volume2Icon className="w-4 h-4" />
            Vocalize Prompt (TTS)
          </button>
        </div>

        {/* Results */}
        <AnimatePresence>
          {generatedUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <div className="aspect-video rounded-xl overflow-hidden border border-cyan-500/30 bg-black shadow-2xl">
                {assetType === 'image' ? (
                  <img src={generatedUrl} alt="Generated" className="w-full h-full object-contain" />
                ) : (
                  <video src={generatedUrl} controls className="w-full h-full" />
                )}
              </div>
              <a 
                href={generatedUrl} 
                download={`nexus-${Date.now()}`}
                className="flex items-center justify-center gap-2 w-full py-2 bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold uppercase rounded-lg transition-all border border-white/10"
              >
                <DownloadIcon className="w-3 h-3" />
                Download Manifestation
              </a>
            </motion.div>
          )}

          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl space-y-2"
            >
              <div className="flex items-center gap-2 text-cyan-400">
                <BrainIcon className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Analysis Report</span>
              </div>
              <p className="text-xs text-white/80 leading-relaxed italic">
                {analysisResult}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
