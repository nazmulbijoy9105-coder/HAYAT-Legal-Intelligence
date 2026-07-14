/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Send, Trash2, ArrowRight, ShieldCheck, AlertCircle, RefreshCw, Layers, Zap } from 'lucide-react';

interface QueueStatus {
  name: string;
  ready: number;
  unacked: number;
  total: number;
  consumers: number;
  status: 'active' | 'idle' | 'congested';
}

const INITIAL_QUEUES: QueueStatus[] = [
  { name: "upload.raw", ready: 0, unacked: 0, total: 0, consumers: 3, status: "idle" },
  { name: "quality.pass", ready: 0, unacked: 0, total: 0, consumers: 2, status: "idle" },
  { name: "quality.fail", ready: 0, unacked: 0, total: 0, consumers: 1, status: "idle" },
  { name: "preprocess.done", ready: 0, unacked: 0, total: 0, consumers: 3, status: "idle" },
  { name: "ocr.done", ready: 0, unacked: 0, total: 0, consumers: 4, status: "idle" },
  { name: "layout.done", ready: 0, unacked: 0, total: 0, consumers: 2, status: "idle" },
  { name: "copyright.done", ready: 0, unacked: 0, total: 0, consumers: 2, status: "idle" },
  { name: "classification.done", ready: 0, unacked: 0, total: 0, consumers: 2, status: "idle" },
  { name: "metadata.done", ready: 0, unacked: 0, total: 0, consumers: 3, status: "idle" },
  { name: "citation.done", ready: 0, unacked: 0, total: 0, consumers: 3, status: "idle" },
  { name: "graph.done", ready: 0, unacked: 0, total: 0, consumers: 2, status: "idle" },
  { name: "embedding.done", ready: 0, unacked: 0, total: 0, consumers: 4, status: "idle" },
  { name: "search.done", ready: 0, unacked: 0, total: 0, consumers: 3, status: "idle" },
  { name: "reasoning.done", ready: 0, unacked: 0, total: 0, consumers: 2, status: "idle" }
];

const PAYLOAD_TEMPLATES: Record<string, string> = {
  "upload.raw": `{\n  "event": "document.uploaded",\n  "id": "hyt-doc-771",\n  "file_path": "raw/2026/07/appeal_civil_draft.pdf",\n  "mime_type": "application/pdf",\n  "timestamp": "2026-07-14T11:32:00Z"\n}`,
  "quality.pass": `{\n  "event": "document.quality_passed",\n  "id": "hyt-doc-771",\n  "quality_score": 96,\n  "blur_score": 98,\n  "checked_pages": 4\n}`,
  "preprocess.done": `{\n  "event": "document.preprocessed",\n  "id": "hyt-doc-771",\n  "deskew_angle": -0.45,\n  "clahe_applied": true,\n  "noise_reduced": true\n}`,
  "ocr.done": `{\n  "event": "document.ocr_completed",\n  "id": "hyt-doc-771",\n  "text_length": 18204,\n  "languages": ["bn", "en"],\n  "confidence_avg": 97.4\n}`,
  "metadata.done": `{\n  "event": "document.metadata_extracted",\n  "id": "hyt-doc-771",\n  "judges": ["Latifur Rahman CJ", "Mainur Reza Chowdhury J"],\n  "laws_cited": ["Penal Code 1860", "CrPC 1898"]\n}`,
  "reasoning.done": `{\n  "event": "document.reasoning_compiled",\n  "id": "hyt-doc-771",\n  "ilrmf_status": "COMPLETED",\n  "verdict_certainty": 94.2\n}`
};

export function RabbitMQBroker() {
  const [queues, setQueues] = useState<QueueStatus[]>(INITIAL_QUEUES);
  const [selectedQueue, setSelectedQueue] = useState<string>("upload.raw");
  const [customPayload, setCustomPayload] = useState<string>(PAYLOAD_TEMPLATES["upload.raw"]);
  const [brokerLogs, setBrokerLogs] = useState<any[]>([
    { id: 1, time: "11:24:10", type: "system", text: "RabbitMQ cluster initialized with nodes: [rabbit@hyt-node-01, rabbit@hyt-node-02]" },
    { id: 2, time: "11:24:12", type: "system", text: "AMQP protocol listener running on port 5672 (secured SSL)" },
    { id: 3, time: "11:25:01", type: "in", text: "Exchange 'hayat.direct' routed event document.uploaded to queue 'upload.raw'" }
  ]);

  const handleQueueSelect = (qName: string) => {
    setSelectedQueue(qName);
    if (PAYLOAD_TEMPLATES[qName]) {
      setCustomPayload(PAYLOAD_TEMPLATES[qName]);
    } else {
      setCustomPayload(`{\n  "event": "document.${qName.replace('.', '_')}",\n  "id": "hyt-doc-${Math.floor(Math.random() * 900) + 100}",\n  "status": "PROCESSED",\n  "timestamp": "${new Date().toISOString()}"\n}`);
    }
  };

  const publishMessage = () => {
    let parsedPayload;
    try {
      parsedPayload = JSON.parse(customPayload);
    } catch (e) {
      alert("Invalid JSON format in payload.");
      return;
    }

    // Add to logs
    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      type: "pub",
      text: `Exchange 'hayat.direct' published message to queue '${selectedQueue}' - Event: ${parsedPayload.event || 'unknown'}`
    };

    setBrokerLogs(prev => [newLog, ...prev].slice(0, 30));

    // Increment queue counts
    setQueues(prev => prev.map(q => {
      if (q.name === selectedQueue) {
        return {
          ...q,
          ready: q.ready + 1,
          total: q.total + 1,
          status: 'active'
        };
      }
      return q;
    }));

    // Trigger auto-processing simulation
    setTimeout(() => {
      setQueues(prev => prev.map(q => {
        if (q.name === selectedQueue) {
          const nextReady = Math.max(0, q.ready - 1);
          return {
            ...q,
            ready: nextReady,
            unacked: q.unacked + 1,
            status: nextReady > 0 ? 'active' : 'idle'
          };
        }
        return q;
      }));

      const processingLog = {
        id: Date.now() + 1,
        time: new Date().toLocaleTimeString(),
        type: "ack",
        text: `Consumer active: Acknowledged message from queue '${selectedQueue}'. Processing entity: ${parsedPayload.id || 'N/A'}`
      };
      setBrokerLogs(prev => [processingLog, ...prev]);

      // Resolve processing
      setTimeout(() => {
        setQueues(prev => prev.map(q => {
          if (q.name === selectedQueue) {
            return {
              ...q,
              unacked: Math.max(0, q.unacked - 1),
              total: Math.max(0, q.total - 1)
            };
          }
          return q;
        }));
      }, 2000);
    }, 1500);
  };

  const clearLogs = () => {
    setBrokerLogs([]);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-fadeIn">
      {/* List of 14 Event Queues */}
      <div className="xl:col-span-7 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h4 className="text-base font-sans font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> RabbitMQ Clustered Queue Monitor
            </h4>
            <p className="text-xs text-slate-400">
              Active queues handling deterministic transitions. Every queue includes standard Priority, Retry, and Dead-Letter (DLQ) buffers.
            </p>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-mono font-medium border border-emerald-500/20">
            14 Active Queues
          </span>
        </div>

        {/* Queues List Table */}
        <div className="border border-white/10 rounded-2xl overflow-hidden bg-slate-950/40 backdrop-blur-md">
          <div className="grid grid-cols-12 bg-white/5 border-b border-white/10 p-3 text-[10px] font-mono text-slate-400 uppercase tracking-wider text-left font-bold">
            <div className="col-span-5">Queue Name / Channels</div>
            <div className="col-span-2 text-center">Ready</div>
            <div className="col-span-2 text-center">Unacked</div>
            <div className="col-span-2 text-center">Total</div>
            <div className="col-span-1 text-right">Status</div>
          </div>

          <div className="divide-y divide-white/5 max-h-[480px] overflow-y-auto custom-scrollbar">
            {queues.map((q) => (
              <button
                key={q.name}
                onClick={() => handleQueueSelect(q.name)}
                className={`w-full grid grid-cols-12 items-center p-3 text-left transition-all duration-150 hover:bg-white/5 cursor-pointer ${
                  selectedQueue === q.name ? 'bg-white/10 font-medium border-l-2 border-emerald-500' : ''
                }`}
              >
                {/* Name and channel tags */}
                <div className="col-span-5 space-y-1 pr-2 truncate">
                  <span className="text-xs font-mono font-bold text-slate-200 block truncate">
                    {q.name}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[8px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 px-1 rounded border border-emerald-500/20">
                      consumers: {q.consumers}
                    </span>
                    <span className="text-[8px] font-mono bg-white/5 text-slate-400 px-1 rounded border border-white/5">
                      priority_routing
                    </span>
                    <span className="text-[8px] font-mono bg-red-500/15 text-red-400 px-1 rounded border border-red-500/10" title="Dead Letter Queue">
                      dlq
                    </span>
                    <span className="text-[8px] font-mono bg-amber-500/15 text-amber-400 px-1 rounded border border-amber-500/10" title="Retry Queue">
                      retry
                    </span>
                  </div>
                </div>

                {/* Counts */}
                <div className="col-span-2 text-center font-mono text-xs text-slate-200">
                  {q.ready}
                </div>
                <div className="col-span-2 text-center font-mono text-xs text-slate-400">
                  {q.unacked}
                </div>
                <div className="col-span-2 text-center font-mono text-xs text-emerald-400 font-bold">
                  {q.total}
                </div>

                {/* Status Indicator */}
                <div className="col-span-1 text-right pr-1">
                  <span className={`inline-block w-2 h-2 rounded-full ${
                    q.status === 'active' ? 'bg-emerald-400 animate-pulse' :
                    q.status === 'congested' ? 'bg-red-500' : 'bg-slate-600'
                  }`} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Publisher Sandbox & Logs */}
      <div className="xl:col-span-5 space-y-5 flex flex-col h-[580px]">
        {/* Interactive AMQP Event Injector */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-md text-left">
          <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-emerald-400" /> AMQP Payload Publisher Simulator
          </h5>
          <p className="text-[11px] text-slate-400 mb-3 leading-normal">
            Select a queue on the left to load its event template. Modify the parameters below and hit publish to inject a structured event packet.
          </p>

          <div className="space-y-3">
            <div>
              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase block mb-1">
                Routing Key Exchange:
              </span>
              <div className="bg-slate-900/80 px-2 py-1 rounded text-[10px] font-mono text-slate-300 border border-white/5">
                hayat.direct &rarr; <span className="text-emerald-400 font-bold">{selectedQueue}</span>
              </div>
            </div>

            <div>
              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase block mb-1">
                JSON Event Payload:
              </span>
              <textarea
                value={customPayload}
                onChange={(e) => setCustomPayload(e.target.value)}
                className="w-full h-36 p-2 rounded-lg border border-white/10 bg-slate-950 font-mono text-[10px] leading-relaxed text-emerald-400 focus:outline-hidden"
                placeholder="{ ... }"
              />
            </div>

            <button
              onClick={publishMessage}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-sans font-bold text-xs py-2 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Publish to Exchange
            </button>
          </div>
        </div>

        {/* RabbitMQ Cluster Broker Logs */}
        <div className="bg-slate-950 border border-white/10 rounded-2xl p-4 shadow-lg flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
            <h5 className="text-[10px] font-mono font-bold text-slate-200 tracking-wider uppercase flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Broker AMQP Log Stream
            </h5>
            <button
              onClick={clearLogs}
              className="text-[9px] font-mono text-slate-400 hover:text-white px-1.5 py-0.5 rounded border border-white/10 bg-white/5 transition-colors"
            >
              Clear
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 font-mono text-[9px] text-left select-text custom-scrollbar">
            {brokerLogs.length === 0 ? (
              <div className="text-slate-600 text-center py-12">
                No logger activity recorded.
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {brokerLogs.map((log) => {
                  let badge = "SYS";
                  let color = "text-slate-400";
                  if (log.type === "pub") {
                    badge = "PUB";
                    color = "text-cyan-400";
                  } else if (log.type === "ack") {
                    badge = "ACK";
                    color = "text-emerald-400";
                  } else if (log.type === "err") {
                    badge = "ERR";
                    color = "text-red-400";
                  }

                  return (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-b border-white/5 pb-1 flex items-start gap-1.5"
                    >
                      <span className="text-slate-500 shrink-0">{log.time}</span>
                      <span className={`shrink-0 px-1 py-0.1 text-[8px] font-bold rounded border ${
                        log.type === 'pub' ? 'bg-cyan-500/10 border-cyan-500/25 text-cyan-400' :
                        log.type === 'ack' ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400' :
                        log.type === 'err' ? 'bg-red-500/10 border-red-500/25 text-red-400' :
                        'bg-slate-500/10 border-white/10 text-slate-400'
                      }`}>
                        {badge}
                      </span>
                      <p className={`leading-relaxed break-words ${color}`}>
                        {log.text}
                      </p>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
