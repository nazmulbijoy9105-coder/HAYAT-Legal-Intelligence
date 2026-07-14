/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, FileText, CheckCircle, RotateCcw, AlertTriangle, ShieldCheck, Cpu, Sliders, Image, Sparkles } from 'lucide-react';
import { IngestionMetrics, OCRBoundingBox } from '../types';

export function IngestionPipeline() {
  const [activeSample, setActiveSample] = useState<'gazette' | 'judgment' | 'custom' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState('');
  const [metrics, setMetrics] = useState<IngestionMetrics | null>(null);
  const [boxes, setBoxes] = useState<OCRBoundingBox[]>([]);
  
  // Preprocessing Toggle States
  const [deskewOn, setDeskewOn] = useState(true);
  const [dewarpOn, setDewarpOn] = useState(true);
  const [contrastOn, setContrastOn] = useState(true);
  const [thresholdOn, setThresholdOn] = useState(true);
  const [superResOn, setSuperResOn] = useState(false);
  const [redactCopyright, setRedactCopyright] = useState(true);

  // File Upload Drag-and-Drop Simulation
  const [dragOver, setDragOver] = useState(false);

  const triggerIngest = async (sampleType: 'gazette' | 'judgment' | 'custom') => {
    setIsProcessing(true);
    setActiveSample(sampleType);
    setMetrics(null);
    setBoxes([]);

    // Step-by-step pipeline timing simulator
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const res = await fetch('/api/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sampleType })
      });
      const data = await res.json();
      setMetrics(data.metrics);
      setBoxes(data.boxes);
      setFileName(data.fileName);
    } catch (err) {
      console.error("Ingestion simulation failed:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    triggerIngest('custom');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6" id="ingestion-section">
      {/* File Ingestion Sandbox (Left/Top) */}
      <div className="xl:col-span-5 space-y-6 text-left">
        <div className="border-b border-white/10 pb-3">
          <h3 className="text-lg font-sans font-semibold text-white flex items-center gap-2">
            <Upload className="w-5 h-5 text-white" /> Ingestion & Image Preprocessing
          </h3>
          <p className="text-xs text-slate-400">
            Validate, clean, and OCR physical scans or digital filings.
          </p>
        </div>

        {/* Drag-and-Drop Dropzone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => triggerIngest('gazette')}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
            dragOver
              ? 'border-emerald-400 bg-white/10'
              : 'border-white/10 hover:border-white/20 bg-white/5'
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <Upload className="w-8 h-8 text-slate-500 animate-bounce" />
            <span className="font-sans font-medium text-xs text-slate-200">
              Drag & Drop Court Document or Gazette here
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Supports PDF, PNG, TIFF up to 25MB • Automated SHA256 check
            </span>
          </div>
        </div>

        {/* Standard Templates Selector */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
            Run Predefined OCR Pipelines:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => triggerIngest('gazette')}
              disabled={isProcessing}
              className={`p-3 rounded-xl border text-left transition-all text-xs disabled:opacity-50 cursor-pointer ${
                activeSample === 'gazette'
                  ? 'border-emerald-500/55 bg-emerald-500/10'
                  : 'border-white/10 hover:border-white/20 bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4 text-amber-400 mb-1.5" />
              <span className="font-semibold text-slate-200 block">Bangladesh Gazette</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">Dowry Prohibition Act 2018</span>
            </button>

            <button
              onClick={() => triggerIngest('judgment')}
              disabled={isProcessing}
              className={`p-3 rounded-xl border text-left transition-all text-xs disabled:opacity-50 cursor-pointer ${
                activeSample === 'judgment'
                  ? 'border-emerald-500/55 bg-emerald-500/10'
                  : 'border-white/10 hover:border-white/20 bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-400 mb-1.5" />
              <span className="font-semibold text-slate-200 block">Supreme Court Judgment</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">State v. Opu precedent</span>
            </button>
          </div>
        </div>

        {/* Interactive Preprocessing Slider Panel */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 border-b border-white/10 pb-2">
            <Sliders className="w-3.5 h-3.5 text-blue-400" /> Preprocessing Toggles (Group 04)
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-300">Deskew Tilt Angle</label>
              <input
                type="checkbox"
                checked={deskewOn}
                onChange={() => setDeskewOn(!deskewOn)}
                className="rounded text-emerald-500 border-white/20 bg-slate-900 focus:ring-0 cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-300">Dewarp Book Curl</label>
              <input
                type="checkbox"
                checked={dewarpOn}
                onChange={() => setDewarpOn(!dewarpOn)}
                className="rounded text-emerald-500 border-white/20 bg-slate-900 focus:ring-0 cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-300">CLAHE Contrast Optimization</label>
              <input
                type="checkbox"
                checked={contrastOn}
                onChange={() => setContrastOn(!contrastOn)}
                className="rounded text-emerald-500 border-white/20 bg-slate-900 focus:ring-0 cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-300">Adaptive Threshold (Binarize)</label>
              <input
                type="checkbox"
                checked={thresholdOn}
                onChange={() => setThresholdOn(!thresholdOn)}
                className="rounded text-emerald-500 border-white/20 bg-slate-900 focus:ring-0 cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium text-slate-400">Copyright Filter (Group 07 Redactor)</label>
              <input
                type="checkbox"
                checked={redactCopyright}
                onChange={() => setRedactCopyright(!redactCopyright)}
                className="rounded text-emerald-500 border-white/20 bg-slate-900 focus:ring-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Visual Document Viewer & Bounding Boxes (Right/Bottom) */}
      <div className="xl:col-span-7 flex flex-col min-h-[480px]">
        {isProcessing ? (
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 flex-1 flex flex-col items-center justify-center p-8 text-center shadow-lg">
            <Cpu className="w-10 h-10 text-emerald-400 animate-spin mb-3" />
            <h4 className="font-sans font-semibold text-white">
              Processing Pipeline Executing
            </h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
              Applying CLAHE, deskewing pixel matrices, executing bilingual OCR models, and segmenting paragraphs...
            </p>
          </div>
        ) : metrics ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            {/* Visual Canvas Layout */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col h-[480px] overflow-hidden relative shadow-lg">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                <span className="font-mono text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                  <Image className="w-3.5 h-3.5 text-blue-400" /> OCR Layout Coordinate Map
                </span>
                <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-mono px-1.5 py-0.2 rounded border border-emerald-500/20">
                  {metrics.ocrConfidence}% Confidence
                </span>
              </div>

              {/* Mock Interactive Document Page Sheet */}
              <div
                className={`flex-1 rounded-lg border border-white/10 relative overflow-hidden transition-all duration-300 bg-slate-950/60 ${
                  thresholdOn ? 'bg-slate-950' : 'bg-slate-900/80'
                } ${contrastOn ? 'brightness-125' : ''}`}
                style={{
                  transform: deskewOn ? 'rotate(0deg)' : 'rotate(1.2deg)',
                  perspective: dewarpOn ? '1000px' : 'none'
                }}
              >
                {/* Visual lines resembling writing print layout */}
                <div className="absolute inset-0 p-4 opacity-10 space-y-2 pointer-events-none">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className="h-2.5 bg-gray-800 rounded-full" style={{ width: `${60 + Math.random() * 40}%` }} />
                  ))}
                </div>

                {/* Simulated overlaying Bounding Boxes */}
                {boxes.map(box => {
                  const [bx, by, bw, bh] = box.bbox;
                  
                  // Handle custom colors depending on bounding box classification type
                  let borderCol = "border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400";
                  if (box.type === 'heading') borderCol = "border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400";
                  if (box.type === 'footnote') borderCol = "border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400";
                  if (box.type === 'commentary') borderCol = "border-rose-500/40 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400";

                  // Check if this commentary box should be redacted
                  const isRedacted = redactCopyright && box.type === 'commentary';

                  return (
                    <div
                      key={box.id}
                      className={`absolute border rounded text-[8px] font-mono p-1 transition-all flex flex-col justify-between group overflow-hidden ${
                        isRedacted ? 'bg-gray-950 border-gray-950 text-gray-950 hover:bg-gray-950 select-none' : borderCol
                      }`}
                      style={{
                        left: `${bx}%`,
                        top: `${by}%`,
                        width: `${bw}%`,
                        height: `${bh}%`,
                      }}
                    >
                      {!isRedacted && (
                        <>
                          <div className="flex items-center justify-between leading-none pointer-events-none">
                            <span className="font-bold scale-90 origin-left">{box.readingOrder}. {box.type.toUpperCase()}</span>
                            <span className="text-[6px] opacity-70 group-hover:opacity-100">{Math.round(box.confidence)}%</span>
                          </div>
                          <p className="line-clamp-2 leading-tight text-[7px] text-slate-300 font-sans tracking-tight mt-0.5">
                            {box.text}
                          </p>
                        </>
                      )}
                      {isRedacted && (
                        <div className="absolute inset-0 bg-black flex items-center justify-center">
                          <span className="text-white text-[7px] font-sans uppercase tracking-widest font-bold">REDACTED_DLR_ZONE</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ingestion Meta Audit Report */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 flex flex-col h-[480px] overflow-y-auto text-xs text-left space-y-4 shadow-lg custom-scrollbar">
              <div className="border-b border-white/10 pb-2 mb-1">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
                  TIER 1 EXTRACTION RECORD
                </span>
                <h4 className="text-sm font-sans font-semibold text-white mt-0.5 truncate">
                  {fileName}
                </h4>
              </div>

              {/* Secure intake ledger details */}
              <div className="space-y-2 bg-slate-950/60 p-3 rounded-xl border border-white/10 font-mono text-[10px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">UUID Tag:</span>
                  <span className="font-bold text-slate-300">{metrics.uuid}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">File Hashing:</span>
                  <span className="font-bold text-slate-300 truncate w-32 text-right" title={metrics.sha256}>
                    {metrics.sha256.substring(0, 12)}...
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">MIME Format:</span>
                  <span className="font-bold text-slate-300">{metrics.mimeType} ({metrics.magicNumber})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Virus Scan:</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Secure (Clean)
                  </span>
                </div>
              </div>

              {/* Quality metrics */}
              <div className="space-y-2">
                <h5 className="font-sans font-bold text-slate-200">
                  Physical Image Quality Assessment
                </h5>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-slate-400 text-[9px] font-mono uppercase block">DPI Resolution</span>
                    <span className="font-semibold text-slate-200 text-xs block mt-0.5">{metrics.dpi} px</span>
                  </div>
                  <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-slate-400 text-[9px] font-mono uppercase block">Skew Angle</span>
                    <span className="font-semibold text-slate-200 text-xs block mt-0.5">{metrics.deskewAngle} degrees</span>
                  </div>
                  <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-slate-400 text-[9px] font-mono uppercase block">Blur Coefficient</span>
                    <span className="font-semibold text-slate-200 text-xs block mt-0.5">{metrics.blurLevel} / 10</span>
                  </div>
                  <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-slate-400 text-[9px] font-mono uppercase block">Aggregate Quality</span>
                    <span className="font-semibold text-emerald-400 text-xs block mt-0.5">{metrics.qualityScore} / 100</span>
                  </div>
                </div>
              </div>

              {/* Copyright Filtering details */}
              {metrics.copyrightFlags.length > 0 && (
                <div className="bg-rose-500/10 p-3.5 rounded-xl border border-rose-500/20">
                  <h5 className="font-sans font-semibold text-rose-400 mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> DLR Copyright Zone REDACTION (Group 07):
                  </h5>
                  <p className="text-rose-300 font-sans leading-relaxed">
                    Detected publisher commentaries or headnotes subject to industrial copyright. Redacting commercial text nodes to preserve absolute royalty-free open-source legal safe outputs.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="border border-dashed border-white/10 rounded-xl flex-1 flex flex-col items-center justify-center p-8 text-center bg-white/5">
            <Sparkles className="w-12 h-12 text-slate-600 mb-3" />
            <h4 className="font-sans font-semibold text-slate-300">
              Interactive Ingest Simulator
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mt-1">
              Select one of the legal scan templates or simulate file drop-off on the left, to initiate real-time pre-processing and bilingual PaddleOCR layouts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
