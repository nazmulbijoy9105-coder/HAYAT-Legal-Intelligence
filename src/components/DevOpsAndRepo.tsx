/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Folder, FileCode, Check, ShieldCheck, Activity, Terminal, Code, Cpu, Sliders } from 'lucide-react';

interface RepoNode {
  name: string;
  type: 'dir' | 'file';
  desc: string;
  children?: RepoNode[];
}

const REPO_TREE: RepoNode[] = [
  {
    name: "hayat/",
    type: "dir",
    desc: "Bangladesh Legal Intelligence Platform Workspace Root.",
    children: [
      {
        name: "infrastructure/",
        type: "dir",
        desc: "Cluster compose setups and persistent database configurations.",
        children: [
          { name: "postgres/", type: "dir", desc: "SQL migration scripts and schemas." },
          { name: "neo4j/", type: "dir", desc: "Cypher constraint and index seeds." },
          { name: "qdrant/", type: "dir", desc: "Vector collection blueprints." }
        ]
      },
      {
        name: "packages/hayat_core/",
        type: "dir",
        desc: "Shared legal taxonomy, standard models, database connectors, and telemetry abstractions.",
        children: [
          { name: "hayat_core/legal_types/", type: "dir", desc: "Strict TypeScript / Python typings." },
          { name: "hayat_core/db_connectors/", type: "dir", desc: "Optimised DB driver wrappers." }
        ]
      },
      {
        name: "gateway/",
        type: "dir",
        desc: "FastAPI endpoints handling JWT Auth, OAuth2 legal portals, and Rate Limiting.",
        children: [
          { name: "main.py", type: "file", desc: "Gateway entrypoint binding routing configurations." }
        ]
      },
      {
        name: "agents/",
        type: "dir",
        desc: "17 specialized, event-driven microservice agents.",
        children: [
          { name: "agent01_source/", type: "dir", desc: "Supreme Court and Gazette scraper triggers." },
          { name: "agent02_intake/", type: "dir", desc: "Validates MIME-types and integrity hashes." },
          { name: "agent03_quality/", type: "dir", desc: "Appraises page blur, contrast levels." },
          { name: "agent05_ocr/", type: "dir", desc: "Dual-language PaddleOCR and Bangla transcribers." },
          { name: "agent09_metadata/", type: "dir", desc: "Extracts legal named entities via BERT-BiLSTM-CRF." },
          { name: "agent14_ilrmf/", type: "dir", desc: "Runs the 9-stage deterministic reasoning engine." }
        ]
      },
      {
        name: "frontend/",
        type: "dir",
        desc: "Client-side React application with interactive operational sandboxes."
      },
      {
        name: "docker-compose.yml",
        type: "file",
        desc: "Multi-container production configuration compose blueprint."
      }
    ]
  }
];

const DOCKER_COMPOSE_YML = `version: "3.8"

services:
  nginx-gateway:
    image: nginx:alpine
    ports:
      - "3000:3000"
    volumes:
      - ./gateway/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - fastapi-api

  fastapi-api:
    build: ./gateway
    environment:
      - POSTGRES_URL=postgresql://hayat_user:hytPass@postgres:5432/hayat
      - NEO4J_URI=bolt://neo4j:7687
      - QDRANT_URL=http://qdrant:6333
      - RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672/
    depends_on:
      - postgres
      - neo4j
      - qdrant
      - rabbitmq

  rabbitmq:
    image: rabbitmq:3-management-alpine
    ports:
      - "5672:5672"
      - "15672:15672"

  postgres:
    image: postgres:16-alpine
    environment:
      - POSTGRES_DB=hayat
      - POSTGRES_USER=hayat_user
      - POSTGRES_PASSWORD=hytPass
    ports:
      - "5432:5432"

  neo4j:
    image: neo4j:5-community
    environment:
      - NEO4J_AUTH=neo4j/hayatGraphPass
    ports:
      - "7474:7474"
      - "7687:7687"

  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"

  celery-ocr-worker:
    build: ./agents/agent05_ocr
    environment:
      - CELERY_BROKER_URL=amqp://guest:guest@rabbitmq:5672/
    depends_on:
      - rabbitmq`;

export function DevOpsAndRepo() {
  const [selectedNode, setSelectedNode] = useState<RepoNode>(REPO_TREE[0]);
  const [viewMode, setViewMode] = useState<'repo' | 'compose'>('repo');
  const [activeFlags, setActiveFlags] = useState<Record<string, boolean>>({
    'reranker': true,
    'copyright': true,
    'high_priority_ocr': false,
    'opentelemetry': true
  });
  const [devopsLogs, setDevopsLogs] = useState<string[]>([
    "DevOps subsystem: Listening on Prometheus metric socket 9090...",
    "OpenTelemetry trace tracer-agent-01 successfully connected.",
    "Database pool health: Stable. Connection count: 14/100."
  ]);

  // Handle flag toggle
  const toggleFlag = (key: string, label: string) => {
    const nextState = !activeFlags[key];
    setActiveFlags(prev => ({ ...prev, [key]: nextState }));
    setDevopsLogs(prev => [
      `[FLAG UPDATE] Feature Flag '${label}' set to ${nextState ? 'ENABLED' : 'DISABLED'}`,
      ...prev
    ]);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 text-left animate-fadeIn">
      {/* Repository Explorer & Docker Compose */}
      <div className="xl:col-span-7 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h4 className="text-base font-sans font-bold text-white flex items-center gap-2">
              <Folder className="w-4 h-4 text-emerald-400" /> HAYAT Core Repository Structure
            </h4>
            <p className="text-xs text-slate-400">
              Browse directory setups, standard packages, custom microservices, and Docker Compose scripts.
            </p>
          </div>

          <div className="flex bg-slate-900/60 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode('repo')}
              className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'repo' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Folder className="w-3 h-3" /> File Tree
            </button>
            <button
              onClick={() => setViewMode('compose')}
              className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'compose' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="w-3 h-3" /> docker-compose.yml
            </button>
          </div>
        </div>

        {/* View render container */}
        {viewMode === 'repo' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Folder layout tree */}
            <div className="border border-white/10 rounded-2xl p-4 bg-slate-950/40 backdrop-blur-md max-h-[380px] overflow-y-auto custom-scrollbar font-mono text-xs">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2 border-b border-white/5 pb-1">
                Directory tree browser:
              </span>
              <div className="space-y-3">
                {/* Node renderer helper */}
                {REPO_TREE.map((node, index) => (
                  <div key={index} className="space-y-2">
                    <button
                      onClick={() => setSelectedNode(node)}
                      className={`flex items-center gap-2 font-bold w-full text-left p-1.5 rounded transition-all cursor-pointer ${
                        selectedNode.name === node.name ? 'bg-white/10 text-emerald-400' : 'text-white hover:bg-white/5'
                      }`}
                    >
                      <Folder className="w-4 h-4 text-emerald-400 shrink-0" /> {node.name}
                    </button>
                    <div className="pl-6 border-l border-white/10 space-y-1.5">
                      {node.children?.map((child, cIdx) => (
                        <button
                          key={cIdx}
                          onClick={() => setSelectedNode(child)}
                          className={`flex items-center gap-2 w-full text-left p-1 rounded transition-all text-[11px] cursor-pointer ${
                            selectedNode.name === child.name ? 'bg-white/10 text-emerald-400 font-bold' : 'text-slate-300 hover:bg-white/5'
                          }`}
                        >
                          {child.type === 'dir' ? (
                            <Folder className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          ) : (
                            <FileCode className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          )}
                          {child.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Node Details Panel */}
            <div className="border border-white/10 rounded-2xl p-4 bg-slate-950/40 backdrop-blur-md flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block border-b border-white/5 pb-1">
                  File/Directory Metadata:
                </span>
                <div>
                  <h5 className="font-mono font-bold text-white text-xs flex items-center gap-1.5">
                    {selectedNode.type === 'dir' ? <Folder className="w-4 h-4 text-emerald-400" /> : <FileCode className="w-4 h-4 text-slate-400" />}
                    {selectedNode.name}
                  </h5>
                  <p className="text-xs text-slate-300 mt-2 font-sans leading-relaxed">
                    {selectedNode.desc}
                  </p>
                </div>
              </div>
              <div className="text-[10px] text-slate-500 font-mono pt-3 border-t border-white/5">
                Path: ~/hayat/{selectedNode.name}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-950 border border-white/10 rounded-2xl p-4 overflow-hidden shadow-lg h-[380px] flex flex-col">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block border-b border-white/5 pb-1 mb-2">
              Compose configuration code (production cluster spec):
            </span>
            <pre className="flex-1 overflow-y-auto font-mono text-[9px] text-emerald-400 leading-normal select-text custom-scrollbar text-left bg-slate-900/60 p-3 rounded-xl border border-white/5">
              {DOCKER_COMPOSE_YML}
            </pre>
          </div>
        )}
      </div>

      {/* Feature Flags & Live DevOps telemetry */}
      <div className="xl:col-span-5 space-y-4 flex flex-col h-[520px]">
        {/* Toggleable Feature Flags */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-md text-left space-y-3">
          <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-emerald-400" /> Platform Deployment Feature Flags
          </h5>

          <div className="space-y-2">
            {/* Flag 1 */}
            <button
              onClick={() => toggleFlag('reranker', "bge-reranker-v2 (RAG)")}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-white/10 bg-slate-950/40 hover:bg-white/5 transition-all text-left cursor-pointer"
            >
              <div>
                <span className="text-xs font-sans font-bold text-slate-200 block">bge-reranker-v2 (RAG)</span>
                <span className="text-[9px] text-slate-500 font-mono">Implements multi-stage query relevance scoring.</span>
              </div>
              <div className={`w-10 h-5.5 rounded-full p-0.5 transition-all duration-200 ${activeFlags.reranker ? 'bg-emerald-500' : 'bg-slate-800'}`}>
                <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform duration-200 ${activeFlags.reranker ? 'translate-x-4.5' : ''}`} />
              </div>
            </button>

            {/* Flag 2 */}
            <button
              onClick={() => toggleFlag('copyright', "Strict Copyright Filter")}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-white/10 bg-slate-950/40 hover:bg-white/5 transition-all text-left cursor-pointer"
            >
              <div>
                <span className="text-xs font-sans font-bold text-slate-200 block">Strict Copyright Filter</span>
                <span className="text-[9px] text-slate-500 font-mono">Redacts commercial commentaries automatically.</span>
              </div>
              <div className={`w-10 h-5.5 rounded-full p-0.5 transition-all duration-200 ${activeFlags.copyright ? 'bg-emerald-500' : 'bg-slate-800'}`}>
                <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform duration-200 ${activeFlags.copyright ? 'translate-x-4.5' : ''}`} />
              </div>
            </button>

            {/* Flag 3 */}
            <button
              onClick={() => toggleFlag('high_priority_ocr', "High-Priority OCR Queue")}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-white/10 bg-slate-950/40 hover:bg-white/5 transition-all text-left cursor-pointer"
            >
              <div>
                <span className="text-xs font-sans font-bold text-slate-200 block">High-Priority OCR Queue</span>
                <span className="text-[9px] text-slate-500 font-mono">Speeds up document intake processing for Supreme Court bench judges.</span>
              </div>
              <div className={`w-10 h-5.5 rounded-full p-0.5 transition-all duration-200 ${activeFlags.high_priority_ocr ? 'bg-emerald-500' : 'bg-slate-800'}`}>
                <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform duration-200 ${activeFlags.high_priority_ocr ? 'translate-x-4.5' : ''}`} />
              </div>
            </button>

            {/* Flag 4 */}
            <button
              onClick={() => toggleFlag('opentelemetry', "OpenTelemetry Tracing")}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-white/10 bg-slate-950/40 hover:bg-white/5 transition-all text-left cursor-pointer"
            >
              <div>
                <span className="text-xs font-sans font-bold text-slate-200 block">OpenTelemetry Tracing</span>
                <span className="text-[9px] text-slate-500 font-mono">Instrument tracing paths for model and DB transactions.</span>
              </div>
              <div className={`w-10 h-5.5 rounded-full p-0.5 transition-all duration-200 ${activeFlags.opentelemetry ? 'bg-emerald-500' : 'bg-slate-800'}`}>
                <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform duration-200 ${activeFlags.opentelemetry ? 'translate-x-4.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Live DevOps trace log stream */}
        <div className="bg-slate-950 border border-white/10 rounded-2xl p-4 shadow-lg flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 font-mono text-[10px] font-bold text-slate-200">
            <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-blue-400" /> Platform Observability Console</span>
            <span className="text-slate-500 font-bold">Trace Port: 4317</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 font-mono text-[9px] text-slate-400 text-left custom-scrollbar">
            {devopsLogs.map((log, idx) => (
              <div key={idx} className="border-b border-white/5 pb-1">
                {log}
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-2 mt-2 flex items-center justify-between text-[8px] text-slate-500 font-mono">
            <span>SLA Target: 99.9%</span>
            <span>Prometheus Port: 9090</span>
          </div>
        </div>
      </div>
    </div>
  );
}
