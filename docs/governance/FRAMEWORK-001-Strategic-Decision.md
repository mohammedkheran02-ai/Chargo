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
- Any source: Founder request, market observation, AI officer analysis, competitive intelligence, user feedback
- Recorded as a Signal in the system
- No commitment at this stage

**Stage 1: Signal Framed**
- Signal translated into a concrete opportunity statement
- Preliminary scope defined (what problem, who for, why now)
- Assigned to an AI officer for initial assessment

**Stage 2: Triage Complete**
- 30-minute triage assessment: Is this worth exploring?
- Quick check against current portfolio and priorities
- Outcome: Reject, Fast-Track, or Proceed to Exploration

### PHASE 1: EXPLORATION (Stages 3–7)

**Purpose:** Deep analysis of the opportunity before any resource commitment.

**Stage 3: Strategic Landscape Research**
- **Mandatory per Constitution, Article II, Section 5**
- Competitive intelligence: Who solves this? How? At what scale?
- Market analysis: Size, growth, maturity
- Build/Buy/Integrate/Ignore assessment
- Deliverable: Competitive Intelligence Report

**Stage 4: Problem Validation**
- Is the problem real? Who has it? How painful?
- Evidence required (interviews, data, research)
- Hypothesis: "We believe [X] is a problem for [Y] because [Z]"

**Stage 5: Solution Hypothesis**
- How would Mohammed OS solve this?
- What approach? What differentiator?
- Initial feasibility assessment

**Stage 6: Confidence Scoring**
- Multi-factor confidence score calculated
- Factors: Evidence quality, market timing, strategic fit, technical feasibility, resource availability
- Score: 0–100. Below 40: reject. 40–60: more research. 60+: proceed.

**Stage 7: Adversarial Analysis**
- Deliberate construction of the strongest case AGAINST proceeding
- What could go wrong? What assumptions are shaky?
- Deliverable: Adversarial Analysis Document

**Gate 1 Decision Point:** Proceed to Investment, Return to Exploration, or Reject

### PHASE 2: INVESTMENT (Stages 8–11)

**Purpose:** Define what will be built, how, and with what resources.

**Stage 8: Scope Definition**
- Explicit in-scope and out-of-scope
- Resource budget (engineering-weeks, AI compute, external costs)
- Timeline with milestones
- Success criteria (measurable, time-bound)

**Stage 9: BUILD Phase Planning**
- Breaking scope into BUILD phases
- Sequencing and dependencies
- Risk identification and mitigation

**Stage 10: Stakeholder Alignment**
- Founder review of plan
- AI officer alignment on approach
- Any external stakeholder input

**Stage 11: Investment Decision**
- Formal go/no-go decision
- Resource allocation confirmed
- BUILD phase(s) approved and scheduled

**Gate 2 Decision Point:** Approve Investment, Request Revision, or Reject

### PHASE 3: EXECUTION (Stages 12–16)

**Purpose:** Build what was approved.

**Stage 12: BUILD Phase Execution**
- Engineering work per PLAYBOOK-001
- Weekly progress tracking
- Blocker escalation process

**Stage 13: Quality Assurance**
- Code review per STANDARD-001
- Testing: unit, integration, acceptance
- Security review

**Stage 14: Founder Acceptance Test**
- Founder tests the deliverable
- Acceptance criteria checked
- Issues logged and prioritized

**Stage 15: Deployment**
- Production deployment per STANDARD-001
- Monitoring and rollback plan
- Post-deployment verification

**Stage 16: BUILD Phase Review**
- What worked? What didn't?
- Outcomes vs. success criteria
- Learning captured

**Gate 3 Decision Point:** Approve for Operation, Request Rework, or Deprecate

### PHASE 4: OPERATION (Stages 17–19)

**Purpose:** Run what was built. Measure. Learn.

**Stage 17: Operational Monitoring**
- Usage metrics, performance, errors
- Founder satisfaction
- Cost monitoring

**Stage 18: Outcome Assessment**
- Did it achieve the success criteria?
- Quantitative measurement
- Qualitative assessment

**Stage 19: Learning Capture**
- What was learned?
- How should this influence future decisions?
- Knowledge recorded

**Gate 4 Decision Point:** Continue, Enhance, or Deprecate

### PHASE 5: RESOLUTION (Stages 20–21)

**Purpose:** Close the loop on the strategic decision.

**Stage 20: Strategic Review**
- Full lifecycle review
- Decision quality assessment
- Portfolio impact analysis

**Stage 21: Resolution**
- Decision marked: Success, Partial Success, or Failure
- Learning applied to governance system
- Closure or continuation decision

**Gate 5 Decision Point:** Continue Investment, Pivot, or Close

## 3. Decision Gates Summary

| Gate | Stage | Decision | Authority | Max Time |
|------|-------|----------|-----------|----------|
| Gate 0 | Triage | Explore, Fast-Track, or Reject | Executive Chief of Staff | 48 hours |
| Gate 1 | Exploration | Proceed to Investment, More Research, or Reject | Founder | 7 days |
| Gate 2 | Investment | Approve, Revise, or Reject | Founder | 7 days |
| Gate 3 | Execution | Approve for Operation, Rework, or Deprecate | Founder | 48 hours |
| Gate 4 | Operation | Continue, Enhance, or Deprecate | Founder or Executive Chief of Staff | 14 days |
| Gate 5 | Resolution | Continue, Pivot, or Close | Founder | 30 days |

## 4. Confidence Scoring

Confidence scores are calculated at Stage 6 using a multi-factor formula:

```
Confidence Score = (Evidence × 0.25 + Timing × 0.20 + Fit × 0.25 + Feasibility × 0.15 + Resources × 0.15) × Time Decay
```

Each factor scored 0–100:
- **Evidence** (0.25): Quality and quantity of validation evidence
- **Timing** (0.20): Market timing and urgency
- **Strategic Fit** (0.25): Alignment with Mohammed OS mission and portfolio
- **Technical Feasibility** (0.15): Can we build this with available technology?
- **Resource Availability** (0.15): Do we have the resources?

**Time Decay:** Confidence degrades over time if no action taken:
- After 30 days: × 0.95
- After 60 days: × 0.85
- After 90 days: × 0.70
- After 180 days: × 0.50

**Interpretation:**
- **0–39:** Red — Do not proceed
- **40–59:** Yellow — More research required
- **60–79:** Green — Proceed with standard process
- **80–100:** Strong — Fast-track eligible

## 5. Authority Boundaries

| Decision Type | Can Decide | Must Notify | Can Override |
|--------------|-----------|-------------|--------------|
| Triage (Gate 0) | Executive Chief of Staff | Founder | Founder |
| Explore/Invest (Gate 1–2) | Founder | — | — |
| Execute (Gate 3) | Founder | — | — |
| Operate (Gate 4) | Founder or ECS | Founder (if ECS decides) | Founder |
| Resolve (Gate 5) | Founder | — | — |
| Emergency Override | Any AI Officer (temporary) | Founder within 4h | Founder |

## 6. Time-Boxing Rules

| Phase | Maximum Duration | Review Trigger |
|-------|-----------------|----------------|
| Intake | 48 hours | Signal triage |
| Exploration | 14 days | Gate 1 decision |
| Investment | 7 days | Gate 2 decision |
| Execution | Per BUILD phase plan | Weekly review |
| Operation | 90 days | Gate 4 decision |
| Resolution | 30 days | Gate 5 decision |

## 7. Fast-Track Process

Certain opportunities can skip Exploration and proceed directly to Investment:

**Fast-Track Criteria (must meet all):**
1. Confidence score ≥ 80 from initial assessment
2. Clear strategic fit with existing portfolio
3. Low technical risk (proven technology)
4. Resource budget < 2 engineering-weeks
5. No competitive intelligence gaps identified

**Fast-Track Authority:** Founder approval still required, but compressed timeline:
- Triage → Investment decision in 48 hours
- Exploration phases completed retroactively within 14 days

## 8. Degradation Modes

When the standard process cannot be followed:

| Degradation | Trigger | Action |
|-------------|---------|--------|
| Compressed Timeline | Urgent opportunity | Skip non-mandatory stages, maintain gates |
| Limited Evidence | New domain | Increase adversarial analysis, lower confidence threshold for research |
| Resource Constraint | No available engineers | Queue with portfolio prioritization |
| Founder Unavailable | Travel, illness | Emergency Override for operational only, strategic decisions wait |

---

*End of FRAMEWORK-001*
*22 stages. 6 gates. 5 confidence factors. 4 degradation modes.*
