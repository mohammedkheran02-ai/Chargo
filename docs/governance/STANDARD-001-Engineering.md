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
- No `any` types without explicit justification
- Explicit return types on all functions
- Interface preferred over type alias for object shapes

### React
- Functional components with hooks
- Custom hooks for reusable logic
- Context for shared state
- No class components

### File Organization
```
src/
  components/     # Reusable UI components
  pages/          # Route-level pages
  hooks/          # Custom React hooks
  lib/            # Utilities and helpers
  types/          # Shared TypeScript types
  styles/         # Global styles
```

### Naming Conventions
- Components: PascalCase (`WorkspaceCard.tsx`)
- Hooks: camelCase with `use` prefix (`useWorkspace.ts`)
- Utilities: camelCase (`formatDate.ts`)
- Types/Interfaces: PascalCase (`Workspace.ts`)
- Database tables: snake_case (`user_organizations`)
- Database columns: snake_case (`created_at`)

## 4. Database Standards

### Migrations
- Sequential numbering: `001_description.sql`, `002_description.sql`
- Each migration must be reversible (include down migration)
- Test migrations on fresh database before commit
- Never modify existing migrations after they've been applied

### RLS (Row Level Security)
- Every table must have RLS enabled
- Every policy must include workspace isolation
- Default policy pattern: `is_org_member(org_id)`
- Test RLS with non-owner accounts

### Schema Conventions
- Primary keys: `uuid` with `gen_random_uuid()`
- Timestamps: `created_at` and `updated_at` on every table
- Soft deletes: `deleted_at` timestamp (not hard deletes)
- Foreign keys: Always indexed
- Enum constraints: Use check constraints or enum tables

### Workspace Isolation
Every query must filter by workspace:
```typescript
// Correct
const { data } = await supabase
  .from('decisions')
  .select('*')
  .eq('org_id', currentWorkspace.id);

// Incorrect — no workspace filter
const { data } = await supabase
  .from('decisions')
  .select('*');
```

## 5. Security Standards

### Authentication
- All API calls authenticated via Supabase Auth
- No custom authentication mechanisms
- Session management handled by Supabase
- Token refresh automatic

### Authorization
- RLS is the primary authorization mechanism
- No client-side authorization checks (bypassable)
- Server-side validation on all mutations
- Admin features protected by role checks

### Data Protection
- No secrets in client-side code
- API keys in environment variables only
- No PII logged
- Secure headers on all requests

### Founder Protection
- Founder account protected by database triggers
- Founder cannot be deleted, demoted, or deactivated by any system process
- Only the Founder can modify their own account

## 6. Testing Standards

### Required Tests
- RLS policy tests (verify isolation)
- Critical user flows (happy path)
- Error handling (sad path)

### Test Data
- Use seed scripts for consistent test data
- Never use production data in tests
- Clean up test data after tests

### Manual Testing Checklist
- [ ] Works as authenticated user
- [ ] Works as admin user
- [ ] RLS prevents cross-workspace access
- [ ] Error states display correctly
- [ ] Loading states display correctly
- [ ] Works on mobile viewport
- [ ] Works on desktop viewport

## 7. Deployment Standards

### Build
- Production build must succeed with zero errors
- No warnings in production build (or explicitly justified)
- Build output tested before deployment

### Deployment Process
1. Merge to main branch
2. Build production bundle
3. Deploy to production
4. Run smoke tests
5. Monitor for 24 hours

### Rollback
- Previous deployment must be retainable
- Rollback plan documented
- Rollback can be executed within 30 minutes

## 8. Documentation Standards

### Code Documentation
- Complex functions: JSDoc comment
- Hooks: Document parameters and return values
- Components: Document props interface
- Database functions: Document purpose and parameters

### Architecture Documentation
- Major decisions: Architecture Decision Record (ADR)
- Database schema: Documented in migrations
- API changes: Documented in commit messages

---

*End of STANDARD-001*
*8 sections. 1 tech stack. Code, DB, security, testing, deployment standards.*
