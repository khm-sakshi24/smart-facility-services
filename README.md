# Smart Facility Services — Complete System & Google SEO Deployment Guide

A real-world, production-ready enterprise facility management website and operational backend for **Smart Facility Services**, serving residential apartment associations, commercial properties, and gated communities in **Hoodi, Garudachar Palya, Whitefield, and Bengaluru, Karnataka**.

---

## 1. Project Overview & Architecture

The solution is divided into two decoupled, scalable tiers:

```
web/
├── frontend/                     # Next.js 14 (App Router) + TypeScript + Tailwind CSS
│   ├── src/app/                  # 28 Static & Dynamic Prerendered Pages
│   │   ├── page.tsx              # Corporate Homepage with Hero, Process, & Standards
│   │   ├── services/             # Complete 12-Service Catalogue & Dynamic [slug] pages
│   │   ├── quote/                # Quotation enquiry form with client/server validation
│   │   ├── process/              # 7-stage proposed operational workflow
│   │   ├── service-areas/        # Interactive locality coverage checker
│   │   ├── about/                # Genuine company mission & philosophy (zero fake history)
│   │   ├── contact/              # Site assessment request & verified channels
│   │   ├── privacy-policy/       # Draft privacy policy for legal review
│   │   ├── admin/                # Staff portal & operations dashboard
│   │   ├── sitemap.ts            # XML Sitemap at /sitemap.xml for Google Crawlers
│   │   └── robots.ts             # robots.txt with secure exclusion of private admin paths
│   ├── src/components/           # Reusable UI, Bilingual Provider, Smart Assistant, Breadcrumbs
│   └── src/config/               # Centralized business info, services data, & Kannada translations
│
├── backend/                      # Spring Boot 3.3.5 REST API (Java 21)
│   ├── src/main/java/            # Controllers, Services, Repositories, Entities, DTOs, Security
│   ├── src/main/resources/
│   │   ├── application.yml       # Production PostgreSQL & Flyway config
│   │   └── db/migration/
│   │       └── V1__init_schema.sql # Flyway migration (10 tables, foreign keys, indexes)
│   └── src/test/                 # JUnit 5 & Mockito test suite (H2 in-memory test profile)
│
├── tools/                        # Local runtime binaries (Node.js 22 LTS, Apache Maven 3.9.9)
├── README.md                     # This complete documentation
└── .gitignore                    # Secrets and build artifact exclusion
```

---

## 2. Technology Stack & Decision Rationale

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons. Prerenders SEO metadata, semantic headings, OpenGraph tags, and Schema.org JSON-LD structured data.
- **Backend**: Java 21 LTS with Spring Boot 3.3.5, Spring Security, Spring Data JPA, Bean Validation, and SpringDoc OpenAPI 3 / Swagger.
- **Database**: PostgreSQL 17 with Flyway migrations (`V1__init_schema.sql`) for strict versioned schema management.
- **Testing**: JUnit 5, Mockito, and Spring Boot integration tests verifying subtotal and 18% statutory GST calculation, reference generation, and work order lifecycles.

---

## 3. Quickstart & Local Setup (Beginner-Friendly)

### Prerequisites
- **Java 21**: Installed at `C:\Program Files\Java\jdk-21` (already verified on your machine).
- **Node.js & Maven**: Packaged ready inside `.\tools\`.

### Step 1: Run the Next.js Frontend
Open PowerShell in the project root:
```powershell
# Set local Node.js in PATH
$env:PATH = "$((Get-Item .\tools\node).FullName);$env:PATH"

# Move into frontend and start dev server
cd .\frontend
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Step 2: Build & Test Frontend
```powershell
$env:PATH = "$((Get-Item .\tools\node).FullName);$env:PATH"
cd .\frontend
npm run build
npm run typecheck
```

### Step 3: Run the Spring Boot Backend Tests
```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-21"
cd .\backend
..\tools\maven\bin\mvn.cmd test
```

### Step 4: Run the Spring Boot Backend
```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-21"
cd .\backend
..\tools\maven\bin\mvn.cmd spring-boot:run
```
The REST API starts at `http://localhost:8080`.
- **OpenAPI / Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **Health Check**: `http://localhost:8080/api/public/health`

---

## 4. Key Business Rules & Configurations

1. **Configurable Placeholders**: All business details are centralized in `frontend/src/config/businessInfo.ts`. Unconfirmed phone numbers, email addresses, and registration numbers remain `null` and are safely hidden from the public production UI.
2. **Regulatory Notice for Security Staffing**:
   - As required under the *Private Security Agencies (Regulation) Act (PSARA)*, security staffing is marked as a **Proposed Service** subject to state licensing verification before operational deployment.
3. **Quotation Reference Generator**:
   - Each submitted enquiry generates a verified format reference: `SFS-YYYYMMDD-XXXX` (e.g., `SFS-20261026-1042`).
4. **Bilingual Support**:
   - Top micro-bar includes a 1-click toggle between **English** and **ಕನ್ನಡ (Kannada)**.

---

## 5. Operations & Staff Dashboard

Navigate to `http://localhost:3000/admin/login`:
- Enter staff credentials.
- Choose role (`Super Administrator`, `Operations & Site Manager`, or `Technical Field Supervisor`).
- **Pipeline Management**: Search, filter, and transition enquiries (`NEW` → `UNDER_REVIEW` → `SITE_VISIT_SCHEDULED` → `QUOTED` → `CLOSED`).
- **Quotation Generator**: Add itemized scope, unit quantities, unit rates, and auto-compute 18% GST with PDF/Print export.
- **Work Orders**: Advance work orders across stages (`New` → `Assigned` → `In Progress` → `Completed` → `Closed`).
- **QR Asset Inspector**: Scan asset tags for on-site maintenance logs.

---

## 6. Step-by-Step Production Deployment Plan

Deploying this application online requires 3 simple, beginner-friendly components:

### A. Database Deployment (Free tier on Neon.tech or Supabase)
1. Sign up for a free PostgreSQL database on [Neon.tech](https://neon.tech) or [Supabase](https://supabase.com).
2. Create a database named `smart_facility_db`.
3. Copy the database connection URL (e.g., `postgres://user:password@ep-xyz.neon.tech/smart_facility_db?sslmode=require`).

### B. Backend Deployment (Render or Railway)
1. Push your repository to **GitHub**.
2. Sign up at [Render.com](https://render.com).
3. Click **New +** → **Web Service** and connect your GitHub repository.
4. Set root directory to `backend`.
5. Environment: **Java**, Build Command: `mvn clean package -DskipTests`, Start Command: `java -jar target/smart-facility-backend-1.0.0.jar`.
6. Add Environment Variables:
   - `SPRING_DATASOURCE_URL`: (Your Neon/Supabase JDBC URL)
   - `SPRING_DATASOURCE_USERNAME`: (Your DB Username)
   - `SPRING_DATASOURCE_PASSWORD`: (Your DB Password)
   - `CORS_ALLOWED_ORIGINS`: `https://your-frontend-domain.vercel.app,https://smartfacilityservices.com`
   - `JWT_SECRET`: (Generate a random 64-character secret string)

### C. Frontend Deployment (Vercel)
1. Sign up at [Vercel.com](https://vercel.com) using your GitHub account.
2. Click **Add New Project** and select this repository.
3. Set **Root Directory** to `frontend`.
4. Framework Preset: **Next.js** (auto-detected).
5. Environment Variables:
   - `NEXT_PUBLIC_SITE_URL`: `https://your-custom-domain.com` (or your `.vercel.app` URL)
   - `BACKEND_API_URL`: `https://your-backend.onrender.com`
6. Click **Deploy**. Your site is live online with free automatic HTTPS!

---

## 7. Connecting a Custom Domain (e.g., `smartfacilityservices.com`)

1. Purchase your domain from a reputable registrar (e.g., Namecheap, Cloudflare Registrar, or Google Domains/Squarespace).
2. In your Vercel Dashboard, go to **Settings** → **Domains**.
3. Enter your domain name (`smartfacilityservices.com`).
4. Vercel will display the DNS records needed:
   - **Type A**: `@` → `76.76.21.21`
   - **Type CNAME**: `www` → `cname.vercel-dns.com`
5. Log into your domain registrar, navigate to **DNS Management**, and add these two records.
6. Propagation usually completes within 10–30 minutes, and Vercel automatically provisions a free SSL (HTTPS) certificate.

---

## 8. Google Search Console & Search Indexing Step-by-Step

Once your website is live online:

1. **Open Google Search Console**: Visit [https://search.google.com/search-console/](https://search.google.com/search-console/).
2. **Add Property**:
   - Choose **URL Prefix**: enter `https://yourdomain.com` (or your live URL).
3. **Verify Ownership**:
   - **Method A (HTML Tag - Easiest)**: Copy the verification meta tag provided by Google and paste it into `frontend/src/app/layout.tsx` inside `<head>`, or
   - **Method B (DNS TXT record)**: Add the Google TXT record to your domain's DNS manager.
4. **Check robots.txt**:
   - Visit `https://yourdomain.com/robots.txt` in your browser. Confirm it displays the allowed public routes and references `sitemap.xml`.
5. **Submit Your Sitemap**:
   - In Search Console, click **Sitemaps** in the left menu.
   - Enter `sitemap.xml` and click **Submit**.
   - Google will crawl and index your 28 static and dynamic service pages.
6. **URL Inspection & Request Indexing**:
   - Type `https://yourdomain.com/` in the top search bar of Search Console.
   - Click **Request Indexing** for your Homepage and main service pages (`/services/stp-etp-wtp-maintenance`, `/services/housekeeping-services`, `/services/electrical-maintenance`).
7. **Important Note**: Google indexing can take between 2 to 14 business days. Ranking depends on genuine content, domain age, and user signals.

---

## 9. Google Business Profile Setup Guide

When eligible, set up your official Google Business Profile to capture local Whitefield and Bengaluru searches:

1. Go to [https://business.google.com/create](https://business.google.com/create).
2. Enter the official name: **Smart Facility Services**.
3. Select Business Category: **Property Management Company** or **Facility Management Service**.
4. Service Areas: Specify **Hoodi, Garudachar Palya, Whitefield, and Bengaluru**.
5. Add your live website URL: `https://yourdomain.com`.
6. Add verified contact numbers and operating hours once confirmed by the business.
7. Complete verification (via Google video verification or postal code postcard as requested by Google).
