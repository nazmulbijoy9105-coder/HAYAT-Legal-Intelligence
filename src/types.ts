/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// --- Knowledge Graph Types ---
export interface GraphNode {
  id: string;
  label: string;
  type: 'court' | 'judge' | 'case' | 'citation' | 'act' | 'section';
  details?: Record<string, any>;
  x?: number;
  y?: number;
}

export interface GraphLink {
  source: string;
  target: string;
  label: string;
}

// --- Legal Search & Citations ---
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

export interface CitationResolution {
  citation: string;
  resolved: boolean;
  caseTitle?: string;
  court?: string;
  date?: string;
  judges?: string[];
  actsApplied?: string[];
  sectionsApplied?: string[];
  linkId?: string;
  error?: string;
  summary?: string;
}

// --- Deterministic Reasoning (ILRMF) Engine ---
export interface ILRMFStep {
  name: string;
  key: 'fact' | 'issue' | 'rule' | 'temporal' | 'exception' | 'application' | 'conclusion' | 'citation' | 'confidence';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  title: string;
  description: string;
  output?: string;
  evidence?: {
    text: string;
    source: string;
    page?: number;
    bbox?: [number, number, number, number]; // [x, y, w, h] in percentages
  }[];
}

export interface ILRMFAnalysis {
  factsSummary: string;
  issues: string[];
  applicableRules: {
    act: string;
    section: string;
    text: string;
    temporalStatus: string; // "Valid", "Amended", "Repealed"
  }[];
  temporalAnalysis: string;
  exceptionAnalysis: string;
  applicationText: string;
  conclusionText: string;
  citationsVerified: {
    citation: string;
    caseName: string;
    relevance: string;
    verified: boolean;
  }[];
  confidenceScore: number; // 0 to 100
  auditExplanation: string;
}

// --- Document Ingestion Pipeline ---
export interface OCRBoundingBox {
  id: string;
  text: string;
  confidence: number;
  type: 'header' | 'footer' | 'paragraph' | 'table' | 'footnote' | 'heading' | 'commentary';
  bbox: [number, number, number, number]; // [x, y, w, h] as percentages
  readingOrder: number;
}

export interface IngestionMetrics {
  fileSize: string;
  mimeType: string;
  magicNumber: string;
  virusScan: 'Clean' | 'Infected';
  sha256: string;
  uuid: string;
  qualityScore: number;
  blurLevel: number;
  brightness: number;
  dpi: number;
  deskewAngle: number;
  ocrConfidence: number;
  readingOrderChecked: boolean;
  copyrightFlags: string[];
}
