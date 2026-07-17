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
├── Scope Document (from Gate 2)
├── Founder's Intent (from Gate 2)
├── Success Criteria (measurable, time-bound)
├── Learning Objective (falsifiable hypothesis)
├── Resource Budget (engineering-weeks)
├── Timeline (start → end dates)
├── Deliverables (what is produced)
└── Review Date (when Gate 4 occurs)
```

## 4. BUILD Phase Lifecycle

### Stage 10: Design
- Technical specification complete
- Architecture Decision Records (ADRs) written
- Component breakdown defined
- Integration points identified
- **Time box:** 5–10 days
- **Owner:** Atlas

### Stage 11: Build
- Implementation begins
- Development milestones tracked
- Progress reported weekly to Chief of Staff
- **Time box:** 2–6 weeks (varies by scope)
- **Owner:** Atlas

### Stage 12: Alpha Test
- Core functionality implemented
- Internal testing by AI officers
- Bug identification and triage
- **Deliverable:** Alpha Test Report
- **Time box:** 3–5 days

### Stage 13: Beta Test
- Alpha issues resolved
- Founder access granted
- Usability feedback collected
- **Deliverable:** Beta Test Report
- **Time box:** 3–5 days

### Stage 14: Acceptance Test
- Full test against success criteria
- Each criterion: PASS / FAIL / PARTIAL
- Documentation completeness verified
- **Deliverable:** Acceptance Test Report
- **Time box:** 2–3 days

### Stage 15: Deployment Preparation
- Deployment package assembled
- Migration scripts prepared
- Rollback plan documented
- **Deliverable:** Deployment Package
- **Time box:** 1–2 days

**→ GATE 3: Deployment Gate**
- Founder approves production deployment

### Stage 16: Deploy
- Production deployment executed
- System health verified
- **Deliverable:** Deployment Confirmation

### Stage 17: Adoption Measurement
- Usage metrics collected (7 days post-deploy)
- Engagement data analyzed
- Error rates monitored
- **Deliverable:** Adoption Report

### Stage 18: Value Validation
- Success criteria assessed (30 days post-deploy)
- Learning objective evaluated
- **Deliverable:** Value Validation Report

### Stage 19: Learning Capture
- Lessons documented
- Organizational learning record created
- **Deliverable:** Learning Record

**→ GATE 4: Review Gate**
- Founder decides: CONTINUE / ENHANCE / RETIRE / ESCALATE

## 5. BUILD Phase Evaluation Criteria

At Gate 1, every BUILD phase proposal is scored against:

| Criterion | Weight | Threshold |
|-----------|--------|-----------|
| Strategic Fit | 25% | Aligns with ≥1 Founder Rule |
| User Value | 25% | ≥1 clear Founder benefit |
| Technical Feasibility | 15% | Confidence ≥ 70% |
| Risk Level | 15% | No unmitigated critical risks |
| Foundation Requirement | 10% | Documented dependencies |
| Competitive Differentiation | 10% | ≥1 differentiator |

**Scoring:** Each criterion 1–5. Weighted average = Priority Score.

| Score | Priority | Action |
|-------|----------|--------|
| 4.5–5.0 | P0 | Immediate investment |
| 4.0–4.4 | P1 | Next available cycle |
| 3.5–3.9 | P2 | Future cycle |
| 3.0–3.4 | P3 | Deprioritize; revisit quarterly |
| <3.0 | P4 | Reject or revisit annually |

## 6. Portfolio Balance Rules

| Rule | Trigger | Action |
|------|---------|--------|
| Risk concentration | >3 P0 initiatives active | Defer lowest-scoring P0 |
| Resource overcommitment | Committed > available × 1.2 | Defer lowest priority |
| Dependency violation | Initiative before its dependencies | Reschedule |
| Strategic gap | No initiatives in area for >2 cycles | Spawn exploration |

## 7. Master Roadmap

```
Mohammed OS Master Roadmap
├── BUILD-001: Foundation ✓ (COMPLETED)
├── BUILD-002: Executive Operating System ✓ (COMPLETED)
├── BUILD-003: AI Integration & Intelligence (PLANNED)
│   ├── 3.1: AI Model API Integration (Atlas + Naya)
│   ├── 3.2: Real-time Founder Brief Updates
│   ├── 3.3: Search Across Organizational Memory
│   ├── 3.4: Workspace Connectors (Google Workspace, Slack)
│   └── 3.5: Audit Logging & Compliance Foundation
├── BUILD-004: Platform Maturation (FUTURE)
│   ├── 4.1: Multi-Model Orchestration
│   ├── 4.2: Advanced Organizational Memory (GraphRAG)
│   ├── 4.3: Decision Automation
│   ├── 4.4: Mobile Application
│   └── 4.5: External Workspace Invites
├── BUILD-005: Scale & Ecosystem (FUTURE)
│   ├── 5.1: Multi-Founder Deployment
│   ├── 5.2: AI Officer Marketplace
│   ├── 5.3: White-Label Licensing
│   └── 5.4: API Platform
└── CONTINUOUS: KnowOps (IN PARALLEL)
    ├── K1: Confidence Scoring Engine
    ├── K2: Verification Scheduler
    ├── K3: Event Detection
    └── K4: Integrity Dashboard
```

## 8. BUILD Phase Status Definitions

| Status | Meaning | Who Can Change |
|--------|---------|----------------|
| COMPLETED | Delivered and reviewed | Chief of Staff (after Gate 4) |
| IN PROGRESS | Approved, executing | Atlas |
| PLANNED | Passed Gate 2, awaiting execution | Chief of Staff |
| EVALUATED | Passed Gate 1, awaiting investment | Founder (Gate 2) |
| EXPLORING | In Phase 1 (Exploration) | Atlas + Naya |
| FUTURE | Identified but not explored | Founder or officers |
| DEPRIORITIZED | Evaluated and deprioritized | Founder |

## 9. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Decision accuracy | >70% | Actual vs. expected outcomes |
| Resource estimation accuracy | ±30% | Estimated vs. actual engineering-weeks |
| Time box adherence | >80% | Stages completed within time box |
| Acceptance criteria pass rate | >90% | BUILDs passing all criteria |
| Learning capture rate | 100% | BUILDs with Learning Records |

---

*This Framework implements CONSTITUTION-001, Article II.*
*Last updated: July 17, 2026*
