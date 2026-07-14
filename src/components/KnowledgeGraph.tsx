/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Network, Search, Filter, Plus, Info, CheckCircle, Database, GitCommit, GitPullRequest, GitFork } from 'lucide-react';
import { GraphNode, GraphLink } from '../types';

// Preset high-fidelity nodes representing the Bangladesh Legal Taxonomy
const INITIAL_NODES: GraphNode[] = [
  // Courts
  { id: 'sc-ad', label: 'Appellate Division (SC)', type: 'court', details: { jurisdiction: 'Apex Appellate Body', established: '1972', location: 'Dhaka' }, x: 400, y: 70 },
  { id: 'sc-hcd', label: 'High Court Division (SC)', type: 'court', details: { jurisdiction: 'Constitutional Writ & Appeals', established: '1972', location: 'Dhaka' }, x: 400, y: 150 },
  { id: 'dc', label: 'District Session Courts', type: 'court', details: { jurisdiction: 'Original Criminal & Civil Trials', location: '64 Districts' }, x: 150, y: 150 },

  // Judges
  { id: 'j-lk', label: 'Latifur Rahman CJ', type: 'judge', details: { period: '2000-2001', notable: 'Wrote State v. Opu judgment on domestic violence standards.' }, x: 620, y: 70 },
  { id: 'j-mk', label: 'Mustafa Kamal CJ', type: 'judge', details: { period: '1999', notable: 'Author of landmark Masdar Hossain judgment on judicial separation.' }, x: 620, y: 140 },
  { id: 'j-hh', label: 'Hamidul Haque J', type: 'judge', details: { period: '2000s', notable: 'Pioneered police guidelines for arbitrary arrests under Section 54.' }, x: 620, y: 210 },

  // Acts
  { id: 'act-const', label: 'Constitution of Bangladesh', type: 'act', details: { year: '1972', supreme: 'Supreme Law of the Republic' }, x: 400, y: 280 },
  { id: 'act-penal', label: 'The Penal Code, 1860', type: 'act', details: { year: '1860', category: 'Substantive Criminal Law' }, x: 180, y: 280 },
  { id: 'act-crpc', label: 'Code of Criminal Procedure', type: 'act', details: { year: '1898', category: 'Procedural Criminal Law' }, x: 180, y: 360 },
  { id: 'act-dowry', label: 'Dowry Prohibition Act, 2018', type: 'act', details: { year: '2018', category: 'Special Criminal Legislation' }, x: 620, y: 280 },

  // Sections
  { id: 'sec-art32', label: 'Article 32: Life/Liberty', type: 'section', details: { scope: 'Fundamental Right against illegal detention' }, x: 500, y: 350 },
  { id: 'sec-art27', label: 'Article 27: Equality', type: 'section', details: { scope: 'Equality before law' }, x: 320, y: 350 },
  { id: 'sec-p302', label: 'Section 302: Murder', type: 'section', details: { penalty: 'Death or Imprisonment for life' }, x: 80, y: 280 },
  { id: 'sec-cr54', label: 'Section 54: Arrest power', type: 'section', details: { scope: 'Police arrest without warrant on suspicion' }, x: 80, y: 360 },
  { id: 'sec-dw3', label: 'Section 3: Dowry demand', type: 'section', details: { penalty: 'Up to 5 years imprisonment' }, x: 620, y: 360 },

  // Precedents
  { id: 'prec-masdar', label: 'Masdar Hossain case (Separation)', type: 'case', details: { citation: '52 DLR (AD) 82', date: '1999', keyHolding: 'Separation of Magistrate Judiciary from executive branch.' }, x: 500, y: 210 },
  { id: 'prec-blast', label: 'BLAST v. State (Section 54)', type: 'case', details: { citation: '55 DLR (HCD) 363', date: '2003', keyHolding: '15 mandatory guidelines regulating arrests without warrant.' }, x: 280, y: 210 },
  { id: 'prec-opu', label: 'State v. Opu (Dowry Proof)', type: 'case', details: { citation: '52 DLR (AD) 112', date: '2000', keyHolding: 'Credible uncorroborated victim wife testimony is sufficient.' }, x: 500, y: 130 }
];

const INITIAL_LINKS: GraphLink[] = [
  // Court Hierarchies
  { source: 'sc-ad', target: 'sc-hcd', label: 'HEARS_APPEALS_FROM' },
  { source: 'sc-hcd', target: 'dc', label: 'SUPERVISES' },

  // Case/Judgments mapped to courts
  { source: 'prec-masdar', target: 'sc-ad', label: 'DECIDED_BY_COURT' },
  { source: 'prec-blast', target: 'sc-hcd', label: 'DECIDED_BY_COURT' },
  { source: 'prec-opu', target: 'sc-ad', label: 'DECIDED_BY_COURT' },

  // Cases mapped to Judges
  { source: 'prec-opu', target: 'j-lk', label: 'DELIVERED_BY' },
  { source: 'prec-masdar', target: 'j-mk', label: 'DELIVERED_BY' },
  { source: 'prec-blast', target: 'j-hh', label: 'DELIVERED_BY' },

  // Cases mapped to Acts/Sections applied
  { source: 'prec-masdar', target: 'act-const', label: 'INTERPRETED' },
  { source: 'prec-blast', target: 'sec-cr54', label: 'REGULATED' },
  { source: 'prec-opu', target: 'sec-dw3', label: 'APPLIED_RULE' },

  // Sections mapped to parent Acts
  { source: 'sec-art32', target: 'act-const', label: 'MEMBER_SECTION' },
  { source: 'sec-art27', target: 'act-const', label: 'MEMBER_SECTION' },
  { source: 'sec-p302', target: 'act-penal', label: 'MEMBER_SECTION' },
  { source: 'sec-cr54', target: 'act-crpc', label: 'MEMBER_SECTION' },
  { source: 'sec-dw3', target: 'act-dowry', label: 'MEMBER_SECTION' },

  // Inter-Act connections
  { source: 'act-crpc', target: 'act-penal', label: 'ENFORCES_SUBSTANTIVE' },
  { source: 'act-dowry', target: 'act-crpc', label: 'PROCEDURE_VIA' }
];

export function KnowledgeGraph() {
  const [nodes, setNodes] = useState<GraphNode[]>(INITIAL_NODES);
  const [links, setLinks] = useState<GraphLink[]>(INITIAL_LINKS);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(INITIAL_NODES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Node Insertion State
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [newNodeType, setNewNodeType] = useState<GraphNode['type']>('act');
  const [newNodeDesc, setNewNodeDesc] = useState('');
  const [linkSourceId, setLinkSourceId] = useState('');
  const [linkTargetId, setLinkTargetId] = useState('');
  const [linkLabel, setLinkLabel] = useState('ASSOCIATED_WITH');

  // Filter & Search computation
  const filteredNodes = useMemo(() => {
    return nodes.filter(node => {
      const matchesSearch = node.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            node.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = typeFilter === 'all' || node.type === typeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [nodes, searchQuery, typeFilter]);

  // Compute active links where both source and target exist in currently visible nodes
  const visibleLinks = useMemo(() => {
    const visibleIds = new Set(filteredNodes.map(n => n.id));
    return links.filter(link => visibleIds.has(link.source) && visibleIds.has(link.target));
  }, [links, filteredNodes]);

  // Handle adding custom node
  const handleAddNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeLabel.trim()) return;

    const newId = 'custom-' + Math.random().toString(36).substr(2, 5);
    // position randomly in the center area
    const newX = 300 + Math.random() * 200;
    const newY = 150 + Math.random() * 150;

    const node: GraphNode = {
      id: newId,
      label: newNodeLabel,
      type: newNodeType,
      details: {
        description: newNodeDesc || 'Custom user generated entity node.',
        created: new Date().toLocaleDateString()
      },
      x: Math.round(newX),
      y: Math.round(newY)
    };

    setNodes(prev => [...prev, node]);
    setSelectedNode(node);
    setNewNodeLabel('');
    setNewNodeDesc('');
  };

  // Handle adding relationship
  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkSourceId || !linkTargetId || linkSourceId === linkTargetId) return;

    // Check duplicate
    const exists = links.some(l => l.source === linkSourceId && l.target === linkTargetId);
    if (exists) return;

    const newLink: GraphLink = {
      source: linkSourceId,
      target: linkTargetId,
      label: linkLabel.trim().toUpperCase()
    };

    setLinks(prev => [...prev, newLink]);
    setLinkSourceId('');
    setLinkTargetId('');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-fadeIn" id="knowledge-graph-section">
      {/* Graph Visualizer Canvas (Left/Top) */}
      <div className="xl:col-span-8 flex flex-col space-y-4">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="text-left">
            <h3 className="text-lg font-sans font-semibold text-white flex items-center gap-2">
              <Network className="w-5 h-5 text-white" /> Bangladesh Legal Knowledge Graph
            </h3>
            <p className="text-xs text-slate-400">
              Visualizing statutory dependencies, court hierarchies, and precedent cross-linking.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Node Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search legal taxonomy..."
                className="pl-8 pr-3 py-1.5 rounded-lg border border-white/10 bg-slate-950/40 text-xs text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-emerald-500/50 w-44"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg border border-white/10 text-[11px] text-slate-300">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-transparent border-none focus:outline-hidden text-slate-300 font-sans cursor-pointer"
              >
                <option value="all" className="bg-slate-950 text-slate-200">All Layers</option>
                <option value="court" className="bg-slate-950 text-slate-200">Courts</option>
                <option value="judge" className="bg-slate-950 text-slate-200">Judges</option>
                <option value="act" className="bg-slate-950 text-slate-200">Acts</option>
                <option value="section" className="bg-slate-950 text-slate-200">Sections</option>
                <option value="case" className="bg-slate-950 text-slate-200">Cases / Citations</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic Vector/SVG Canvas */}
        <div className="bg-slate-950/40 backdrop-blur-md rounded-xl border border-white/10 relative h-[420px] overflow-hidden shadow-lg">
          {/* Legend */}
          <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md p-2.5 rounded-lg border border-white/10 text-[9px] font-mono space-y-1 z-10 shadow-lg text-left text-slate-300">
            <span className="text-[8px] font-bold text-slate-500 block uppercase mb-1">Entity Map</span>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 block" /> Court</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 block" /> Judge</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 block" /> Act (Statute)</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500 block" /> Section</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block" /> Case Citation</div>
          </div>

          <svg className="w-full h-full cursor-crosshair select-none" viewBox="0 0 800 420">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="15" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" className="fill-white/10" />
              </marker>
            </defs>

            {/* Link Paths */}
            {visibleLinks.map((link, idx) => {
              const sourceNode = nodes.find(n => n.id === link.source);
              const targetNode = nodes.find(n => n.id === link.target);

              if (!sourceNode || !targetNode) return null;

              const sX = sourceNode.x ?? 400;
              const sY = sourceNode.y ?? 210;
              const tX = targetNode.x ?? 400;
              const tY = targetNode.y ?? 210;

              // Draw beautiful curved lines or direct arrows
              const midX = (sX + tX) / 2;
              const midY = (sY + tY) / 2;

              return (
                <g key={`l-${idx}`} className="opacity-60">
                  <line
                    x1={sX}
                    y1={sY}
                    x2={tX}
                    y2={tY}
                    strokeWidth="1.5"
                    className="stroke-white/15"
                    markerEnd="url(#arrow)"
                  />
                  {/* Small relationship label on hover */}
                  <text
                    x={midX}
                    y={midY - 4}
                    textAnchor="middle"
                    className="fill-slate-400 font-mono text-[8px] pointer-events-none select-none bg-slate-950/80 px-1 py-0.5 rounded"
                  >
                    {link.label}
                  </text>
                </g>
              );
            })}

            {/* Node Circles */}
            {filteredNodes.map(node => {
              const isSelected = selectedNode?.id === node.id;
              const nX = node.x ?? 400;
              const nY = node.y ?? 210;

              // Color mappings
              let color = "fill-blue-500 stroke-blue-300";
              if (node.type === 'judge') color = "fill-purple-500 stroke-purple-300";
              if (node.type === 'act') color = "fill-amber-500 stroke-amber-300";
              if (node.type === 'section') color = "fill-indigo-500 stroke-indigo-300";
              if (node.type === 'case') color = "fill-emerald-500 stroke-emerald-300";

              return (
                <g
                  key={node.id}
                  className="cursor-pointer group"
                  onClick={() => setSelectedNode(node)}
                >
                  <circle
                    cx={nX}
                    cy={nY}
                    r={isSelected ? 10 : 7}
                    className={`${color} transition-all duration-200 stroke-2 hover:r-11`}
                  />
                  <text
                    x={nX}
                    y={nY - 12}
                    textAnchor="middle"
                    className={`font-sans text-[10px] pointer-events-none transition-all duration-200 ${isSelected ? 'fill-white font-bold' : 'fill-slate-400 group-hover:fill-white'}`}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Node Inspector & Sandbox (Right/Bottom) */}
      <div className="xl:col-span-4 space-y-6">
        {/* Node Detail Card */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg text-left">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-400" /> Taxonomy Node Inspector
          </h4>

          {selectedNode ? (
            <div className="space-y-4">
              <div>
                <span className={`inline-block font-mono text-[9px] font-bold px-2 py-0.5 rounded border mb-2 uppercase ${
                  selectedNode.type === 'act' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' :
                  selectedNode.type === 'case' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                  selectedNode.type === 'section' ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' :
                  selectedNode.type === 'judge' ? 'text-purple-400 bg-purple-500/10 border-purple-500/20' :
                  'text-blue-400 bg-blue-500/10 border-blue-500/20'
                }`}>
                  {selectedNode.type}
                </span>
                <h5 className="font-sans font-bold text-white text-sm leading-snug">
                  {selectedNode.label}
                </h5>
              </div>

              {/* Dynamic properties representation */}
              <div className="text-xs space-y-2 border-t border-white/10 pt-3">
                {Object.entries(selectedNode.details || {}).map(([key, val]) => (
                  <div key={key}>
                    <span className="text-slate-500 font-mono text-[9px] uppercase block tracking-wide">{key}:</span>
                    <span className="font-sans font-medium text-slate-300 block leading-relaxed mt-0.5">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 py-12 text-center">
              Click any node on the graph mapping to view taxonomy definitions.
            </p>
          )}
        </div>

        {/* Sandbox Addition (Tier 2 Simulation) */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg text-left">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5 text-indigo-400" /> Graph Taxonomy Sandbox
          </h4>

          {/* Form to Add Node */}
          <form onSubmit={handleAddNode} className="space-y-3 mb-5 pb-5 border-b border-white/10">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Add New Taxonomy Node:
            </span>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={newNodeLabel}
                onChange={(e) => setNewNodeLabel(e.target.value)}
                placeholder="Node Name/Label"
                className="col-span-2 px-2.5 py-1.5 rounded-lg border border-white/10 bg-slate-950/40 text-xs text-slate-200 focus:outline-hidden"
              />
              <select
                value={newNodeType}
                onChange={(e: any) => setNewNodeType(e.target.value)}
                className="px-2 py-1.5 rounded-lg border border-white/10 bg-slate-950/40 text-xs text-slate-300 focus:outline-hidden cursor-pointer"
              >
                <option value="act" className="bg-slate-950 text-slate-200">Act / Code</option>
                <option value="section" className="bg-slate-950 text-slate-200">Section</option>
                <option value="case" className="bg-slate-950 text-slate-200">Case Citation</option>
                <option value="judge" className="bg-slate-950 text-slate-200">Judge</option>
                <option value="court" className="bg-slate-950 text-slate-200">Court</option>
              </select>

              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-sans font-bold text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Commit Node
              </button>
            </div>
          </form>

          {/* Form to Add Relationship */}
          <form onSubmit={handleAddLink} className="space-y-3">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Link Existing Entities:
            </span>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[9px] text-slate-400 font-mono block mb-1">Source Node:</label>
                  <select
                    value={linkSourceId}
                    required
                    onChange={(e) => setLinkSourceId(e.target.value)}
                    className="w-full p-1.5 rounded-lg border border-white/10 bg-slate-950/40 focus:outline-hidden text-slate-300 text-xs truncate cursor-pointer"
                  >
                    <option value="" className="bg-slate-950 text-slate-400">-- Choose --</option>
                    {nodes.map(n => (
                      <option key={n.id} value={n.id} className="bg-slate-950 text-slate-200">{n.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[9px] text-slate-400 font-mono block mb-1">Target Node:</label>
                  <select
                    value={linkTargetId}
                    required
                    onChange={(e) => setLinkTargetId(e.target.value)}
                    className="w-full p-1.5 rounded-lg border border-white/10 bg-slate-950/40 focus:outline-hidden text-slate-300 text-xs truncate cursor-pointer"
                  >
                    <option value="" className="bg-slate-950 text-slate-400">-- Choose --</option>
                    {nodes.map(n => (
                      <option key={n.id} value={n.id} className="bg-slate-950 text-slate-200">{n.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={linkLabel}
                  onChange={(e) => setLinkLabel(e.target.value)}
                  placeholder="RELATIONSHIP_TYPE"
                  className="flex-1 px-2 py-1.5 rounded-lg border border-white/10 bg-slate-950/40 text-xs font-mono text-slate-200 uppercase focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="bg-white/10 hover:bg-white/15 text-white font-sans font-semibold text-[11px] px-3 rounded-lg transition-colors cursor-pointer"
                >
                  Link
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
