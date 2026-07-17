# PLAYBOOK-001: Product Development Playbook
## How to Execute a BUILD Phase

**Level:** 5 — Playbook
**Governed By:** FRAMEWORK-002 (BUILD Framework)
**Changed By:** Chief of Staff (with Executive Chief of Staff approval)
**Last Updated:** July 17, 2026

---

## 1. Purpose

This Playbook provides step-by-step instructions for executing a BUILD phase from design through deployment. It is the operational companion to FRAMEWORK-002.

## 2. Pre-Build Checklist

Before writing any code:

- [ ] BUILD phase approved (Gate 2 decision recorded)
- [ ] Scope document reviewed and signed off
- [ ] Success criteria defined and measurable
- [ ] Out-of-scope items explicitly listed
- [ ] Dependencies identified and available
- [ ] Database changes planned (if any)
- [ ] UI/UX mockups or wireframes approved (if applicable)
- [ ] No competitive intelligence gaps (per FRAMEWORK-003)

## 3. Stage-by-Stage Execution

### Stage 1: Database & Backend (Days 1–2)

**Database:**
- Write migration files (sequential numbering)
- Include rollback scripts
- Test migrations on fresh database
- Update RLS policies if new tables

**Backend (Supabase):**
- Create database functions
- Create Edge Functions if needed
- Test with Supabase client
- Verify RLS policies work correctly

**Validation:**
- [ ] Migrations run cleanly
- [ ] RLS policies enforce workspace isolation
- [ ] API endpoints return correct data
- [ ] Rollback scripts work

### Stage 2: Frontend Structure (Days 2–3)

**Setup:**
- Create page components
- Create sub-components
- Set up routes
- Set up state management

**Implementation:**
- Build static UI first (no data)
- Add loading states
- Add error states
- Add empty states

**Validation:**
- [ ] UI renders correctly at all breakpoints
- [ ] Loading states work
- [ ] Error states work
- [ ] Empty states work

### Stage 3: Data Integration (Days 3–4)

**Connect to Backend:**
- Write Supabase queries
- Add real-time subscriptions if needed
- Handle loading/error states
- Implement optimistic updates

**Validation:**
- [ ] Data loads correctly
- [ ] Real-time updates work
- [ ] Error handling works
- [ ] Loading states work during data fetch

### Stage 4: Interaction & Polish (Days 4–5)

**Interactions:**
- Add user interactions (forms, buttons, navigation)
- Implement state changes
- Add confirmation dialogs for destructive actions
- Add success/error feedback

**Polish:**
- Animations and transitions
- Focus states
- Keyboard navigation
- Accessibility check

**Validation:**
- [ ] All interactions work
- [ ] Forms validate correctly
- [ ] Destructive actions have confirmation
- [ ] Feedback is clear

### Stage 5: Testing & Review (Days 5–6)

**Testing:**
- Unit tests for utilities
- Integration tests for data flow
- Manual testing of all user flows
- Cross-browser testing

**Code Review:**
- Self-review against STANDARD-001
- Check for security issues
- Check for performance issues
- Document any technical debt

**Validation:**
- [ ] All tests pass
- [ ] No console errors
- [ ] No security issues
- [ ] Performance is acceptable

### Stage 6: Founder Acceptance Test (Days 6–7)

**Preparation:**
- Deploy to staging
- Write acceptance test script
- Prepare demo data
- Document known issues

**Execution:**
- Founder tests against acceptance criteria
- Issues logged with severity (Blocker/Major/Minor)
- Blockers fixed immediately
- Major issues fixed before deployment

**Validation:**
- [ ] All acceptance criteria met
- [ ] No blocker issues
- [ ] Founder approves

### Stage 7: Deployment (Day 7)

**Pre-deployment:**
- Merge to main branch
- Run production build
- Verify build succeeds
- Prepare rollback plan

**Deployment:**
- Deploy to production
- Run smoke tests
- Monitor for errors
- Verify all features work

**Post-deployment:**
- Monitor for 24 hours
- Log any issues
- Update status to Complete
- Schedule BUILD phase review

## 4. Communication During BUILD

| When | Who | What | How |
|------|-----|------|-----|
| Daily | Atlas | Progress update | Brief status |
| Blocker | Atlas | Escalation | Immediate notification |
| Mid-point | Chief of Staff | Check-in | Scheduled review |
| Pre-acceptance | Chief of Staff | Prep for Founder test | Summary document |
| Acceptance | Founder | Go/no-go | Direct test |
| Complete | Executive Chief of Staff | BUILD review | Structured review |

## 5. Common Pitfalls

| Pitfall | Prevention |
|---------|-----------|
| Scope creep | Explicit out-of-scope list, change requires Founder approval |
| Missing RLS | Test every query with non-owner user |
| No error states | Design error states before happy path |
| No loading states | Design loading states first |
| Untested migrations | Always test on fresh database |
| Founder surprise | Daily updates, mid-point check-in |

---

*End of PLAYBOOK-001*
*7 stages. 5 communication points. 6 common pitfalls.*
