/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, ShieldCheck, Cpu, ArrowRight, Layers, FileText, CheckCircle } from 'lucide-react';

interface StateStep {
  state: string;
  agent: string;
  queue: string;
  description: string;
  log: string;
}

const MACHINE_STATES: StateStep[] = [
  { state: "UPLOADED", agent: "agent01_source", queue: "upload.raw", description: "Source discovery and initial manual upload ingestion.", log: "Discovered raw legal artifact document. Calculating SHA256..." },
  { state: "SCANNED", agent: "agent02_intake", queue: "upload.raw", description: "MIME checking, ClamAV antivirus sweep, SHA256 ledger validation.", log: "MIME type validated: application/pdf. Magic number OK. Cryptographic scan: Clean." },
  { state: "QUALITY_CHECK", agent: "agent03_quality", queue: "quality.pass", description: "DPI checks, blur metrics calculation, rotation detection.", log: "Brightness score: 82/100. Resolution checked: 300 DPI. Average blur variance: 1.8. Quality Check: PASSED." },
  { state: "PREPROCESSED", agent: "agent04_preprocess", queue: "preprocess.done", description: "Dewarping, deskewing, contrast alignment via OpenCV.", log: "Applying deskew transform: auto-rotated +0.45 degrees. CLAHE contrast normalization complete." },
  { state: "OCR_COMPLETE", agent: "agent05_ocr", queue: "ocr.done", description: "Dual-language Bengali & English character transcription.", log: "Initiating PaddleOCR engine. Character segments processed: 4,120. Average text confidence: 97.2%." },
  { state: "LAYOUT_COMPLETE", agent: "agent06_layout", queue: "layout.done", description: "Structural segmentation of headings, paragraphs, and tables via LayoutLMv3.", log: "Running LayoutLMv3 structure model. Identified: 3 Headings, 14 Paragraph blocks, 2 footers." },
  { state: "COPYRIGHT_FILTERED", agent: "agent07_copyright", queue: "copyright.done", description: "Identifying and redacting restricted publication headnotes (DLR commentaries).", log: "DLR Commercial commentary area matched at coordinates [12,44,78,10]. Redacted legally protected zones." },
  { state: "CLASSIFIED", agent: "agent08_classification", queue: "classification.done", description: "XLM-RoBERTa categorisation of court hierarchy and area of law.", log: "Classification determined: Court: Supreme Court (Appellate Division). Area: Criminal (Dowry Appeal)." },
  { state: "METADATA_COMPLETE", agent: "agent09_metadata", queue: "metadata.done", description: "Extracting legal entities (Judges, Advocates, Litigants) via Legal NER BERT.", log: "Executing Legal NER. Extracted: Judge 'Latifur Rahman', Appellant 'State', Respondent 'Opu'." },
  { state: "GRAPH_COMPLETE", agent: "agent11_graph", queue: "graph.done", description: "Assembling entity relationship graph updates into Neo4j database.", log: "Generating Cypher query. Committing Transaction: Created relationship (:Case)-[:DECIDED_BY]->(:Judge)." },
  { state: "EMBEDDED", agent: "agent12_embedding", queue: "embedding.done", description: "Generating 1024-dimension vector representations using bge-m3.", log: "Slicing legal text blocks. Executed sentence embeddings via bge-m3 model. Generated 4 chunk vectors." },
  { state: "INDEXED", agent: "agent13_search", queue: "search.done", description: "Bulk indexing semantic vectors in Qdrant and text segments in Elasticsearch.", log: "Syncing indices. Transmitting dense vectors to Qdrant. Uploading keyword strings to Elasticsearch." },
  { state: "READY", agent: "agent15_llm", queue: "reasoning.done", description: "RAG contexts compiled. Available for deterministic judicial queries.", log: "Indexing complete. System status updated: READY. RAG orchestration buffer successfully created." },
  { state: "ARCHIVED", agent: "agent17_platform", queue: "reasoning.done", description: "Permanently stored in cold ledger indices.", log: "Archiving metadata footprint in persistent WORM cold-ledger. Process finalized." }
];

const SAMPLE_DOCS = [
  { name: "Supreme Court Appeal - State v. Opu (Dowry)", size: "2.1 MB", pages: 4 },
  { name: "Bangladesh Gazette Legal Reform Bill (2018)", size: "4.2 MB", pages: 12 },
  { name: "Land Disputing Civil Revision Petition (2026)", size: "1.5 MB", pages: 3 }
];

export function StateMachineSimulator() {
  const [activeStateIdx, setActiveStateIdx] = useState<number>(-1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [selectedDocIdx, setSelectedDocIdx] = useState<number>(0);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [simLogs]);

  const startSimulation = async () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStateIdx(0);
    setSimLogs([`[INFO] Starting processing state machine simulation for document: ${SAMPLE_DOCS[selectedDocIdx].name}`]);

    for (let i = 0; i < MACHINE_STATES.length; i++) {
      setActiveStateIdx(i);
      const step = MACHINE_STATES[i];
      
      // Add state log
      setSimLogs(prev => [
        ...prev,
        `[${step.state}] Triggered by microservice agent: ${step.agent}`,
        `[${step.state}] Messaging queue routing key: ${step.queue}`,
        `[${step.state}] Log: ${step.log}`,
        `----------------------------------------`
      ]);

      // Delay between state transition steps
      await new Promise(resolve => setTimeout(resolve, 1200));
    }

    setIsSimulating(false);
    setSimLogs(prev => [
      ...prev,
      `[SUCCESS] Simulation completed! Document is now verified and fully indexed inside the HAYAT platform.`,
      `[STATS] Total pages: ${SAMPLE_DOCS[selectedDocIdx].pages} | File size: ${SAMPLE_DOCS[selectedDocIdx].size} | Processing completed in 16.8s`
    ]);
  };

  const resetSimulation = () => {
    setActiveStateIdx(-1);
    setIsSimulating(false);
    setSimLogs([]);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 text-left animate-fadeIn">
      {/* 14-State Timeline Map */}
      <div className="xl:col-span-7 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h4 className="text-base font-sans font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> Canonical Processing State Machine
            </h4>
            <p className="text-xs text-slate-400">
              Trace documents chronologically through the 14-stage deterministic and neural ingestion flow.
            </p>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-mono font-medium border border-emerald-500/20">
            14 States
          </span>
        </div>

        {/* State Timeline Tree Scroll List */}
        <div className="border border-white/10 bg-slate-950/40 backdrop-blur-md rounded-2xl p-4 max-h-[500px] overflow-y-auto custom-scrollbar relative">
          <div className="absolute left-[31px] top-8 bottom-8 w-[2px] bg-white/10" />

          <div className="space-y-3 relative">
            {MACHINE_STATES.map((step, idx) => {
              const isPassed = idx < activeStateIdx;
              const isCurrent = idx === activeStateIdx;
              const isPending = idx > activeStateIdx && activeStateIdx !== -1;
              const isInitial = activeStateIdx === -1;

              return (
                <div key={step.state} className="flex items-start gap-4">
                  {/* Indicator Dot */}
                  <div className="relative z-10 shrink-0 mt-1">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-[10px] font-extrabold border-2 transition-all duration-300 ${
                      isPassed ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' :
                      isCurrent ? 'bg-emerald-500 text-slate-950 border-emerald-400 scale-110 shadow-[0_0_12px_rgba(16,185,129,0.4)]' :
                      isPending ? 'bg-slate-900 border-white/10 text-slate-500' :
                      'bg-slate-950 border-white/20 text-slate-300'
                    }`}>
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Step Description Card */}
                  <div className={`flex-1 p-3 rounded-xl border transition-all duration-200 ${
                    isCurrent ? 'bg-white/10 border-emerald-500/55' :
                    isPassed ? 'bg-white/5 border-white/10 opacity-70' :
                    'bg-white/2 border-transparent'
                  }`}>
                    <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                      <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                        {step.state}
                      </span>
                      <div className="flex gap-1.5">
                        <span className="bg-emerald-500/10 text-emerald-400 font-mono text-[8px] font-bold px-1.5 py-0.2 rounded border border-emerald-500/15">
                          {step.agent}
                        </span>
                        <span className="bg-blue-500/10 text-blue-400 font-mono text-[8px] font-bold px-1.5 py-0.2 rounded border border-blue-500/15">
                          queue: {step.queue}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Simulator Controls & Realtime Scrolling Logs */}
      <div className="xl:col-span-5 space-y-4 flex flex-col h-[580px]">
        {/* Simulation configuration launcher */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-md text-left">
          <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" /> Pipeline State Machine Simulator
          </h5>

          <div className="space-y-4">
            <div>
              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase block mb-1">
                Select Test Case Document:
              </span>
              <select
                disabled={isSimulating}
                value={selectedDocIdx}
                onChange={(e) => setSelectedDocIdx(Number(e.target.value))}
                className="w-full p-2 rounded-lg border border-white/10 bg-slate-950 text-slate-300 focus:outline-hidden cursor-pointer"
              >
                {SAMPLE_DOCS.map((doc, idx) => (
                  <option key={idx} value={idx} className="bg-slate-950 text-slate-200">
                    {doc.name} ({doc.size})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={startSimulation}
                disabled={isSimulating}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-sans font-bold text-xs py-2 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5" /> Start Simulation
              </button>
              <button
                onClick={resetSimulation}
                disabled={isSimulating}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-sans font-semibold text-xs py-2 px-3 rounded-xl transition-all flex items-center justify-center cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>
          </div>
        </div>

        {/* Realtime Terminal Log Console */}
        <div className="bg-slate-950 border border-white/10 rounded-2xl p-4 shadow-lg flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
            <span className="text-[10px] font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              &gt;_ State Machine Transition Logs
            </span>
            {isSimulating && (
              <span className="text-[8px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded animate-pulse">
                Simulating...
              </span>
            )}
          </div>

          {/* Log Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 font-mono text-[10px] text-left select-text custom-scrollbar">
            {simLogs.length === 0 ? (
              <div className="text-slate-600 text-center py-24">
                Simulator Idle. Click "Start Simulation" above to monitor the state machine pipelines in real-time.
              </div>
            ) : (
              <div className="space-y-1.5">
                {simLogs.map((log, idx) => {
                  let logColor = "text-slate-400";
                  if (log.startsWith("[SUCCESS]")) logColor = "text-emerald-400 font-bold";
                  else if (log.startsWith("[INFO]")) logColor = "text-blue-400";
                  else if (log.includes("Log:")) logColor = "text-slate-200";

                  return (
                    <div key={idx} className={`leading-relaxed break-words font-mono ${logColor}`}>
                      {log}
                    </div>
                  );
                })}
                <div ref={consoleBottomRef} />
              </div>
            )}
          </div>

          <div className="border-t border-white/5 pt-2 mt-2 flex items-center justify-between text-[8px] text-slate-500 font-mono">
            <span>Orchestration Strategy: Temporal</span>
            <span>Uptime: 100.0%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
