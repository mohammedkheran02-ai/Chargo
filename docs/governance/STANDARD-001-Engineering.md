# STANDARD-001: Engineering Standards
## Technical Requirements and Conventions for Mohammed OS

**Level:** 4 — Standard
**Governed By:** FRAMEWORK-002 (BUILD Framework)
**Changed By:** Atlas (with Founder notification)
**Last Updated:** July 17, 2026

---

## 1. Purpose

This Standard defines the technical requirements, conventions, and quality standards for all engineering work at Mohammed OS.

## 2. Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React + TypeScript + Vite | Latest stable |
| Styling | Tailwind CSS | 3.4.x |
| UI Components | shadcn/ui | Latest |
| Backend | Supabase (PostgreSQL + Auth + Realtime) | Cloud |
| ORM | Supabase Client | Latest |
| AI | OpenAI API + Anthropic API | Latest |
| Deployment | Static hosting (Kimi) | — |

## 3. Code Standards

### TypeScript
- All new code must be TypeScript
- Strict mode enabled
- No `any` types without documented justification
- Explicit return types on all functions

### Component Architecture
- Functional components with hooks
- Custom hooks in `src/hooks/`
- Components in `src/components/` or `src/pages/`
- Shared types in `src/types/`

### File Organization
```
src/
├── components/          # Reusable components
│   ├── ui/             # shadcn/ui components
│   └── [feature]/      # Feature-specific components
├── pages/              # Page-level components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and clients
│   └── supabase.ts     # Supabase client
├── types/              # Shared TypeScript types
└── App.tsx             # Route definitions
```

## 4. Database Standards

### Migrations
- All schema changes via migrations
- Migration naming: `###_descriptive_name.sql`
- Migrations are sequential (no gaps)
- Migrations must be reversible (where possible)

### Row-Level Security
- Every table has `org_id` column
- Every table has RLS policies using `is_org_member()`
- Authenticated role has necessary grants
- Policies tested with multiple users before deployment

### Naming Conventions
- Tables: plural, snake_case (`decisions`, `motherboard_entries`)
- Columns: snake_case (`created_at`, `org_id`)
- Primary keys: UUID with explicit default (`gen_random_uuid()`)
- Foreign keys: `[table]_id` format

## 5. Security Standards

### Authentication
- Supabase Auth for all authentication
- No custom auth implementation
- Sessions managed by Supabase client
- Logout clears all client-side state

### Authorization
- RLS is the primary authorization mechanism
- Application-level checks supplement RLS (defense in depth)
- No client-side authorization decisions without server verification

### Data Protection
- No sensitive data in client-side logs
- API keys stored in environment variables only
- No hardcoded credentials (ever)
- Supabase keys use `import.meta.env`

## 6. Testing Standards

### Required Tests
- Unit tests for all utility functions
- Integration tests for database queries
- RLS policy tests with multiple user roles
- UI tests for critical user flows

### Test Data
- Use dedicated test workspaces
- Never use production data in tests
- Clean up test data after tests complete

## 7. Documentation Standards

### Code Documentation
- JSDoc comments on all exported functions
- README in each major directory
- Inline comments for complex logic only

### Architecture Documentation
- ADRs for significant architectural decisions
- ADRs stored in `docs/adr/`
- ADR format: context, decision, consequences

### API Documentation
- All API functions documented
- Example usage for each function
- Error cases documented

## 8. Quality Standards

### Code Review
- All changes reviewed by at least one AI officer
- Founder reviews architectural changes
- No direct commits to main branch

### Build Requirements
- Build must pass before deployment
- No TypeScript errors
- No linting errors
- All tests passing

### Performance
- Page load < 3 seconds
- Database queries < 200ms (p95)
- Bundle size monitored

## 9. Deployment Standards

### Process
1. Build passes
2. Tests pass
3. Founder approval (Gate 3)
4. Deploy to production
5. Verify deployment
6. Monitor for 24 hours

### Rollback
- Rollback plan documented before deployment
- Rollback must be executable within 30 minutes
- Database migrations must be reversible

## 10. Workspace Isolation Standards

### RLS Implementation
- `is_org_member(target_org_id)` function used universally
- Every query filtered by workspace
- No cross-workspace data leakage
- Admin users see only their workspace data (admin RLS filters by user)

### Multi-Workspace Queries
- Use `.eq("user_organizations.user_id", user.id)` for user-specific joins
- Never rely on `[0]` index from array joins without user filtering
- Test with users who have admin role on multiple workspaces

---

*This Standard implements FRAMEWORK-002.*
*Last updated: July 17, 2026*
