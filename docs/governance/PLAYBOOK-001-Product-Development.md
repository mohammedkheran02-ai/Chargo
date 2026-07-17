# PLAYBOOK-001: Product Development Playbook
## How to Execute a BUILD Phase

**Level:** 5 — Playbook
**Governed By:** FRAMEWORK-002 (BUILD Framework)
**Changed By:** Chief of Staff
**Last Updated:** July 17, 2026

---

## Overview

This Playbook provides step-by-step guidance for executing a BUILD phase at Mohammed OS. It is the operational companion to FRAMEWORK-002.

## Pre-Build Checklist

Before starting Stage 10 (Design), confirm:

- [ ] Gate 2 (Investment Gate) approved by Founder
- [ ] Scope Document complete with in-scope/out-of-scope
- [ ] Success criteria defined and measurable
- [ ] Learning objective documented
- [ ] Resource budget allocated
- [ ] Timeline agreed
- [ ] Founder's Intent statement written
- [ ] Review date scheduled

## Stage 10: Design (5–10 days)

### Day 1–2: Architecture
1. Review Founder's Intent and success criteria
2. Identify key technical components
3. Research integration points with existing systems
4. Draft component diagram

### Day 3–4: Specification
5. Write technical specification document
6. Define API contracts (if applicable)
7. Identify data model changes
8. Document security considerations

### Day 5+: Review
9. Write Architecture Decision Records (ADRs) for significant choices
10. Review specification with Naya (strategic alignment check)
11. Revise based on feedback
12. **Deliverable:** Design Document + ADRs

## Stage 11: Build (2–6 weeks)

### Week 1: Foundation
1. Set up development environment
2. Create database migrations
3. Implement core data models
4. Write unit tests for models

### Week 2+: Feature Development
5. Implement features in priority order
6. Write tests alongside code
7. Daily progress updates to Chief of Staff
8. Weekly demo to Naya (strategic check)

### Throughout: Quality
9. Run test suite before every commit
10. Monitor build performance
11. Document as you build
12. Flag scope creep immediately

## Stage 12: Alpha Test (3–5 days)

1. Deploy to staging environment
2. Atlas performs internal testing
3. Naya tests from strategic user perspective
4. Chief of Staff tests operational workflows
5. Document all bugs with severity (Critical/High/Medium/Low)
6. **Deliverable:** Alpha Test Report

## Stage 13: Beta Test (3–5 days)

1. Resolve all Critical and High bugs from Alpha
2. Deploy to Founder-accessible environment
3. Founder tests with real data
4. Collect Founder feedback (structured form)
5. Document usability issues
6. **Deliverable:** Beta Test Report with Founder feedback

## Stage 14: Acceptance Test (2–3 days)

1. Test each success criterion: PASS / FAIL / PARTIAL
2. Verify documentation completeness
3. Verify security requirements
4. Performance test (if applicable)
5. **Deliverable:** Acceptance Test Report

**Acceptance criteria must all pass before Gate 3.**

## Stage 15: Deployment Preparation (1–2 days)

1. Prepare deployment package
2. Write deployment runbook
3. Prepare database migration scripts
4. Document rollback procedure
5. Schedule deployment window
6. Notify Founder of deployment readiness
7. **Deliverable:** Deployment Package

## Post-Deployment

### Week 1 (Stage 17: Adoption)
- Monitor error rates daily
- Monitor usage metrics
- Document any issues
- **Deliverable:** Adoption Report

### Week 4 (Stage 18: Value Validation)
- Assess success criteria
- Evaluate learning objective
- Document surprises
- **Deliverable:** Value Validation Report

### Week 4+ (Stage 19: Learning)
- Write Learning Record
- Propose Motherboard updates if warranted
- Update AI officer models with learnings
- **Deliverable:** Learning Record

## Communication During BUILD

| When | Who | What |
|------|-----|------|
| Daily | Atlas → Chief of Staff | Progress update (1 paragraph) |
| Weekly | Atlas → Naya | Demo of progress |
| At milestones | Atlas → Founder | Demo + checkpoint |
| On blockers | Atlas → Chief of Staff | Immediate escalation |
| Pre-Gate 3 | Atlas → Founder | Acceptance test results |
| Post-Gate 4 | Executive Chief of Staff → Founder | Value validation |

## Common Pitfalls

| Pitfall | Prevention |
|---------|------------|
| Scope creep | Reference out-of-scope list weekly |
| Over-engineering | Reference Founder's Intent; simpler is better |
| Insufficient testing | Test-first approach; no feature without tests |
| Documentation debt | Document as you build, not after |
| Founder surprise | Weekly demos; no big reveals |

---

*This Playbook implements FRAMEWORK-002.*
*Last updated: July 17, 2026*
