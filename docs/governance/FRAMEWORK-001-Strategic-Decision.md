# FRAMEWORK-001: Strategic Decision Framework
## How Mohammed OS Makes Strategic Decisions

**Level:** 3 — Framework
**Governed By:** CONSTITUTION-001, Article II
**Changed By:** Founder or Executive Chief of Staff
**Last Updated:** July 17, 2026

---

## 1. Purpose

This Framework defines the process by which Mohammed OS evaluates strategic opportunities and makes investment decisions. It implements Article II of the Constitution.

A strategic decision is any decision that:
- Allocates resources (engineering time, budget, AI compute)
- Changes Mohammed OS's architecture or capabilities
- Commits to building, buying, or integrating a capability
- Affects the Founder experience or governance model
- Alters the scope or mission of Mohammed OS

## 2. The 22-Stage Lifecycle

Every strategic opportunity passes through 22 stages across 6 phases:

### PHASE 0: INTAKE (Stages 0–2)

**Purpose:** Capture and frame opportunities before significant analysis investment.

**Stage 0: Signal Detected**
- Trigger: A signal that an opportunity may exist
- Deliverable: Signal Log Entry (one paragraph)
- Time box: 1 day
- Owner: Any AI officer or the Founder

**Stage 1: Opportunity Framed**
- Trigger: Signal Log Entry created
- Deliverable: Opportunity Hypothesis Document using mandatory format:
  - "We believe that [capability] will deliver [outcome] for [user]"
  - "We will know we are right when [metric] changes by [amount]"
  - "The problem this solves is [problem statement]"
  - "This aligns with Founder Rule(s): [rule numbers]"
- Time box: 2 days
- Owner: Atlas (technical) or Naya (strategic)

**Stage 2: Intake Reviewed**
- Trigger: Hypothesis document complete
- Deliverable: Intake Review Memo (completeness + priority assessment)
- Time box: 1 day
- Owner: Chief of Staff

**→ GATE 0: Intake Gate**
- Authority: Chief of Staff
- Criteria: Hypothesis complete, aligns with ≥1 Founder Rule, not a duplicate

### PHASE 1: EXPLORATION (Stages 3–6)

**Purpose:** Investigate thoroughly before committing resources.

**Stage 3: Research Conducted**
- Deliverable: Research Report (market, technical, user, risk, dependency analysis)
- Time box: 5–10 days
- Owner: Atlas + Naya collaboratively

**Stage 4: Hypothesis Validated**
- Deliverable: Validated Hypothesis with expected value calculation
- Time box: 2 days

**Stage 5: Adversarial Analysis**
- Deliverable: Red Team Report — the strongest case AGAINST proceeding
  - Every assumption challenged
  - Pre-mortem: "If this fails, why?"
  - Independent verdict (may differ from Stage 4)
- Time box: 3 days
- **Critical:** The adversarial analysis MUST present a different conclusion than the original, or explain why it cannot.

**Stage 6: Evaluation Complete**
- Deliverable: Evaluation Summary with confidence score (0–100%)
- Owner: Executive Chief of Staff

**→ GATE 1: Evaluation Gate**
- Authority: **Founder (mandatory)**
- Minimum thresholds:
  - Confidence score ≥ 60%
  - Expected value ≥ 3x estimated resource cost
  - Adversarial analysis presents ≥ 3 genuine challenges
  - No unmitigated critical risks
  - Explicit BUILD / BUY / INTEGRATE / IGNORE recommendation

### PHASE 2: INVESTMENT (Stages 7–9)

**Purpose:** Define scope, resources, and success criteria before building.

**Stage 7: Scope Defined**
- Deliverable: Scope Document including:
  - Founder Briefing Document (Working Backwards narrative)
  - Technical specification
  - In-scope / out-of-scope (explicit)
  - Success criteria (measurable, time-bound)
  - Learning objective
- Time box: 5–7 days

**Stage 8: Resources Allocated**
- Deliverable: Resource Allocation Memo (engineering-weeks, timeline, dependencies, opportunity cost)
- Time box: 2 days
- Owner: Chief of Staff

**Stage 9: Investment Approved**
- Deliverable: Investment Decision Document including:
  - Approved scope and resources
  - **Founder's Intent** statement (one paragraph: what success looks like)
  - Risk acceptance
  - Review date
- Owner: Founder

**→ GATE 2: Investment Gate**
- Authority: **Founder (mandatory personal approval)**
- All criteria from Stage 7–9 must be met

### PHASE 3: EXECUTION (Stages 10–15)

**Purpose:** Build, test, and prepare for deployment.

| Stage | Name | Deliverable | Time Box |
|-------|------|-------------|----------|
| 10 | Design Complete | Design Document + ADRs | 5–10 days |
| 11 | Build Started | Development plan with milestones | Ongoing |
| 12 | Alpha Complete | Alpha Test Report | 3–5 days |
| 13 | Beta Complete | Beta Test Report (Founder feedback) | 3–5 days |
| 14 | Acceptance Tested | Acceptance Test Report | 2–3 days |
| 15 | Deployment Ready | Deployment Package | 1–2 days |

**→ GATE 3: Deployment Gate**
- Authority: **Founder (mandatory)**
- Criteria: All acceptance criteria pass, no critical/high bugs, documentation complete, rollback plan documented

### PHASE 4: OPERATION (Stages 16–19)

**Purpose:** Measure adoption, validate value, capture learning.

| Stage | Name | When | Deliverable |
|-------|------|------|-------------|
| 16 | Deployed | Gate 3 approved | Deployment Confirmation |
| 17 | Adoption Measured | 7 days post-deploy | Adoption Report |
| 18 | Value Validated | 30 days post-deploy | Value Validation Report |
| 19 | Learning Captured | Value validation complete | Learning Record |

**→ GATE 4: Review Gate**
- Authority: **Founder (mandatory)**
- Options: CONTINUE / ENHANCE / RETIRE / ESCALATE

### PHASE 5: RESOLUTION (Stages 20–21)

**Purpose:** Close the initiative and archive.

| Stage | Name | Deliverable |
|-------|------|-------------|
| 20 | Decision Made | Resolution Plan |
| 21 | Resolution Complete | Initiative Archive |

**→ GATE 5: Archive Gate**
- Authority: Chief of Staff
- Criteria: Archive complete, Learning Record added to organizational memory

## 3. Decision Gates Summary

| Gate | Name | Phase | Authority | Evidence Required |
|------|------|-------|-----------|-------------------|
| 0 | Intake | Intake | Chief of Staff | Hypothesis document, alignment check |
| 1 | Evaluation | Exploration | **Founder** | Research report, adversarial analysis, confidence score |
| 2 | Investment | Investment | **Founder** | Scope document, Founder's Intent, resource plan |
| 3 | Deployment | Execution | **Founder** | Acceptance test results, documentation |
| 4 | Review | Operation | **Founder** | Value validation report |
| 5 | Archive | Resolution | Chief of Staff | Complete archive, learning record |

## 4. Confidence Scoring

### Formula

```
Confidence Score = Base × Time Decay × Evidence Factor × Signal Factor
```

### Factors

| Factor | Weight | Description |
|--------|--------|-------------|
| Evidence quality | 30% | How strong is the supporting evidence? |
| Evidence quantity | 20% | How much evidence exists? |
| Evidence recency | 15% | How recent is the evidence? |
| Risk mitigation | 20% | How well are risks mitigated? |
| Strategic alignment | 15% | How well does this align with Founder Rules? |

### Score Interpretation

| Score | Level | Action |
|-------|-------|--------|
| 90–100% | Very high | Proceed with standard resources |
| 75–89% | High | Proceed + risk monitoring |
| 60–74% | Moderate | Proceed with reduced scope or safeguards |
| 40–59% | Low | Enhanced analysis required; Founder must approve with written rationale |
| 20–39% | Very low | Typically reject; only proceed if strategic imperative |
| 0–19% | Negligible | Reject |

## 5. Authority Boundaries

### What AI Officers Can Do Autonomously
- Conduct research (Stage 3)
- Write specifications (Stage 7, 10)
- Build and test (Stages 11–15)
- Generate recommendations (Stages 4, 6)
- Present adversarial analyses (Stage 5)
- Make operational decisions within delegated scope

### What Requires Founder Approval
- Gates 1, 2, 3, 4 (all mandatory)
- Constitutional amendments
- Founder Rule changes
- AI officer role changes
- Emergency Override (Chief of Staff confirms, Founder reviews retroactively)

### What Chief of Staff Can Approve
- Gate 0 (Intake)
- Gate 5 (Archive)
- Operational decisions within delegated scope

## 6. Time-Boxing Rules

- Every stage has a maximum duration
- Analysis that exceeds its time box advances with available evidence
- "We need more time" is not a valid reason to delay — it is a recommendation to proceed with lower confidence
- Chief of Staff enforces time boxes

## 7. Fast-Track Process

For low-risk, low-resource initiatives (default thresholds: <2 engineering-weeks, confidence ≥60%):

1. Chief of Staff prepares abbreviated gate package
2. Package appears in Founder's inbox with "Fast-Track" label
3. Founder has 48 hours to review; if no response, initiative proceeds
4. Founder can reject or modify at any time

## 8. Emergency Override

See CONSTITUTION-001, Article VII, Section 12.

In emergency: any officer invokes → Chief of Staff confirms within 4 hours → action taken immediately → full lifecycle completed retroactively within 7 days.

## 9. Post-Decision Review

Every initiative that completes Gate 4 triggers a PDR:

- **Successful initiatives:** 30 days after Gate 4
- **Partial success:** 14 days after Gate 4
- **Failed initiatives:** 7 days after Gate 4

**Agenda (30 minutes):**
1. What did we decide and why? (5 min)
2. What actually happened? (5 min)
3. What did we get right? (5 min)
4. What did we get wrong? (5 min)
5. What did we learn? (5 min)
6. What should we change? (5 min)

**Output:** Learning Record added to organizational memory.

## 10. Learning Integration

Learning flows into organizational memory through three channels:
1. **Motherboard updates** — successful decisions revealing new Founder Rules
2. **AI officer model updates** — patterns informing future recommendations
3. **Constitutional/Framework evolution** — systematic failures triggering governance improvements

## 11. Failure Modes and Safeguards

| Failure Mode | Detection | Mitigation |
|-------------|-----------|------------|
| Bureaucratic paralysis | Gate throughput > time box + 50% | Time box enforcement; fast-track |
| Adversarial theater | <2 genuine challenges × 3 initiatives | Quality assessment; Founder notification |
| Founder overload | Response time > 7 days for >50% | Batch related decisions; delegation |
| Confidence manipulation | Accuracy <50% while confidence >70% | Transparent formula; calibration tracking |
| Learning without application | Application rate <30% | Auto-reference; quarterly audit |

## 12. Degradation Modes

| Mode | Gates | Evidence | Adversarial | Reviews |
|------|-------|----------|-------------|---------|
| Full Operation | All 6 gates | Full | Complete | Per-initiative |
| Reduced Overhead | Gates 1,2,4 require Founder | Mandatory only | Abbreviated | Weekly batch |
| Emergency | Gates 1,2,4 require Founder | Minimum | Risk threshold only | Deferred |
| Override | All Founder direct | Informal | None | Retroactive |

---

*This Framework implements CONSTITUTION-001, Article II.*
*Last updated: July 17, 2026*
