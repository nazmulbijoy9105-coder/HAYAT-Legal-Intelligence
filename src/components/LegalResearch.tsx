/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Filter, Hash, Sparkles, BookOpen, ChevronRight, Sliders, AlertCircle, Bookmark, Globe, ArrowRight } from 'lucide-react';
import { LegalDocument, CitationResolution } from '../types';

export function LegalResearch() {
  const [searchQuery, setSearchQuery] = useState('separation of judiciary');
  const [strategy, setStrategy] = useState<'hybrid' | 'keyword' | 'vector'>('hybrid');
  const [weights, setWeights] = useState({ keyword: 0.4, vector: 0.6 });
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<LegalDocument[]>([]);
  const [expandedConcept, setExpandedConcept] = useState('');

  // Citation Resolver States
  const [citationInput, setCitationInput] = useState('52 DLR (AD) 82');
  const [isResolving, setIsResolving] = useState(false);
  const [resolvedCitation, setResolvedCitation] = useState<CitationResolution | null>(null);

  const executeSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setExpandedConcept('');

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery,
          strategy,
          weights
        })
      });
      const data = await res.json();
      setSearchResults(data.results || []);
      setExpandedConcept(data.conceptExpansion || '');
    } catch (err) {
      console.error("Legal search failed:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const resolveCitationCoords = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!citationInput.trim()) return;

    setIsResolving(true);
    setResolvedCitation(null);

    try {
      const res = await fetch('/api/resolve-citation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ citation: citationInput })
      });
      const data = await res.json();
      setResolvedCitation(data);
    } catch (err) {
      console.error("Citation resolution failed:", err);
    } finally {
      setIsResolving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-fadeIn" id="search-section">
      {/* Search Console & Advanced Retrievability (Left/Top) */}
      <div className="xl:col-span-8 flex flex-col space-y-6">
        <div className="border-b border-white/10 pb-3 text-left">
          <h3 className="text-lg font-sans font-semibold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-white" /> Hybrid Legal Research Engine (Group 13)
          </h3>
          <p className="text-xs text-slate-400">
            Query statutory provisions and judicial precedents across Bangladesh legal archives.
          </p>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={executeSearch} className="flex gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              required
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search statutes, e.g. 'arbitrary arrest police guidelines' or 'culpable homicide exceptions'..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-slate-950/40 text-xs text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-emerald-500/50 font-sans text-left"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-sans font-bold text-xs px-5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Search Retrievability Settings & weights */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 grid grid-cols-1 md:grid-cols-3 gap-5 text-left text-white">
          {/* Strategy Toggle */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
              Search Strategy Mode:
            </span>
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="strategy"
                  value="hybrid"
                  checked={strategy === 'hybrid'}
                  onChange={() => setStrategy('hybrid')}
                  className="text-emerald-400 border-white/20 bg-slate-900 focus:ring-0 cursor-pointer"
                />
                <span>Hybrid (RRF Dense + Sparse)</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="strategy"
                  value="keyword"
                  checked={strategy === 'keyword'}
                  onChange={() => setStrategy('keyword')}
                  className="text-emerald-400 border-white/20 bg-slate-900 focus:ring-0 cursor-pointer"
                />
                <span>Keyword Match (BM25 Only)</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="strategy"
                  value="vector"
                  checked={strategy === 'vector'}
                  onChange={() => setStrategy('vector')}
                  className="text-emerald-400 border-white/20 bg-slate-900 focus:ring-0 cursor-pointer"
                />
                <span>Semantic Vector (Qdrant Only)</span>
              </label>
            </div>
          </div>

          {/* Slider Weights */}
          <div className="space-y-2 col-span-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-1 mb-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Hybrid Retrieval Blending weights (RRF):
              </span>
              <span className="font-mono text-[10px] text-slate-400 font-bold">
                BM25 {Math.round(weights.keyword * 100)}% / Vector {Math.round(weights.vector * 100)}%
              </span>
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3">
                <Sliders className="w-4 h-4 text-slate-400" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  disabled={strategy !== 'hybrid'}
                  value={weights.vector}
                  onChange={(e) => {
                    const vec = parseFloat(e.target.value);
                    setWeights({ vector: vec, keyword: parseFloat((1 - vec).toFixed(1)) });
                  }}
                  className="flex-1 accent-emerald-400 cursor-pointer disabled:opacity-30"
                />
              </div>
              <p className="text-[10px] text-slate-400 italic font-sans leading-snug">
                Increasing vector weighting targets conceptual equivalence, whereas higher BM25 weighting matches precise lexical statutory phrases.
              </p>
            </div>
          </div>
        </div>

        {/* Gemini Expanded terms banner */}
        {expandedConcept && (
          <div className="bg-blue-500/10 p-3.5 rounded-xl border border-blue-500/20 text-left flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5 animate-pulse" />
            <div>
              <span className="text-[9px] font-mono font-bold text-blue-400 block uppercase">
                AI Semantic Concept Expander (Gemini Query Formulation):
              </span>
              <p className="text-xs text-blue-300 font-mono mt-1 font-semibold leading-relaxed">
                "{expandedConcept}"
              </p>
            </div>
          </div>
        )}

        {/* Search Results Display */}
        <div className="space-y-4">
          {searchResults.length > 0 ? (
            <div className="space-y-3 text-left">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1 uppercase tracking-wider">
                <span>Archives Search Outcomes</span>
                <span>Sorted by Reciprocal Rank Fusion</span>
              </div>

              {searchResults.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 rounded-xl p-5 shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2.5">
                    <div>
                      <span className="font-mono text-[9px] font-bold text-slate-300 bg-white/10 px-2 py-0.5 rounded border border-white/10 mr-2 uppercase">
                        {doc.citation}
                      </span>
                      <span className="font-sans font-bold text-white">
                        {doc.title}
                      </span>
                    </div>

                    {/* Scores breakdowns */}
                    <div className="flex items-center gap-2.5 text-[9px] font-mono">
                      <span className="text-slate-500">RRF Blend:</span>
                      <span className="font-bold text-emerald-400">{doc.relevanceScore}%</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    <span className="font-semibold text-slate-200 block text-[11px] mb-1">Scope context summary:</span>
                    {doc.summary}
                  </p>

                  <div className="border-t border-white/10 pt-2.5 mt-3 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>Court/Authority: {doc.court}</span>
                    <span>Enacted Date: {doc.date}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-white/10 rounded-xl py-16 text-center bg-white/5">
              <Search className="w-10 h-10 text-slate-600 mb-2.5 mx-auto" />
              <h4 className="font-sans font-semibold text-slate-300">
                Awaiting Search Parameter Ingress
              </h4>
              <p className="text-xs text-slate-400 max-w-xs mt-1 mx-auto">
                Trigger high-fidelity hybrid matches by entering queries inside the console search bar.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Citation Resolver Widget (Right/Bottom) */}
      <div className="xl:col-span-4 space-y-6 text-left">
        <div className="border-b border-white/10 pb-3">
          <h3 className="text-lg font-sans font-semibold text-white flex items-center gap-2">
            <Hash className="w-5 h-5 text-white" /> Citation Resolver (Group 10)
          </h3>
          <p className="text-xs text-slate-400">
            Deduce and parse structural legal context from standard DLR or BLD references.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg">
          <form onSubmit={resolveCitationCoords} className="space-y-3.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Input Citation Nomenclature:
            </span>

            <div className="flex gap-2">
              <input
                type="text"
                required
                value={citationInput}
                onChange={(e) => setCitationInput(e.target.value)}
                placeholder="e.g. 52 DLR (AD) 82"
                className="flex-1 px-3 py-1.5 rounded-lg border border-white/10 bg-slate-950/40 text-xs font-mono text-slate-200 focus:outline-hidden"
              />
              <button
                type="submit"
                disabled={isResolving}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-sans font-bold text-[11px] px-3 rounded-lg transition-colors cursor-pointer"
              >
                {isResolving ? 'Resolving...' : 'Resolve'}
              </button>
            </div>
            
            {/* Rapid test links */}
            <div className="text-[10px] text-slate-400 space-y-1 pt-1 border-t border-white/10 mt-1">
              <span className="font-mono text-[9px] block uppercase tracking-wider mb-1 font-bold">Standard Benchmarks:</span>
              <div className="flex flex-wrap gap-1.5 font-mono text-slate-400">
                <button type="button" onClick={() => setCitationInput('52 DLR (AD) 82')} className="hover:text-emerald-400 underline cursor-pointer">52 DLR (AD) 82</button>
                <span>•</span>
                <button type="button" onClick={() => setCitationInput('55 DLR (HCD) 363')} className="hover:text-emerald-400 underline cursor-pointer">55 DLR (HCD) 363</button>
                <span>•</span>
                <button type="button" onClick={() => setCitationInput('12 BLD 45')} className="hover:text-emerald-400 underline cursor-pointer">12 BLD 45</button>
              </div>
            </div>
          </form>
        </div>

        {/* Resolved Details Outcome */}
        {resolvedCitation && (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-lg space-y-4">
            {resolvedCitation.resolved ? (
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-2.5">
                  <span className="bg-emerald-500/10 text-emerald-400 font-mono text-[9px] px-2 py-0.5 rounded border border-emerald-500/20 font-bold uppercase block w-max mb-2">
                    Citation Mapped Successfully
                  </span>
                  <h4 className="font-sans font-bold text-white text-sm leading-snug">
                    {resolvedCitation.caseTitle}
                  </h4>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-500 font-mono text-[9px] block uppercase tracking-wide">Court:</span>
                    <span className="font-sans font-medium text-slate-300 block">{resolvedCitation.court}</span>
                  </div>
                  {resolvedCitation.date && (
                    <div>
                      <span className="text-slate-500 font-mono text-[9px] block uppercase tracking-wide">Decision Date:</span>
                      <span className="font-sans font-medium text-slate-300 block">{resolvedCitation.date}</span>
                    </div>
                  )}
                  {resolvedCitation.judges && resolvedCitation.judges.length > 0 && (
                    <div>
                      <span className="text-slate-500 font-mono text-[9px] block uppercase tracking-wide">Coram Bench:</span>
                      <span className="font-sans font-medium text-slate-300 block leading-relaxed">{resolvedCitation.judges.join(', ')}</span>
                    </div>
                  )}
                  {resolvedCitation.actsApplied && resolvedCitation.actsApplied.length > 0 && (
                    <div>
                      <span className="text-slate-500 font-mono text-[9px] block uppercase tracking-wide">Core Acts & provisions Mapped:</span>
                      <div className="flex flex-wrap gap-1 mt-1 font-mono text-[10px]">
                        {resolvedCitation.actsApplied.map(a => (
                          <span key={a} className="bg-white/10 text-slate-300 border border-white/10 px-1.5 py-0.2 rounded">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/20 text-xs text-rose-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-semibold font-sans">Resolution Failure</h5>
                  <p className="mt-0.5 leading-relaxed font-sans">{resolvedCitation.error}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
