/*
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Scale, Search, FileText, Brain, Upload, Network, Briefcase, Layers, 
  ShieldCheck, BookOpen, Cpu, Database, Calendar, TrendingUp, Settings, 
  Globe, Award, Activity, FileCode, Users, Terminal, HelpCircle, ChevronRight, Zap
} from 'lucide-react';

interface ServiceItem {
  id: number;
  title: string;
  icon: any;
  tagline: string;
  description: string;
  subservices: string[];
  beneficiaries: string[];
  prototypeComponent?: string;
}

const HAYAT_SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: "1. Legal Research",
    icon: Search,
    tagline: "Hybrid Multi-Modal Retrieval Engine",
    description: "Multi-dimensional search interface spanning statutes, case law precedents, citation resolvers, and judge/court-specific filters using advanced Boolean and AI semantic natural language vector expansion.",
    subservices: [
      "Statute search with active amendments",
      "Case law indexing & precedents",
      "Exact Bangladesh citation lookup (DLR, BLD, MLR)",
      "Judge-wise & Court-wise analytics",
      "Subject-matter ontology filtering",
      "Semantic hybrid AI embedding expansion"
    ],
    beneficiaries: ["Individual Lawyers", "Law Firms", "Advocates", "Judges", "Students"],
    prototypeComponent: "research"
  },
  {
    id: 2,
    title: "2. Case Law Intelligence",
    icon: Scale,
    tagline: "Precedent Hierarchy & Trend Analytics",
    description: "Deep analytics tracking the lineage and relationships of judicial decisions, automatically identifying landmark holdings, overruling declarations, and citation networks.",
    subservices: [
      "Similar case context match finding",
      "Landmark precedent highlights",
      "Overruled/distinguished case alerts",
      "Relational citation networks",
      "Judicial trend timeline vectors"
    ],
    beneficiaries: ["Law Firms", "Supreme Court Advocates", "Judges"]
  },
  {
    id: 3,
    title: "3. Statutory Intelligence",
    icon: BookOpen,
    tagline: "Consolidated Digital Gazette Registry",
    description: "Centralized legal repository of Bare Acts, SROs, circulars, ordinances, and gazettes with automated historical timeline mapping of changes and amendments.",
    subservices: [
      "Bare Acts registry with dynamic diffs",
      "Presidential Ordinances & Circulars",
      "SROs & Gazette notification parser",
      "Historical act versions timeline",
      "Effective implementation date trackers"
    ],
    beneficiaries: ["Corporate Departments", "NGOs", "Government Ministries", "Lawyers"]
  },
  {
    id: 4,
    title: "4. AI Legal Assistant",
    icon: Cpu,
    tagline: "Secure Large Language Models (LLMs)",
    description: "Generative AI conversational engine engineered with server-side security to answer complex questions, construct legal summaries, and outline IRAC breakdowns safely.",
    subservices: [
      "Bilingual natural query answer generator (Bangla/English)",
      "Dynamic provision and act summarizers",
      "IRAC (Issue, Rule, Application, Conclusion) outlines",
      "Procedural civil/criminal guidance",
      "Explainable logic source tracking"
    ],
    beneficiaries: ["Law Students", "Individual Lawyers", "Corporate Legal"]
  },
  {
    id: 5,
    title: "5. Deterministic Legal Reasoning (ILRMF)",
    icon: Brain,
    tagline: "Explainable State Machine Analysis",
    description: "A dual-path hybrid analysis framework validating raw facts through structured legal state machines with automated confidence scoring and full audit-trail transparency.",
    subservices: [
      "Automated factual timeline parser",
      "Factual issue and rule matching",
      "Substantive statutory exception validation",
      "Temporal law state confirmation",
      "Source citation verifier with audit logs"
    ],
    beneficiaries: ["Judges", "Law Firms", "Compliance Officers"],
    prototypeComponent: "ilrmf"
  },
  {
    id: 6,
    title: "6. Document Intelligence",
    icon: Upload,
    tagline: "Intelligent Document Processing (IDP)",
    description: "High-accuracy pipeline utilizing custom OCR (including specialized Bangla character recognition) and LayoutLMv3 semantic chunking models.",
    subservices: [
      "PDF, TIFF, and scanned image parser",
      "Specialized Bangla legal OCR script engine",
      "LayoutLMv3 semantic box segmentation",
      "Automatic citation & clause extraction",
      "SHA-256 digital integrity checks"
    ],
    beneficiaries: ["Individual Lawyers", "Law Firms", "Court Registrars"],
    prototypeComponent: "ingestion"
  },
  {
    id: 7,
    title: "7. Document Drafting",
    icon: FileCode,
    tagline: "Automated Court Draft Templating",
    description: "Interactive statutory template draft generator for common civil and criminal instruments, legal notifications, and corporate commercial agreements.",
    subservices: [
      "Plaints & Written statements builder",
      "Special Bail petitions and Affidavits",
      "Formal legal notifications & notices",
      "Power of Attorney & corporate deeds",
      "Interactive structural drafting guidance"
    ],
    beneficiaries: ["Individual Lawyers", "Law Firms", "Corporate Secretaries"]
  },
  {
    id: 8,
    title: "8. Case Management",
    icon: Calendar,
    tagline: "Active Litigation Operational Suite",
    description: "Comprehensive workflow organizer tracking cause lists, hearing dates, client communication logs, billing cycles, and legal task queues.",
    subservices: [
      "Integrated secure Case Diary",
      "Live judicial Cause List sync",
      "Evidence locker and digital storage",
      "Client profile management",
      "Billable time logs and tracking boards"
    ],
    beneficiaries: ["Individual Lawyers", "Law Firms", "District Advocates"]
  },
  {
    id: 9,
    title: "9. Litigation Analytics",
    icon: TrendingUp,
    tagline: "Judicial Decision Prediction Patterns",
    description: "Advanced dashboards tracking court-specific disposal rates, case duration timelines, and citation relevance metrics for strategic planning.",
    subservices: [
      "Judge-wise decision pattern metrics",
      "Historical case disposal timelines",
      "Success rate probability analysis",
      "Court congestion & delay predictors",
      "Citing authority weight matrix"
    ],
    beneficiaries: ["Law Firms", "Corporate Strategy Teams", "Publishers"]
  },
  {
    id: 10,
    title: "10. Compliance Management",
    icon: ShieldCheck,
    tagline: "Institutional Corporate Governance",
    description: "Continuous compliance tracking spanning regulatory registries, company filings, municipal laws, labor codes, and AML/KYC checks.",
    subservices: [
      "RJSC dynamic regulatory alert boards",
      "Taxation & Customs schedule trackers",
      "Labour and Environmental standard audits",
      "AML (Anti-Money Laundering) checklist screening",
      "Corporate compliance calendar notifications"
    ],
    beneficiaries: ["Corporate Legal", "Banks", "NGOs", "Compliance Officers"]
  },
  {
    id: 11,
    title: "11. Knowledge Graph",
    icon: Network,
    tagline: "Semantic Precedent Entity Map",
    description: "Relational mapping engine linking cases, acts, sections, judges, and citations into a dynamic unified legal ontology graph.",
    subservices: [
      "Interactive multi-node citation visualizer",
      "Statute-to-precedent relationship linking",
      "Judge-wise panel Coram graphs",
      "Chronological statutory amendment tracking",
      "Subject-matter legal ontology mapping"
    ],
    beneficiaries: ["Researchers", "Advocates", "Judges", "Universities"],
    prototypeComponent: "graph"
  },
  {
    id: 12,
    title: "12. Legal Education",
    icon: Award,
    tagline: "Dynamic Jurisprudence Tutor Hub",
    description: "Interactive educational workspace containing digital commentaries, automated case briefs, legal glossaries, and examination modules.",
    subservices: [
      "Interactive Bare Acts with active commentaries",
      "Precedential case brief generator",
      "Legal terminology glossary (Bangla/English)",
      "Advocacy and Bar Council preparation modules",
      "Generative AI virtual legal study tutor"
    ],
    beneficiaries: ["Universities", "Law Students", "Bar Candidates"]
  },
  {
    id: 13,
    title: "13. Legal Publishing",
    icon: Briefcase,
    tagline: "Weekly Law Report Publishing",
    description: "Digital law report compiler producing weekly digests, specialized subject booklets, and statutory amendment update newsletters.",
    subservices: [
      "Digital Law Reports compiler",
      "Weekly and monthly legal briefings",
      "Structured precedent digests",
      "New SRO and amendment alert publisher",
      "Editorial precedent summaries"
    ],
    beneficiaries: ["Publishers", "Universities", "Law Firms"]
  },
  {
    id: 14,
    title: "14. Government & Judiciary Solutions",
    icon: Globe,
    tagline: "Digital Court Ingress Infrastructure",
    description: "Enterprise digitization blueprints for administrative dashboards, digital e-filing pipelines, smart cause lists, and case allocation tools.",
    subservices: [
      "Administrative Court digitization dashboards",
      "Secure Digital e-filing channel blueprint",
      "Smart algorithmic Case Allocation logs",
      "Performance and disposal monitors",
      "Secure digitized judicial archives"
    ],
    beneficiaries: ["Judges (authorized)", "Government Ministries", "Registrars"]
  },
  {
    id: 15,
    title: "15. Corporate Legal Services",
    icon: Database,
    tagline: "Contract Lifecycle Management (CLM)",
    description: "End-to-end management of corporate agreements, highlighting risk exposure, automating board governance, and organizing due diligence documents.",
    subservices: [
      "Automated contract risk profiling",
      "Due Diligence repository & organizer",
      "Board of Directors governance modules",
      "Corporate secretarial audit logs",
      "Digital legal vault for strategic agreements"
    ],
    beneficiaries: ["Corporate Legal", "Banks", "Insurance Companies"]
  },
  {
    id: 16,
    title: "16. APIs & Integrations",
    icon: Terminal,
    tagline: "Foundational Legal Developer API Gateway",
    description: "Robust REST and GraphQL endpoint portals enabling modern legal tech startups and enterprise platforms to query legal data.",
    subservices: [
      "High-speed Legal Search API",
      "Bangladesh Citation Parser API",
      "Document OCR & Bangla character reader API",
      "Legal Knowledge Graph query endpoint",
      "Secure developer JWT and OAuth2 gateway"
    ],
    beneficiaries: ["Legal Tech Companies", "Enterprise Developers", "Banks"]
  },
  {
    id: 17,
    title: "17. Enterprise AI Platform",
    icon: Settings,
    tagline: "On-Premise Private LLM Deployment",
    description: "High-security multi-tenant SaaS and single-tenant on-premise solutions containing role-based controls and cryptographic logs.",
    subservices: [
      "On-premise secure air-gapped deployment",
      "Private serverless LLM container cluster",
      "Granular Role-Based Access Controls (RBAC)",
      "WORM (Write-Once-Read-Many) audit logs",
      "Single Sign-On (SSO) SAML integrations"
    ],
    beneficiaries: ["Banks", "Government Ministries", "Large Law Firms"]
  }
];

const TARGET_CUSTOMERS = [
  { name: "Individual Lawyers", desc: "Digital case diary, templates, high-speed research, and billing tools." },
  { name: "Law Firms", desc: "Collaborative case workspace, litigation analytics, and document compliance." },
  { name: "Supreme Court Advocates", desc: "Supreme Court citation resolver, overrule triggers, and benchmark stats." },
  { name: "Judges & Court Staff", desc: "Decision tracking, independent factual audits, and digitized records." },
  { name: "Corporate Legal Departments", desc: "Contract risk monitoring, board governance, and regulatory compliance trackers." },
  { name: "Banks & Insurance", desc: "Anti-Money Laundering checks, mortgage due diligence, and risk evaluation." },
  { name: "NGOs & Human Rights Org", desc: "Arrest monitoring, fundamental liberties tracking, and PIL indexing." },
  { name: "Universities & Students", desc: "Bare Acts commentaries, IRAC study tutors, and exam preparation." }
];

interface EcosystemPortfolioProps {
  onNavigateToTab?: (tab: string) => void;
}

export function EcosystemPortfolio({ onNavigateToTab }: EcosystemPortfolioProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem>(HAYAT_SERVICES[0]);
  const [activeCustomer, setActiveCustomer] = useState<string>("Individual Lawyers");

  const ActiveIcon = selectedService.icon;

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-5 gap-4">
        <div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest font-bold">
            Ecosystem Directory
          </span>
          <h2 className="text-xl md:text-2xl font-sans font-medium tracking-tight text-white mt-1">
            HAYAT National Legal Infrastructure Portfolio
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            HAYAT is engineered as the unified digital foundation for the Bangladesh justice ecosystem, integrating 17 specialized services for legal practitioners, academic institutions, and government bodies.
          </p>
        </div>
        <div className="bg-slate-950/40 px-3.5 py-2.5 rounded-xl border border-white/5 font-mono text-[10px] text-slate-400 leading-normal shrink-0">
          <p className="text-slate-500 uppercase tracking-wider font-bold">Deploy Status:</p>
          <p className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            PROTOTYPE PLATFORM ACTIVE
          </p>
        </div>
      </div>

      {/* Grid Layout: Left List, Right Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Services Navigation Rail */}
        <div className="lg:col-span-5 space-y-2 max-h-[580px] overflow-y-auto pr-2 scrollbar-thin">
          <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider mb-2 px-1">
            Browse Portfolio Modules
          </span>
          {HAYAT_SERVICES.map((srv) => {
            const Icon = srv.icon;
            const isSelected = selectedService.id === srv.id;
            return (
              <button
                key={srv.id}
                onClick={() => setSelectedService(srv)}
                className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-start gap-3 cursor-pointer group ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-white shadow-md'
                    : 'bg-slate-900/20 border-white/5 hover:border-white/10 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className={`p-2 rounded-lg border shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                    : 'bg-white/5 border-white/10 text-slate-500 group-hover:text-slate-300'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-sans font-semibold text-xs leading-tight">
                    {srv.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-sans line-clamp-1">
                    {srv.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Detailed Capabilities Board */}
        <div className="lg:col-span-7 bg-slate-900/30 border border-white/10 rounded-2xl p-6 space-y-6 relative overflow-hidden min-h-[500px]">
          {/* Subtle Ambient Background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full filter blur-2xl -z-10" />

          {/* Icon & Description Header */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
              <ActiveIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-base text-white">
                {selectedService.title}
              </h3>
              <p className="text-xs text-emerald-400 font-mono font-medium tracking-wide mt-0.5 uppercase">
                {selectedService.tagline}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">
              Overview
            </span>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {selectedService.description}
            </p>
          </div>

          {/* Sub-capabilities */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">
              Specialized Service Capabilities
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {selectedService.subservices.map((sub, idx) => (
                <div key={idx} className="bg-slate-950/40 border border-white/5 p-2.5 rounded-xl flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0 mt-1.5" />
                  <span className="text-[11px] text-slate-300 leading-tight font-sans">
                    {sub}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Beneficiaries */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">
              Primary Target Groups
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedService.beneficiaries.map((ben, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-slate-300 font-sans"
                >
                  {ben}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation to active Sandbox Prototype components */}
          {selectedService.prototypeComponent && onNavigateToTab && (
            <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 mt-4">
              <div>
                <span className="text-[9px] font-mono text-emerald-400 block uppercase font-bold">
                  Active Ecosystem Prototype:
                </span>
                <p className="text-xs text-slate-300 mt-0.5 leading-snug font-sans">
                  The core framework for this module is functional in our interactive simulator.
                </p>
              </div>
              <button
                onClick={() => onNavigateToTab(selectedService.prototypeComponent!)}
                className="px-3.5 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-lg border border-emerald-500/30 transition-all flex items-center gap-1 shrink-0 cursor-pointer self-start md:self-auto"
              >
                Launch Sandbox Module <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Target Customers Hub Dashboard */}
      <div className="bg-slate-900/20 border border-white/5 rounded-2xl p-6 space-y-4">
        <div>
          <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">
            Consolidated User Hub
          </span>
          <h3 className="text-sm font-sans font-bold text-white mt-0.5">
            Who Does HAYAT Serve?
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed font-sans">
            From sole practitioners at the bar to regulatory compliance teams, discover the custom integrations built for each role.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TARGET_CUSTOMERS.map((cust) => {
            const isActive = activeCustomer === cust.name;
            return (
              <div
                key={cust.name}
                onClick={() => setActiveCustomer(cust.name)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                  isActive
                    ? 'bg-white/10 border-white/20 shadow-md scale-[1.01]'
                    : 'bg-slate-950/40 border-transparent hover:border-white/5 hover:bg-slate-900/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-sans font-bold text-xs text-slate-200">
                    {cust.name}
                  </h4>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal font-sans">
                  {cust.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Long-Term Digital Infrastructure Vision */}
      <div className="bg-gradient-to-r from-emerald-950/20 to-slate-950/40 border border-emerald-500/10 p-6 rounded-2xl space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-emerald-500/15 text-emerald-400 rounded-lg border border-emerald-500/20 mt-0.5 shrink-0">
            <Zap className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <h4 className="font-sans font-bold text-xs text-white uppercase tracking-wider">
              National Digital Infrastructure Vision
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans max-w-4xl">
              Rather than providing just a static standalone search engine, **HAYAT** is designed as a foundational, modular infrastructure. It integrates legal research, AI-assisted analysis, document intelligence, case management, compliance, analytics, education, and enterprise APIs into a single ecosystem. This allows district bar associations, corporate groups, and legal tech developers to construct custom tools on top of our secure database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
