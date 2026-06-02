# vibe-books
An AI-powered semantic discovery engine that matches books to your exact 'vibe' and plot descriptions using vector search and LLMs.
#  LitVibe: Semantic Book Discovery Engine

An AI-powered book recommendation platform that replaces traditional keyword matching with deep semantic understanding. Instead of searching by exact titles or categories, users can search for a specific "vibe," plot point, or narrative feeling (e.g., *"A slow-burn historical drama set in West Africa with political intrigue"*). 

The application surfaces relevant literature, dynamically generates custom summaries catering to the user's explicit request, and provides localized affiliate purchase links.

---

##  Key Features

* **Semantic Search (Natural Language Queries):** Converts user prompts into mathematical vectors to parse the abstract contextual meaning behind a search query.
* **Automated Curation & Tagging:** Leverages Large Language Models (LLMs) to automatically generate snappy summaries and categorical tags on-the-fly, entirely removing manual cataloging.
* **Dynamic Affiliate Routing:** Programmatically generates localized marketplace endpoints (Amazon, Takealot, Goodreads) to monetize traffic seamlessly.

---

##  System Architecture

LitVibe uses a **Retrieval-Augmented Generation (RAG)** pipeline to surface hyper-relevant results securely and fast:
