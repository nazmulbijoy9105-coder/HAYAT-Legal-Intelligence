/*
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, Eye, Sliders, Cpu, EyeOff, Layers, AlignLeft, 
  BookOpen, Users, Link2, FileCode, Table, Tag, FolderOpen, 
  Copyright, HardDrive, CheckSquare, ChevronRight, Sparkles, Terminal
} from 'lucide-react';

interface DocIntelLayersProps {
  sampleType: 'gazette' | 'judgment' | 'turag' | 'custom' | null;
  fileName: string;
  metrics: any;
}

export function DocIntelLayers({ sampleType, fileName, metrics }: DocIntelLayersProps) {
  const [activeLayer, setActiveLayer] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  // Fallback defaults for custom uploads
  const displayType = sampleType || 'custom';

  const handleCopyJson = (jsonObj: any) => {
    navigator.clipboard.writeText(JSON.stringify(jsonObj, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 17-layer intelligence definitions & dynamic mock extraction values
  const getLayersData = () => {
    const defaultSha = metrics?.sha256 || "cf3a3d2e1b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e";
    const defaultSize = metrics?.fileSize || "4.5 MB";
    const defaultUuid = metrics?.uuid || "hyt-custom-99";

    switch (displayType) {
      case 'turag':
        return [
          {
            id: 1,
            name: "1. File Validation",
            icon: ShieldCheck,
            status: "PASSED",
            desc: "Validates document container integrity, extensions, mime-types, and checks cryptographically for malware.",
            json: {
              validationStatus: "VALIDATED_SUCCESS",
              magicNumber: "%PDF-1.5",
              mimeType: "application/pdf",
              sha256: defaultSha,
              fileSize: defaultSize,
              uuid: defaultUuid,
              malwareScan: "CLEAN_PASS",
              duplicateCheck: "NO_DUPLICATE_FOUND"
            }
          },
          {
            id: 2,
            name: "2. Image Quality Assessment",
            icon: Eye,
            status: "OPTIMAL",
            desc: "Analyzes readability, DPI resolution, skew angle, contrast, and potential blur levels before OCR execution.",
            json: {
              qualityScore: 97,
              dpi: 300,
              blurLevel: "3/10 (Extremely Sharp)",
              contrastRatio: "94% (High)",
              rotationDetected: "0.2 degrees",
              skewAngle: 0.2,
              blankPagesDetected: [],
              perspectiveDistortion: "None detected"
            }
          },
          {
            id: 3,
            name: "3. Image Enhancement",
            icon: Sliders,
            status: "APPLIED",
            desc: "Processes pixel data to deskew, dewarp, remove shadows, reduce noise, and normalize contrast using adaptive thresholding.",
            json: {
              enhancementsApplied: ["AutoDeskew", "AdaptiveThresholding", "CLAHE_Contrast", "Binarization"],
              deskewCorrection: -0.2,
              dewarpApplied: true,
              shadowRemovalSuccess: "98% luminance corrected",
              noiseReductionFilter: "Non-Local Means (NLM)"
            }
          },
          {
            id: 4,
            name: "4. OCR Engine",
            icon: Cpu,
            status: "COMPLETED",
            desc: "Extracts machine-readable text using mixed-language Bangla/English neural networks.",
            json: {
              ocrEngine: "HAYAT PaddleOCR-v3 Multi-Modal",
              languagesConfigured: ["English", "Bangla"],
              characterConfidence: "99.2%",
              totalCharactersExtracted: 84320,
              rawTextSnippet: "IN THE SUPREME COURT OF BANGLADESH... CIVIL PETITION NO. 3039 OF 2019... All rivers, canals, wetlands across Bangladesh are hereby declared to possess status of a Living Entity..."
            }
          },
          {
            id: 5,
            name: "5. Handwriting (Future)",
            icon: EyeOff,
            status: "SIMULATED",
            desc: "Identifies and transcribes judicial annotations, lawyer notes, and signatures.",
            json: {
              handwritingEngine: "HAYAT-HTR-Transformer (v1.2)",
              marginalNotesDetected: true,
              notesFound: [
                {
                  page: 4,
                  bounding_box: [180, 240, 50, 20],
                  transcript: "Read with public trust doctrine and environment Article 18A",
                  confidenceScore: 0.88,
                  assignedCategory: "Judicial_Thought"
                }
              ]
            }
          },
          {
            id: 6,
            name: "6. Layout Analysis",
            icon: Layers,
            status: "SEGMENTED",
            desc: "Identifies high-level visual regions like headings, footnotes, paragraphs, and tables.",
            json: {
              segmentationModel: "LayoutLMv3-Bangla",
              detectedBlocksCount: {
                headers: 2,
                headings: 3,
                paragraphs: 6,
                rulingBoxes: 1,
                footnotes: 0,
                tables: 1
              },
              readingOrderConfidence: "98.7%"
            }
          },
          {
            id: 7,
            name: "7. Reading Order",
            icon: AlignLeft,
            status: "VERIFIED",
            desc: "Decodes complex multi-column structures to ensure continuous, logical reading stream flows.",
            json: {
              documentLayout: "Single Column Page",
              readingOrderStrategy: "Top-to-Bottom Logical Flow",
              twoColumnInterleavingChecked: true,
              flowSequenceIds: ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9", "t10", "t11"]
            }
          },
          {
            id: 8,
            name: "8. Metadata Extraction",
            icon: BookOpen,
            status: "EXTRACTED",
            desc: "Siphons document-level legal context such as Court, Bench, Case Type, and Decision Date.",
            json: {
              legalMetadata: {
                jurisdiction: "Bangladesh",
                courtName: "Supreme Court of Bangladesh (Appellate Division)",
                benchMembers: [
                  "Mr. Justice Hasan Foez Siddique (Chief Justice)",
                  "Mr. Justice Obaidul Hassan",
                  "Mr. Justice M. Enayetur Rahim"
                ],
                caseNumber: "Civil Petition No. 3039 of 2019",
                caseType: "Civil Petition for Leave to Appeal",
                judgmentDate: "July 01, 2019",
                subjectMatter: "Environmental Public Interest Litigation (PIL)",
                legalDomain: "Constitutional Law & Environmental Jurisprudence"
              }
            }
          },
          {
            id: 9,
            name: "9. Entity Extraction",
            icon: Users,
            status: "EXTRACTED",
            desc: "Automatically classifies named legal entities, organizations, and statutory acts.",
            json: {
              extractedEntities: [
                { text: "Hasan Foez Siddique", category: "JUDGE", confidence: 0.99 },
                { text: "Human Rights and Peace for Bangladesh (HRPB)", category: "PETITIONER", confidence: 0.98 },
                { text: "National River Protection Commission (NRPC)", category: "GOVERNMENT_AGENCY", confidence: 0.97 },
                { text: "Turag River", category: "GEOGRAPHICAL_LOCATION", confidence: 0.99 },
                { text: "Article 18A", category: "CONSTITUTIONAL_PROVISION", confidence: 0.99 }
              ]
            }
          },
          {
            id: 10,
            name: "10. Citation Extraction",
            icon: Link2,
            status: "RESOLVED",
            desc: "Identifies formal law report citations (e.g. DLR, BLD) and resolves them to active precedents.",
            json: {
              citationsFound: [
                {
                  rawText: "Civil Petition No. 3039 of 2019",
                  type: "Appellate Petition",
                  canonicalFormat: "CPLA 3039/2019",
                  resolutionStatus: "RESOLVED_TO_RECORD",
                  databaseReferenceId: "db-ref-cpla-3039-2019",
                  relatedPrecedentCases: ["State v. Opu (71 DLR 345)"]
                }
              ]
            }
          },
          {
            id: 11,
            name: "11. Clause Extraction",
            icon: FileCode,
            status: "EXTRACTED",
            desc: "Segments legal obligations, definitions, and environmental mandates.",
            json: {
              extractedClauses: [
                {
                  category: "JUDICIAL_DECLARATION",
                  text: "All rivers, canals, and wetlands are hereby declared to have the status of a 'Living Entity', 'Legal Person' and 'Juridical Person' possessing legal rights.",
                  provisionMatched: "Public Trust Doctrine"
                },
                {
                  category: "STATUTORY_OBLIGATION",
                  text: "Under Article 18A, the State is under a non-negotiable obligation to protect and conserve the environment.",
                  provisionMatched: "Article 18A"
                },
                {
                  category: "PENALTY_AND_DISQUALIFICATION",
                  text: "Any individual encroaching upon or polluting a river is barred from bank credit and election candidacy.",
                  provisionMatched: "Censure"
                }
              ]
            }
          },
          {
            id: 12,
            name: "12. Table Extraction",
            icon: Table,
            status: "PARSED",
            desc: "Extracts tabular datasets into structural JSON tables.",
            json: {
              tablesExtracted: [
                {
                  tableIndex: 1,
                  caption: "Turag River Sector Boundaries & Infringements",
                  headers: ["River Sector Segment", "Boundary Pillars Installed", "Encroachments Reported"],
                  rows: [
                    ["Turag Sector A", "450", "12 cases"],
                    ["Turag Sector B", "310", "28 cases"],
                    ["Turag Sector C", "180", "5 cases"]
                  ]
                }
              ]
            }
          },
          {
            id: 13,
            name: "13. Classification",
            icon: Tag,
            status: "COMPLETED",
            desc: "Determines the document type and legal filing family.",
            json: {
              predictedClass: "Supreme Court Precedent Judgment",
              confidence: 0.99,
              classHierarchy: ["Judiciary", "Supreme Court", "Appellate Division", "Landmark Judgment"],
              languageDistribution: { English: "92%", Bangla: "8%" }
            }
          },
          {
            id: 14,
            name: "14. Segmentation",
            icon: FolderOpen,
            status: "PARSED",
            desc: "Divides judgment documents into Facts, Arguments, Issues, and Final Directives.",
            json: {
              documentSegments: [
                { name: "Preamble & Appearances", startPage: 1, endPage: 2 },
                { name: "Factual Context & Encroachment Records", startPage: 3, endPage: 10 },
                { name: "Constitutional & Precedent Analysis", startPage: 11, endPage: 18 },
                { name: "Holding on River Legal Personhood", startPage: 19, endPage: 23 },
                { name: "Mandates & Absolute Disqualifications", startPage: 24, endPage: 25 }
              ]
            }
          },
          {
            id: 15,
            name: "15. Copyright & Filtering",
            icon: Copyright,
            status: "PASSED",
            desc: "Excludes copyrighted commentary and indexes only public domain statutory/judicial statements.",
            json: {
              copyrightAnalysis: {
                isPublicDomainPrecedentText: true,
                proprietaryPublisherCommentaryDetected: false,
                redactionRequired: false,
                indexingStatus: "FULLY_ALLOWED"
              }
            }
          },
          {
            id: 16,
            name: "16. Semantic Chunking",
            icon: HardDrive,
            status: "COMPLETED",
            desc: "Splits raw texts into citation-aware semantic paragraphs with overlapping boundary logic for vector storage.",
            json: {
              chunkingStrategy: "Section-And-Citation-Aware Chunking",
              totalChunksGenerated: 14,
              averageTokensPerChunk: 320,
              embeddingTargetSchema: "HAYAT-Legal-Embeddings-v1",
              metadataTagsAttached: ["CPLA-3039/2019", "Appellate-Division", "Article-18A", "NRPC-Loco-Parentis"]
            }
          },
          {
            id: 17,
            name: "17. Confidence & Review Queue",
            icon: CheckSquare,
            status: "PENDING_AUDIT",
            desc: "Flags low-confidence scores and tracks editorial validation.",
            json: {
              overallSystemConfidence: "98.9%",
              needsHumanReview: false,
              flaggedTextElements: [],
              verificationLogs: [
                { timestamp: "2026-07-14T12:51:00Z", actor: "Auto-Parser", action: "Schema Validation Succeeded" },
                { timestamp: "2026-07-14T12:51:02Z", actor: "DLR Resolver Node", action: "Matched to Knowledge Graph Base" }
              ]
            }
          }
        ];

      case 'gazette':
        return [
          {
            id: 1,
            name: "1. File Validation",
            icon: ShieldCheck,
            status: "PASSED",
            desc: "Validates document container integrity, extensions, mime-types, and checks cryptographically for malware.",
            json: {
              validationStatus: "VALIDATED_SUCCESS",
              magicNumber: "%PDF-1.4",
              mimeType: "application/pdf",
              sha256: defaultSha,
              fileSize: defaultSize,
              uuid: defaultUuid,
              malwareScan: "CLEAN_PASS",
              duplicateCheck: "NO_DUPLICATE_FOUND"
            }
          },
          {
            id: 2,
            name: "2. Image Quality Assessment",
            icon: Eye,
            status: "OPTIMAL",
            desc: "Analyzes readability, DPI resolution, skew angle, contrast, and potential blur levels before OCR execution.",
            json: {
              qualityScore: 96,
              dpi: 300,
              blurLevel: "4/10",
              contrastRatio: "91% (High)",
              rotationDetected: "-0.4 degrees",
              skewAngle: -0.4,
              blankPagesDetected: []
            }
          },
          {
            id: 3,
            name: "3. Image Enhancement",
            icon: Sliders,
            status: "APPLIED",
            desc: "Processes pixel data to deskew, dewarp, remove shadows, reduce noise, and normalize contrast using adaptive thresholding.",
            json: {
              enhancementsApplied: ["AutoDeskew", "Binarization", "CLAHE_Contrast"],
              deskewCorrection: 0.4,
              dewarpApplied: true
            }
          },
          {
            id: 4,
            name: "4. OCR Engine",
            icon: Cpu,
            status: "COMPLETED",
            desc: "Extracts machine-readable text using mixed-language Bangla/English neural networks.",
            json: {
              ocrEngine: "HAYAT PaddleOCR-v3 Multi-Modal",
              languagesConfigured: ["English", "Bangla"],
              characterConfidence: "98.2%",
              totalCharactersExtracted: 34500,
              rawTextSnippet: "REGISTERED NO. DA-1... BANGLADESH GAZETTE EXTRAORDINARY... ACT NO. 24 OF 2018... DOWRY PROHIBITION ACT 2018..."
            }
          },
          {
            id: 5,
            name: "5. Handwriting (Future)",
            icon: EyeOff,
            status: "NONE_DETECTED",
            desc: "Identifies and transcribes judicial annotations, lawyer notes, and signatures.",
            json: {
              marginalNotesDetected: false,
              notesFound: []
            }
          },
          {
            id: 6,
            name: "6. Layout Analysis",
            icon: Layers,
            status: "SEGMENTED",
            desc: "Identifies high-level visual regions like headings, footnotes, paragraphs, and tables.",
            json: {
              segmentationModel: "LayoutLMv3-Bangla",
              detectedBlocksCount: {
                headers: 3,
                headings: 4,
                paragraphs: 5,
                footnotes: 0,
                tables: 0
              }
            }
          },
          {
            id: 7,
            name: "7. Reading Order",
            icon: AlignLeft,
            status: "VERIFIED",
            desc: "Decodes complex multi-column structures to ensure continuous, logical reading stream flows.",
            json: {
              documentLayout: "Single Column Gazette Structure",
              readingOrderStrategy: "Top-to-Bottom",
              twoColumnInterleavingChecked: true
            }
          },
          {
            id: 8,
            name: "8. Metadata Extraction",
            icon: BookOpen,
            status: "EXTRACTED",
            desc: "Siphons document-level legal context such as Court, Bench, Case Type, and Decision Date.",
            json: {
              legalMetadata: {
                jurisdiction: "Bangladesh",
                gazetteRegistryNumber: "DA-1",
                actName: "Dowry Prohibition Act, 2018",
                actNumber: "Act No. 24 of 2018",
                parliamentaryPassingDate: "September 16, 2018",
                effectiveDate: "October 08, 2018",
                legislativeBody: "Jatiya Sangsad (Parliament of Bangladesh)"
              }
            }
          },
          {
            id: 9,
            name: "9. Entity Extraction",
            icon: Users,
            status: "EXTRACTED",
            desc: "Automatically classifies named legal entities, organizations, and statutory acts.",
            json: {
              extractedEntities: [
                { text: "Dowry Prohibition Act 2018", category: "STATUTORY_ACT", confidence: 0.99 },
                { text: "Act No. 24 of 2018", category: "ACT_NUMBER", confidence: 0.99 },
                { text: "Jatiya Sangsad", category: "LEGISLATURE", confidence: 0.97 },
                { text: "Senior Judicial Magistrate", category: "COURT_TIER", confidence: 0.98 }
              ]
            }
          },
          {
            id: 10,
            name: "10. Citation Extraction",
            icon: Link2,
            status: "RESOLVED",
            desc: "Identifies formal law report citations (e.g. DLR, BLD) and resolves them to active precedents.",
            json: {
              citationsFound: [
                {
                  rawText: "Act No. 24 of 2018",
                  type: "Statute",
                  canonicalFormat: "Bangladesh Act 24/2018",
                  resolutionStatus: "RESOLVED_TO_RECORD"
                }
              ]
            }
          },
          {
            id: 11,
            name: "11. Clause Extraction",
            icon: FileCode,
            status: "EXTRACTED",
            desc: "Segments legal obligations, definitions, and environmental mandates.",
            json: {
              extractedClauses: [
                {
                  category: "DEFINITION_SECTION",
                  text: "Dowry is defined as any money, security, or property given or agreed to be given directly or indirectly...",
                  provisionMatched: "Section 2"
                },
                {
                  category: "PENALTY_SECTION",
                  text: "Demanding dowry carries a punishment of up to 5 years imprisonment or a fine of 50,000 Taka or both.",
                  provisionMatched: "Section 4"
                },
                {
                  category: "CRIMINAL_PROCEDURE_CLAUSE",
                  text: "All offences under this Act are non-cognizable, bailable, and compoundable.",
                  provisionMatched: "Section 8"
                }
              ]
            }
          },
          {
            id: 12,
            name: "12. Table Extraction",
            icon: Table,
            status: "NONE_DETECTED",
            desc: "Extracts tabular datasets into structural JSON tables.",
            json: {
              tablesExtracted: []
            }
          },
          {
            id: 13,
            name: "13. Classification",
            icon: Tag,
            status: "COMPLETED",
            desc: "Determines the document type and legal filing family.",
            json: {
              predictedClass: "Bangladesh Gazette Notification (Act of Parliament)",
              confidence: 0.98,
              classHierarchy: ["Legislative", "Acts", "Jatiya Sangsad Passing", "Gazette Publications"]
            }
          },
          {
            id: 14,
            name: "14. Segmentation",
            icon: FolderOpen,
            status: "PARSED",
            desc: "Divides judgment documents into Facts, Arguments, Issues, and Final Directives.",
            json: {
              documentSegments: [
                { name: "Preamble & Official Seals", startPage: 1, endPage: 1 },
                { name: "Definition & Interpretation Clauses", startPage: 1, endPage: 2 },
                { name: "Offences & Penalties Sections", startPage: 2, endPage: 3 },
                { name: "Procedural & Repeal Decrees", startPage: 3, endPage: 4 }
              ]
            }
          },
          {
            id: 15,
            name: "15. Copyright & Filtering",
            icon: Copyright,
            status: "PASSED",
            desc: "Excludes copyrighted commentary and indexes only public domain statutory/judicial statements.",
            json: {
              copyrightAnalysis: {
                isPublicDomainPrecedentText: true,
                redactionRequired: false,
                indexingStatus: "FULLY_ALLOWED"
              }
            }
          },
          {
            id: 16,
            name: "16. Semantic Chunking",
            icon: HardDrive,
            status: "COMPLETED",
            desc: "Splits raw texts into citation-aware semantic paragraphs with overlapping boundary logic for vector storage.",
            json: {
              chunkingStrategy: "Statutory Section-Wise Chunking",
              totalChunksGenerated: 8,
              averageTokensPerChunk: 280,
              embeddingTargetSchema: "HAYAT-Statute-Embeddings-v1"
            }
          },
          {
            id: 17,
            name: "17. Confidence & Review Queue",
            icon: CheckSquare,
            status: "VERIFIED",
            desc: "Flags low-confidence scores and tracks editorial validation.",
            json: {
              overallSystemConfidence: "98.2%",
              needsHumanReview: false,
              flaggedTextElements: []
            }
          }
        ];

      case 'judgment':
        return [
          {
            id: 1,
            name: "1. File Validation",
            icon: ShieldCheck,
            status: "PASSED",
            desc: "Validates document container integrity, extensions, mime-types, and checks cryptographically for malware.",
            json: {
              validationStatus: "VALIDATED_SUCCESS",
              magicNumber: "%PDF-1.4",
              mimeType: "application/pdf",
              sha256: defaultSha,
              fileSize: defaultSize,
              uuid: defaultUuid,
              malwareScan: "CLEAN_PASS"
            }
          },
          {
            id: 2,
            name: "2. Image Quality Assessment",
            icon: Eye,
            status: "OPTIMAL",
            desc: "Analyzes readability, DPI resolution, skew angle, contrast, and potential blur levels before OCR execution.",
            json: {
              qualityScore: 94,
              dpi: 300,
              blurLevel: "5/10",
              contrastRatio: "88% (Adequate)",
              rotationDetected: "1.2 degrees"
            }
          },
          {
            id: 3,
            name: "3. Image Enhancement",
            icon: Sliders,
            status: "APPLIED",
            desc: "Processes pixel data to deskew, dewarp, remove shadows, reduce noise, and normalize contrast using adaptive thresholding.",
            json: {
              enhancementsApplied: ["AutoDeskew", "Binarization", "CLAHE_Contrast"],
              deskewCorrection: -1.2,
              dewarpApplied: true
            }
          },
          {
            id: 4,
            name: "4. OCR Engine",
            icon: Cpu,
            status: "COMPLETED",
            desc: "Extracts machine-readable text using mixed-language Bangla/English neural networks.",
            json: {
              ocrEngine: "HAYAT PaddleOCR-v3 Multi-Modal",
              languagesConfigured: ["English", "Bangla"],
              characterConfidence: "97.4%",
              rawTextSnippet: "CRIMINAL APPEAL NO. 450 OF 2022... STATE v. OPU... The appeal is dismissed. The sentencing under Section 302 remains in full force..."
            }
          },
          {
            id: 5,
            name: "5. Handwriting (Future)",
            icon: EyeOff,
            status: "SIMULATED",
            desc: "Identifies and transcribes judicial annotations, lawyer notes, and signatures.",
            json: {
              marginalNotesDetected: true,
              notesFound: [
                {
                  page: 1,
                  bounding_box: [450, 80, 40, 15],
                  transcript: "Affirmed by Bench",
                  confidenceScore: 0.94
                }
              ]
            }
          },
          {
            id: 6,
            name: "6. Layout Analysis",
            icon: Layers,
            status: "SEGMENTED",
            desc: "Identifies high-level visual regions like headings, footnotes, paragraphs, and tables.",
            json: {
              segmentationModel: "LayoutLMv3-Bangla",
              detectedBlocksCount: {
                headers: 2,
                headings: 3,
                paragraphs: 8,
                rulingBoxes: 1,
                footnotes: 1,
                tables: 0
              }
            }
          },
          {
            id: 7,
            name: "7. Reading Order",
            icon: AlignLeft,
            status: "VERIFIED",
            desc: "Decodes complex multi-column structures to ensure continuous, logical reading stream flows.",
            json: {
              documentLayout: "Two-Column Law Report Frame",
              readingOrderStrategy: "Double Column Grid Segments",
              twoColumnInterleavingChecked: true
            }
          },
          {
            id: 8,
            name: "8. Metadata Extraction",
            icon: BookOpen,
            status: "EXTRACTED",
            desc: "Siphons document-level legal context such as Court, Bench, Case Type, and Decision Date.",
            json: {
              legalMetadata: {
                jurisdiction: "Bangladesh",
                courtName: "High Court Division (Dhaka Bench)",
                benchMembers: [
                  "Mr. Justice Sheikh Hasan Arif",
                  "Mr. Justice Biswajit Debnath"
                ],
                caseNumber: "Criminal Appeal No. 450 of 2022",
                caseType: "Criminal Precedent Appeal",
                judgmentDate: "May 12, 2022",
                subjectMatter: "Criminal Homicide & Murder Appeal"
              }
            }
          },
          {
            id: 9,
            name: "9. Entity Extraction",
            icon: Users,
            status: "EXTRACTED",
            desc: "Automatically classifies named legal entities, organizations, and statutory acts.",
            json: {
              extractedEntities: [
                { text: "The State v. Opu", category: "CASE_TITLE", confidence: 0.99 },
                { text: "Section 302 of the Penal Code", category: "PENAL_CODE_PROVISION", confidence: 0.99 },
                { text: "Sheikh Hasan Arif", category: "PRESIDING_JUDGE", confidence: 0.99 }
              ]
            }
          },
          {
            id: 10,
            name: "10. Citation Extraction",
            icon: Link2,
            status: "RESOLVED",
            desc: "Identifies formal law report citations (e.g. DLR, BLD) and resolves them to active precedents.",
            json: {
              citationsFound: [
                {
                  rawText: "71 DLR 345",
                  type: "Dhaka Law Reports Citation",
                  canonicalFormat: "71 DLR 345",
                  resolutionStatus: "RESOLVED_TO_RECORD"
                }
              ]
            }
          },
          {
            id: 11,
            name: "11. Clause Extraction",
            icon: FileCode,
            status: "EXTRACTED",
            desc: "Segments legal obligations, definitions, and environmental mandates.",
            json: {
              extractedClauses: [
                {
                  category: "CRIMINAL_HOLDING",
                  text: "The prosecution has proven the chain of events beyond reasonable doubt. Standard medical reports affirm direct physical cause of death.",
                  provisionMatched: "Section 300"
                }
              ]
            }
          },
          {
            id: 12,
            name: "12. Table Extraction",
            icon: Table,
            status: "NONE_DETECTED",
            desc: "Extracts tabular datasets into structural JSON tables.",
            json: {
              tablesExtracted: []
            }
          },
          {
            id: 13,
            name: "13. Classification",
            icon: Tag,
            status: "COMPLETED",
            desc: "Determines the document type and legal filing family.",
            json: {
              predictedClass: "High Court Division Criminal Judgment",
              confidence: 0.97
            }
          },
          {
            id: 14,
            name: "14. Segmentation",
            icon: FolderOpen,
            status: "PARSED",
            desc: "Divides judgment documents into Facts, Arguments, Issues, and Final Directives.",
            json: {
              documentSegments: [
                { name: "Docket Context", startPage: 1, endPage: 1 },
                { name: "Prosecution Charge & Trial Records", startPage: 2, endPage: 4 },
                { name: "Appellate Merits & Judicial Review", startPage: 5, endPage: 7 },
                { name: "Final Ruling Order & Sentencing Confirmation", startPage: 8, endPage: 9 }
              ]
            }
          },
          {
            id: 15,
            name: "15. Copyright & Filtering",
            icon: Copyright,
            status: "PASSED",
            desc: "Excludes copyrighted commentary and indexes only public domain statutory/judicial statements.",
            json: {
              copyrightAnalysis: {
                isPublicDomainPrecedentText: true,
                proprietaryPublisherCommentaryDetected: true,
                redactionRequired: true,
                indexingStatus: "REDACTED_ZONE_INDEXED"
              }
            }
          },
          {
            id: 16,
            name: "16. Semantic Chunking",
            icon: HardDrive,
            status: "COMPLETED",
            desc: "Splits raw texts into citation-aware semantic paragraphs with overlapping boundary logic for vector storage.",
            json: {
              chunkingStrategy: "Paragraph-And-Topic-Aware Chunking",
              totalChunksGenerated: 6,
              averageTokensPerChunk: 350
            }
          },
          {
            id: 17,
            name: "17. Confidence & Review Queue",
            icon: CheckSquare,
            status: "VERIFIED",
            desc: "Flags low-confidence scores and tracks editorial validation.",
            json: {
              overallSystemConfidence: "97.4%",
              needsHumanReview: false,
              flaggedTextElements: []
            }
          }
        ];

      default: // custom fallback
        return [
          {
            id: 1,
            name: "1. File Validation",
            icon: ShieldCheck,
            status: "PASSED",
            desc: "Validates document container integrity, extensions, mime-types, and checks cryptographically for malware.",
            json: {
              validationStatus: "VALIDATED_SUCCESS",
              magicNumber: "PDF-Header Detected",
              mimeType: "application/pdf",
              sha256: defaultSha,
              fileSize: defaultSize,
              uuid: defaultUuid,
              malwareScan: "CLEAN_PASS"
            }
          },
          {
            id: 2,
            name: "2. Image Quality Assessment",
            icon: Eye,
            status: "OPTIMAL",
            desc: "Analyzes readability, DPI resolution, skew angle, contrast, and potential blur levels before OCR execution.",
            json: {
              qualityScore: 92,
              dpi: 300,
              blurLevel: "4/10",
              contrastRatio: "85%",
              rotationDetected: "0.0 degrees"
            }
          },
          {
            id: 3,
            name: "3. Image Enhancement",
            icon: Sliders,
            status: "APPLIED",
            desc: "Processes pixel data to deskew, dewarp, remove shadows, reduce noise, and normalize contrast using adaptive thresholding.",
            json: {
              enhancementsApplied: ["ContrastAdjustment", "AutoBinarization"],
              deskewCorrection: 0.0,
              dewarpApplied: false
            }
          },
          {
            id: 4,
            name: "4. OCR Engine",
            icon: Cpu,
            status: "COMPLETED",
            desc: "Extracts machine-readable text using mixed-language Bangla/English neural networks.",
            json: {
              ocrEngine: "HAYAT PaddleOCR-v3 Multi-Modal",
              languagesConfigured: ["English", "Bangla"],
              characterConfidence: "96.4%",
              rawTextSnippet: "HAYAT Ingestion System: Simulated raw legal file parser..."
            }
          },
          {
            id: 5,
            name: "5. Handwriting (Future)",
            icon: EyeOff,
            status: "NONE_DETECTED",
            desc: "Identifies and transcribes judicial annotations, lawyer notes, and signatures.",
            json: {
              marginalNotesDetected: false,
              notesFound: []
            }
          },
          {
            id: 6,
            name: "6. Layout Analysis",
            icon: Layers,
            status: "SEGMENTED",
            desc: "Identifies high-level visual regions like headings, footnotes, paragraphs, and tables.",
            json: {
              segmentationModel: "LayoutLMv3-Bangla",
              detectedBlocksCount: {
                headers: 1,
                headings: 2,
                paragraphs: 4,
                footnotes: 0,
                tables: 0
              }
            }
          },
          {
            id: 7,
            name: "7. Reading Order",
            icon: AlignLeft,
            status: "VERIFIED",
            desc: "Decodes complex multi-column structures to ensure continuous, logical reading stream flows.",
            json: {
              documentLayout: "Standard Document Frame",
              readingOrderStrategy: "Sequential Page Segments"
            }
          },
          {
            id: 8,
            name: "8. Metadata Extraction",
            icon: BookOpen,
            status: "EXTRACTED",
            desc: "Siphons document-level legal context such as Court, Bench, Case Type, and Decision Date.",
            json: {
              legalMetadata: {
                jurisdiction: "Bangladesh",
                fileName: fileName,
                fileSize: defaultSize,
                extractionDate: "2026-07-14",
                integrityStatus: "Verified Secure"
              }
            }
          },
          {
            id: 9,
            name: "9. Entity Extraction",
            icon: Users,
            status: "EXTRACTED",
            desc: "Automatically classifies named legal entities, organizations, and statutory acts.",
            json: {
              extractedEntities: [
                { text: "Bangladesh Law", category: "JURISDICTION_CONCEPT", confidence: 0.95 }
              ]
            }
          },
          {
            id: 10,
            name: "10. Citation Extraction",
            icon: Link2,
            status: "NONE_DETECTED",
            desc: "Identifies formal law report citations (e.g. DLR, BLD) and resolves them to active precedents.",
            json: {
              citationsFound: []
            }
          },
          {
            id: 11,
            name: "11. Clause Extraction",
            icon: FileCode,
            status: "EXTRACTED",
            desc: "Segments legal obligations, definitions, and environmental mandates.",
            json: {
              extractedClauses: []
            }
          },
          {
            id: 12,
            name: "12. Table Extraction",
            icon: Table,
            status: "NONE_DETECTED",
            desc: "Extracts tabular datasets into structural JSON tables.",
            json: {
              tablesExtracted: []
            }
          },
          {
            id: 13,
            name: "13. Classification",
            icon: Tag,
            status: "COMPLETED",
            desc: "Determines the document type and legal filing family.",
            json: {
              predictedClass: "Custom Legal Filing / Affidavit",
              confidence: 0.91
            }
          },
          {
            id: 14,
            name: "14. Segmentation",
            icon: FolderOpen,
            status: "PARSED",
            desc: "Divides judgment documents into Facts, Arguments, Issues, and Final Directives.",
            json: {
              documentSegments: [
                { name: "Full Document Text", startPage: 1, endPage: 1 }
              ]
            }
          },
          {
            id: 15,
            name: "15. Copyright & Filtering",
            icon: Copyright,
            status: "PASSED",
            desc: "Excludes copyrighted commentary and indexes only public domain statutory/judicial statements.",
            json: {
              copyrightAnalysis: {
                isPublicDomainPrecedentText: true,
                redactionRequired: false,
                indexingStatus: "FULLY_ALLOWED"
              }
            }
          },
          {
            id: 16,
            name: "16. Semantic Chunking",
            icon: HardDrive,
            status: "COMPLETED",
            desc: "Splits raw texts into citation-aware semantic paragraphs with overlapping boundary logic for vector storage.",
            json: {
              chunkingStrategy: "Paragraph-Aware Chunking",
              totalChunksGenerated: 2,
              averageTokensPerChunk: 180
            }
          },
          {
            id: 17,
            name: "17. Confidence & Review Queue",
            icon: CheckSquare,
            status: "VERIFIED",
            desc: "Flags low-confidence scores and tracks editorial validation.",
            json: {
              overallSystemConfidence: "94.5%",
              needsHumanReview: false,
              flaggedTextElements: []
            }
          }
        ];
    }
  };

  const layers = getLayersData();
  const currentLayer = layers.find(l => l.id === activeLayer) || layers[0];
  const LayerIcon = currentLayer.icon;

  return (
    <div className="bg-slate-900/40 border border-white/10 rounded-2xl p-6 mt-8 space-y-6 text-left">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-2">
        <div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest font-bold">
            Ecosystem Core Ingestion Pipeline
          </span>
          <h4 className="text-base font-sans font-bold text-white mt-1">
            HAYAT 17-Layer Document Intelligence Inspector
          </h4>
          <p className="text-xs text-slate-400">
            Click through the specialized, modular AI extraction engines parsing: <span className="text-emerald-300 font-mono text-[11px] font-semibold">{fileName}</span>
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0 font-mono text-[10px] text-slate-500">
          <span>Engine v1.42 • Dual-Path LLM</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Vertical 17-Layers Tabs Navigation */}
        <div className="lg:col-span-5 space-y-1.5 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin">
          {layers.map((layer) => {
            const Icon = layer.icon;
            const isSelected = activeLayer === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer group ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                    : 'bg-slate-950/20 border-white/5 hover:border-white/10 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-400'}`} />
                  <span className="font-sans font-semibold text-[11px] truncate">
                    {layer.name}
                  </span>
                </div>
                <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase shrink-0 ${
                  layer.status === 'PASSED' || layer.status === 'COMPLETED' || layer.status === 'EXTRACTED' || layer.status === 'RESOLVED' || layer.status === 'VERIFIED'
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                    : layer.status === 'OPTIMAL' || layer.status === 'APPLIED' || layer.status === 'SEGMENTED' || layer.status === 'PARSED'
                      ? 'text-sky-400 bg-sky-500/10 border-sky-500/20'
                      : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                }`}>
                  {layer.status}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Tab Detailed JSON & Descriptive Breakdown */}
        <div className="lg:col-span-7 bg-slate-950/50 border border-white/5 rounded-2xl p-5 flex flex-col justify-between min-h-[380px]">
          <div className="space-y-4">
            {/* Header detail of the current layer */}
            <div className="flex items-start gap-3 border-b border-white/5 pb-3">
              <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
                <LayerIcon className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h5 className="font-sans font-bold text-xs text-white">
                  {currentLayer.name} Module
                </h5>
                <p className="text-[11px] text-slate-400 leading-normal font-sans">
                  {currentLayer.desc}
                </p>
              </div>
            </div>

            {/* Code / JSON block */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-slate-500" /> Layer Structured Data Output:
                </span>
                <button
                  onClick={() => handleCopyJson(currentLayer.json)}
                  className="text-[9px] font-mono text-emerald-400/80 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/20 transition-all cursor-pointer"
                >
                  {copied ? "Copied!" : "Copy JSON"}
                </button>
              </div>
              <div className="bg-slate-950 rounded-xl p-3 border border-white/5 font-mono text-[10px] text-slate-300 overflow-x-auto max-h-[220px] scrollbar-thin">
                <pre>{JSON.stringify(currentLayer.json, null, 2)}</pre>
              </div>
            </div>
          </div>

          {/* Infrastructure Impact Footer */}
          <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-slate-400 font-sans leading-relaxed">
            <span className="font-semibold text-slate-200">Downstream Impact: </span> 
            This telemetry structured output is loaded directly into the HAYAT LLM retrieval vector database and registered inside the Knowledge Graph as verifiable metadata nodes.
          </div>
        </div>
      </div>
    </div>
  );
}
