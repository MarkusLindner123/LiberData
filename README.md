# LiberData Vault 🛡️📊

**LiberData Vault** is a privacy-preserving, local-first analytics engine designed to help users reclaim and visualize their personal data (DSGVO/GDPR) without ever compromising their privacy. By processing multi-gigabyte exports entirely within the browser, we bridge the gap between complex data portability and meaningful user insights.

---

## 🚀 The Mission
Most vendors provide raw data exports (like Google Takeout), but these are often unstructured, massive, and difficult to interpret. Existing tools are usually cloud-based, requiring you to upload your most sensitive life history to yet another server. 

**LiberData Vault changes this.** We provide a "Zero-Knowledge" environment where your data is parsed, stored, and analyzed locally on your machine.

---

## 🛠 Tech Stack: The "Heavy Lifting" Engine
To handle 50GB+ archives in a browser tab, we use a cutting-edge, local-first architecture:

* **Frontend:** Next.js (Static Export) & Tailwind CSS. The app is a PWA, meaning it can run completely offline.
* **Database:** `SQLite-WASM` + `Origin Private File System (OPFS)`. High-performance relational queries directly on your local disk.
* **Processing:** `Web Workers` & `Streaming Parsers (Oboe.js)`. All parsing logic is offloaded to background threads to keep the UI fluid at 60 FPS.
* **Logic:** `Pyodide` (Python in the browser) for advanced Data Science and lightweight JS/WASM-based ML models.

---

## 🏗 Project Roadmap
The project is divided into four major phases focusing on technical stability and analytical depth:

| Phase | Focus Areas |
| :--- | :--- |
| **Core Architecture** | Optimizing the Web Worker pipeline, SQLite-OPFS bridge, and cross-browser compatibility (Chrome/Firefox/Safari). |
| **Parser Engine** | Normalizing unstructured JSON/CSV dumps into relational SQL tables using streaming logic. |
| **Visual Insights** | Building the React dashboard to visualize spending habits, mobility patterns, and social activity. |
| **DSGVO Management** | Implementing the Google Data Portability API and creating an extensible API for future vendors. |

---

## 👥 The Team
We combine systems engineering with professional data science to ensure both security and utility.

* **Markus Lindner (Core Engineering & Security):** Full Stack Developer and IT Consultant with 4+ years of experience at Siemens AG (R&D/Infrastructure). Specialist in CI/CD, Network Hardening, and the architect behind the LiberData SQLite-WASM pipeline.
* **Tim Bischoff (Data Science & Logic Layer):** Data Scientist (M.Sc.) with 5 years of experience in the banking/finance sector. Expert in predictive modeling and transforming complex financial datasets into actionable insights.

---

## 🛡 Security & Privacy (Zero-Knowledge)
* **Client-Side Only:** No data is ever uploaded to a central server. Sensitive information stays in the sandboxed local filesystem.
* **Verifiable Code:** As a static export, the application code can be audited and hosted by the community.
* **Encrypted Backups:** Optional local backups use the `Web Crypto API` (AES-GCM) so keys never leave your device.

---

## ⚠️ Challenges We’re Solving
1.  **Memory Management:** Handling 50GB archives without crashing the browser by avoiding standard `JSON.parse()` in favor of chunked streams.
2.  **Cross-Browser Standards:** Implementing persistent storage via the modern OPFS API, ensuring data remains secure and isolated.
3.  **Local-First Logic:** Moving complex Data Science tasks (normally cloud-only) entirely into the user's browser via WASM and Pyodide.

---

## 🌍 Ecosystem & Contribution
LiberData Vault is a contribution to the **Digital Commons**. 

* **AGPLv3 License:** Ensuring the software remains free and open.
* **Community First:** Because the app is built as a static Next.js export, it can be distributed as a single package for local use or hosted on GitHub Pages, IPFS, or local servers.
* **Extensible:** The open-source nature allows other developers to fork the project and use the provided APIs to add other data vendors (Social Media, Amazon, etc.) beyond our Google MVP.

---

## 📄 License
This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.
