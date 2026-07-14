/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DecomposedCase } from '../types';

export const DECOMPOSED_DATABASE: DecomposedCase[] = [
  {
    id: 'mst-nayab-2026',
    title: 'Mst. Nayab vs State',
    court: 'Supreme Court',
    country: 'Pakistan',
    bench: ['Justice Jamal Khan Mandokhail', 'Justice Salahuddin Panhwar'],
    decisionDate: '2026-06-23',
    caseType: 'Criminal Petition',
    status: 'Reported / Landmark',
    citation: 'PK-SC-2026-CRLP-1033',
    parties: 'Mst. Nayab (Petitioner) vs. The State (Respondent)',
    subject: 'Criminal Procedure - Rectification of recorded witness statements under Section 360 CrPC and constitutional guarantees of Fair Trial under Article 10A',
    proceduralHistory: [
      { id: 'ph1', stage: 'Trial Court', outcome: 'Recorded testimony via video conference. Discovered typographical/material transcription errors. Dismissed witness application under Section 360 CrPC for rectification.', arrow: true },
      { id: 'ph2', stage: 'High Court', outcome: 'Sought Revision of Trial Court order. Dismissed. Concluded that statutory correction was an unnecessary technicality.', arrow: true },
      { id: 'ph3', stage: 'Supreme Court', outcome: 'Allowed Appeal. Reversed lower courts. Ordered full video audit and comparison, mandatory memorandum append, and correction.' }
    ],
    facts: [
      { id: 'f1', text: 'The main witness testified before the Trial Court via interactive video-conference facilities.' },
      { id: 'f2', text: 'The Trial Court transcriber recorded and compiled the written transcript of the testimony.' },
      { id: 'f3', text: 'Upon review, it was discovered that critical dates and key factual timelines were incorrectly recorded in the final transcript.' },
      { id: 'f4', text: 'The witness submitted a formal request to correct these transcription errors.' },
      { id: 'f5', text: 'The witness filed a statutory application before the trial judge under Section 360 of the Code of Criminal Procedure (CrPC) for statement rectification.' },
      { id: 'f6', text: 'The Trial Court summarily rejected the application, holding that it had no power to review or amend signed transcripts.' },
      { id: 'f7', text: 'The Supreme Court, in appeal, directly requisitioned and examined the original visual-audio video recording of the court proceedings.' }
    ],
    issues: [
      { id: 'is1', text: 'Whether a witness has a statutory right to seek correction of an inaccurately transcribed statement under Section 360 CrPC.', answer: 'Yes', elaborated: 'Section 360 is not merely directory but provides a vital mechanism to ensure the record of the court matches actual spoken depositions verbatim.' },
      { id: 'is2', text: 'Whether a trial court possesses the jurisdiction to compare electronic video-recordings with written statements for verification.', answer: 'Yes', elaborated: 'Modern technological integrations allow courts to use audio-visual files as direct reference material to rectify typographical transcription errors.' },
      { id: 'is3', text: 'Whether a summary refusal to correct a material error in a witness statement violates the constitutional right to a fair trial.', answer: 'Yes', elaborated: 'Refusing correction of an admittedly flawed record violates Article 10A (Fair Trial), as an incorrect record can lead to severe miscarriage of justice during final adjudication.' }
    ],
    statutes: [
      { id: 'st1', actName: 'Code of Criminal Procedure, 1898', section: 'Section 360', role: 'Provides statutory powers and procedure for the correction of witness statements in the presence of the accused/lawyer.', temporalStatus: 'Valid' },
      { id: 'st2', actName: 'Code of Criminal Procedure, 1898', section: 'Section 435', role: 'Governs High Court revisionary jurisdiction to examine correctness, legality, or propriety of any finding or order.', temporalStatus: 'Valid' },
      { id: 'st3', actName: 'The Constitution of Pakistan', section: 'Article 10A', role: 'Guarantees the fundamental right to a fair trial and due process in all civil and criminal proceedings.', temporalStatus: 'Valid' }
    ],
    principles: [
      { id: 'pr1', text: 'A witness statement should always be recorded verbatim, reflecting the precise truth of the testimony.' },
      { id: 'pr2', text: 'Video recordings and digital evidence are admissible and can be directly utilized for the verification of court records.' },
      { id: 'pr3', text: 'Section 360 CrPC provides trial courts with explicit rectification powers to correct clerical or material clerical errors.' },
      { id: 'pr4', text: 'Procedural rules are handmaids of justice, intended to facilitate the discovery of truth, not to defeat substantive rights.' }
    ],
    ratioDecidendi: [
      { id: 'ra1', text: 'Trial courts retain absolute jurisdiction under Section 360 CrPC to correct transcription anomalies at any stage of trial.' },
      { id: 'ra2', text: 'A witness is fully entitled to challenge and demand the rectification of an incorrectly recorded deposition.' },
      { id: 'ra3', text: 'When a dispute arises, the court must compare the electronic video/audio backup with the written script to determine accuracy.' },
      { id: 'ra4', text: 'The trial judge should append a separate signed memorandum containing the exact corrections instead of manually overwriting the signed transcript.' }
    ],
    directions: [
      { id: 'dr1', step: 'Step 1', entity: 'Trial Court', action: 'Directly retrieve and review the original audio-visual video recording of the witness testimony.', timeline: 'Within 5 working days' },
      { id: 'dr2', step: 'Step 2', entity: 'Trial Court', action: 'Conduct a thorough comparison between the digital audio and the disputed written transcript.', timeline: 'Within 7 working days' },
      { id: 'dr3', step: 'Step 3', entity: 'Trial Court', action: 'Formulate the necessary corrected text and draft an official memorandum of statement corrections.', timeline: 'Within 10 working days' },
      { id: 'dr4', step: 'Step 4', entity: 'Trial Court', action: 'Affix the signed memorandum of correction directly to the original file and share copies with all litigating parties.', timeline: 'Immediate' },
      { id: 'dr5', step: 'Step 5', entity: 'Trial Court', action: 'Re-convene the main trial proceedings and continue the hearings with the validated record.', timeline: 'Maximum 15 working days overall' }
    ],
    paragraphs: [
      { id: 'p1', index: 1, category: 'Metadata', text: 'Criminal Petition No. 1033 of 2026. In the Supreme Court. Presiding: Justice Jamal Khan Mandokhail, Justice Salahuddin Panhwar.' },
      { id: 'p2', index: 2, category: 'Facts', text: 'The petitioner, Mst. Nayab, challenges the trial court\'s order dated March 14, 2026, rejecting her application under Section 360 of the Code of Criminal Procedure. The witness in question gave detailed testimony via remote video-conferencing due to security apprehensions.' },
      { id: 'p3', index: 3, category: 'Video recording', text: 'We have carefully reviewed the visual video recording of the court proceedings. The spoken words of the witness were clear, yet the court transcriber recorded a completely different set of dates, leading to a massive distortion of the witness\'s narrative.' },
      { id: 'p4', index: 4, category: 'Law', text: 'Section 360 of the CrPC exists precisely to prevent such failures. It mandates that when a witness statement is completed, it must be read over to them and corrected if necessary. This safeguard is directly linked to the fair trial guarantees under Article 10A of the Constitution.' },
      { id: 'p5', index: 5, category: 'Reasoning', text: 'The argument that once a statement is signed, it cannot be altered is totally erroneous. If a clerical error or a typo is made, forcing a witness to stand by a statement they never made defeats the truth-seeking mission of the trial. Modern video backups are an unalterable mirror of court proceedings, and judges must not ignore them in favor of a faulty written script.' },
      { id: 'p6', index: 6, category: 'Directions', text: 'Therefore, we allow this petition and direct the trial court to immediately compare the video recording, prepare a memorandum of correction, append it to the main file, and conclude this exercise within 15 working days from receipt of this order.' }
    ],
    knowledgeGraph: {
      nodes: [
        { id: 'case-nayab', label: 'Mst. Nayab vs State', type: 'case' },
        { id: 'stat-360', label: 'Section 360 CrPC', type: 'section' },
        { id: 'stat-10a', label: 'Article 10A Constitution', type: 'statute' },
        { id: 'stat-435', label: 'Section 435 CrPC', type: 'section' },
        { id: 'judge-mandokhail', label: 'Justice Jamal Mandokhail', type: 'judge' },
        { id: 'judge-panhwar', label: 'Justice Salahuddin Panhwar', type: 'judge' },
        { id: 'party-nayab', label: 'Mst. Nayab', type: 'party' },
        { id: 'princ-truth', label: 'Truth-seeking Procedural Equity', type: 'principle' }
      ],
      links: [
        { source: 'case-nayab', target: 'stat-360', label: 'interprets' },
        { source: 'case-nayab', target: 'stat-10a', label: 'enforces' },
        { source: 'case-nayab', target: 'stat-435', label: 'revises' },
        { source: 'case-nayab', target: 'judge-mandokhail', label: 'presided by' },
        { source: 'case-nayab', target: 'judge-panhwar', label: 'presided by' },
        { source: 'case-nayab', target: 'party-nayab', label: 'appellant' },
        { source: 'stat-360', target: 'stat-10a', label: 'harmonized with' },
        { source: 'case-nayab', target: 'princ-truth', label: 'crystallizes' }
      ]
    },
    aiSummary: {
      facts: "Witness's remote video testimony was severely transcribed with incorrect dates and timelines by the Trial Court typist.",
      issue: "Whether the Trial Court had jurisdiction and a duty under Section 360 CrPC to correct statements using electronic audio-video backup.",
      held: "Yes. The trial court has full power to verify written records against visual video recordings and must append a signed correction memorandum.",
      keyPrinciple: "Procedural laws exist to facilitate justice, not to defeat it. Courts must use statutory correction powers to maintain an accurate record, honoring Article 10A Fair Trial."
    }
  },
  {
    id: 'masdar-hossain-1999',
    title: 'Secretary, Ministry of Finance vs Masdar Hossain',
    court: 'Supreme Court (Appellate Division)',
    country: 'Bangladesh',
    bench: ['Mustafa Kamal CJ', 'Latifur Rahman J', 'Bimalendu Bikash Roy Choudhury J'],
    decisionDate: '1999-12-02',
    caseType: 'Civil Appeal',
    status: 'Reported / Constitutional Landmark',
    citation: '52 DLR (AD) 82',
    parties: 'Secretary, Ministry of Finance (Appellant) vs. Masdar Hossain & Others (Respondents)',
    subject: 'Constitutional Law - Separation of the Judicial Organ from the Executive Organ under Article 22 & 115',
    proceduralHistory: [
      { id: 'm1', stage: 'Civil Civil Suits', outcome: 'Civil Servants (Judicial) challenged civil service rules claiming judicial officers are not general civil bureaucrats.', arrow: true },
      { id: 'm2', stage: 'High Court Division', outcome: 'Writ Petition under Article 102 allowed. Issued directives separating services.', arrow: true },
      { id: 'm3', stage: 'Appellate Division', outcome: 'Affirmed with modifications. Formulated 12 historic binding directives to secure complete separation of judiciary.' }
    ],
    facts: [
      { id: 'mf1', text: 'Judicial officers (magistrates and judges) were grouped alongside administrative civil servants under executive Ministry oversight.' },
      { id: 'mf2', text: 'Masdar Hossain and other judicial officers filed a writ petition demanding separate service rules.' },
      { id: 'mf3', text: 'They argued that mixing judicial service with executive services violated the separation of powers.' },
      { id: 'mf4', text: 'The Constitution under Article 22 explicitly commands the State to separate the judiciary from the executive branch.' }
    ],
    issues: [
      { id: 'mis1', text: 'Whether the judicial service is distinct from the civil administrative services of the state.', answer: 'Yes', elaborated: 'The judicial service is a vital state organ and cannot be controlled by civil administration policies without violating basic constitutional layout.' },
      { id: 'mis2', text: 'Whether Article 115 and 116 empower the President to regulate judicial services independently.', answer: 'Yes', elaborated: 'The President, in consultation with the Supreme Court, must construct separate rules for judicial service officers.' }
    ],
    statutes: [
      { id: 'mst1', actName: 'The Constitution of Bangladesh', section: 'Article 22', role: 'Directs the state to ensure separation of the judiciary from the executive organs.', temporalStatus: 'Valid' },
      { id: 'mst2', actName: 'The Constitution of Bangladesh', section: 'Article 115', role: 'Governs appointments of persons to the judicial service or as magistrates.', temporalStatus: 'Valid' },
      { id: 'mst3', actName: 'The Constitution of Bangladesh', section: 'Article 116', role: 'Controls post-appointment discipline, posting, and promotions of judicial officers.', temporalStatus: 'Valid' }
    ],
    principles: [
      { id: 'mpr1', text: 'An independent judiciary is a part of the basic structure of the Constitution of Bangladesh.' },
      { id: 'mpr2', text: 'Judicial service holds a separate legal status separate from standard civil services.' }
    ],
    ratioDecidendi: [
      { id: 'mra1', text: 'The terms and conditions of judicial service must be regulated by separate, specialized rules, distinct from civil services.' },
      { id: 'mra2', text: 'Control and discipline of subordinate courts under Article 116 must be exercised in consultation with the Supreme Court.' }
    ],
    directions: [
      { id: 'mdr1', step: 'Step 1', entity: 'Government of Bangladesh', action: 'Construct and publish separate Judicial Service Commission (JSC) Rules.', timeline: 'Immediate' },
      { id: 'mdr2', step: 'Step 2', entity: 'Ministry of Finance', action: 'Separate judicial salary frameworks from civil administrative cadres.', timeline: 'Within 90 days' },
      { id: 'mdr3', step: 'Step 3', entity: 'President of Bangladesh', action: 'Formulate separate discipline and service rules for magistrates.', timeline: 'Immediate' }
    ],
    paragraphs: [
      { id: 'mp1', index: 1, category: 'Metadata', text: 'Secretary, Ministry of Finance vs Masdar Hossain. Civil Appeal. Supreme Court of Bangladesh, Appellate Division.' },
      { id: 'mp2', index: 2, category: 'Facts', text: 'This appeal is about the absolute independence of subordinate courts. The civil judicial officers claimed their services cannot be governed by general executive policies.' },
      { id: 'mp3', index: 3, category: 'Law', text: 'Article 22 mandates the separation. This is a non-negotiable state directive that must guide all statutory interpretations.' },
      { id: 'mp4', index: 4, category: 'Reasoning', text: 'Judicial independence is the cornerstone of our democracy. If magistrate courts are controlled by executive commissioners, a citizen can never receive an unbiased trial against state authorities. Therefore, the services must be completely split.' },
      { id: 'mp5', index: 5, category: 'Directions', text: 'We issue 12 directives. A separate Judicial Service Commission must be formed to govern judicial recruitments and rules.' }
    ],
    knowledgeGraph: {
      nodes: [
        { id: 'case-masdar', label: 'Masdar Hossain Case', type: 'case' },
        { id: 'stat-art22', label: 'Article 22 Constitution', type: 'statute' },
        { id: 'stat-art115', label: 'Article 115 Constitution', type: 'section' },
        { id: 'judge-kamal', label: 'Chief Justice Mustafa Kamal', type: 'judge' },
        { id: 'party-masdar', label: 'Masdar Hossain', type: 'party' },
        { id: 'princ-separation', label: 'Separation of Powers', type: 'principle' }
      ],
      links: [
        { source: 'case-masdar', target: 'stat-art22', label: 'enforces' },
        { source: 'case-masdar', target: 'stat-art115', label: 'interprets' },
        { source: 'case-masdar', target: 'judge-kamal', label: 'delivered by' },
        { source: 'case-masdar', target: 'party-masdar', label: 'petitioner' },
        { source: 'case-masdar', target: 'princ-separation', label: 'declares' }
      ]
    },
    aiSummary: {
      facts: "Subordinate judicial officers challenged civil service administrative rules grouping them under general executive cadres.",
      issue: "Whether the state is constitutionally bound to establish an independent judicial service separated from the administrative executive branch.",
      held: "Yes. Formulated 12 binding directives establishing the Bangladesh Judicial Service Commission (BJSC) and separating courts.",
      keyPrinciple: "Judicial independence is a basic structural feature of the Bangladesh Constitution; the judiciary must stand completely isolated from executive influence."
    }
  },
  {
    id: 'blast-v-state-2003',
    title: 'BLAST vs State (Section 54 Guidelines)',
    court: 'Supreme Court (High Court Division)',
    country: 'Bangladesh',
    bench: ['Justice Md. Hamidul Haque', 'Justice Salma Masud Chowdhury'],
    decisionDate: '2003-04-07',
    caseType: 'Writ Petition / Public Interest Litigation',
    status: 'Reported / Landmark Human Rights',
    citation: '55 DLR (HCD) 363',
    parties: 'Bangladesh Legal Aid and Services Trust (BLAST) (Petitioner) vs. State & Police (Respondents)',
    subject: 'Criminal Procedure - Abuse of police arrest powers under Section 54 CrPC and remand under Section 167 CrPC',
    proceduralHistory: [
      { id: 'b1', stage: 'Police Stations', outcome: 'Repeated instances of arbitrary arrest, custody torture, and custodial deaths of innocent citizens on mere suspicion.', arrow: true },
      { id: 'b2', stage: 'High Court Division', outcome: 'Public interest litigation writ filed by BLAST. Allowed and formulated 15 strict arrest guidelines.', arrow: true },
      { id: 'b3', stage: 'Appellate Division', outcome: 'Upheld and affirmed these guidelines as binding constitutional directives.' }
    ],
    facts: [
      { id: 'bf1', text: 'Police routinely arrested individuals on mere suspicion without warrants under Section 54 of CrPC.' },
      { id: 'bf2', text: 'Arrestees were routinely remanded to police custody under Section 167 of CrPC, where custody abuse occurred.' },
      { id: 'bf3', text: 'A young student died in police custody following arbitrary arrest and torture, triggering massive public concern.' },
      { id: 'bf4', text: 'Human rights organizations petitioned the court for structural judicial guidelines.' }
    ],
    issues: [
      { id: 'bis1', text: 'Whether Section 54 CrPC gives police absolute, unreviewable discretion to arrest citizens.', answer: 'No', elaborated: 'Suspicion must be based on reasonable, objective, and recorded criteria, not subjective whims.' },
      { id: 'bis2', text: 'Whether Magistrates are bound to apply judicial mind before granting remand under Section 167 CrPC.', answer: 'Yes', elaborated: 'Magistrates must not grant custody remand as a mechanical routine; reasons must be written down.' }
    ],
    statutes: [
      { id: 'bst1', actName: 'Code of Criminal Procedure, 1898', section: 'Section 54', role: 'Governs police power to arrest individuals without warrant under suspicious categories.', temporalStatus: 'Valid' },
      { id: 'bst2', actName: 'Code of Criminal Procedure, 1898', section: 'Section 167', role: 'Controls the procedure when investigation cannot be completed in twenty-four hours, governing remand.', temporalStatus: 'Valid' },
      { id: 'bst3', actName: 'The Constitution of Bangladesh', section: 'Article 33', role: 'Guarantees protection against arbitrary arrest and detention, requiring production before magistrate within 24 hours.', temporalStatus: 'Valid' }
    ],
    principles: [
      { id: 'bpr1', text: 'Personal liberty is a sacred constitutional right and cannot be restricted arbitrarily.' },
      { id: 'bpr2', text: 'A suspect is innocent until proven guilty, and must be protected from custodial coercion.' }
    ],
    ratioDecidendi: [
      { id: 'bra1', text: 'Police must record full reasons prior to making an arrest under Section 54.' },
      { id: 'bra2', text: 'No arrestee can be remanded to police custody without a reasoned judicial order by a Magistrate.' }
    ],
    directions: [
      { id: 'bdr1', step: 'Step 1', entity: 'Arresting Officer', action: 'Disclose official identity and prepare a formal arrest memo containing reasons.', timeline: 'At time of arrest' },
      { id: 'bdr2', step: 'Step 2', entity: 'Arresting Officer', action: 'Permit the arrestee to meet their legal counsel or family representatives.', timeline: 'Within 3 hours of arrest' },
      { id: 'bdr3', step: 'Step 3', entity: 'Arresting Officer', action: 'Get the arrestee medically examined if they complain of physical injury.', timeline: 'Within 24 hours' },
      { id: 'bdr4', step: 'Step 4', entity: 'Magistrate', action: 'Refuse custody remand if police fail to produce reasoned diaries and progress reports.', timeline: 'At first production' }
    ],
    paragraphs: [
      { id: 'bp1', index: 1, category: 'Metadata', text: 'BLAST v. Bangladesh. Writ Petition under Article 102. High Court Division of the Supreme Court of Bangladesh.' },
      { id: 'bp2', index: 2, category: 'Facts', text: 'This writ petition highlights the alarming rise of custodial deaths and arbitrary arrests under Section 54 CrPC, violating the right to life.' },
      { id: 'bp3', index: 3, category: 'Law', text: 'Article 33 of the Constitution provides clear rules on arrest. These rules cannot be made redundant by obsolete colonial criminal rules.' },
      { id: 'bp4', index: 4, category: 'Reasoning', text: 'The state is bound to protect citizens from police brutality. Even a suspect retains their fundamental human dignity. Police officers who abuse their powers must face disciplinary actions.' },
      { id: 'bp5', index: 5, category: 'Directions', text: 'We issue 15 guidelines. Police must prepare written records immediately, allow immediate access to lawyers, and magistrates must strictly monitor detention records.' }
    ],
    knowledgeGraph: {
      nodes: [
        { id: 'case-blast', label: 'BLAST v. State', type: 'case' },
        { id: 'stat-54', label: 'Section 54 CrPC', type: 'section' },
        { id: 'stat-167', label: 'Section 167 CrPC', type: 'section' },
        { id: 'stat-art33', label: 'Article 33 Constitution', type: 'statute' },
        { id: 'judge-hamidul', label: 'Justice Hamidul Haque', type: 'judge' },
        { id: 'party-blast', label: 'BLAST', type: 'party' },
        { id: 'princ-liberty', label: 'Personal Liberty Guard', type: 'principle' }
      ],
      links: [
        { source: 'case-blast', target: 'stat-54', label: 'restricts' },
        { source: 'case-blast', target: 'stat-167', label: 'regulates' },
        { source: 'case-blast', target: 'stat-art33', label: 'enforces' },
        { source: 'case-blast', target: 'judge-hamidul', label: 'authored by' },
        { source: 'case-blast', target: 'party-blast', label: 'petitioner' },
        { source: 'case-blast', target: 'princ-liberty', label: 'establishes' }
      ]
    },
    aiSummary: {
      facts: "Widespread abuse of Section 54 CrPC (arrest on suspicion) and Section 167 (remand) leading to torture and death of students and citizens.",
      issue: "Whether police have unchecked power to arrest without warrant, and whether courts can mandate preventive guidelines.",
      held: "No. High Court issued 15 strict directives to arrest, detain, and remand suspects, limiting administrative police excesses.",
      keyPrinciple: "Personal liberty under Article 32 cannot be curtailed save in accordance with due process of law. Police discretion must be structurally audited."
    }
  },
  {
    id: 'turag-river-2019',
    title: 'National River Protection Commission vs HRPB (Turag River Case)',
    court: 'Supreme Court (Appellate Division)',
    country: 'Bangladesh',
    bench: ['Hasan Foez Siddique CJ', 'Obaidul Hassan J', 'M. Enayetur Rahim J'],
    decisionDate: '2019-11-23',
    caseType: 'Civil Appeal / Landmark Writ',
    status: 'Reported / Environmental Milestone',
    citation: 'Civil Appeal No. 3039 of 2019',
    parties: 'National River Protection Commission (NRPC) (Appellant) vs. Human Rights and Peace for Bangladesh (HRPB) & Others (Respondents)',
    subject: 'Environmental Law - Grant of legal personhood to natural water systems - Public Trust Doctrine & Loco Parentis',
    proceduralHistory: [
      { id: 't1', stage: 'Encroachment Reports', outcome: 'Unregulated dumping, industrial land grabbing, and severe pollution of Turag River beds.', arrow: true },
      { id: 't2', stage: 'High Court Division', outcome: 'Declared Turag River a legal person with specific rights. Appointed River Commission as parent custodian.', arrow: true },
      { id: 't3', stage: 'Appellate Division', outcome: 'Upheld and expanded the ruling to cover all rivers, canals, and wetlands of Bangladesh.' }
    ],
    facts: [
      { id: 'tf1', text: 'Turag River suffered extreme industrial pollution, brick kiln encroachment, and sand-filling operations.' },
      { id: 'tf2', text: 'The government and environmental watchdogs failed to protect water boundaries effectively.' },
      { id: 'tf3', text: 'Human Rights and Peace for Bangladesh (HRPB) filed a public interest litigation petition.' },
      { id: 'tf4', text: 'The Supreme Court investigated the ecological damage, finding it posed an imminent survival risk.' }
    ],
    issues: [
      { id: 'tis1', text: 'Whether a natural river body can be declared a legal person with standing to sue in court.', answer: 'Yes', elaborated: 'Rivers can possess legal rights as juridical persons to ensure their active protection under the locus parentis of state bodies.' },
      { id: 'tis2', text: 'Whether environmental polluters can be subjected to civil and administrative disqualifications.', answer: 'Yes', elaborated: 'Those who violate the integrity of rivers can be barred from bank loans and democratic elections to enforce public deterrence.' }
    ],
    statutes: [
      { id: 'tst1', actName: 'The Constitution of Bangladesh', section: 'Article 18A', role: 'Directs the state to protect, improve, and conserve the environment, rivers, and wildlife.', temporalStatus: 'Valid' },
      { id: 'tst2', actName: 'National River Protection Commission Act, 2013', section: 'Section 5', role: 'Defines the powers and responsibilities of the River Commission as the legal custodian.', temporalStatus: 'Valid' }
    ],
    principles: [
      { id: 'tpr1', text: 'Nature possesses inherent rights to exist, persist, and regenerate.' },
      { id: 'tpr2', text: 'The Public Trust Doctrine prevents the privatization or destruction of vital public natural assets.' }
    ],
    ratioDecidendi: [
      { id: 'tra1', text: 'All rivers, canals, and wetlands in Bangladesh are juridical persons possessing rights.' },
      { id: 'tra2', text: 'The National River Protection Commission is the legal loco parentis guardian of all water systems.' }
    ],
    directions: [
      { id: 'tdr1', step: 'Step 1', entity: 'District Administrations', action: 'Demolish all illegal industrial structures and encroachments along river banks.', timeline: 'Within 30 days' },
      { id: 'tdr2', step: 'Step 2', entity: 'Central Bank of Bangladesh', action: 'Issue directives prohibiting banks from giving loans to certified river polluters.', timeline: 'Immediate' },
      { id: 'tdr3', step: 'Step 3', entity: 'Election Commission', action: 'Disqualify documented river encroachments from contesting local and national elections.', timeline: 'Immediate' }
    ],
    paragraphs: [
      { id: 'tp1', index: 1, category: 'Metadata', text: 'National River Protection Commission vs HRPB. Appellate Division of the Supreme Court of Bangladesh.' },
      { id: 'tp2', index: 2, category: 'Facts', text: 'This dispute concerns the massive degradation of the Turag River. Land grabbers have built factories on the active river bed.' },
      { id: 'tp3', index: 3, category: 'Law', text: 'Article 18A of the Constitution states that the state shall protect and improve the environment for citizens.' },
      { id: 'tp4', index: 4, category: 'Reasoning', text: 'Rivers are the lifeblood of Bangladesh. If rivers die, the entire nation faces ecological collapse. Traditional laws have failed. We must grant legal personhood to these water bodies so they can be defended in court as legal victims.' },
      { id: 'tp5', index: 5, category: 'Directions', text: 'We declare all rivers legal persons. We order immediate evictions, bank credit bans, and electoral disqualifications for all polluters.' }
    ],
    knowledgeGraph: {
      nodes: [
        { id: 'case-turag', label: 'Turag River Case', type: 'case' },
        { id: 'stat-art18a', label: 'Article 18A Constitution', type: 'statute' },
        { id: 'stat-nrpc', label: 'NRPC Act 2013', type: 'statute' },
        { id: 'judge-foez', label: 'Chief Justice Hasan Foez', type: 'judge' },
        { id: 'party-hrpb', label: 'HRPB', type: 'party' },
        { id: 'princ-trust', label: 'Public Trust Doctrine', type: 'principle' }
      ],
      links: [
        { source: 'case-turag', target: 'stat-art18a', label: 'enforces' },
        { source: 'case-turag', target: 'stat-nrpc', label: 'applies' },
        { source: 'case-turag', target: 'judge-foez', label: 'delivered by' },
        { source: 'case-turag', target: 'party-hrpb', label: 'petitioner' },
        { source: 'case-turag', target: 'princ-trust', label: 'implements' }
      ]
    },
    aiSummary: {
      facts: "Widespread, uncontrolled illegal factory construction and toxic effluent discharge endangering the Turag river basin.",
      issue: "Whether rivers can be granted legal rights and who should stand as their legal custodian.",
      held: "Yes. Declared all rivers, canals, and wetlands as living entities/juridical persons with NRPC as their legal custodian.",
      keyPrinciple: "Watercourses have a fundamental legal right to flow and exist free from encroachment; violating river borders carries election bans and financial loan embargoes."
    }
  }
];
