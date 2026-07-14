/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Server, Database, Brain, Search, Terminal, AlertCircle, RefreshCw, Send, CheckCircle, Layers, Settings, Activity, FileText } from 'lucide-react';
import { RabbitMQBroker } from './RabbitMQBroker';
import { StorageSchemas } from './StorageSchemas';
import { StateMachineSimulator } from './StateMachineSimulator';
import { DevOpsAndRepo } from './DevOpsAndRepo';

interface GroupDetail {
  id: string;
  name: string;
  description: string;
  tech: string[];
  input: string;
  output: string;
}

const TIER_DATA: {
  tier: string;
  title: string;
  color: string;
  bg: string;
  border: string;
  groups: GroupDetail[];
}[] = [
  {
    tier: "TIER 1",
    title: "Document Acquisition & Processing",
    color: "text-amber-500",
    bg: "bg-amber-50/50 dark:bg-amber-950/20",
    border: "border-amber-200 dark:border-amber-900/50",
    groups: [
      { id: "g01", name: "Group 01: Source Discovery", description: "Automated ingestion pipeline. Monitors Supreme Court judgments, Bangladesh Gazette, and handles secure manual legal uploads.", tech: ["Puppeteer", "FastAPI Scraper", "API Import"], input: "Web portals / Scrape triggers", output: "Raw PDFs / HTML filings" },
      { id: "g02", name: "Group 02: Evidence Intake", description: "MIME-type validation, magic number checks, SHA256 integrity calculation, virus scanning, and WORM storage logging.", tech: ["ClamAV", "MinIO Storage", "SHA256 Hashing"], input: "Raw File", output: "Secured Document with Unique UUID" },
      { id: "g03", name: "Group 03: Image Quality", description: "Automated blur detection, brightness evaluation, rotation detection, DPI checks, and page validation to compute a Quality Score.", tech: ["OpenCV", "Quality Assessment Heuristics"], input: "Secured Document", output: "Image Quality Report" },
      { id: "g04", name: "Group 04: Image Preprocessing", description: "Performs image corrections including dewarping, deskewing, CLAHE contrast adjustments, perspective mapping, and noise removal.", tech: ["OpenCV Deskew", "Dewarping Models"], input: "Low-quality Image", output: "Normalized High-Contrast Page Images" },
      { id: "g05", name: "Group 05: OCR Pipeline", description: "Transforms pixel data into editable text. Employs dual-language models optimized for complex Bengali/English legal typography.", tech: ["PaddleOCR", "Bangla Custom OCR Model"], input: "Preprocessed Page Images", output: "Raw Text Chunks & Character Confidences" },
      { id: "g06", name: "Group 06: Document Layout", description: "Identifies logical document components like footnotes, tables, headers, footers, paragraphs, and court headings to preserve reading order.", tech: ["LayoutLMv3", "YOLOv8-Layout"], input: "Raw Text & Image", output: "Structured JSON Layout with Bounding Boxes" },
      { id: "g07", name: "Group 07: Copyright Filter", description: "Detects and filters commercial publication commentary and headnotes (DLR zone detection) to ensure output is legally safe and royalty-free.", tech: ["Regex Classifier", "Zone Masking Heuristics"], input: "Structured Layout", output: "Cleaned Legal Text Document" }
    ]
  },
  {
    tier: "TIER 2",
    title: "Legal Understanding & Extraction",
    color: "text-blue-500",
    bg: "bg-blue-50/50 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-900/50",
    groups: [
      { id: "g08", name: "Group 08: Classification", description: "Categorizes court level (Supreme Court, District Court), jurisdiction, area of law (Criminal, Civil, Writ), and procedural stage.", tech: ["XLM-RoBERTa", "LegalText Classifier"], input: "Cleaned Legal Text", output: "Document Meta-Classification" },
      { id: "g09", name: "Group 09: Metadata Extraction", description: "Extracts key legal actors: Judges, Advocates, Litigants, Dates, Acts cited, Section numbers, and crucial legal keywords.", tech: ["Bangla Legal NER", "BERT-BiLSTM-CRF"], input: "Cleaned Legal Text", output: "Extracted Legal Metadata Schema" },
      { id: "g10", name: "Group 10: Citation Resolution", description: "Normalizes references like DLR, BLD, MLR, and PLD to standard citation schemas to uniquely cross-link legal precedents.", tech: ["Citation Parser", "Regex Normalizer"], input: "Cited References", output: "Resolved Citation ID & Precedent Links" },
      { id: "g11", name: "Group 11: Knowledge Graph Construction", description: "Assembles structural relationships between Courts, Judges, Acts, Sections, Precedents, and Amendment timelines.", tech: ["Neo4j Graph Database", "Cypher Generation"], input: "Resolved Citations & Metadata", output: "Entity Relationship Graph Updates" }
    ]
  },
  {
    tier: "TIER 3",
    title: "Legal Intelligence & Search",
    color: "text-purple-500",
    bg: "bg-purple-50/50 dark:bg-purple-950/20",
    border: "border-purple-200 dark:border-purple-900/50",
    groups: [
      { id: "g12", name: "Group 12: Embedding Engine", description: "Generates high-dimensional vector representations of legal statutes, precedents, and commentaries with hierarchical semantic mapping.", tech: ["bge-m3 Embedding Model", "SentenceTransformers"], input: "Clean Text Chapters / Chunks", output: "1024-Dimension Vector Embeddings" },
      { id: "g13", name: "Group 13: Hybrid Legal Search", description: "Combines keyword matching (Elasticsearch BM25) and dense semantic searches (Qdrant), reranking results using Reciprocal Rank Fusion (RRF).", tech: ["Elasticsearch BM25", "Qdrant Vector Database", "Reranker Model"], input: "Legal Query", output: "Reranked List of Relevant Legal Statutes & Precedents" },
      { id: "g14", name: "Group 14: Deterministic Legal Engine (ILRMF)", description: "Executes a rigorous 9-stage legal deduction pipeline (ILRMF) to apply statutes to facts with verifiable citation mapping and temporal checks.", tech: ["ILRMF Decision Pipeline", "State Machine Tracker"], input: "Case Facts & Identified Legal Issues", output: "Deterministic Reasoning Verdict & Audit Report" }
    ]
  },
  {
    tier: "TIER 4",
    title: "Explainable AI & LLM layer",
    color: "text-emerald-500",
    bg: "bg-emerald-50/50 dark:bg-emerald-950/20",
    border: "border-emerald-200 dark:border-emerald-900/50",
    groups: [
      { id: "g15", name: "Group 15: LLM Orchestrator", description: "Constructs dense context prompts, injects relevant verified citations, controls tokens, and enforces legal guardrails (RAG).", tech: ["Gemini 3.5 Flash", "LangChain Prompt Templates"], input: "Facts + Retrieval Context", output: "Synthesized Legal Analysis Draft" },
      { id: "g16", name: "Group 16: Explainable AI", description: "Verifies and maps AI outputs directly to bounding box coordinates on original source files, proving document provenance and model confidence.", tech: ["Provenance Tracker", "OCR Coordinates Map"], input: "Draft Response + Bounding Box Indexes", output: "Fully Verifiable Response with Source Page Highlights" }
    ]
  },
  {
    tier: "TIER 5",
    title: "User Applications & Gateways",
    color: "text-indigo-500",
    bg: "bg-indigo-50/50 dark:bg-indigo-950/20",
    border: "border-indigo-200 dark:border-indigo-900/50",
    groups: [
      { id: "g17", name: "Group 17: User Portals", description: "Bespoke, secure interfaces for Advocates, Judges, Legal Researchers, and Administrators. Exposes unified REST and GraphQL APIs.", tech: ["React Framework", "FastAPI Gateway", "Nginx Reverse Proxy"], input: "API request / GUI Action", output: "Rendered Portal Views / JSON payloads" }
    ]
  }
];

const MOCK_EVENTS = [
  { group: "g01", msg: "Supreme Court scraper discovered 2 new civil revision judgments.", type: "info" },
  { group: "g02", msg: "Inhaling file 'judgment_cr_2026.pdf'. Size: 2.1MB. SHA256 matches verified ledger.", type: "success" },
  { group: "g03", msg: "Quality scoring finished. Blur level: 2 (Excellent). Quality Score: 95/100.", type: "info" },
  { group: "g04", msg: "OpenCV Deskew applied: auto-rotated +1.2 degrees. Noise cancellation complete.", type: "success" },
  { group: "g05", msg: "PaddleOCR initiated on page 1. Average text confidence: 97.4%.", type: "info" },
  { group: "g06", msg: "LayoutLMv3 identified: 4 headings, 12 paragraphs, 1 footnote table, 2 headers.", type: "success" },
  { group: "g07", msg: "Copyright Filter: DLR headnote area matched at coordinates [10,43,80,4]. Redacted legally protected commentary.", type: "warning" },
  { group: "g08", msg: "XLM-RoBERTa classification complete. Jurisdiction: Appellate Division, Supreme Court. Case: Criminal Appeal.", type: "success" },
  { group: "g09", msg: "NER Extracted actors: Chief Justice Latifur Rahman, State (Appellant), Opu (Respondent).", type: "info" },
  { group: "g10", msg: "Citation resolved: '52 DLR (AD) 112' mapped to Precedent Database ID prec-opu-dowry.", type: "success" },
  { group: "g11", msg: "Neo4j transaction committed: Created CaseNode(State v. Opu) -[CITED_ACT]-> ActNode(Dowry Prohibition Act).", type: "success" },
  { group: "g12", msg: "Statute Embedding generated for Dowry Prohibition Act Section 3. Vector stored in Qdrant.", type: "info" },
  { group: "g13", msg: "Hybrid Search: Merged Elasticsearch BM25 (weight 0.4) & Qdrant dense vector (weight 0.6).", type: "success" },
  { group: "g14", msg: "Deterministic Engine (ILRMF): Verified Section 3 temporal validity. Precedent 52 DLR (AD) 112 loaded.", type: "success" },
  { group: "g15", msg: "LLM Orchestrator: Injected 3 context chunks into Prompt. Context size: 4,120 tokens.", type: "info" },
  { group: "g16", msg: "Explainable AI mapping successful: Linked 'unshaken testimony' to page 1 bounding box coordinates.", type: "success" },
  { group: "g17", msg: "Gateway: Secure WebSocket connection initialized for Lawyer Portal session hyt-usr-9105.", type: "info" }
];

export function ArchitectureDiagram() {
  const [activeTab, setActiveTab] = useState<'agents' | 'broker' | 'storage' | 'pipeline' | 'devops'>('agents');
  const [selectedGroup, setSelectedGroup] = useState<GroupDetail | null>(TIER_DATA[0].groups[0]);
  const [brokerFeed, setBrokerFeed] = useState<any[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  // Simulate scrolling RabbitMQ message broker
  useEffect(() => {
    // Seed initial 6 events
    setBrokerFeed(MOCK_EVENTS.slice(0, 6).map((e, idx) => ({ ...e, id: idx, timestamp: new Date().toLocaleTimeString() })));
    
    let eventCounter = 6;
    const interval = setInterval(() => {
      if (isPaused) return;
      
      setBrokerFeed(prev => {
        const nextEvent = MOCK_EVENTS[eventCounter % MOCK_EVENTS.length];
        const newEvent = {
          ...nextEvent,
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString()
        };
        eventCounter++;
        // keep maximum 15 messages
        const updated = [...prev, newEvent];
        if (updated.length > 15) {
          updated.shift();
        }
        return updated;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="space-y-6" id="architecture-section">
      {/* Blueprint Sub-navigation tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab('agents')}
          className={`px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'agents'
              ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
              : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Server className="w-3.5 h-3.5" /> Microservices Map
        </button>
        <button
          onClick={() => setActiveTab('broker')}
          className={`px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'broker'
              ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
              : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" /> RabbitMQ Message Bus
        </button>
        <button
          onClick={() => setActiveTab('storage')}
          className={`px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'storage'
              ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
              : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Database className="w-3.5 h-3.5" /> Knowledge Storage Schemas
        </button>
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'pipeline'
              ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
              : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" /> State Machine Simulator
        </button>
        <button
          onClick={() => setActiveTab('devops')}
          className={`px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'devops'
              ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
              : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Activity className="w-3.5 h-3.5" /> Cross-Cutting & DevOps
        </button>
      </div>

      {/* Render Active Sub-tab View */}
      {activeTab === 'agents' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive Microservice Tier Map */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="text-lg font-sans font-semibold text-white">
                  HAYAT Core Operational Layers
                </h3>
                <p className="text-xs text-slate-400">
                  Interactive structural map of Bangladesh's Legal Intelligence Infrastructure.
                </p>
              </div>
              <span className="bg-blue-500/10 text-blue-400 text-xs px-2.5 py-1 rounded-full font-mono font-medium flex items-center gap-1.5 border border-blue-500/20">
                <Server className="w-3 h-3" /> Event-Driven Microservices
              </span>
            </div>

            {/* Tiers Scroll Area */}
            <div className="space-y-4 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar text-left">
              {TIER_DATA.map((tier, tIdx) => (
                <div
                  key={tier.tier}
                  className={`p-4 rounded-xl border ${tier.border} ${tier.bg} transition-all duration-300`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 border ${tier.border} shadow-xs ${tier.color}`}>
                      {tier.tier}
                    </span>
                    <h4 className="text-sm font-sans font-semibold text-slate-200">
                      {tier.title}
                    </h4>
                  </div>

                  {/* Grid of Groups in Tier */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {tier.groups.map(group => {
                      const isSelected = selectedGroup?.id === group.id;
                      return (
                        <button
                          key={group.id}
                          onClick={() => setSelectedGroup(group)}
                          className={`text-left p-3 rounded-lg border transition-all duration-200 text-xs relative overflow-hidden cursor-pointer ${
                            isSelected
                              ? 'bg-white/15 border-white/40 text-white shadow-md ring-1 ring-white/20'
                              : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-slate-200">
                              {group.name.split(':')[0]}
                            </span>
                            <span className="font-mono text-[10px] text-slate-500">
                              {group.id.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-slate-400 line-clamp-1">
                            {group.name.split(':')[1]}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail Panel and RabbitMQ Event Bus Monitor */}
          <div className="space-y-6">
            {/* Detail Inspector Card */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 shadow-lg relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-white/5 to-transparent -z-0 rounded-bl-full" />
              
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-blue-500" /> Layer Component Inspector
              </h4>

              {selectedGroup ? (
                <div className="space-y-4 relative z-10">
                  <div>
                    <h5 className="font-sans font-semibold text-white text-sm">
                      {selectedGroup.name}
                    </h5>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {selectedGroup.description}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs border-t border-white/10 pt-3">
                    <div>
                      <span className="text-slate-400 font-mono text-[10px] block uppercase tracking-wider">
                        Core Technology Stack:
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {selectedGroup.tech.map(t => (
                          <span key={t} className="bg-white/5 text-slate-300 text-[10px] px-2 py-0.5 rounded font-mono border border-white/10">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <span className="text-slate-400 font-mono text-[10px] block uppercase tracking-wider">
                          Event Input Data:
                        </span>
                        <span className="font-sans font-medium text-slate-300 block text-[11px] mt-0.5">
                          {selectedGroup.input}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-mono text-[10px] block uppercase tracking-wider">
                          Event Output Data:
                        </span>
                        <span className="font-sans font-medium text-slate-300 block text-[11px] mt-0.5">
                          {selectedGroup.output}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400 text-center py-8">
                  Click any architecture component node on the left map to audit details.
                </p>
              )}
            </div>

            {/* RabbitMQ Message Broker Feed */}
            <div className="bg-slate-950/60 backdrop-blur-md rounded-xl border border-white/10 p-5 shadow-lg flex flex-col h-[400px]">
              <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isPaused ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${isPaused ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                  </span>
                  <h4 className="text-xs font-mono font-bold text-gray-200 tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" /> RabbitMQ Event Broker
                  </h4>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="text-[10px] font-mono text-gray-400 hover:text-white px-2 py-0.5 rounded border border-gray-800 bg-gray-900 transition-colors cursor-pointer"
                  >
                    {isPaused ? 'Resume' : 'Pause'}
                  </button>
                  <button
                    onClick={() => setBrokerFeed([])}
                    className="text-[10px] font-mono text-gray-400 hover:text-white px-2 py-0.5 rounded border border-gray-800 bg-gray-900 transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Event Stream Container */}
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 font-mono text-[10px] custom-scrollbar text-left select-none">
                {brokerFeed.length === 0 ? (
                  <div className="text-gray-600 text-center py-16">
                    &gt;_ No messages on event bus. Waiting for pipeline activity...
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {brokerFeed.map((event, idx) => {
                      let badgeColor = "text-blue-400 bg-blue-950/40 border-blue-900/60";
                      if (event.type === "success") badgeColor = "text-emerald-400 bg-emerald-950/40 border-emerald-900/60";
                      if (event.type === "warning") badgeColor = "text-amber-400 bg-amber-950/40 border-amber-900/60";

                      return (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-b border-gray-900/60 pb-2 flex items-start gap-2 group cursor-pointer hover:bg-gray-900/20 px-1 py-0.5 rounded text-left"
                          onClick={() => {
                            const matchedDetail = TIER_DATA.flatMap(t => t.groups).find(g => g.id === event.group);
                            if (matchedDetail) setSelectedGroup(matchedDetail);
                          }}
                        >
                          <span className="text-gray-600 shrink-0 font-medium">{event.timestamp}</span>
                          <span className={`shrink-0 text-[9px] px-1.5 py-0.2 rounded border ${badgeColor}`}>
                            {event.group.toUpperCase()}
                          </span>
                          <p className="text-gray-300 leading-relaxed break-all">
                            {event.msg}
                          </p>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                )}
              </div>
              <div className="border-t border-gray-900 pt-2.5 mt-2 flex items-center justify-between text-[9px] text-gray-500 font-mono">
                <span>Broker: rabbitmq://localhost:5672</span>
                <span>VHost: /hayat_legal</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'broker' && <RabbitMQBroker />}
      {activeTab === 'storage' && <StorageSchemas />}
      {activeTab === 'pipeline' && <StateMachineSimulator />}
      {activeTab === 'devops' && <DevOpsAndRepo />}
    </div>
  );
}
