/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// --- Decomposed Case Model (Westlaw / SCC Online / DLR equivalent) ---
export interface DecomposedCase {
  id: string;
  title: string;
  court: string;
  country: string;
  bench: string[];
  decisionDate: string;
  caseType: string;
  status: string;
  citation: string;
  parties: string;
  subject: string;
  proceduralHistory: {
    id: string;
    stage: string;
    outcome: string;
    arrow?: boolean;
  }[];
  facts: {
    id: string;
    text: string;
  }[];
  issues: {
    id: string;
    text: string;
    answer: 'Yes' | 'No' | 'Partially' | 'N/A';
    elaborated: string;
  }[];
  statutes: {
    id: string;
    actName: string;
    section: string;
    role: string;
    temporalStatus: 'Valid' | 'Amended' | 'Repealed';
  }[];
  principles: {
    id: string;
    text: string;
  }[];
  ratioDecidendi: {
    id: string;
    text: string;
  }[];
  directions: {
    id: string;
    step: string;
    entity: string;
    action: string;
    timeline?: string;
  }[];
  paragraphs: {
    id: string;
    index: number;
    category: 'Metadata' | 'Facts' | 'Video recording' | 'Law' | 'Reasoning' | 'Directions' | 'Citations';
    text: string;
  }[];
  knowledgeGraph: {
    nodes: { id: string; label: string; type: 'case' | 'statute' | 'section' | 'principle' | 'judge' | 'party' | 'paragraph' }[];
    links: { source: string; target: string; label: string }[];
  };
  originalPdfUrl?: string;
  aiSummary: {
    facts: string;
    issue: string;
    held: string;
    keyPrinciple: string;
  };
}

// Keep older compatibility interfaces to prevent any compilation breakages in other files if they imports them
export interface GraphNode {
  id: string;
  label: string;
  type: 'court' | 'judge' | 'case' | 'citation' | 'act' | 'section';
}

export interface GraphLink {
  source: string;
  target: string;
  label: string;
}

export interface LegalDocument {
  id: string;
  title: string;
  citation: string;
  court: string;
  date: string;
  judges: string[];
  parties: string;
  subject: string;
  summary: string;
  text: string;
  relevanceScore?: number;
  keywordScore?: number;
  vectorScore?: number;
}

