# HAYAT: Bangladesh Legal Intelligence Platform
### Administrator & User Guideline + Free-Tier Deployment Manual

This guide outlines how to use and administer the **HAYAT** platform, along with a production-grade blueprint for deploying the platform on **free-tier** cloud infrastructures (GitHub, Vercel, Neon/Supabase, and Koyeb/Render) while transitioning from the React-Express prototype to the 17-Agent distributed microservices architecture.

---

## 1. Platform Operational Guide

### A. Legal Practitioner & Researcher Workflow (User)
The core research workspace consists of two integrated components:
1. **HAYAT Semantic Search Engine**:
   - **How to Use**: Input conversational legal questions in English or Bangla (e.g., *"remand guidelines in BLAST case"* or *"punishment for demanding dowry under 2018 Act"*).
   - **Concept Expansion**: HAYAT passes the query to a server-side Gemini LLM to automatically expand keywords, identifying matching acts, sections, and relevant precedents.
   - **Act Filtering**: Adjust the sliders for weight distribution (Precedent Weight, Act Weight, Text Weight) to fine-tune search relevance rankings.
2. **Bangladesh Legal Citation Resolver**:
   - **How to Use**: Enter a standard citation string (e.g., `55 DLR 363` or `52 DLR (AD) 82`).
   - **Outcome**: The resolver extracts the verified case title, decision date, judge panel, acts applied, and holds a detailed precedent summary.

### B. Interactive Legal Reasoning Workflow (ILRMF)
The **Interactive Legal Reasoning & Mapping Framework (ILRMF)** evaluates raw facts deterministically:
1. **Submit Case Facts**: Input a timeline or descriptive scenario of a dispute or arrest.
2. **Analysis Cycle**: Click **Run ILRMF Parser**. The engine simulates a 9-step state-machine audit trail:
   - *Fact Extraction* $\rightarrow$ *Issue Identification* $\rightarrow$ *Rule Selection* $\rightarrow$ *Temporal Validation* $\rightarrow$ *Exception Analysis* $\rightarrow$ *Application* $\rightarrow$ *Conclusion* $\rightarrow$ *Citation Verification* $\rightarrow$ *Confidence Scoring*.
3. **Interpreting Results**: 
   - **Overview Tab**: Shows a structured summary, core legal issues, confidence score, and conclusive legal opinion.
   - **Rules Tab**: Displays applicable sections of the Penal Code 1860, CrPC 1898, Contract Act 1872, etc., along with their real-time temporal validity.
   - **Precedents Tab**: Details BLAST or other landmark decisions validating the claim.
   - **Audit Trail**: Visualizes the verification trail behind the system's reasoning for regulatory and explainability transparency.

### C. Admin & Ingestion Pipeline Guide (Admin)
For administrators uploading new Bangladesh Gazettes, statutory instruments, or case judgments:
1. **Select Sample Source**: Choose a digital Bangladesh Gazette scan or Civil/Criminal judgment text.
2. **Toggle Preprocessing Tensors**:
   - **Deskewing**: Straightens skewed scanner inputs.
   - **Binarization**: Converts color/grayscale into clean high-contrast black-and-white pixels to boost OCR accuracy.
   - **Denoising**: Eliminates background grain, stamp marks, and hand-written annotations.
3. **Run Pipeline**: Click **Ingest & Process Document**. The pipeline visualizes the layout box boundaries extracted using the **LayoutLMv3** layout-parsing model, highlighting headers, sections, signature blocks, and footers.
4. **Metrics Audit**: Evaluates the Ingestion Metrics:
   - **OCR confidence score (%)**
   - **Layout categorization accuracy**
   - **Pipeline execution latency**

---

## 2. Free-Tier Production Deployment Manual

Deploying a complex, multi-agent full-stack application for free is highly feasible using modern developer-friendly cloud platforms. Below is the blueprint to host HAYAT live without infrastructure charges.

```
                  ┌──────────────────────┐
                  │  GitHub Repository   │
                  └──────────┬───────────┘
                             │ (CI/CD Auto-deploy)
            ┌────────────────┴────────────────┐
            ▼                                 ▼
┌───────────────────────┐         ┌───────────────────────┐
│     Vercel (Free)     │         │   Render/Koyeb (Free) │
├───────────────────────┤         ├───────────────────────┤
│ • Static React Web    │         │ • Express backend API │
│ • Next.js Serverless  │         │ • Node.js runtime     │
└───────────────────────┘         └───────────────────────┘
                                              │
                                              ▼
                                  ┌───────────────────────┐
                                  │  Supabase/Neon (Free) │
                                  ├───────────────────────┤
                                  │ • Serverless Postgres │
                                  │ • Vector Embeddings   │
                                  └───────────────────────┘
```

### A. Database Layer: Serverless Postgres (Supabase vs. Neon)
Both **Supabase** and **Neon** offer extremely robust, free-tier relational databases that support vector embeddings (critical for semantic legal search).

| Provider | Free Tier Limits | Key Feature | Best For |
| :--- | :--- | :--- | :--- |
| **Neon** | 1 Project, 10 GB storage, shared CPU, autoscaling | Auto Scale-to-Zero | Dynamic, modern PostgreSQL, fast branching |
| **Supabase** | 2 Projects, 500 MB storage, 50k monthly active users, database triggers | Embedded BaaS, pgvector, built-in Auth | Multi-user Auth + relational vector database |

#### Connection Setup Guide:
1. Sign up on [Neon.tech](https://neon.tech) or [Supabase.com](https://supabase.com).
2. Create a new PostgreSQL database named `hayat`.
3. Enable the `pgvector` extension to store case file embeddings:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
4. Copy the connection string. In your server environment, configure:
   ```env
   DATABASE_URL=postgresql://user:password@ep-cool-breeze-123.us-east-2.aws.neon.tech/hayat?sslmode=require
   ```

---

### B. Application Hosting (Vercel, Koyeb, Render)

#### Option 1: Render.com (Web Service - Free Tier)
Render offers a free tier for web services running Docker or standard Node.js backends.
- **Limits**: 512 MB RAM, shared CPU, custom domains, automated SSL.
- **Behavior**: Free web services automatically spin down after 15 minutes of inactivity. The first request after spin-down will experience a 30-second cold-start delay.
- **How to Deploy**:
  1. Link your GitHub repository to Render.
  2. Create a **New Web Service**.
  3. Build Command: `npm run build`
  4. Start Command: `npm run start` (or `node dist/server.cjs` for full-stack apps)
  5. Add environment variables (`GEMINI_API_KEY`, `DATABASE_URL`).

#### Option 2: Koyeb.com (Micro-Container - Free Tier)
Koyeb provides high-performance serverless micro-containers with faster startup speeds than Render.
- **Limits**: 1 Nano instance (512 MB RAM, 0.1 vCPU), 10GB SSD, global edge network.
- **Behavior**: Does not force-sleep your application like Render, meaning **zero cold starts** for continuous health monitoring.
- **How to Deploy**:
  1. Link your GitHub repository to Koyeb.
  2. Select the repository and set the run command to `node dist/server.cjs` (or use the built-in Docker builder).
  3. Select the **Nano** instance size (Free Tier).
  4. Define the `PORT` environment variable as `3000` (or the port specified in your Express routing) and map it to public port `80/443`.

#### Option 3: Vercel (Frontend + Serverless Functions - Free Tier)
Vercel is the ultimate platform for deploying static React frontends, with automatic deployments on every `git push`.
- **Limits**: 100 GB bandwidth, 100 domain allocations, serverless functions (10s execution limit per call).
- **How to Deploy**:
  1. Connect your GitHub repository to Vercel.
  2. Select **Vite** or **Create React App** as the framework preset.
  3. Configure the output directory as `dist/`.
  4. Add client environment variables.
  5. *Note*: To deploy full-stack Express backends on Vercel's free tier, configure Express to run inside a serverless function (`/api/*` endpoints mapped in a `vercel.json` rewrite configuration).

---

## 3. Distributed Microservices Directory Structure

Once the platform transitions from the current consolidated Express layout to a production-grade orchestration engine, the architecture will follow this modular directory hierarchy:

```
hayat/
├── infrastructure/               # Terraform/Ansible configuration for container clusters
├── packages/
│   └── hayat_core/               # Shared TS utilities, database schemas, and shared types
├── gateway/                      # Nginx / Traefik routing layer handling JWT and rate limits
├── agents/                       # 17 Autonomous microservices executing pipeline steps
│   ├── agent01_source/           # Gazette and Judgment ingesters
│   ├── agent02_intake/           # Document ingestion validation
│   ├── agent03_quality/          # Page counting and layout quality analysis
│   ├── agent04_preprocess/       # Binarization and deskewing engines
│   ├── agent05_ocr/              # PaddleOCR and Bangla OCR integration
│   ├── agent06_layout/           # LayoutLMv3 semantic chunking
│   ├── agent07_copyright/        # Redaction and compliance filter
│   ├── agent08_classification/   # XLM-RoBERTa act classifier
│   ├── agent09_metadata/         # Extraction of metadata fields (case numbers, dates)
│   ├── agent10_citation/         # Citation resolution and validation
│   ├── agent11_graph/            # Neo4j knowledge graph compiler
│   ├── agent12_embedding/        # BGE-M3 vector generation
│   ├── agent13_search/           # Qdrant vector store indexing
│   ├── agent14_ilrmf/            # Core deterministic reasoning engine (Our current engine)
│   ├── agent15_llm/              # Explanatory generator and humanizer
│   ├── agent16_explainability/   # Audit-trail verifier
│   └── agent17_platform/         # System monitor and metrics publisher
├── frontend/                     # React web-workspace (Our current frontend UI)
├── docs/                         # Specifications and legal compliance blueprints
├── models/                       # Weights and local configurations for LayoutLM and XLM-R
├── scripts/                      # DB migration, pipeline triggers, and setup automations
├── tests/                        # Comprehensive unit and integration test suits
└── docker-compose.yml            # Local developer cluster deployment specification
```

This structure decouples computation (like OCR and embeddings) from UI rendering, preventing timeout problems and ensuring each part can scale independently as traffic grows.
