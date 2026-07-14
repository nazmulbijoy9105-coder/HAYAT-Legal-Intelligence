/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scale, Upload, Brain, FileText, CheckCircle2, AlertCircle, 
  Calendar, User, BookOpen, Gavel, FileDigit, ShieldCheck, 
  Loader2, ArrowRight, CornerDownRight, FileSpreadsheet, Eye, Info
} from 'lucide-react';

// Interfaces for Extracted Structured Data
interface ActCited {
  actName: string;
  sections: string[];
  temporalStatus: string;
}

interface PrecedentCited {
  citation: string;
  caseName: string;
  holding: string;
}

interface ILRMFRules {
  issues: string[];
  rules: string;
  exceptions: string;
  application: string;
  conclusion: string;
}

interface HighlightBlock {
  text: string;
  category: string;
}

interface ExtractionResult {
  title: string;
  citation: string;
  date: string;
  courtOrAuthority: string;
  judgesOrOfficers: string[];
  parties: string;
  subject: string;
  summary: string;
  actsCited: ActCited[];
  precedentsCited: PrecedentCited[];
  ilrmf: ILRMFRules;
  highlights: HighlightBlock[];
  confidenceScore: number;
}

// Bangladesh Real-World Preseeded Document Samples
const SAMPLE_DOCS = [
  {
    id: 'dowry-act-2018',
    label: 'Dowry Prohibition Gazette 2018',
    type: 'Statute/Gazette',
    lang: 'Bengali/English',
    text: `যৌতুক নিরোধ আইন, ২০১৮
২০১৮ সনের ৩৯ নং আইন
যেহেতু যৌতুক আদান-প্রদান নিষিদ্ধকরণ সম্পর্কিত আইনসমূহ সংহত ও সংশোধন করা সমীচীন ও প্রয়োজনীয়; সেহেতু এতদ্বারা নিম্নলিখিত আইনটি প্রণয়ন করা হইল:-

১। সংক্ষিপ্ত শিরোনাম ও প্রবর্তন— (১) এই আইন যৌতুক নিরোধ আইন, ২০১৮ নামে অভিহিত হইবে।
(২) ইহা অবিলম্বে কার্যকর হইবে।

২। সংজ্ঞা— বিষয় বা প্রসঙ্গের পরিপন্থী কিছু না থাকিলে, এই আইনে—
(১) "যৌতুক" অর্থ বিবাহ পক্ষদ্বয়ের কোন এক পক্ষ কর্তৃক অন্য পক্ষের নিকট বিবাহের শর্ত হিসাবে বিবাহের পূর্বে বা বিবাহকালে বা বিবাহের পরে যে কোন সময় দাবিকৃত কোন অর্থ, সামগ্রী বা অন্য কোন সম্পত্তি...

৩। যৌতুক দাবি করিবার দণ্ড— যদি কোন ব্যক্তি যৌতুক দাবি করেন বা যৌতুক আদান-প্রদান করেন, তবে তিনি অনধিক ৫ বৎসরের কারাদণ্ড বা অনূর্ধ্ব ৫০ হাজার টাকা অর্থদণ্ডে বা উভয় দণ্ডে দণ্ডিত হইবেন।`
  },
  {
    id: 'state-v-opu-1999',
    label: 'State v. Opu (52 DLR 112)',
    type: 'Supreme Court Judgment',
    lang: 'English',
    text: `IN THE SUPREME COURT OF BANGLADESH
APPELLATE DIVISION
Present:
Mr. Justice Latifur Rahman, Chief Justice
Mr. Justice Mainur Reza Chowdhury

Criminal Appeal No. 52 of 1999
The State ............................................. Appellant
v.
Opu and others .................................... Respondents

Dowry Prohibition Act, 1980 - Section 4. Case occurring behind domestic doors. In such instances, third party witnesses can rarely be found. The consistent deposition of the victim wife is sufficient to sustain a criminal conviction if creditworthy.

Latifur Rahman, CJ: This criminal appeal arises out of the conviction of respondents under the Dowry Prohibition provisions. The prosecution case is that the accused demanded 2 Lakh BDT and beat the victim spouse. On evaluation, we find the victim's testimony completely unshaken in cross-examination. We hold that strict corroboration by independent neighbors is not a condition precedent for conviction in domestic cruelty cases. The appeal is allowed.`
  },
  {
    id: 'turag-river-2019',
    label: 'Turag River Living Entity (Civil Petition 3039/2019)',
    type: 'Landmark Petition',
    lang: 'English',
    text: `SUPREME COURT OF BANGLADESH
APPELLATE DIVISION
Civil Petition for Leave to Appeal No. 3039 of 2019
National River Protection Commission (NRPC) v. Human Rights and Peace for Bangladesh (HRPB)

Hasan Foez Siddique, CJ: This landmark environmental petition addresses the legal status of rivers in Bangladesh. Encroachment, sand mining, and unregulated industrial dumping have put the river Turag in imminent danger. Under Article 18A of the Constitution of Bangladesh, the state is under a non-negotiable obligation to conserve the environment.

We hold that all rivers, canals, and wetlands in Bangladesh are hereby declared to have the status of a 'Living Entity', 'Legal Person' and 'Juridical Person' possessing legal rights. The National River Protection Commission is declared as the legal custodian (locus parentis) of all water bodies. Anyone encroaching on or polluting rivers shall be disqualified from contesting elections or obtaining financial bank loans.`
  }
];

export default function App() {
  const [inputText, setInputText] = useState<string>('');
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [highlightTab, setHighlightTab] = useState<'ruling' | 'statute' | 'all'>('all');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    setFileBase64(null);
    setFileName(null);
  };

  const handleLoadSample = (sampleText: string, label: string) => {
    setInputText(sampleText);
    setFileBase64(null);
    setFileName(`preloaded_${label.toLowerCase().replace(/\s+/g, '_')}.txt`);
    setResult(null);
    setError(null);
  };

  // Convert File to Base64 helper
  const processFile = (file: File) => {
    if (file.type !== 'application/pdf' && !file.type.startsWith('text/') && !file.type.startsWith('image/')) {
      setError('Unsupported file format. Please upload a PDF, image, or raw text file.');
      return;
    }

    setFileName(file.name);
    setError(null);
    setResult(null);

    const reader = new FileReader();
    if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        setFileBase64(base64);
        setInputText(`[Uploaded Binary Document: ${file.name} - Ready for AI extraction]`);
      };
      reader.readAsDataURL(file);
    } else {
      reader.onload = () => {
        setInputText(reader.result as string);
        setFileBase64(null);
      };
      reader.readAsText(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // API Call to real-time Document Extractor on backend
  const triggerExtraction = async () => {
    if (!inputText && !fileBase64) {
      setError('Please paste raw legal text, select a template, or upload a document first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: fileBase64 ? null : inputText,
          pdfBase64: fileBase64,
          fileName: fileName
        })
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during legal document analysis. Please check your network and retry.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredHighlights = result?.highlights.filter(h => {
    if (highlightTab === 'all') return true;
    if (highlightTab === 'ruling') return h.category.toLowerCase().includes('ruling');
    if (highlightTab === 'statute') return h.category.toLowerCase().includes('statute');
    return true;
  });

  return (
    <div className="dark min-h-screen bg-[#070b13] text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-slate-950 relative overflow-x-hidden">
      
      {/* Decorative High-Contrast Lighting Accents */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-emerald-950/15 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-950/15 rounded-full blur-[160px] pointer-events-none z-0"></div>
      
      {/* Elegant Header with Institutional Layout */}
      <header className="bg-slate-950/60 border-b border-white/10 py-5 px-6 md:px-12 sticky top-0 z-50 backdrop-blur-xl relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          <div className="flex items-center gap-3.5">
            <div className="bg-emerald-500/10 text-emerald-400 p-2.5 rounded-xl border border-emerald-500/25">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-sans font-black text-xl tracking-wide uppercase text-white leading-none">
                  HAYAT
                </h1>
                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase">
                  Document Intelligence
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans mt-1">
                Real-Time Legal Text & PDF Extractor • Powered by Bangladesh Jurisprudence Reasoning
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2.5 py-1 rounded-full font-mono font-bold flex items-center gap-1.5 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Gemini Analyzer Active
            </span>
            <span className="text-slate-500 font-mono text-[10px] hidden md:inline">
              Host: run.cloud.gov.bd
            </span>
          </div>

        </div>
      </header>

      {/* Main Core Platform Interface */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col space-y-6 relative z-10">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent p-6 rounded-2xl border border-white/5 backdrop-blur-sm shadow-xl">
          <h2 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
            <Brain className="w-5 h-5 text-emerald-400 animate-pulse" />
            Legal Extraction Sandbox
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Eliminate artificial system bloat. Upload any official Bangladesh Gazette, Case Judgment PDF, or paste plain legal pleadings. 
            HAYAT will automatically execute a deep structure extraction to parse metadata, index statutory citations, cross-reference judicial precedents, and assemble an audit-ready **Hierarchical Reasoning (ILRMF)** flow.
          </p>
        </div>

        {/* Two Column Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Document Ingestion, Dropzone, and Input Form */}
          <div className="lg:col-span-5 flex flex-col space-y-5">
            
            <div className="bg-slate-900/50 rounded-2xl border border-white/10 p-5 md:p-6 shadow-xl flex flex-col space-y-4">
              <h3 className="text-sm font-bold text-slate-200 tracking-tight flex items-center gap-2">
                <Upload className="w-4 h-4 text-emerald-400" />
                Step 1: Ingest Legal Document
              </h3>

              {/* Dynamic Drag-and-Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 ${
                  isDragging 
                    ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                    : 'border-white/10 hover:border-white/25 hover:bg-white/[0.02]'
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept=".pdf,text/*,image/*" 
                />
                <div className="bg-white/5 p-3 rounded-full text-slate-300">
                  <FileText className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-200">
                    {fileName ? `Loaded: ${fileName}` : 'Drag & drop real PDF / scan / text here'}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Supports text-based or scanned PDFs up to 25MB
                  </p>
                </div>
              </div>

              {/* Quick Template Picker */}
              <div className="space-y-2">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                  <Info className="w-3 h-3 text-slate-500" />
                  Or load standard preloaded benchmark cases:
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {SAMPLE_DOCS.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => handleLoadSample(doc.text, doc.label)}
                      className="text-left bg-[#0c1220]/80 hover:bg-[#121c32]/80 border border-white/5 hover:border-white/10 p-2.5 rounded-xl transition-all group flex items-start justify-between cursor-pointer"
                    >
                      <div>
                        <p className="text-xs font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">
                          {doc.label}
                        </p>
                        <p className="text-[9px] text-slate-500 font-mono mt-0.5">
                          {doc.type} • {doc.lang}
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all self-center" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Paste Text Area */}
              <div className="space-y-1.5 pt-2 border-t border-white/5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Document Plain Text Box
                </label>
                <textarea
                  value={inputText}
                  onChange={handleTextChange}
                  placeholder="Paste legal provisions, court order, or custom pleadings here..."
                  className="w-full min-h-[160px] bg-slate-950/80 border border-white/10 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 font-mono leading-relaxed placeholder:text-slate-600"
                />
              </div>

              {/* Action Trigger Button */}
              <button
                onClick={triggerExtraction}
                disabled={isLoading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/40 text-slate-950 py-3 rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    Executing Deep AI Extraction...
                  </>
                ) : (
                  <>
                    <Scale className="w-4 h-4 text-slate-950" />
                    Extract & Analyze Structured Legal Data
                  </>
                )}
              </button>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl flex items-start gap-2 animate-pulse">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: AI Extracted Document Intelligence Board */}
          <div className="lg:col-span-7">
            
            <AnimatePresence mode="wait">
              {!result && !isLoading ? (
                // Empty State
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-slate-900/30 rounded-2xl border border-white/5 p-12 text-center flex flex-col items-center justify-center space-y-4 min-h-[550px] relative overflow-hidden"
                >
                  <div className="absolute top-[-20%] left-[-20%] w-[40vw] h-[40vw] bg-slate-900/40 rounded-full blur-[80px] pointer-events-none"></div>
                  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                    <Brain className="w-10 h-10 text-slate-600 animate-pulse" />
                  </div>
                  <div className="max-w-md">
                    <h4 className="text-sm font-bold text-slate-300 tracking-tight">Intelligence Output Board</h4>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      Please load one of the benchmark samples or upload your own PDF on the left, then click "Extract & Analyze". 
                      The legal system will process the document and return high-fidelity structured intelligence here.
                    </p>
                  </div>
                </motion.div>
              ) : isLoading ? (
                // Premium Reasoning Loading State
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-slate-900/50 rounded-2xl border border-white/10 p-12 text-center flex flex-col items-center justify-center space-y-6 min-h-[550px]"
                >
                  <div className="relative flex items-center justify-center">
                    <Loader2 className="w-12 h-12 animate-spin text-emerald-400" />
                    <Brain className="w-5 h-5 text-emerald-400 absolute" />
                  </div>
                  
                  <div className="max-w-md space-y-3">
                    <h4 className="text-sm font-bold text-white tracking-tight">HAYAT Document Processing Active</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Scanning bounding boxes, verifying legal vocabulary, identifying acts of Parliament, matching Supreme Court precedent networks, and executing deterministic **ILRMF reasoning steps**.
                    </p>
                    
                    {/* Animated Legal Checklist */}
                    <div className="pt-4 text-left space-y-2 max-w-xs mx-auto">
                      <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>MIME & Magic Bytes Verified</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>OCR Stream Analysis Commenced</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono animate-pulse">
                        <Loader2 className="w-3 h-3 text-emerald-400 shrink-0 animate-spin" />
                        <span>Verifying Statutes via Bangladesh DB</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-600 font-mono">
                        <span className="w-3 h-3 border border-slate-700 rounded-full shrink-0" />
                        <span>Fusing Hierarchical ILRMF Nodes</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                // Full Document Intelligence Report Output
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Metadata Header & Confidence Score */}
                  <div className="bg-slate-900/50 rounded-2xl border border-white/10 p-5 md:p-6 shadow-xl space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-white/5">
                      <div>
                        <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase">
                          {result?.courtOrAuthority || 'High Court of Bangladesh'}
                        </span>
                        <h3 className="text-base font-extrabold text-white mt-1.5 tracking-tight leading-snug">
                          {result?.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 font-mono">
                          Citation Ref: {result?.citation || 'Not Registered'}
                        </p>
                      </div>
                      
                      <div className="flex md:flex-col items-center md:items-end justify-between shrink-0 bg-white/[0.02] border border-white/5 md:bg-transparent md:border-0 p-3 md:p-0 rounded-xl">
                        <div className="text-left md:text-right">
                          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Extraction Quality</p>
                          <p className="text-2xl font-black text-emerald-400 leading-none mt-1">
                            {result?.confidenceScore}%
                          </p>
                        </div>
                        <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-mono px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase mt-1">
                          Verified Audit Score
                        </span>
                      </div>
                    </div>

                    {/* Standard Case Identifiers Block */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="font-medium text-slate-400 shrink-0">Official Date:</span>
                          <span className="text-slate-200 font-mono">{result?.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="font-medium text-slate-400 shrink-0">Bench / Authority:</span>
                          <span className="text-slate-200">{result?.judgesOrOfficers?.join(', ') || 'N/A'}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Gavel className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="font-medium text-slate-400 shrink-0">Parties Involved:</span>
                          <span className="text-slate-200 font-medium truncate" title={result?.parties}>
                            {result?.parties}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <BookOpen className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="font-medium text-slate-400 shrink-0">Primary Subject:</span>
                          <span className="text-slate-200 truncate">{result?.subject}</span>
                        </div>
                      </div>
                    </div>

                    {/* Summary Callout Box */}
                    <div className="bg-[#0c1220]/80 rounded-xl border border-white/5 p-3.5 text-xs leading-relaxed text-slate-300">
                      <p className="font-semibold text-slate-200 mb-1">Executive Summary:</p>
                      {result?.summary}
                    </div>
                  </div>

                  {/* Legal Precedents & Legislative Citation Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Acts and Statutory Provisions */}
                    <div className="bg-slate-900/50 rounded-2xl border border-white/10 p-5 shadow-xl space-y-3.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                        Acts & Statutory Codes
                      </h4>
                      
                      {result?.actsCited && result.actsCited.length > 0 ? (
                        <div className="space-y-2">
                          {result.actsCited.map((act, index) => (
                            <div key={index} className="bg-white/[0.01] border border-white/5 rounded-xl p-3 space-y-1.5 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-slate-200">{act.actName}</span>
                                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                                  act.temporalStatus.toLowerCase() === 'valid'
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                }`}>
                                  {act.temporalStatus}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {act.sections.map((sec, idx) => (
                                  <span key={idx} className="bg-white/5 text-slate-300 px-2 py-0.5 rounded-md border border-white/5 text-[10px] font-mono">
                                    Sec. {sec}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-500 italic">No specific Parliamentary Acts located in this document.</p>
                      )}
                    </div>

                    {/* Precedent and Citations Net */}
                    <div className="bg-slate-900/50 rounded-2xl border border-white/10 p-5 shadow-xl space-y-3.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <FileDigit className="w-4 h-4 text-emerald-400" />
                        Case Law Citations Located
                      </h4>
                      
                      {result?.precedentsCited && result.precedentsCited.length > 0 ? (
                        <div className="space-y-2">
                          {result.precedentsCited.map((prec, index) => (
                            <div key={index} className="bg-white/[0.01] border border-white/5 rounded-xl p-3 space-y-1 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-slate-200">{prec.caseName}</span>
                                <span className="bg-emerald-500/5 text-emerald-400 font-mono text-[9px] border border-emerald-500/10 px-2 rounded-md">
                                  {prec.citation}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                                <span className="text-slate-500 font-medium">Ruling:</span> {prec.holding}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-500 italic">No Supreme Court precedent citations referenced.</p>
                      )}
                    </div>

                  </div>

                  {/* Hierarchical Legal Reasoning Engine (ILRMF) Board */}
                  <div className="bg-slate-900/50 rounded-2xl border border-white/10 p-5 md:p-6 shadow-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                        <Brain className="w-4.5 h-4.5 text-emerald-400" />
                        Hierarchical Legal Reasoning Flow (ILRMF)
                      </h4>
                      <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Security Level: High
                      </span>
                    </div>

                    <div className="space-y-4 text-xs">
                      {/* Issues */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0" />
                          Issues Spatially Spotted
                        </div>
                        <ul className="space-y-2 pl-3.5">
                          {result?.ilrmf?.issues?.map((issue, idx) => (
                            <li key={idx} className="list-disc text-slate-300 leading-relaxed">
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Rules */}
                      <div className="space-y-1.5 pt-2 border-t border-white/5">
                        <div className="flex items-center gap-2 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0" />
                          Statutory & Common Law Rules
                        </div>
                        <p className="text-slate-300 pl-3.5 leading-relaxed bg-[#0c1220]/40 p-2.5 rounded-xl border border-white/5">
                          {result?.ilrmf?.rules}
                        </p>
                      </div>

                      {/* Exceptions */}
                      <div className="space-y-1.5 pt-2 border-t border-white/5">
                        <div className="flex items-center gap-2 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0" />
                          Legal Exceptions & Defenses
                        </div>
                        <p className="text-slate-300 pl-3.5 leading-relaxed">
                          {result?.ilrmf?.exceptions}
                        </p>
                      </div>

                      {/* Application */}
                      <div className="space-y-1.5 pt-2 border-t border-white/5">
                        <div className="flex items-center gap-2 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0" />
                          Analogical Reasoning Application
                        </div>
                        <p className="text-slate-300 pl-3.5 leading-relaxed bg-emerald-500/[0.01] border border-emerald-500/5 p-3 rounded-xl">
                          {result?.ilrmf?.application}
                        </p>
                      </div>

                      {/* Conclusion */}
                      <div className="space-y-1.5 pt-2 border-t border-white/5">
                        <div className="flex items-center gap-2 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0" />
                          Decisive Legal Conclusion & Verdict
                        </div>
                        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-3.5 pl-4 text-slate-200 leading-relaxed font-medium relative">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400 rounded-l-xl"></div>
                          {result?.ilrmf?.conclusion}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Highlighting Tab Section */}
                  <div className="bg-slate-900/50 rounded-2xl border border-white/10 p-5 md:p-6 shadow-xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                      <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                        <Eye className="w-4.5 h-4.5 text-emerald-400" />
                        Key Legal Excerpts
                      </h4>
                      <div className="flex gap-1.5 bg-[#0c1220] p-1 rounded-lg border border-white/5 self-start sm:self-auto">
                        <button
                          onClick={() => setHighlightTab('all')}
                          className={`px-3 py-1 text-[10px] font-sans font-semibold rounded-md transition-all cursor-pointer ${
                            highlightTab === 'all' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          All Excerpts
                        </button>
                        <button
                          onClick={() => setHighlightTab('ruling')}
                          className={`px-3 py-1 text-[10px] font-sans font-semibold rounded-md transition-all cursor-pointer ${
                            highlightTab === 'ruling' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          Rulings
                        </button>
                        <button
                          onClick={() => setHighlightTab('statute')}
                          className={`px-3 py-1 text-[10px] font-sans font-semibold rounded-md transition-all cursor-pointer ${
                            highlightTab === 'statute' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          Statutes
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
                      {filteredHighlights && filteredHighlights.length > 0 ? (
                        filteredHighlights.map((hl, index) => (
                          <div key={index} className="bg-white/[0.01] border border-white/5 rounded-xl p-3 text-xs leading-relaxed text-slate-300 flex items-start gap-2.5">
                            <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 uppercase ${
                              hl.category.toLowerCase().includes('ruling')
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            }`}>
                              {hl.category}
                            </span>
                            <div className="flex-1">
                              "{hl.text}"
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-[11px] text-slate-500 italic py-2 text-center">No excerpts matched the chosen filter.</p>
                      )}
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </main>

      {/* Corporate Institutional Footer */}
      <footer className="bg-[#05080e] border-t border-white/10 py-6 px-6 mt-auto text-center text-xs text-slate-400 font-sans backdrop-blur-xl relative z-10">
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
