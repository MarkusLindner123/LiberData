# 🛡️ LiberData: The Portable Open Source Data Vault

> **Reclaim your digital history. Own your data. Unlock the future of personal AI.**

LiberData is a **local-first, privacy-by-design** application that empowers users to extract their personal history from proprietary silos (Google, Meta, LinkedIn) and store it in a secure, standardized format—locally on their device.

## 🚀 The Mission
While GDPR (Art. 20) grants us the right to data portability, the actual files provided (JSON/CSV exports) are often cryptic and unusable for non-technical citizens. **LiberData acts as the universal translator and secure safe for your digital self.**

### Core Pillars:
* **100% Client-Side:** No data ever leaves your machine. Processing happens entirely in the browser.
* **User Sovereignty:** Convert fragmented exports into a unified, machine-readable SQLite database.
* **PWA Ready:** Installable on any device as a Progressive Web App for offline-first access.
* **Public Good:** Fully open-source (AGPLv3) and focused on long-term digital commons.

## 🏗️ Technical Stack
We use a high-performance, modern stack to ensure privacy and scalability:
* **Framework:** [Next.js](https://nextjs.org/) (Static Export) & [Tailwind CSS](https://tailwindcss.com/)
* **Storage:** [SQLite-WASM](https://sqlite.org/wasm) with **Origin Private File System (OPFS)** for robust, local SQL queries.
* **Concurrency:** [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) for non-blocking stream-parsing of multi-gigabyte data exports.
* **Standards:** Built on **JSON-LD** principles for future interoperability with the Next Generation Internet (NGI) ecosystem.

## 🛠️ Project Roadmap
- [ ] **Phase 1:** Core Architecture (SQLite-WASM + OPFS Integration).
- [ ] **Phase 2:** High-Performance Parser Engine (Google Takeout & Meta).
- [ ] **Phase 3:** Visual Insights Dashboard (Location history, Social graphs).
- [ ] **Phase 4:** Interoperability API (Local interface for 3rd party apps).

## 👥 Team
* **Markus Lindner:** Lead Full Stack Developer & Infrastructure Specialist.
* **Senior Data Analyst:** Specialist for large-scale data normalization and pattern recognition.

---

## 📄 License & Funding
This project is an open-source contribution to the **NGI Zero Commons Fund**.  
License: **GNU AGPLv3**

---
*Developed with the goal of building a more human-centric internet.*
