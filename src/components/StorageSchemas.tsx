/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Database, Network, Folder, HelpCircle, Terminal, Play, ArrowRight, ShieldCheck } from 'lucide-react';

interface SchemaTable {
  name: string;
  description: string;
  columns: { name: string; type: string; key?: 'PK' | 'FK'; description: string }[];
}

const POSTGRES_SCHEMAS: SchemaTable[] = [
  {
    name: "Evidence",
    description: "Original metadata records of submitted digital or physically scanned court artifacts.",
    columns: [
      { name: "id", type: "UUID", key: "PK", description: "Unique physical identifier." },
      { name: "uuid", type: "VARCHAR(64)", description: "Secure, platform-wide audit UUID." },
      { name: "title", type: "VARCHAR(256)", description: "A human-readable label." },
      { name: "submitter_id", type: "UUID", key: "FK", description: "Reference to the User table." },
      { name: "mime_type", type: "VARCHAR(64)", description: "Calculated document format." },
      { name: "created_at", type: "TIMESTAMP", description: "Record establishment timestamp." }
    ]
  },
  {
    name: "EvidenceVersion",
    description: "Maintains absolute legal provenance history through point-in-time document states.",
    columns: [
      { name: "id", type: "UUID", key: "PK", description: "Unique version entry identifier." },
      { name: "evidence_id", type: "UUID", key: "FK", description: "Main reference evidence block." },
      { name: "sha256", type: "CHAR(64)", description: "Immutable cryptographic integrity footprint." },
      { name: "size_bytes", type: "BIGINT", description: "Original storage scale." },
      { name: "minio_url", type: "VARCHAR(512)", description: "Direct storage link inside raw/ bucket." },
      { name: "state", type: "VARCHAR(32)", description: "Status code (UPLOADED, PREPROCESSED, etc.)." }
    ]
  },
  {
    name: "Documents",
    description: "Canonical extracted and structuralized legal document metadata.",
    columns: [
      { name: "id", type: "UUID", key: "PK", description: "Unique document record identifier." },
      { name: "evidence_version_id", type: "UUID", key: "FK", description: "Provenance tracking parent link." },
      { name: "law_class", type: "VARCHAR(32)", description: "Classification tag (e.g. Criminal, Civil, Writ)." },
      { name: "jurisdiction", type: "VARCHAR(64)", description: "Jurisdiction scope (e.g. High Court Division)." },
      { name: "subject", type: "TEXT", description: "Identified core subject parameters." },
      { name: "summary_text", type: "TEXT", description: "Automated synthesis summary." }
    ]
  },
  {
    name: "Pages",
    description: "Granular page breakdowns preserving structural spatial elements for OCR coordinates mapping.",
    columns: [
      { name: "id", type: "UUID", key: "PK", description: "Unique spatial item link." },
      { name: "document_id", type: "UUID", key: "FK", description: "Main parent Document." },
      { name: "page_number", type: "INTEGER", description: "Numerical page indicator (1-indexed)." },
      { name: "quality_score", type: "INTEGER", description: "Page contrast and clarity assessment." },
      { name: "ocr_raw_text", type: "TEXT", description: "Dual-language OCR output stream." },
      { name: "layout_json", type: "JSONB", description: "LayoutLMv3 structural layout coordinates map." }
    ]
  },
  {
    name: "Metadata",
    description: "Extracted legal actors, named entities, key indices, and temporal status markers.",
    columns: [
      { name: "id", type: "UUID", key: "PK", description: "Unique entry link." },
      { name: "document_id", type: "UUID", key: "FK", description: "Parent document reference." },
      { name: "entity_type", type: "VARCHAR(32)", description: "Type (Judge, Advocate, Act, Section, Date)." },
      { name: "entity_value", type: "VARCHAR(256)", description: "Extracted literal value." },
      { name: "confidence", type: "DECIMAL(5,2)", description: "Deep learning extraction score." }
    ]
  },
  {
    name: "AuditLogs",
    description: "Absolute, write-once security registry logs tracking platform operations.",
    columns: [
      { name: "id", type: "BIGSERIAL", key: "PK", description: "Sequential increment block." },
      { name: "user_id", type: "UUID", key: "FK", description: "Acting user session reference." },
      { name: "action", type: "VARCHAR(64)", description: "Operation title (VIEW, ANALYZE, DRAFT, EXPORT)." },
      { name: "target_id", type: "UUID", description: "Object of the action." },
      { name: "ip_address", type: "INET", description: "Request connection signature." },
      { name: "timestamp", type: "TIMESTAMP WITH TIME ZONE", description: "Transaction timestamp." }
    ]
  }
];

const NEO4J_SCHEMAS = {
  nodes: [
    { label: "Court", props: ["id", "name", "division", "jurisdiction"], description: "Bangladesh judicial hierarchy nodes." },
    { label: "Judge", props: ["id", "name", "appointment_date", "status"], description: "Bench members deciding precedent cases." },
    { label: "Case", props: ["id", "title", "citation", "date", "verdict"], description: "Specific legal litigation judgments." },
    { label: "Citation", props: ["id", "volume", "reporter", "page", "year"], description: "Unique precedents (DLR, BLD, MLR) identifier nodes." },
    { label: "Act", props: ["id", "title", "enacted_year", "code_reference"], description: "Bangladesh Codified Parliamentary Statutes." },
    { label: "Section", props: ["id", "number", "text", "penalty_range"], description: "Specific statutory provisions." },
    { label: "Party", props: ["id", "name", "type_role"], description: "Appellants, Respondents, and Litigants." },
    { label: "Lawyer", props: ["id", "name", "bar_id"], description: "Advocates presenting cases before courts." }
  ],
  relationships: [
    { source: "Case", type: "DECIDED_BY", target: "Judge", description: "Links judgment case nodes to the panel bench members." },
    { source: "Case", type: "HEARD_IN", target: "Court", description: "Determines court hierarchy origin." },
    { source: "Case", type: "CITES_PRECEDENT", target: "Case", description: "Establishes multi-link precedent dependencies." },
    { source: "Case", type: "TRIGGERS_SECTION", target: "Section", description: "Connects trial facts to direct legal provisions." },
    { source: "Section", type: "PART_OF_ACT", target: "Act", description: "Tethers sections back to their parent act hierarchy." },
    { source: "Lawyer", type: "REPRESENTS", target: "Party", description: "Defines counsel representations." }
  ]
};

const MINIO_BUCKETS = [
  { name: "raw/", desc: "Sealed original uploads with SHA256 integrity metadata.", files: ["2026/05/state_v_opu_52_dlr.pdf", "2026/06/gazette_joint_bill_18.pdf"] },
  { name: "processed/", desc: "Normalised, deskewed, dewarped page TIFF images.", files: ["hyt-9105/p1_clean.png", "hyt-9105/p2_clean.png", "hyt-712/p1_clean.png"] },
  { name: "ocr/", desc: "Dual-language raw text extracts and segment confidence vectors.", files: ["hyt-9105/page1_ocr.json", "hyt-9105/page2_ocr.json"] },
  { name: "layout/", desc: "Bounding box annotations and segmented paragraph zones.", files: ["hyt-9105/layout_v3_structure.json"] },
  { name: "embeddings/", desc: "1024-dimensional statutory vector arrays.", files: ["statutes/penal_code_1860_embeddings.bin"] },
  { name: "exports/", desc: "Assembled legal petition outlines and procedural briefs.", files: ["draft_brief_bail_hyt-1102.docx"] },
  { name: "audit/", desc: "Write-once read-many platform validation ledger indices.", files: ["ledgers/integrity_hash_list_2026_07.ledger"] },
  { name: "temporary/", desc: "Transient memory queues used during OCR pipeline stages.", files: ["tmp_ocr_queue_90412.tmp"] }
];

const PRESET_CYPHER_QUERIES = [
  {
    title: "Find Precedents Citing State v. Opu",
    query: "MATCH (c1:Case {title: 'State v. Opu'})<-[:CITES_PRECEDENT]-(c2:Case)\nRETURN c2.title, c2.citation, c2.date\nLIMIT 5",
    result: [
      { "c2.title": "Kamruzzaman v. State", "c2.citation": "55 DLR (AD) 203", "c2.date": "2003-11-12" },
      { "c2.title": "Rasheda Begum v. State", "c2.citation": "10 BLC (HCD) 92", "c2.date": "2005-04-18" }
    ]
  },
  {
    title: "Get Penalty Structure of Dowry Prohibition Act",
    query: "MATCH (a:Act {title: 'Dowry Prohibition Act 2018'})-[:HAS_SECTION]->(s:Section)\nWHERE s.number IN ['Section 3', 'Section 4']\nRETURN s.number, s.text, s.penalty_range",
    result: [
      { "s.number": "Section 3", "s.text": "Demanding dowry penalty", "s.penalty_range": "Up to 5 years imprisonment or BDT 50,000 fine" },
      { "s.number": "Section 4", "s.text": "Giving or taking dowry penalty", "s.penalty_range": "Up to 5 years imprisonment or BDT 50,000 fine" }
    ]
  },
  {
    title: "Trace Judge Precedent Influence Matrix",
    query: "MATCH (j:Judge {name: 'Latifur Rahman CJ'})<-[:DECIDED_BY]-(c:Case)-[:CITES_PRECEDENT]->(p:Case)\nRETURN p.title, count(c) as CitationCount\nORDER BY CitationCount DESC",
    result: [
      { "p.title": "Masdar Hossain v. Bangladesh", "CitationCount": 12 },
      { "p.title": "BLAST v. Bangladesh", "CitationCount": 8 }
    ]
  }
];

export function StorageSchemas() {
  const [activeDbType, setActiveDbType] = useState<'postgres' | 'neo4j' | 'minio'>('postgres');
  const [selectedPgTable, setSelectedPgTable] = useState<SchemaTable>(POSTGRES_SCHEMAS[0]);
  const [activeCypherPreset, setActiveCypherPreset] = useState<number>(0);
  const [selectedMinioBucket, setSelectedMinioBucket] = useState<number>(0);

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* DB Selection Tabs */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <h4 className="text-base font-sans font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" /> HAYAT Core Knowledge Storage Engines
          </h4>
          <p className="text-xs text-slate-400">
            Audit relational tables, graph structures, and object namespaces holding Bangladesh legal data.
          </p>
        </div>

        {/* Database Engine Toggles */}
        <div className="flex gap-1.5 bg-slate-900/60 p-1 rounded-xl border border-white/10 shrink-0">
          <button
            onClick={() => setActiveDbType('postgres')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeDbType === 'postgres' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" /> PostgreSQL
          </button>
          <button
            onClick={() => setActiveDbType('neo4j')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeDbType === 'neo4j' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Network className="w-3.5 h-3.5" /> Neo4j Graph
          </button>
          <button
            onClick={() => setActiveDbType('minio')}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeDbType === 'minio' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Folder className="w-3.5 h-3.5" /> MinIO Buckets
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE DATABASE ENGINE SCREEN */}
      {activeDbType === 'postgres' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* PostgreSQL Left sidebar list */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
              PostgreSQL Relation Schemas:
            </span>
            <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
              {POSTGRES_SCHEMAS.map(table => (
                <button
                  key={table.name}
                  onClick={() => setSelectedPgTable(table)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedPgTable.name === table.name
                      ? 'bg-white/10 border-emerald-400 text-white shadow-md'
                      : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-slate-200">
                      tbl_{table.name.toLowerCase()}
                    </span>
                    <span className="bg-emerald-500/15 text-emerald-400 text-[8px] font-mono px-1 rounded border border-emerald-500/20">
                      postgres
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-2">
                    {table.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Table Column Inspector Panel */}
          <div className="md:col-span-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 shadow-lg flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h5 className="font-mono text-sm font-bold text-white flex items-center gap-1.5">
                    Table Inspector: <span className="text-emerald-400 font-extrabold">tbl_{selectedPgTable.name.toLowerCase()}</span>
                  </h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {selectedPgTable.description}
                  </p>
                </div>
                <span className="bg-white/5 text-slate-400 text-[9px] font-mono border border-white/5 px-2 py-0.5 rounded">
                  ENGINE: PostgreSQL 16
                </span>
              </div>

              {/* Grid of columns */}
              <div className="border border-white/5 rounded-xl overflow-hidden bg-slate-950/20">
                <div className="grid grid-cols-12 bg-white/5 p-2 text-[9px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                  <div className="col-span-1 text-center">Key</div>
                  <div className="col-span-3">Column</div>
                  <div className="col-span-3">Data Type</div>
                  <div className="col-span-5">Schema Description</div>
                </div>

                <div className="divide-y divide-white/5">
                  {selectedPgTable.columns.map(col => (
                    <div key={col.name} className="grid grid-cols-12 p-2.5 items-center text-xs font-sans">
                      <div className="col-span-1 text-center font-mono">
                        {col.key === 'PK' && <span className="text-yellow-400 font-extrabold text-[10px]" title="Primary Key">PK</span>}
                        {col.key === 'FK' && <span className="text-blue-400 font-extrabold text-[10px]" title="Foreign Key">FK</span>}
                        {!col.key && <span className="text-slate-600">-</span>}
                      </div>
                      <div className="col-span-3 font-mono font-bold text-slate-200">{col.name}</div>
                      <div className="col-span-3 font-mono text-slate-400 text-[11px]">{col.type}</div>
                      <div className="col-span-5 text-slate-300 text-[11px] font-sans leading-normal">{col.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 mt-4 flex items-center justify-between text-[10px] text-slate-400 font-mono bg-white/2 p-2 rounded">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Strict Referential Integrity (FK cascades enforced)</span>
              <span>INDEXES: GIN (layout_json), B-TREE (uuid, evidence_id)</span>
            </div>
          </div>
        </div>
      )}

      {activeDbType === 'neo4j' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Neo4j Node & Edge Map overview */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
              Neo4j Graph Database Schema Parameters:
            </span>

            <div className="grid grid-cols-2 gap-3">
              {/* Nodes definitions */}
              <div className="border border-white/5 bg-slate-950/40 p-4 rounded-xl space-y-2.5 max-h-[380px] overflow-y-auto custom-scrollbar">
                <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-wide block border-b border-white/5 pb-1">
                  Node Entities (Labels)
                </span>
                {NEO4J_SCHEMAS.nodes.map(n => (
                  <div key={n.label} className="text-xs">
                    <span className="font-mono font-bold text-white bg-white/10 px-1.5 py-0.5 rounded border border-white/10 inline-block">
                      :{n.label}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">{n.description}</p>
                    <span className="text-[8px] font-mono text-slate-500 block mt-0.5">Props: {n.props.join(', ')}</span>
                  </div>
                ))}
              </div>

              {/* Relationships definitions */}
              <div className="border border-white/5 bg-slate-950/40 p-4 rounded-xl space-y-2.5 max-h-[380px] overflow-y-auto custom-scrollbar">
                <span className="text-[9px] font-mono font-bold text-blue-400 uppercase tracking-wide block border-b border-white/5 pb-1">
                  Relationship Directives
                </span>
                {NEO4J_SCHEMAS.relationships.map((r, idx) => (
                  <div key={idx} className="text-[11px] leading-snug">
                    <div className="flex flex-wrap items-center gap-1 font-mono text-[9px] font-bold">
                      <span className="text-slate-300">({r.source})</span>
                      <span className="text-emerald-400">-[{r.type}]&rarr;</span>
                      <span className="text-slate-300">({r.target})</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">{r.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Cypher Console Simulator */}
          <div className="lg:col-span-6 bg-slate-950 border border-white/10 rounded-2xl p-4 flex flex-col h-[420px] justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-[10px] font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" /> Interactive Cypher Query Playground
                </span>
                <span className="bg-white/5 text-slate-400 text-[8px] font-mono border border-white/5 px-1.5 py-0.5 rounded">
                  PORT: 7687 (BOLT)
                </span>
              </div>

              <div className="space-y-1.5 text-left">
                <span className="text-[9px] font-mono text-slate-400 block font-bold uppercase">
                  Choose a Predefined Cypher Query Template:
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {PRESET_CYPHER_QUERIES.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveCypherPreset(idx)}
                      className={`text-left p-2 rounded-lg border text-xs font-sans font-medium transition-all cursor-pointer ${
                        activeCypherPreset === idx
                          ? 'bg-blue-500/10 border-blue-400 text-blue-300'
                          : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {preset.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Displaying raw code box */}
              <div>
                <span className="text-[9px] font-mono text-slate-400 block font-bold uppercase mb-1">
                  Active Cypher Command:
                </span>
                <pre className="bg-slate-900 p-2.5 rounded-lg border border-white/5 font-mono text-[10px] text-emerald-400 text-left overflow-x-auto select-all leading-tight">
                  {PRESET_CYPHER_QUERIES[activeCypherPreset].query}
                </pre>
              </div>
            </div>

            {/* Simulated execution response */}
            <div className="flex-1 mt-3 overflow-hidden flex flex-col">
              <span className="text-[9px] font-mono text-slate-400 block font-bold uppercase mb-1">
                Transactional JSON Result Node Array:
              </span>
              <pre className="flex-1 bg-slate-900/40 p-2 rounded-lg border border-white/5 font-mono text-[9px] text-blue-300 text-left overflow-y-auto custom-scrollbar select-text leading-relaxed">
                {JSON.stringify(PRESET_CYPHER_QUERIES[activeCypherPreset].result, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {activeDbType === 'minio' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* MinIO Bucket Lists */}
          <div className="md:col-span-5 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">
              MinIO S3 Buckets (Namespaces):
            </span>
            <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
              {MINIO_BUCKETS.map((bucket, idx) => (
                <button
                  key={bucket.name}
                  onClick={() => setSelectedMinioBucket(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedMinioBucket === idx
                      ? 'bg-white/10 border-emerald-400 text-white shadow-md'
                      : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-slate-200">
                      s3://{bucket.name}
                    </span>
                    <span className="text-[8px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1 rounded">
                      minio-s3
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 font-sans">
                    {bucket.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Bucket File Viewer Panel */}
          <div className="md:col-span-7 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 shadow-lg flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h5 className="font-mono text-sm font-bold text-white">
                    Bucket Explorer: <span className="text-emerald-400 font-extrabold">s3://{MINIO_BUCKETS[selectedMinioBucket].name}</span>
                  </h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {MINIO_BUCKETS[selectedMinioBucket].desc}
                  </p>
                </div>
                <span className="bg-white/5 text-slate-400 text-[9px] font-mono border border-white/5 px-2 py-0.5 rounded">
                  OBJECT STORE
                </span>
              </div>

              {/* Bucket File Lists */}
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">
                  Simulated Object Key Entries:
                </span>
                <div className="border border-white/5 rounded-xl bg-slate-950/50 p-3 divide-y divide-white/5 font-mono text-[11px] max-h-[250px] overflow-y-auto custom-scrollbar">
                  {MINIO_BUCKETS[selectedMinioBucket].files.map((file, fIdx) => (
                    <div key={fIdx} className="flex items-center justify-between py-2 text-slate-200 hover:text-emerald-400 transition-colors">
                      <div className="flex items-center gap-2 truncate">
                        <Folder className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{file}</span>
                      </div>
                      <span className="text-[9px] text-slate-500 font-bold bg-white/5 px-1.5 py-0.2 rounded shrink-0">
                        Object
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 mt-4 text-[10px] text-slate-400 font-mono bg-white/2 p-2 rounded text-center">
              Storage Replica Strategy: Clustered Distributed Erasure Coding • MinIO Active Client Port: 9000
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
