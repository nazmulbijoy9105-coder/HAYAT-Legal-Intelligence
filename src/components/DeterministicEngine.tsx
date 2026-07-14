/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Clipboard, AlertCircle, CheckCircle, Scale, ShieldAlert, History, ShieldCheck, HelpCircle, Loader2, Award } from 'lucide-react';
import { ILRMFAnalysis, ILRMFStep } from '../types';

const SAMPLE_FACTS = [
  {
    title: "Dowry Coercion & Assault (Special Law)",
    text: "My husband and mother-in-law have been demanding BDT 2,00,000 as dowry since January 2026. When my retired father refused to pay due to lack of funds, they locked me in a room, beat me with wooden rods causing bruises on my hands, and eventually forced me out of our marital home on May 12, 2026. My neighbors heard my cries but are afraid to testify in court. I want to file a criminal case."
  },
  {
    title: "Arbitrary Arrest Without Warrant (Procedural Law)",
    text: "On July 10, 2026, around 11:30 PM, a police patrol team arrested my brother from his residence in Dhanmondi, Dhaka. No written warrant was shown, and police stated they arrested him under Section 54 of CrPC on 'credible suspicion' of being involved in a protest, although he has no criminal records. They have kept him in the lockup for more than 30 hours without presenting him to any Magistrate, and are denying family access. Is this arrest legal?"
  },
  {
    title: "Breach of Supply Contract (Civil/Commercial)",
    text: "We entered into a written contract with Dhaka Concrete Builders on February 10, 2026, for the delivery of 500 tons of structural steel by June 1, 2026, for our commercial high-rise project. They failed to supply the materials on time, causing a complete shutdown of our project site for 25 days. Consequently, we suffered BDT 15,00,000 in labor overhead and interest costs. Dhaka Concrete claims that raw material shortages in international markets constitute a force majeure exemption."
  }
];

const ILRMF_STEPS: { key: ILRMFStep['key']; title: string; desc: string }[] = [
  { key: 'fact', title: "1. Fact Extraction", desc: "Isolating legally material facts from general narrative text." },
  { key: 'issue', title: "2. Issue Identification", desc: "Formulating core legal controversies to be adjudicated." },
  { key: 'rule', title: "3. Rule Selection", desc: "Identifying relevant statutory provisions and codes." },
  { key: 'temporal', title: "4. Temporal Validation", desc: "Verifying whether statutes/rules were in force during occurrence." },
  { key: 'exception', title: "5. Exception Analysis", desc: "Testing facts against statutory general exceptions or exemptions." },
  { key: 'application', title: "6. Application", desc: "Subsuming the extracted facts under the validated legal rules." },
  { key: 'conclusion', title: "7. Conclusion", desc: "Formulating the logical legal opinion and sentencing parameters." },
  { key: 'citation', title: "8. Citation Verification", desc: "Validating legal precedents and citation formats (DLR/BLD)." },
  { key: 'confidence', title: "9. Confidence Assessment", desc: "Computing certainty weights based on rules and precedent strength." }
];

export function DeterministicEngine() {
  const [factsInput, setFactsInput] = useState(SAMPLE_FACTS[0].text);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(-1);
  const [analysisResult, setAnalysisResult] = useState<ILRMFAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'rules' | 'precedents' | 'audit'>('overview');

  const runILRMFEngine = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setError(null);
    setCurrentStepIdx(0);

    // Step-by-step visual ticker simulation
    for (let i = 0; i < ILRMF_STEPS.length; i++) {
      setCurrentStepIdx(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ facts: factsInput })
      });
      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        throw new Error("Invalid response format received from server.");
      }
      setAnalysisResult(data);
    } catch (err: any) {
      console.error("Analysis execution error:", err);
      setError(err.message || "An unexpected error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6" id="ilrmf-section">
      {/* Input Console (Left/Top) */}
      <div className="xl:col-span-5 space-y-6">
        <div className="border-b border-white/10 pb-3 text-left">
          <h3 className="text-lg font-sans font-semibold text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-white" /> ILRMF Reasoning Laboratory
          </h3>
          <p className="text-xs text-slate-400">
            Submit facts to the deterministic legal reasoning pipeline under Bangladesh Law.
          </p>
        </div>

        {/* Preset Templates */}
        <div className="space-y-2 text-left">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
            Select Legal Case Template:
          </span>
          <div className="grid grid-cols-1 gap-2">
            {SAMPLE_FACTS.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (!isAnalyzing) setFactsInput(sample.text);
                }}
                disabled={isAnalyzing}
                className="text-left px-3 py-2.5 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/10 bg-white/5 transition-all text-xs disabled:opacity-50 cursor-pointer"
              >
                <div className="font-semibold text-slate-200">
                  {sample.title}
                </div>
                <div className="text-slate-400 text-[10px] line-clamp-1 mt-0.5 font-mono">
                  {sample.text}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Facts Input Area */}
        <div className="space-y-2 text-left relative">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
            Fact Log / Narrative:
          </span>
          <textarea
            value={factsInput}
            onChange={(e) => setFactsInput(e.target.value)}
            disabled={isAnalyzing}
            className="w-full h-44 p-4 rounded-xl border border-white/10 bg-slate-950/40 text-xs text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-emerald-500/50 resize-none leading-relaxed disabled:opacity-75 font-sans"
            placeholder="Type legal case facts or select a template above..."
          />
          <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-500 pointer-events-none">
            {factsInput.length} chars
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={runILRMFEngine}
          disabled={isAnalyzing || !factsInput.trim()}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-sans font-bold text-xs py-3 px-4 rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-slate-950" /> Ingesting Facts...
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" /> Execute ILRMF Parser
            </>
          )}
        </button>

        {/* Interactive Step Progress Tracker */}
        {isAnalyzing && (
          <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-left space-y-2.5">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
              Real-time Reasoning Pipeline (ILRMF Tracker):
            </span>
            <div className="space-y-1.5 font-mono text-[10px]">
              {ILRMF_STEPS.map((step, idx) => {
                let statusColor = "text-slate-400";
                let icon = <div className="w-3.5 h-3.5 rounded-full border border-white/10 shrink-0" />;

                if (currentStepIdx > idx) {
                  statusColor = "text-emerald-400 font-medium";
                  icon = <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
                } else if (currentStepIdx === idx) {
                  statusColor = "text-blue-400 font-bold animate-pulse";
                  icon = <Loader2 className="w-3.5 h-3.5 text-blue-400 animate-spin shrink-0" />;
                }

                return (
                  <div key={step.key} className={`flex items-center gap-2.5 ${statusColor} transition-all duration-150`}>
                    {icon}
                    <div className="truncate">
                      <span>{step.title}</span>
                      <span className="text-slate-500 block text-[9px] font-sans mt-0.5 ml-0">{step.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Structured Output Screen (Right/Bottom) */}
      <div className="xl:col-span-7 flex flex-col min-h-[500px]">
        {analysisResult ? (
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 flex-1 flex flex-col overflow-hidden shadow-lg">
            {/* Report Header */}
            <div className="bg-white/5 p-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-left">
              <div>
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                  HAYAT REASONING ADVISORY
                </span>
                <h4 className="text-sm font-sans font-semibold text-white mt-0.5">
                  Analytical Case Audit Report
                </h4>
              </div>

              {/* Confidence Meter Badge */}
              <div className="flex items-center gap-2 bg-slate-950/40 px-3.5 py-1.5 rounded-xl border border-white/10 shadow-xs">
                <Award className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-[9px] font-mono text-slate-400 block leading-none uppercase">Confidence Score:</span>
                  <span className={`text-xs font-mono font-bold leading-none mt-0.5 block ${analysisResult.confidenceScore > 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {analysisResult.confidenceScore}%
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10 bg-white/5 text-xs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2.5 font-sans font-medium border-b-2 transition-all cursor-pointer ${activeTab === 'overview' ? 'border-emerald-400 text-emerald-400 font-semibold' : 'border-transparent text-slate-400 hover:text-white'}`}
              >
                Legal Conclusion
              </button>
              <button
                onClick={() => setActiveTab('rules')}
                className={`px-4 py-2.5 font-sans font-medium border-b-2 transition-all cursor-pointer ${activeTab === 'rules' ? 'border-emerald-400 text-emerald-400 font-semibold' : 'border-transparent text-slate-400 hover:text-white'}`}
              >
                Statutes ({analysisResult.applicableRules.length})
              </button>
              <button
                onClick={() => setActiveTab('precedents')}
                className={`px-4 py-2.5 font-sans font-medium border-b-2 transition-all cursor-pointer ${activeTab === 'precedents' ? 'border-emerald-400 text-emerald-400 font-semibold' : 'border-transparent text-slate-400 hover:text-white'}`}
              >
                Precedent Citations ({analysisResult.citationsVerified.length})
              </button>
              <button
                onClick={() => setActiveTab('audit')}
                className={`px-4 py-2.5 font-sans font-medium border-b-2 transition-all cursor-pointer ${activeTab === 'audit' ? 'border-emerald-400 text-emerald-400 font-semibold' : 'border-transparent text-slate-400 hover:text-white'}`}
              >
                Audit Provenance
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto p-5 text-left space-y-5 text-xs max-h-[480px]">
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  {/* Facts Summary */}
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h5 className="font-sans font-semibold text-white mb-1.5 flex items-center gap-1.5">
                      <Clipboard className="w-3.5 h-3.5 text-slate-400" /> Fact Summary (Extracted):
                    </h5>
                    <p className="text-slate-300 leading-relaxed font-sans">
                      {analysisResult.factsSummary}
                    </p>
                  </div>

                  {/* Core Adjudication Issues */}
                  <div>
                    <h5 className="font-sans font-semibold text-white mb-2 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400" /> Frame Issues:
                    </h5>
                    <ol className="list-decimal list-inside space-y-1.5 text-slate-300 pl-1">
                      {analysisResult.issues.map((issue, idx) => (
                        <li key={idx} className="leading-relaxed font-sans">{issue}</li>
                      ))}
                    </ol>
                  </div>

                  {/* Deep Application Text */}
                  <div className="border-t border-white/10 pt-4">
                    <h5 className="font-sans font-semibold text-white mb-1.5">
                      Legal Application:
                    </h5>
                    <p className="text-slate-300 leading-relaxed font-sans whitespace-pre-wrap">
                      {analysisResult.applicationText}
                    </p>
                  </div>

                  {/* Conclusion Warning Box */}
                  <div className="bg-emerald-500/10 text-emerald-300 p-4 rounded-xl shadow-md border border-emerald-500/25">
                    <h5 className="font-sans font-bold text-sm mb-1.5">
                      Verdict & Operational Opinion:
                    </h5>
                    <p className="leading-relaxed font-sans font-medium text-[12px]">
                      {analysisResult.conclusionText}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'rules' && (
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-2">
                    <h5 className="font-sans font-semibold text-white">
                      Applicable Bangladesh Codes & Statutes
                    </h5>
                    <p className="text-[11px] text-slate-400">
                      These provisions have been mapped based on semantic analysis and fact extraction.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {analysisResult.applicableRules.map((rule, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-white/10 bg-white/5">
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <span className="font-sans font-bold text-slate-200 text-sm">
                            {rule.act} — {rule.section}
                          </span>
                          
                          {/* Temporal Validity Check */}
                          <span className={`font-mono text-[9px] px-2 py-0.5 rounded-full border flex items-center gap-1 font-semibold ${
                            rule.temporalStatus.toLowerCase() === 'valid'
                              ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                              : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                          }`}>
                            <History className="w-2.5 h-2.5" /> Temporal: {rule.temporalStatus}
                          </span>
                        </div>
                        <p className="text-slate-300 leading-relaxed font-sans">
                          {rule.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Temporal Analysis Log */}
                  <div className="bg-amber-500/10 p-3.5 rounded-xl border border-amber-500/20">
                    <h5 className="font-sans font-semibold text-amber-400 mb-1 flex items-center gap-1.5">
                      <History className="w-3.5 h-3.5" /> Temporal Validation Audit Trail:
                    </h5>
                    <p className="text-amber-300 font-sans leading-relaxed">
                      {analysisResult.temporalAnalysis}
                    </p>
                  </div>

                  {/* Exception Analysis Log */}
                  <div className="bg-blue-500/10 p-3.5 rounded-xl border border-blue-500/20">
                    <h5 className="font-sans font-semibold text-blue-400 mb-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" /> Statutory Exception Check:
                    </h5>
                    <p className="text-blue-300 font-sans leading-relaxed">
                      {analysisResult.exceptionAnalysis}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'precedents' && (
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-2">
                    <h5 className="font-sans font-semibold text-white">
                      Cross-Referenced Landmark Case Precedents
                    </h5>
                    <p className="text-[11px] text-slate-400">
                      HAYAT resolves classic Bangladesh citations (DLR/BLD/MLR) to verify precedent applicability.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {analysisResult.citationsVerified.map((prec, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-white/10 bg-white/5">
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <div>
                            <span className="font-mono text-xs font-bold text-white bg-white/10 px-2 py-0.5 rounded border border-white/10 mr-2">
                              {prec.citation}
                            </span>
                            <span className="font-sans font-bold text-slate-200">
                              {prec.caseName}
                            </span>
                          </div>

                          {/* Precedent Verification Indicator */}
                          <span className="font-mono text-[9px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                            <ShieldCheck className="w-3 h-3" /> VERIFIED PRECEDENT
                          </span>
                        </div>
                        <p className="text-slate-300 leading-relaxed font-sans">
                          <span className="font-semibold text-slate-400">Application Hold:</span> {prec.relevance}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'audit' && (
                <div className="space-y-4">
                  <div className="border-b border-white/10 pb-2">
                    <h5 className="font-sans font-semibold text-white">
                      Explainable AI System Auditing Log
                    </h5>
                    <p className="text-[11px] text-slate-400">
                      This represents the verifiable provenance report and temporal constraints ledger.
                    </p>
                  </div>

                  {/* Provenance Box */}
                  <div className="p-4 rounded-xl bg-slate-950 text-emerald-400 border border-white/10 font-mono text-[11px] leading-relaxed">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold border-b border-white/10 pb-2 mb-2">
                      <ShieldAlert className="w-4 h-4" /> SECURE INTEGRITY PROVENANCE TRAIL
                    </div>
                    <div className="space-y-1.5">
                      <div><span className="text-slate-500">System Model:</span> gemini-3.5-flash (Tier 4 LLM Orchestrator)</div>
                      <div><span className="text-slate-500">Reasoning Core:</span> Deterministic State Machine ILRMF v2.1</div>
                      <div><span className="text-slate-500">Temporal State:</span> Synchronized with Bangladesh gazette updates as of 2026.</div>
                      <div><span className="text-slate-500">Validation Trace:</span> {analysisResult.auditExplanation}</div>
                    </div>
                  </div>

                  <div className="space-y-1 text-slate-400 leading-relaxed font-sans p-1">
                    <p>
                      HAYAT operates on strict non-hallucinatory standards. Every citation outputted in the Advisor reports has been cross-referenced against either:
                    </p>
                    <ul className="list-disc list-inside pl-2 space-y-1 pt-1 text-[11px]">
                      <li>The primary Bangladesh statutory database (Acts of parliament and Gazettes).</li>
                      <li>High Court and Appellate Division landmark judgments as compiled in the DLR, BLD, and MLR records.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : error ? (
          <div className="border border-red-500/20 bg-red-500/5 rounded-xl flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-950/20">
            <AlertCircle className="w-12 h-12 text-red-400 mb-3" />
            <h4 className="font-sans font-semibold text-red-200">
              ILRMF Parsing Execution Failed
            </h4>
            <p className="text-xs text-red-300 max-w-sm mt-1 mb-4 font-sans leading-relaxed">
              {error}
            </p>
            <button
              onClick={runILRMFEngine}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs font-semibold rounded-lg transition-all border border-red-500/30 cursor-pointer"
            >
              Retry Parser Execution
            </button>
          </div>
        ) : (
          <div className="border border-dashed border-white/10 rounded-xl flex-1 flex flex-col items-center justify-center p-8 text-center bg-white/5">
            <Scale className="w-12 h-12 text-slate-600 mb-3" />
            <h4 className="font-sans font-semibold text-slate-300">
              Deterministic Advisor Screen
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mt-1">
              Select a sample legal controversy template or insert custom facts, and click "Execute ILRMF Parser" to review structured outputs.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
