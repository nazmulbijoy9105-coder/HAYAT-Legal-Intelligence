/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, Layers, Upload, Brain, Network, Search, Briefcase, FileText, Globe, CheckCircle } from 'lucide-react';

// Component Imports
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { IngestionPipeline } from './components/IngestionPipeline';
import { DeterministicEngine } from './components/DeterministicEngine';
import { KnowledgeGraph } from './components/KnowledgeGraph';
import { LegalResearch } from './components/LegalResearch';
import { PortalPerspectives } from './components/PortalPerspectives';

type TabType = 'architecture' | 'ingestion' | 'ilrmf' | 'graph' | 'research' | 'portals';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('architecture');

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-slate-950 relative overflow-x-hidden">
      
      {/* Frosted Glass Ambient Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-950/25 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-950/20 rounded-full blur-[150px] pointer-events-none z-0"></div>
      
      {/* Premium Swiss-Modern Top Legal Header */}
      <header className="bg-slate-950/40 border-b border-white/10 py-5 px-6 md:px-12 sticky top-0 z-50 backdrop-blur-xl shadow-lg relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          {/* Logo & Platform Title */}
          <div className="flex items-center gap-3.5 text-left">
            <div className="bg-emerald-500/10 text-emerald-400 p-2.5 rounded-xl shadow-xs border border-emerald-500/25">
              <Scale className="w-5.5 h-5.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-sans font-extrabold text-lg tracking-tight uppercase text-white leading-none">
                  HAYAT
                </h1>
                <span className="bg-white/5 text-slate-300 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border border-white/10 uppercase">
                  Enterprise v2.1
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Hierarchical AI Taxonomy & Deterministic Reasoning for Bangladesh Law
              </p>
            </div>
          </div>

          {/* Secure Platform Status Indicators */}
          <div className="flex items-center gap-3 self-start sm:self-center">
            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2.5 py-1 rounded-full font-mono font-bold flex items-center gap-1.5 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Platform Node Active
            </span>
            <span className="text-slate-500 font-mono text-[10px] hidden md:inline">
              Host: run.cloud.gov.bd
            </span>
          </div>

        </div>
      </header>

      {/* Main Core Platform Control Panel */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col space-y-6 relative z-10">
        
        {/* Navigation Tab Rails */}
        <div className="bg-slate-900/40 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md shadow-lg flex flex-wrap gap-1.5 z-10 overflow-x-auto">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-2.5 rounded-xl text-xs font-sans font-semibold transition-all flex items-center gap-2 border cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-white/10 text-white border-white/20 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Architecture Blueprint
          </button>

          <button
            onClick={() => setActiveTab('ingestion')}
            className={`px-4 py-2.5 rounded-xl text-xs font-sans font-semibold transition-all flex items-center gap-2 border cursor-pointer ${
              activeTab === 'ingestion'
                ? 'bg-white/10 text-white border-white/20 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Ingestion & OCR Sandbox
          </button>

          <button
            onClick={() => setActiveTab('ilrmf')}
            className={`px-4 py-2.5 rounded-xl text-xs font-sans font-semibold transition-all flex items-center gap-2 border cursor-pointer ${
              activeTab === 'ilrmf'
                ? 'bg-white/10 text-white border-white/20 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            Reasoning Engine (ILRMF)
          </button>

          <button
            onClick={() => setActiveTab('graph')}
            className={`px-4 py-2.5 rounded-xl text-xs font-sans font-semibold transition-all flex items-center gap-2 border cursor-pointer ${
              activeTab === 'graph'
                ? 'bg-white/10 text-white border-white/20 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            Knowledge Graph
          </button>

          <button
            onClick={() => setActiveTab('research')}
            className={`px-4 py-2.5 rounded-xl text-xs font-sans font-semibold transition-all flex items-center gap-2 border cursor-pointer ${
              activeTab === 'research'
                ? 'bg-white/10 text-white border-white/20 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            Hybrid Search & Resolver
          </button>

          <button
            onClick={() => setActiveTab('portals')}
            className={`px-4 py-2.5 rounded-xl text-xs font-sans font-semibold transition-all flex items-center gap-2 border cursor-pointer ${
              activeTab === 'portals'
                ? 'bg-white/10 text-white border-white/20 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            Portal Perspectives
          </button>
        </div>

        {/* Dynamic Sandbox Workspace rendering */}
        <div className="flex-1 bg-slate-900/40 border border-white/10 backdrop-blur-xl rounded-3xl p-5 md:p-8 shadow-2xl relative z-10 text-slate-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              {activeTab === 'architecture' && <ArchitectureDiagram />}
              {activeTab === 'ingestion' && <IngestionPipeline />}
              {activeTab === 'ilrmf' && <DeterministicEngine />}
              {activeTab === 'graph' && <KnowledgeGraph />}
              {activeTab === 'research' && <LegalResearch />}
              {activeTab === 'portals' && <PortalPerspectives />}
            </motion.div>
          </AnimatePresence>
        </div>

      </main>

      {/* Trustworthy Legal Institutional Footer */}
      <footer className="bg-slate-950/60 border-t border-white/10 py-6 px-6 mt-auto text-center text-xs text-slate-400 font-sans backdrop-blur-xl relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-left">
            <span className="bg-white/5 text-slate-300 p-1.5 rounded-lg border border-white/10">
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
            </span>
            <div>
              <p className="font-bold text-slate-200">Supreme Court Digital Initiatives</p>
              <p className="text-[10px] text-slate-400">Proposed Administrative Framework for Bangladesh Legal Transformation</p>
            </div>
          </div>
          <p className="font-mono text-[10px] md:text-right text-slate-500 leading-normal">
            HAYAT Core • Security Encrypted • WORM Registry Logs • SLA 99.9%
          </p>
        </div>
      </footer>

    </div>
  );
}
