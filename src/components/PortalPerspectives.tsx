/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Briefcase, Gavel, BookOpen, Activity, Play, Plus, Trash2, Calendar, ShieldCheck, Heart, AlertCircle, RefreshCw } from 'lucide-react';
import { HISTORICAL_TIMELINE } from '../data/legalDb';

export function PortalPerspectives() {
  const [activePortal, setActivePortal] = useState<'lawyer' | 'judge' | 'researcher' | 'admin'>('lawyer');

  // Lawyer Drafting State
  const [draftType, setDraftType] = useState('criminal');
  const [clientName, setClientName] = useState('Abdur Rahim');
  const [opponentName, setOpponentName] = useState('The State of Bangladesh');
  const [briefSummary, setBriefSummary] = useState('');
  const [isDrafting, setIsDrafting] = useState(false);

  // Judge Precedent Checklist
  const [checkedPrecedents, setCheckedPrecedents] = useState<Record<string, boolean>>({
    'masdar-hossain': true,
    'blast-sec-54': false,
    'state-opu': true
  });

  // Admin Health Metric Trigger
  const [systemUptime, setSystemUptime] = useState('99.98%');
  const [cpuUsage, setCpuUsage] = useState(24);
  const [activeScrapers, setActiveScrapers] = useState({ sc: 'Idle', gazette: 'Scanning...', commission: 'Idle' });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const generateLegalDraft = () => {
    setIsDrafting(true);
    setTimeout(() => {
      let draftText = `IN THE COURT OF THE DISTRICT & SESSIONS JUDGE, DHAKA\n`;
      if (draftType === 'civil') {
        draftText += `CIVIL SUIT NO. ________ OF 2026\n\n`;
        draftText += `${clientName} ...................................................... Plaintiff\n`;
        draftText += `VERSUS\n`;
        draftText += `${opponentName} ................................................. Respondent\n\n`;
        draftText += `PETITION FOR DAMAGES AND SPECIFIC PERFORMANCE UNDER SECTION 73 OF THE CONTRACT ACT, 1872\n\n`;
        draftText += `The humble petition on behalf of the Plaintiff states as follows:\n`;
        draftText += `1. That the Plaintiff and Respondent entered into a legally binding written contract...\n`;
        draftText += `2. That the Respondent failed to execute deliverables on the specified dates...\n`;
        draftText += `3. That as a direct consequence, the Plaintiff suffered severe business losses under standard damages standards...`;
      } else {
        draftText += `CRIMINAL MISC. CASE NO. ________ OF 2026\n\n`;
        draftText += `${clientName} ............................................. Accused Petitioner\n`;
        draftText += `VERSUS\n`;
        draftText += `${opponentName} ................................................. Opposite Party\n\n`;
        draftText += `APPLICATION FOR BAIL UNDER SECTION 497 OF THE CODE OF CRIMINAL PROCEDURE, 1898\n\n`;
        draftText += `The humble petition on behalf of the Accused Petitioner states as follows:\n`;
        draftText += `1. That the Accused Petitioner was arrested on false allegations and holds no prior criminal history...\n`;
        draftText += `2. That the allegations do not attract major severe custodial penalties under the Penal Code...\n`;
        draftText += `3. That the Accused Petitioner is a respected inhabitant of the locality and is ready to furnish bail bonds...`;
      }
      setBriefSummary(draftText);
      setIsDrafting(false);
    }, 1200);
  };

  const refreshSystemStats = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCpuUsage(Math.round(15 + Math.random() * 40));
      setSystemUptime('99.99%');
      setActiveScrapers({
        sc: Math.random() > 0.5 ? 'Scanning...' : 'Idle',
        gazette: Math.random() > 0.5 ? 'Indexing...' : 'Idle',
        commission: 'Idle'
      });
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-fadeIn" id="portals-section">
      {/* Perspective Sidebar (Left/Top) */}
      <div className="xl:col-span-3 space-y-4">
        <div className="border-b border-white/10 pb-3 text-left">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400">
            Select Active Portal
          </h3>
          <p className="text-xs text-slate-400">
            Interact with specialized configurations of the HAYAT platform.
          </p>
        </div>

        {/* Portal selector tabs */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setActivePortal('lawyer')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all cursor-pointer ${
              activePortal === 'lawyer'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            <Briefcase className={`w-4 h-4 shrink-0 ${activePortal === 'lawyer' ? 'text-slate-950' : 'text-slate-400'}`} />
            <div className="truncate">
              <span className="font-sans font-bold text-xs block leading-none">Lawyer Workspace</span>
              <span className={`text-[10px] font-mono mt-1 block ${activePortal === 'lawyer' ? 'text-slate-900' : 'text-slate-400'}`}>Brief Drafts & Cases</span>
            </div>
          </button>

          <button
            onClick={() => setActivePortal('judge')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all cursor-pointer ${
              activePortal === 'judge'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            <Gavel className={`w-4 h-4 shrink-0 ${activePortal === 'judge' ? 'text-slate-950' : 'text-slate-400'}`} />
            <div className="truncate">
              <span className="font-sans font-bold text-xs block leading-none">Judge Chambers</span>
              <span className={`text-[10px] font-mono mt-1 block ${activePortal === 'judge' ? 'text-slate-900' : 'text-slate-400'}`}>Decision Checklists</span>
            </div>
          </button>

          <button
            onClick={() => setActivePortal('researcher')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all cursor-pointer ${
              activePortal === 'researcher'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            <BookOpen className={`w-4 h-4 shrink-0 ${activePortal === 'researcher' ? 'text-slate-950' : 'text-slate-400'}`} />
            <div className="truncate">
              <span className="font-sans font-bold text-xs block leading-none">Research Center</span>
              <span className={`text-[10px] font-mono mt-1 block ${activePortal === 'researcher' ? 'text-slate-900' : 'text-slate-400'}`}>Historical Timelines</span>
            </div>
          </button>

          <button
            onClick={() => setActivePortal('admin')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all cursor-pointer ${
              activePortal === 'admin'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            <Activity className={`w-4 h-4 shrink-0 ${activePortal === 'admin' ? 'text-slate-950' : 'text-slate-400'}`} />
            <div className="truncate">
              <span className="font-sans font-bold text-xs block leading-none">System Administration</span>
              <span className={`text-[10px] font-mono mt-1 block ${activePortal === 'admin' ? 'text-slate-900' : 'text-slate-400'}`}>Node Health & Logs</span>
            </div>
          </button>
        </div>
      </div>

      {/* Portal Operations Panel (Right/Bottom) */}
      <div className="xl:col-span-9 flex flex-col min-h-[480px]">
        {/* LAWYER PERSPECTIVE */}
        {activePortal === 'lawyer' && (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 flex-1 flex flex-col text-left space-y-5 shadow-lg">
            <div className="border-b border-white/10 pb-3">
              <h4 className="text-base font-sans font-bold text-white">
                Bespoke Brief Draftsman Template Builder
              </h4>
              <p className="text-xs text-slate-400 mt-1 font-sans">
                Draft pre-filled procedural petition outlines using standard Bangladesh litigation nomenclature.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
              {/* Draft Input form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">Litigation Class:</label>
                    <select
                      value={draftType}
                      onChange={(e) => setDraftType(e.target.value)}
                      className="w-full p-2 rounded-lg border border-white/10 bg-slate-950/40 text-slate-300 focus:outline-hidden cursor-pointer"
                    >
                      <option value="criminal" className="bg-slate-950 text-slate-200">Criminal (Section 497 Bail)</option>
                      <option value="civil" className="bg-slate-950 text-slate-200">Civil (Section 73 Breach Damage)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">Client/Petitioner Name:</label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full p-1.5 rounded-lg border border-white/10 bg-slate-950/40 text-slate-200 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">Opposite Party / Defendant:</label>
                  <input
                    type="text"
                    value={opponentName}
                    onChange={(e) => setOpponentName(e.target.value)}
                    className="w-full p-1.5 rounded-lg border border-white/10 bg-slate-950/40 text-slate-200 focus:outline-hidden"
                  />
                </div>

                <button
                  onClick={generateLegalDraft}
                  disabled={isDrafting}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-sans font-bold text-xs py-2 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  {isDrafting ? 'Assembling Sections...' : 'Draft Brief Outline'}
                </button>
              </div>

              {/* Draft Output Box */}
              <div className="flex flex-col h-full border border-white/10 rounded-xl p-4 bg-slate-950/40 backdrop-blur-md font-mono text-[11px] leading-relaxed relative min-h-[250px] overflow-hidden select-text text-left">
                {briefSummary ? (
                  <div className="flex-1 overflow-y-auto pr-1 whitespace-pre-wrap select-text custom-scrollbar text-slate-300">
                    {briefSummary}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500">
                    <Briefcase className="w-8 h-8 text-slate-600 mb-2" />
                    <span>Fill parameters on the left and hit draft to output structured judicial petitions.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* JUDGE PERSPECTIVE */}
        {activePortal === 'judge' && (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 flex-1 flex flex-col text-left space-y-5 shadow-lg">
            <div className="border-b border-white/10 pb-3">
              <h4 className="text-base font-sans font-bold text-white">
                Judicial Decision-Checklist & Compliance Analyzer
              </h4>
              <p className="text-xs text-slate-400 mt-1 font-sans">
                Review whether facts comply with major appellate standards and precedent directives.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Directives Compliance Checklists:
              </span>

              <div className="space-y-3">
                {/* Rule 1 */}
                <div className="p-4 border border-white/10 rounded-xl flex items-start gap-3 bg-slate-950/40 backdrop-blur-md">
                  <input
                    type="checkbox"
                    checked={checkedPrecedents['masdar-hossain']}
                    onChange={() => setCheckedPrecedents({ ...checkedPrecedents, 'masdar-hossain': !checkedPrecedents['masdar-hossain'] })}
                    className="rounded text-emerald-400 border-white/20 bg-slate-900 focus:ring-0 mt-0.5 cursor-pointer"
                  />
                  <div>
                    <h5 className="font-sans font-bold text-slate-200">
                      Masdar Hossain Judicial Separation Directive (52 DLR AD 82)
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed font-sans">
                      Verify that executive personnel did not interfere in original trial appointments or court administration.
                    </p>
                    <span className="font-mono text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.2 rounded border border-emerald-500/20 font-semibold block w-max mt-1.5">
                      Status: Compliant
                    </span>
                  </div>
                </div>

                {/* Rule 2 */}
                <div className="p-4 border border-white/10 rounded-xl flex items-start gap-3 bg-slate-950/40 backdrop-blur-md">
                  <input
                    type="checkbox"
                    checked={checkedPrecedents['blast-sec-54']}
                    onChange={() => setCheckedPrecedents({ ...checkedPrecedents, 'blast-sec-54': !checkedPrecedents['blast-sec-54'] })}
                    className="rounded text-emerald-400 border-white/20 bg-slate-900 focus:ring-0 mt-0.5 cursor-pointer"
                  />
                  <div>
                    <h5 className="font-sans font-bold text-slate-200">
                      BLAST v. Bangladesh Sec. 54 Arrest Guardrails (55 DLR HCD 363)
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed font-sans">
                      Check if arrest logs, family notifications, medical certificates, and 24-hour presentation constraints are fully met.
                    </p>
                    <span className={`font-mono text-[9px] px-2 py-0.2 rounded border font-semibold block w-max mt-1.5 ${
                      checkedPrecedents['blast-sec-54']
                        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                        : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                    }`}>
                      Status: {checkedPrecedents['blast-sec-54'] ? 'Compliant' : 'Requires Review'}
                    </span>
                  </div>
                </div>

                {/* Rule 3 */}
                <div className="p-4 border border-white/10 rounded-xl flex items-start gap-3 bg-slate-950/40 backdrop-blur-md">
                  <input
                    type="checkbox"
                    checked={checkedPrecedents['state-opu']}
                    onChange={() => setCheckedPrecedents({ ...checkedPrecedents, 'state-opu': !checkedPrecedents['state-opu'] })}
                    className="rounded text-emerald-400 border-white/20 bg-slate-900 focus:ring-0 mt-0.5 cursor-pointer"
                  />
                  <div>
                    <h5 className="font-sans font-bold text-slate-200">
                      State v. Opu Credible Victim Wife Testimony (52 DLR AD 112)
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed font-sans">
                      Appraise whether the injured spouse's consistent cross-examination deposition is sufficient without corroborative neighbors.
                    </p>
                    <span className="font-mono text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.2 rounded border border-emerald-500/20 font-semibold block w-max mt-1.5">
                      Status: Compliant
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RESEARCHER PERSPECTIVE */}
        {activePortal === 'researcher' && (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 flex-1 flex flex-col text-left space-y-5 shadow-lg">
            <div className="border-b border-white/10 pb-3">
              <h4 className="text-base font-sans font-bold text-white">
                Statutory Timeline of Bangladesh Legal Reforms
              </h4>
              <p className="text-xs text-slate-400 mt-1 font-sans">
                Explore chronological progressions, foundational codifications, and historic landmark modifications.
              </p>
            </div>

            {/* Vertical timeline */}
            <div className="relative border-l border-white/10 pl-6 ml-3 space-y-5 py-2 max-h-[360px] overflow-y-auto custom-scrollbar">
              {HISTORICAL_TIMELINE.map((tl, idx) => (
                <div key={idx} className="relative group text-xs text-left">
                  {/* Circle locator on line */}
                  <span className="absolute -left-[31.5px] top-1.5 bg-slate-950 border-2 border-white rounded-full w-2.5 h-2.5 group-hover:scale-125 transition-transform" />
                  
                  <div>
                    <span className="font-mono font-extrabold text-sm text-emerald-400 block">
                      {tl.year}
                    </span>
                    <h5 className="font-sans font-bold text-slate-200 mt-0.5">
                      {tl.event}
                    </h5>
                    <p className="text-slate-400 mt-1 leading-relaxed font-sans text-[11px]">
                      {tl.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADMIN PERSPECTIVE */}
        {activePortal === 'admin' && (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 flex-1 flex flex-col text-left space-y-5 shadow-lg">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-sans font-bold text-white">
                  HAYAT System Health & Administrative Panel
                </h4>
                <p className="text-xs text-slate-400 mt-1 font-sans">
                  Audit physical node statistics, microservice uptimes, and scraper queues.
                </p>
              </div>

              <button
                onClick={refreshSystemStats}
                disabled={isRefreshing}
                className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 cursor-pointer disabled:opacity-50 shrink-0"
              >
                <RefreshCw className={`w-4 h-4 text-slate-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Admin Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 text-center">
                <span className="text-slate-400 font-mono text-[9px] uppercase block">Host Uptime</span>
                <span className="font-bold text-white text-base block mt-1">{systemUptime}</span>
              </div>

              <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 text-center">
                <span className="text-slate-400 font-mono text-[9px] uppercase block">Node CPU Load</span>
                <span className="font-bold text-white text-base block mt-1">{cpuUsage}%</span>
              </div>

              <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 text-center">
                <span className="text-slate-400 font-mono text-[9px] uppercase block">Database Connection</span>
                <span className="font-bold text-emerald-400 text-sm block mt-1.5 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Stable
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-white/10 bg-white/5 text-center">
                <span className="text-slate-400 font-mono text-[9px] uppercase block">RabbitMQ State</span>
                <span className="font-bold text-emerald-400 text-sm block mt-1.5 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Active
                </span>
              </div>
            </div>

            {/* Active scrapers lists */}
            <div className="space-y-2 pt-2 text-xs">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Source Scraper Queues Monitoring:
              </span>

              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                  <span className="text-slate-400">Supreme Court judgments (sc_judgment_queue)</span>
                  <span className={`font-semibold ${activeScrapers.sc === 'Idle' ? 'text-slate-400' : 'text-emerald-400'}`}>{activeScrapers.sc}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                  <span className="text-slate-400">Bangladesh Gazette legislation (sc_gazette_queue)</span>
                  <span className={`font-semibold ${activeScrapers.gazette === 'Idle' ? 'text-slate-400' : 'text-emerald-400'}`}>{activeScrapers.gazette}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Law Commission reform acts (sc_commission_queue)</span>
                  <span className={`font-semibold ${activeScrapers.commission === 'Idle' ? 'text-slate-400' : 'text-emerald-400'}`}>{activeScrapers.commission}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
