/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LegalDocument } from '../types';

export const SEEDED_STATUTES = [
  {
    id: 'const-art-27',
    title: 'Article 27, Constitution of Bangladesh',
    citation: 'Constitution, Art. 27',
    court: 'Supreme Court',
    date: '1972-12-16',
    judges: ['Constituent Assembly'],
    parties: 'People of Bangladesh',
    subject: 'Fundamental Rights - Equality before law',
    summary: 'All citizens are equal before law and are entitled to equal protection of law.',
    text: 'Article 27. Equality before law: All citizens are equal before law and are entitled to equal protection of law. This guarantees that the state shall not deny to any person equality before the law or the equal protection of the laws within the territory of Bangladesh.'
  },
  {
    id: 'const-art-32',
    title: 'Article 32, Constitution of Bangladesh',
    citation: 'Constitution, Art. 32',
    court: 'Supreme Court',
    date: '1972-12-16',
    judges: ['Constituent Assembly'],
    parties: 'People of Bangladesh',
    subject: 'Fundamental Rights - Protection of right to life and personal liberty',
    summary: 'No person shall be deprived of life or personal liberty save in accordance with law.',
    text: 'Article 32. Protection of right to life and personal liberty: No person shall be deprived of life or personal liberty save in accordance with law. This stands as the absolute structural guardrail against unlawful custody, forced disappearances, and extrajudicial actions.'
  },
  {
    id: 'penal-300',
    title: 'Section 300, The Penal Code, 1860',
    citation: 'Penal Code 1860, Sec. 300',
    court: 'General Criminal Law',
    date: '1860-10-06',
    judges: ['Law Commission'],
    parties: 'State',
    subject: 'Culpable Homicide and Murder',
    summary: 'Defines murder and culpable homicide, establishing exceptions where homicide does not amount to murder.',
    text: 'Section 300. Murder: Except in the cases hereinafter excepted, culpable homicide is murder, if the act by which the death is caused is done with the intention of causing death, or if it is done with the intention of causing such bodily injury as the offender knows to be likely to cause the death of the person...'
  },
  {
    id: 'penal-302',
    title: 'Section 302, The Penal Code, 1860',
    citation: 'Penal Code 1860, Sec. 302',
    court: 'General Criminal Law',
    date: '1860-10-06',
    judges: ['Law Commission'],
    parties: 'State',
    subject: 'Punishment for Murder',
    summary: 'Establishes the penalty for murder: death or imprisonment for life, and also liability to fine.',
    text: 'Section 302. Punishment for murder: Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine. This is the cornerstone of major criminal indictments in Bangladesh.'
  },
  {
    id: 'penal-96',
    title: 'Section 96, The Penal Code, 1860',
    citation: 'Penal Code 1860, Sec. 96',
    court: 'General Criminal Law',
    date: '1860-10-06',
    judges: ['Law Commission'],
    parties: 'General Exception',
    subject: 'Right of Private Defence',
    summary: 'Declares that nothing is an offence which is done in the exercise of the right of private defence.',
    text: 'Section 96. Things done in private defence: Nothing is an offence which is done in the exercise of the right of private defence. Every person has a right to defend his own body, and the body of any other person, and property against theft, robbery, mischief or criminal trespass.'
  },
  {
    id: 'crpc-54',
    title: 'Section 54, The Code of Criminal Procedure, 1898',
    citation: 'CrPC 1898, Sec. 54',
    court: 'Procedural Law',
    date: '1898-07-01',
    judges: ['Legislative Council'],
    parties: 'State',
    subject: 'Arrest without warrant',
    summary: 'When police may arrest without warrant. This section specifies nine circumstances under which a police officer may arrest a person without an order from a Magistrate.',
    text: 'Section 54. When police may arrest without warrant: Any police officer may, without an order from a Magistrate and without a warrant, arrest any person who has been concerned in any cognizable offence, or against whom a reasonable complaint has been made, or credible information received, or a reasonable suspicion exists of his having been so concerned...'
  },
  {
    id: 'crpc-103',
    title: 'Section 103, The Code of Criminal Procedure, 1898',
    citation: 'CrPC 1898, Sec. 103',
    court: 'Procedural Law',
    date: '1898-07-01',
    judges: ['Legislative Council'],
    parties: 'State',
    subject: 'Search in presence of witnesses',
    summary: 'Requires that searches by police officers must be conducted in the presence of two or more respectable inhabitants of the locality.',
    text: 'Section 103. Search to be made in presence of witnesses: Before making a search under this Chapter, the officer or other person about to make it shall call upon two or more respectable inhabitants of the locality in which the place to be searched is situate to attend and witness the search and may issue an order in writing to them or any of them so to do...'
  },
  {
    id: 'dowry-3',
    title: 'Section 3, The Dowry Prohibition Act, 2018',
    citation: 'Dowry Act 2018, Sec. 3',
    court: 'Special Law',
    date: '2018-10-18',
    judges: ['Jatiya Sangsad'],
    parties: 'State',
    subject: 'Penalty for giving or taking dowry',
    summary: 'Imposes penalties of up to 5 years imprisonment and 50,000 BDT fine for giving, taking, or demanding dowry.',
    text: 'Section 3. Penalty for giving or taking dowry: If any party to a marriage gives or takes or demands or abets the giving or taking of dowry, he or she shall be punished with imprisonment for a term which may extend to five years, but shall not be less than one year, or with fine which may extend to fifty thousand taka, or with both.'
  },
  {
    id: 'contract-73',
    title: 'Section 73, The Contract Act, 1872',
    citation: 'Contract Act 1872, Sec. 73',
    court: 'Civil/Commercial Law',
    date: '1872-04-25',
    judges: ['Legislative Council'],
    parties: 'Civil',
    subject: 'Compensation for loss or damage caused by breach of contract',
    summary: 'Establishes the rule for damages resulting from a breach of contract, providing compensation for naturally arising losses.',
    text: 'Section 73. Compensation for loss or damage caused by breach of contract: When a contract has been broken, the party who suffers by such breach is entitled to receive, from the party who has broken the contract, compensation for any loss or damage caused to him thereby, which naturally arose in the usual course of things from such breach, or which the parties knew, when they made the contract, to be likely to result from the breach of it...'
  },
  {
    id: 'sr-5',
    title: 'Section 5, The Specific Relief Act, 1877',
    citation: 'Specific Relief Act 1877, Sec. 5',
    court: 'General Civil Law',
    date: '1877-02-07',
    judges: ['Legislative Council'],
    parties: 'Civil',
    subject: 'Specific relief how given',
    summary: 'Specifies five methods through which specific relief is given, including taking possession, ordering performance, prevention, declaring rights, and appointing a receiver.',
    text: 'Section 5. Specific relief how given: Specific relief is given (a) by taking possession of certain property and delivering it to a claimant; (b) by ordering a party to do the very act which he is under an obligation to do; (c) by preventing a party from doing that which he is under an obligation not to do; (d) by determining and declaring the rights of parties otherwise than by an award of compensation; or (e) by appointing a receiver.'
  },
  {
    id: 'sr-9',
    title: 'Section 9, The Specific Relief Act, 1877',
    citation: 'Specific Relief Act 1877, Sec. 9',
    court: 'General Civil Law',
    date: '1877-02-07',
    judges: ['Legislative Council'],
    parties: 'Civil',
    subject: 'Suit by person dispossessed of immoveable property',
    summary: 'Provides a quick, summary remedy for persons dispossessed of immovable property without consent and otherwise than in due course of law, to recover possession regardless of title.',
    text: 'Section 9. Suit by person dispossessed of immoveable property: If any person is dispossessed without his consent of immoveable property otherwise than in due course of law, he or any person claiming through him may, by suit, recover possession thereof, notwithstanding any other title that may be set up in such suit. No suit under this section shall be brought against the Government.'
  },
  {
    id: 'sr-12',
    title: 'Section 12, The Specific Relief Act, 1877',
    citation: 'Specific Relief Act 1877, Sec. 12',
    court: 'General Civil Law',
    date: '1877-02-07',
    judges: ['Legislative Council'],
    parties: 'Civil',
    subject: 'Cases in which specific performance enforceable',
    summary: 'Defines the conditions under which specific performance of contracts may be enforced, especially when pecuniary compensation would not afford adequate relief.',
    text: 'Section 12. Cases in which specific performance enforceable: Except as otherwise provided in this Chapter, the specific performance of any contract may in the discretion of the Court be enforced— (a) when the act agreed to be done is in the performance, wholly or partly, of a trust; (b) when there exists no standard for ascertaining the actual damage caused by non-performance of the act agreed to be done; (c) when the act agreed to be done is such that pecuniary compensation for its non-performance would not afford adequate relief; or (d) when it is probable that pecuniary compensation cannot be got for the non-performance of the act agreed to be done.'
  },
  {
    id: 'sr-31',
    title: 'Section 31, The Specific Relief Act, 1877',
    citation: 'Specific Relief Act 1877, Sec. 31',
    court: 'General Civil Law',
    date: '1877-02-07',
    judges: ['Legislative Council'],
    parties: 'Civil',
    subject: 'When instrument may be rectified',
    summary: 'Allows parties to institute a suit for rectification when a contract or instrument does not truly express their intention due to fraud or mutual mistake.',
    text: 'Section 31. When instrument may be rectified: When, through fraud or a mutual mistake of the parties, a contract or other instrument in writing does not truly express their intention, either party, or his representative in interest, may institute a suit to have the instrument rectified.'
  },
  {
    id: 'sr-42',
    title: 'Section 42, The Specific Relief Act, 1877',
    citation: 'Specific Relief Act 1877, Sec. 42',
    court: 'General Civil Law',
    date: '1877-02-07',
    judges: ['Legislative Council'],
    parties: 'Civil',
    subject: 'Discretion of Court as to declaration of status or right',
    summary: 'Empowers any person entitled to any legal character, or to any right as to any property, to seek a declaratory decree against someone denying such character or right.',
    text: 'Section 42. Discretion of Court as to declaration of status or right: Any person entitled to any legal character, or to any right as to any property, may institute a suit against any person denying, or interested to deny, his title to such character or right, and the Court may in its discretion make therein a declaration that he is so entitled, and the plaintiff need not in such suit ask for any further relief: Provided that no Court shall make any such declaration where the plaintiff, being able to seek further relief than a mere declaration of title, omits to do so.'
  }
];

export const SEEDED_PRECEDENTS: LegalDocument[] = [
  {
    id: 'prec-masdar',
    title: 'Secretary, Ministry of Finance v. Masdar Hossain',
    citation: '52 DLR (AD) 82',
    court: 'Supreme Court (Appellate Division)',
    date: '1999-12-02',
    judges: ['Mustafa Kamal CJ', 'Latifur Rahman J', 'Bimalendu Bikash Roy Choudhury J', 'AM Mahmudur Rahman J'],
    parties: 'Secretary, Ministry of Finance v. Masdar Hossain and others',
    subject: 'Constitutional Law - Separation of Judiciary - Independence of the judicial organ',
    summary: 'The landmark judgment establishing the separation of the judiciary from the executive branch of government. Formulated 12 directives for creating a separate Judicial Service Commission and ensuring judicial financial independence.',
    text: 'Held: The judicial service is a core service of the Republic but stands distinct from civil administrative services under Article 115. The executive cannot control judicial appointments, promotions, or discipline. We direct the formulation of independent judicial service rules under Article 133 to implement judicial separation, securing the independence of magistrate courts from administrative executive officers.'
  },
  {
    id: 'prec-blast-54',
    title: 'BLAST v. Bangladesh (Section 54 Guidelines)',
    citation: '55 DLR (HCD) 363',
    court: 'Supreme Court (High Court Division)',
    date: '2003-04-07',
    judges: ['Md. Hamidul Haque J', 'Salma Masud Chowdhury J'],
    parties: 'Bangladesh Legal Aid and Services Trust (BLAST) v. State',
    subject: 'Procedural Rights - Arbitrary arrest - Guidelines for Section 54 CrPC and Section 167 CrPC',
    summary: 'Laid down 15 historic structural directives governing police arrest powers under Section 54 of CrPC and remand under Section 167 of CrPC to protect citizens from torture and abuse in police custody.',
    text: 'Held: Section 54 CrPC does not give police absolute, arbitrary power to arrest on mere suspicion. Arresting officers must record reasons, disclose identity, allow access to lawyers/family, and present arrests to magistrates immediately with medical records. Detention in remand must be authorized by a Magistrate through judicial reasoning, not as a matter of routine.'
  },
  {
    id: 'prec-opu-dowry',
    title: 'State v. Opu and others',
    citation: '52 DLR (AD) 112',
    court: 'Supreme Court (Appellate Division)',
    date: '2000-05-14',
    judges: ['Latifur Rahman CJ', 'Mainur Reza Chowdhury J'],
    parties: 'State v. Opu and others',
    subject: 'Special Law - Dowry violence - Sufficiency of testimony of injured victim spouse',
    summary: 'Affirmed that in prosecutions under the Dowry Prohibition legislation, the sole uncorroborated testimony of the victim wife is sufficient to sustain a conviction if her credibility is unshaken during cross-examination.',
    text: 'Held: In crimes occurring behind closed domestic doors, such as dowry demands and marital violence, independent third-party eyewitnesses are rarely available. Imposing a strict rule of corroboration would defeat the remedial purpose of the legislation. The consistent, credible deposition of the victim spouse is sufficient to prove guilt beyond reasonable doubt.'
  },
  {
    id: 'prec-arumugam',
    title: 'Arumugam v. State',
    citation: '12 BLD 45',
    court: 'Supreme Court (High Court Division)',
    date: '1992-02-18',
    judges: ['A.H. Amin J'],
    parties: 'Arumugam v. The State',
    subject: 'Criminal Law - Right of Private Defence of Body - Imminence of danger',
    summary: 'Analyzed the boundaries of the right of private self-defense under Section 96-106 of the Penal Code. Held that the victim is not expected to measure the force of blows in golden scales when facing imminent life-threatening threat.',
    text: 'Held: The right of private self-defense commences as soon as a reasonable apprehension of danger to the body arises. When a person is attacked by lethal weapons, they cannot be expected to modulate their response with mathematical precision. The death of the assailant is justified if the fear of grievous hurt was reasonable.'
  },
  {
    id: 'prec-sushil-55-dlr',
    title: 'Sushil Kumar Paik v. Harendra Nath Samadder',
    citation: '55 DLR (AD) 9',
    court: 'Supreme Court (Appellate Division)',
    date: '2003-01-15',
    judges: ['Mainur Reza Chowdhury CJ', 'Md. Ruhul Amin J'],
    parties: 'Sushil Kumar Paik and another v. Harendra Nath Samadder and another',
    subject: 'Specific Relief - Injunction - Forgery issue in permanent injunction simpliciter',
    summary: 'Held that in a suit for permanent injunction simpliciter under the Specific Relief Act, an issue of whether the registered deed is forged or not cannot be decided.',
    text: 'Held: Sections 5 & 56 — In a suit for permanent injunction simpliciter, an issue of whether the registered deed is forged or not cannot be decided. The proper recourse for establishing deed forgery lies in a substantive declaratory suit or cancellation suit, rather than resolving complex title/forgery questions within a simple restraining injunction application.'
  },
  {
    id: 'prec-pramatha-29-dlr',
    title: 'Pramatha Nath v. Shamsur Rahman',
    citation: '29 DLR 347',
    court: 'Supreme Court (High Court Division)',
    date: '1977-04-12',
    judges: ['M.A. Rashid J'],
    parties: 'Pramatha Nath v. Shamsur Rahman',
    subject: 'Specific Relief - Section 9 dispossession - Enemy property lease impact',
    summary: 'Held that dispossession without consent and otherwise than in due course of law is protected under Section 9, and subsequent lease from Enemy Property Authority does not validate the illegal action.',
    text: 'Held: Section 9 — "Dispossession not in course of law" — On the date of dispossession, the defendant dispossessed the plaintiff "otherwise than in due course of law." The subsequent acquisition of title, if any, by way of lease from Enemy Property Authority did not validate the illegal dispossession by the defendants. The dispossessed party is entitled to be restored to possession irrespective of any title set up.'
  },
  {
    id: 'prec-abdur-7-dlr',
    title: 'Abdur Rahman v. Mofizuddin Bhuiya',
    citation: '7 DLR 335',
    court: 'Supreme Court (High Court Division)',
    date: '1955-05-18',
    judges: ['Amin Ahmed J'],
    parties: 'Abdur Rahman v. Mofizuddin Bhuiya',
    subject: 'Specific Relief - Section 9 - Possession in due course of law',
    summary: 'Clarified that to bar a suit under Section 9, the possession in "due course of law" does not necessarily have to be possession resulting from proceedings between the same parties.',
    text: 'Held: Section 9 — In order to bar a suit under Section 9, the words "in due course of law" do not mean that the party against whom a suit for recovery of possession is filed must, in due course of law, be in possession as a result of the proceedings between the same parties.'
  },
  {
    id: 'prec-bazlur-34-dlr',
    title: 'Bazlur Rahman Bhuiyan v. Bangladesh Shipping Corporation',
    citation: '34 DLR (AD) 42',
    court: 'Supreme Court (Appellate Division)',
    date: '1982-03-24',
    judges: ['Kemaluddin Hossain CJ', 'Fazle Munim J'],
    parties: 'Bazlur Rahman Bhuiyan v. Bangladesh Shipping Corporation',
    subject: 'Specific Performance of Contract - Movable property - Explanation to Section 12',
    summary: 'Affirmed that the explanation to Section 12 of the Specific Relief Act raises a rebuttable presumption that breach of contract for movable property can be adequately relieved by pecuniary compensation.',
    text: 'Held: Section 12 Explanation — The explanation to Section 12 of the Specific Relief Act raises a presumption that the breach of a contract to transfer movable property can be adequately relieved by compensation, unless and until the contrary is proved. This presumption is rebuttable, and the onus lies on the party seeking specific performance to demonstrate that pecuniary compensation is inadequate.'
  },
  {
    id: 'prec-anwara-5-blc',
    title: 'Anwara Begum v. Md Karimul Haque',
    citation: '5 BLC (AD) 119',
    court: 'Supreme Court (Appellate Division)',
    date: '2000-02-14',
    judges: ['Latifur Rahman CJ', 'Bimalendu Bikash Roy Choudhury J'],
    parties: 'Anwara Begum v. Md Karimul Haque and others',
    subject: 'Specific Performance of Contract - Immovable property - Time as essence of contract',
    summary: 'Ruled that in contracts for sale of immovable property, time is generally not of the essence, and hardship of the defendant is not a ground to refuse specific performance.',
    text: 'Held: Section 12 — In a suit for specific performance of contract relating to immovable property, time is not of the essence of the contract, nor hardship of the defendant is a ground to refuse relief in a suit for specific performance of contract. Contracts relating to land are uniquely situated, and courts should lean towards enforcing them unless specific inequitable circumstances exist.'
  },
  {
    id: 'prec-lalbanu-41-dlr',
    title: 'Lalbanu Bibi v. Nourjan Banu',
    citation: '41 DLR 519',
    court: 'Supreme Court (High Court Division)',
    date: '1989-06-18',
    judges: ['A.T.M. Afzal J'],
    parties: 'Lalbanu Bibi v. Nourjan Banu',
    subject: 'Rectification of Instrument - Section 31 requirements',
    summary: 'Delineated that four conditions must be satisfied to obtain a decree for rectification of a deed under Section 31 of the Specific Relief Act.',
    text: 'Held: Section 31 — Four conditions for the rectification of the deed must be satisfied as contemplated in Section 31 of the Act. The plaintiff must show: (1) there was an instrument/deed, (2) it does not express the real intention of the parties, (3) this was due to mutual mistake or fraud, and (4) the rectification does not prejudice rights acquired by third parties in good faith.'
  },
  {
    id: 'prec-jinnat-27-dlr',
    title: 'Jinnat Ali Mukhtear v. Abdul Majid',
    citation: '27 DLR 385',
    court: 'Supreme Court (High Court Division)',
    date: '1975-01-20',
    judges: ['F.K.M. Munim J'],
    parties: 'Jinnat Ali Mukhtear v. Abdul Majid',
    subject: 'Declaratory Decrees - Section 42 - Possessory title sufficiency',
    summary: 'Held that a suit for declaration of possessory right/ownership by a person in possession of the suit land as a bargadar is maintainable under Section 42.',
    text: 'Held: Section 42 — In the instant case, the plaintiff is in possession of the suit land as a bargadar as well as by virtue of a power of attorney executed by the recorded owner. The plaintiff does not claim any title for himself. All that he claims is the possessory right or possessory ownership in the suit land. The suit at the instance of the plaintiff is quite maintainable and is not hit by section 42 of the Specific Relief Act.'
  },
  {
    id: 'prec-goalundo-22-dlr',
    title: 'Goalundo Fishing Industries v. Pakistan',
    citation: '22 DLR 349',
    court: 'Supreme Court (High Court Division)',
    date: '1970-03-12',
    judges: ['A.M. Sayem J'],
    parties: 'Goalundo Fishing Industries v. Pakistan',
    subject: 'Declaratory Decrees - Section 42 - Eviction notice declaration validity',
    summary: 'Decided that a suit seeking a declaration that a notice to vacate is illegal is not a maintainable declaratory action under Section 42 of the Specific Relief Act.',
    text: 'Held: Section 42 — Suit for declaration that notice served on the plaintiff for vacating the premises is illegal, is not a suit which falls under section 42 of the Specific Relief Act. Section 42 only sanctions declarations regarding "legal character" or "right as to any property", and does not cover general administrative or operational notice disputes.'
  }
];

export const HISTORICAL_TIMELINE = [
  {
    year: '1860',
    event: 'The Penal Code Enacted',
    description: 'The primary substantive criminal code of Bangladesh is established, codifying offenses and penalties from theft to murder.'
  },
  {
    year: '1872',
    event: 'The Evidence Act & Contract Act Enacted',
    description: 'Codifies the rules of civil contracts and judicial evidence admissibility, laying the administrative legal foundations.'
  },
  {
    year: '1877',
    event: 'The Specific Relief Act Enacted',
    description: 'Codifies the principles of equity jurisprudence in Bangladesh, defining remedies for possession, performance, rectification, rescission, cancellation, declaration, receivership, and injunctions.'
  },
  {
    year: '1898',
    event: 'The Code of Criminal Procedure Enacted',
    description: 'Establishes the entire criminal justice procedural framework, detailing police powers, trials, bail, and appeals.'
  },
  {
    year: '1972',
    event: 'Constitution of Bangladesh Adopted',
    description: 'The supreme law of the independent nation of Bangladesh is adopted, securing basic human rights and judicial review under Article 102.'
  },
  {
    year: '1999',
    event: 'Masdar Hossain Landmark Judgment',
    description: 'The Supreme Court rules that the judiciary must be separated from executive control. This sets in motion legal reform leading to independent magistrate courts.'
  },
  {
    year: '2003',
    event: 'BLAST Section 54 Guidelines Issued',
    description: 'High Court issues safeguards to prevent police abuse during arrest and remand, representing a massive leap in human rights advocacy.'
  },
  {
    year: '2007',
    event: 'Official Separation of Judiciary',
    description: 'Judiciary is formally separated from the executive on November 1, 2007, under the caretaker government through criminal procedure amendments.'
  },
  {
    year: '2018',
    event: 'Dowry Prohibition Act Updated',
    description: 'The Dowry Act is modernized to introduce stiffer penalties and handle false claims, introducing Section 3 criminal indictments.'
  }
];
