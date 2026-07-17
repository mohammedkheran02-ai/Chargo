# FRAMEWORK-002: BUILD Framework
## How Mohammed OS Plans, Executes, and Reviews BUILD Phases

**Level:** 3 — Framework
**Governed By:** CONSTITUTION-001, Article II
**Changed By:** Founder or Executive Chief of Staff
**Last Updated:** July 17, 2026

---

## 1. Purpose

This Framework defines how Mohammed OS structures, funds, executes, and reviews BUILD phases. It implements the Execution (Phase 3) and Operation (Phase 4) stages of the Strategic Decision Framework.

## 2. BUILD Phase Definition

A BUILD phase is a **time-boxed period of engineering work** with:
- Defined scope (explicit in-scope and out-of-scope)
- Defined resources (engineering-weeks budget)
- Defined timeline (start and end dates)
- Defined success criteria (measurable, time-bound)
- Defined learning objective (what hypothesis this BUILD tests)
- Defined review date (when outcomes are assessed)

## 3. BUILD Phase Structure

Each BUILD phase follows this structure:

```
BUILD-###: [Name]

### Overview
- **Purpose:** [One sentence]
- **Hypothesis:** [What we are testing]
- **Success Criteria:** [Measurable outcomes]
- **Timeline:** [Start] → [End]
- **Resources:** [Engineering-weeks] + [AI compute] + [External costs]
- **Status:** [Planned / In Progress / In Review / Complete / Deprecated]

### Scope
**In-scope:**
- [Specific deliverable 1]
- [Specific deliverable 2]

**Out-of-scope (next phase or future):**
- [Deferred item 1]
- [Deferred item 2]

### Acceptance Criteria
- [Criterion 1 — measurable]
- [Criterion 2 — measurable]
- [Criterion 3 — measurable]

### Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| [Risk 1] | High/Med/Low | High/Med/Low | [Mitigation] |

### Review Date
[Date when BUILD phase outcomes are assessed]
```

## 4. BUILD Phase Evaluation Criteria

BUILD phases are evaluated against 6 criteria with weighted scoring:

| Criterion | Weight | Description |
|-----------|--------|-------------|
| Strategic Alignment | 0.25 | Does this advance Mohammed OS's mission? |
| Resource Efficiency | 0.20 | Can this be built within budget? |
| Learning Value | 0.20 | What do we learn if we succeed? What if we fail? |
| Risk Level | 0.15 | What could go wrong? How recoverable? |
| Founder Impact | 0.10 | How much does this improve the Founder experience? |
| Foundation Value | 0.10 | Does this enable future BUILD phases? |

Scoring: Each criterion 0–10. Weighted sum = BUILD Score (0–100).
- **70+:** Approve
- **50–69:** Revise scope or timing
- **< 50:** Reject

## 5. Portfolio Balance Rules

Mohammed OS maintains a balanced BUILD portfolio across 4 categories:

| Category | Target % | Description |
|----------|----------|-------------|
| Foundation | 30% | Infrastructure, architecture, security |
| Founder Experience | 35% | Direct Founder-facing features |
| Intelligence | 20% | AI Officers, analytics, competitive intelligence |
| Exploration | 15% | Experimental features, research spikes |

No single BUILD phase can exceed 40% of available engineering resources.

## 6. BUILD Phase Roadmap

### Active BUILD Phases

| BUILD | Name | Status | Timeline | Score |
|-------|------|--------|----------|-------|
| BUILD-001 | Authentication & RLS Foundation | Complete | June 2026 | 85 |
| BUILD-002 | Mohammed OS Executive Dashboard | In Review | July 2026 | 90 |

### Planned BUILD Phases

| BUILD | Name | Status | Target |
|-------|------|--------|--------|
| BUILD-003 | AI Officers Backend | Planned | Q3 2026 |
| BUILD-004 | Knowledge Engine | Planned | Q3 2026 |
| BUILD-005 | Multi-Workspace Deep Features | Planned | Q4 2026 |

### Candidate BUILD Phases

| BUILD | Name | Status | Notes |
|-------|------|--------|-------|
| BUILD-006 | KnowOps Knowledge Integrity | Candidate | IDEA-003: Build as feature, not discipline |
| BUILD-TBD | Mobile Experience | Candidate | Pending competitive intelligence |
| BUILD-TBD | External Integrations | Candidate | Pending competitive intelligence |

## 7. BUILD Phase Lifecycle States

```
Planned → In Progress → In Review → Complete
   ↓          ↓           ↓
Cancelled  Blocked    Rework Required → In Progress
                          ↓
                      Deprecated
```

**State Definitions:**
- **Planned:** Approved, not yet started
- **In Progress:** Engineering work active
- **In Review:** Engineering complete, under Founder acceptance test
- **Complete:** Accepted by Founder, in operation
- **Blocked:** Impediment identified, work paused
- **Rework Required:** Acceptance test failed, corrections needed
- **Deprecated:** Built but no longer maintained
- **Cancelled:** Approved but not started, then cancelled

## 8. BUILD Phase Review Process

Every completed BUILD phase undergoes a structured review:

### Timing
Within 7 days of Founder acceptance.

### Participants
Atlas (technical assessment), Chief of Staff (process assessment), Founder (overall assessment)

### Questions
1. Did we achieve the success criteria? (Yes/No/Partial)
2. Did we stay within resource budget? (Yes/No — by how much?)
3. Did we learn what we hypothesized? (Yes/No — what did we learn?)
4. What would we do differently? (Process improvements)
5. What does this enable? (Future BUILD phases)

### Output
- BUILD Phase Review Document
- Learning recorded in Knowledge base
- Governance system updated if indicated

## 9. BUILD Phase Dependencies

BUILD phases can depend on other BUILD phases. Dependencies are tracked and visualized.

### Current Dependency Chain

```
BUILD-001 (Auth & RLS) 
    → BUILD-002 (Dashboard)
        → BUILD-003 (AI Officers Backend)
            → BUILD-004 (Knowledge Engine)
        → BUILD-005 (Multi-Workspace Deep)
```

### Dependency Rules
1. A BUILD phase cannot start until all dependencies are Complete
2. Dependencies can be added mid-phase with Founder approval
3. Circular dependencies are prohibited

---

*End of FRAMEWORK-002*
*6 criteria. 4 portfolio categories. 9 lifecycle states.*
