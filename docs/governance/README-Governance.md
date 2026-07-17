# Mohammed OS Governance
## Governance Hierarchy Overview

**This document explains how Mohammed OS is governed.**

---

## The Hierarchy

Mohammed OS governance follows a 6-level hierarchy. Each level has a different purpose, authority, and rate of change.

```
LEVEL 1: CONSTITUTION
         The permanent laws of Mohammed OS
         Changed only by the Founder, rarely
         
    │
    ▼
LEVEL 2: CONSTITUTIONAL AMENDMENTS
         Formal changes to the Constitution
         Changed only by the Founder, occasionally
         
    │
    ▼
LEVEL 3: FRAMEWORKS
         How Mohammed OS makes decisions and operates
         Changed by the Founder or Executive Chief of Staff
         
    │
    ▼
LEVEL 4: STANDARDS
         Technical and operational requirements
         Changed by Atlas or the Chief of Staff
         
    │
    ▼
LEVEL 5: PLAYBOOKS
         Step-by-step execution guides
         Changed by the Chief of Staff
         
    │
    ▼
LEVEL 6: KNOWLEDGE
         All research, decisions, learning, and records
         Changed continuously by all contributors
```

## Rule: Higher Level Wins

**No document at a lower level can contradict a document at a higher level.**

If a Playbook says "deploy on Fridays" but a Standard says "no deployments on Fridays," the Standard wins.

If a Standard says "use TypeScript" but the Constitution says "AI Officers advise, they do not decide," both can be true — they govern different things.

## Level Definitions

### Level 1: Constitution
- **Purpose:** Permanent laws
- **Examples:** Authority hierarchy, immutable principles, amendment process
- **Size:** Small (the current Constitution is ~3,000 words)
- **Changed by:** Founder only
- **How often:** Rarely (expected: 0–2 amendments per year after launch)
- **Document:** `CONSTITUTION-001-v2.md`

### Level 2: Constitutional Amendments
- **Purpose:** Formal changes to the Constitution
- **Examples:** Amendment-001 (KnowOps governance), Amendment-002 (Competitive Intelligence)
- **Size:** One amendment per change
- **Changed by:** Founder only
- **How often:** Occasionally (expected: 2–4 per year)
- **Naming:** `AMENDMENT-###-[Name].md`

### Level 3: Frameworks
- **Purpose:** How Mohammed OS makes decisions and operates at a strategic level
- **Examples:** How strategic decisions are made, how BUILD phases work, how competitive intelligence is conducted
- **Size:** Medium (5,000–15,000 words each)
- **Changed by:** Founder or Executive Chief of Staff
- **How often:** Periodically (expected: 2–4 updates per year per framework)
- **Naming:** `FRAMEWORK-###-[Name].md`
- **Current Frameworks:**
  - FRAMEWORK-001: Strategic Decision Framework
  - FRAMEWORK-002: BUILD Framework
  - FRAMEWORK-003: Competitive Intelligence Framework

### Level 4: Standards
- **Purpose:** Technical and operational requirements
- **Examples:** Engineering standards, security standards, documentation standards
- **Size:** Medium (3,000–10,000 words each)
- **Changed by:** Atlas or Chief of Staff (with Founder notification)
- **How often:** Regularly (expected: quarterly updates)
- **Naming:** `STANDARD-###-[Name].md`
- **Current Standards:**
  - STANDARD-001: Engineering Standards

### Level 5: Playbooks
- **Purpose:** Step-by-step execution guides
- **Examples:** How to conduct a BUILD phase, how to perform competitive research, how to respond to an incident
- **Size:** Short (1,000–5,000 words each)
- **Changed by:** Chief of Staff (with Executive Chief of Staff notification)
- **How often:** Frequently (expected: monthly updates as procedures evolve)
- **Naming:** `PLAYBOOK-###-[Name].md`
- **Current Playbooks:**
  - PLAYBOOK-001: Product Development Playbook

### Level 6: Knowledge
- **Purpose:** All organizational knowledge, research, decisions, and learning
- **Examples:** Research reports, decision records, post-decision reviews, competitive intelligence, learning records
- **Size:** Unlimited (grows continuously)
- **Changed by:** All contributors
- **How often:** Continuously
- **Storage:** Mohammed OS organizational memory (Motherboard + Working Memory)

## How to Navigate This System

**If you are the Founder:** Read the Constitution first. Then read the Frameworks for the decisions you want to understand. Standards and Playbooks are reference documents — consult them when needed.

**If you are an AI Officer:** Know the Constitution (your boundaries). Know the Frameworks for your domain (your processes). Follow the Standards (your requirements). Use the Playbooks (your guides). Contribute to Knowledge (your output).

**If you are evaluating Mohammed OS:** Start with the Constitution (what it believes). Then read the Frameworks (how it works). The Standards and Playbooks demonstrate operational maturity.

## Change Control

| Level | Can Change | Approval Required | Notification |
|-------|-----------|-------------------|--------------|
| Constitution | Founder | Founder | All officers |
| Amendments | Founder | Founder | All officers |
| Frameworks | Founder, Executive Chief of Staff | Founder for new frameworks; Executive Chief of Staff for updates | Founder |
| Standards | Atlas, Chief of Staff | Founder or Executive Chief of Staff for new standards; Atlas for updates | Founder |
| Playbooks | Chief of Staff | Executive Chief of Staff for new playbooks; Chief of Staff for updates | Executive Chief of Staff |
| Knowledge | All contributors | None (continuous) | Relevant stakeholders |

## Document Index

| Document | Level | Purpose |
|----------|-------|---------|
| `CONSTITUTION-001-v2.md` | 1 | Permanent laws |
| `README-Governance.md` | 1 | This document — how governance works |
| `FRAMEWORK-001-Strategic-Decision.md` | 3 | How strategic decisions are made |
| `FRAMEWORK-002-BUILD.md` | 3 | How BUILD phases work |
| `FRAMEWORK-003-Competitive-Intelligence.md` | 3 | How competitive intelligence is conducted |
| `PLAYBOOK-001-Product-Development.md` | 5 | How to execute a BUILD phase |
| `STANDARD-001-Engineering.md` | 4 | Engineering requirements and conventions |

---

*This document is Level 1 — it is part of the Constitution's governance system.*
*Last updated: July 17, 2026*
