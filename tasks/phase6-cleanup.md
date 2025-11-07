# Phase 6: Cleanup

## Task 6.1: Add Deprecation Notices

**Files**:
- `frontend/src/components/Scenes.tsx`
- `frontend/src/components/DeviceControl.tsx`
- `frontend/src/components/BatteryIcon.tsx`

**Action**: Add deprecation comments to legacy components

**Requirements**:
- Add JSDoc comment at top of each file
- Mark as @deprecated
- Reference new location: `@see features/scenes` or `@see features/devices`
- Add console.warn in component body (development only)
- Indicate removal timeline

**Example**:
```typescript
/**
 * @deprecated Use Scenes from @/features/scenes instead
 * This component will be removed in v2.0
 * @see frontend/src/features/scenes
 */
```

**Acceptance Criteria**:
- [ ] All legacy files have deprecation notices
- [ ] JSDoc comments added
- [ ] New locations referenced
- [ ] Console warnings in development
- [ ] TypeScript compiles

---

## Task 6.2: Verify No Legacy Imports

**Action**: Search codebase for legacy component imports

**Requirements**:
- Search for: `import.*from.*["']@/components/Scenes`
- Search for: `import.*from.*["']@/components/DeviceControl`
- Search for: `import.*from.*["']@/components/BatteryIcon`
- Search in: `frontend/src/features/**/*.{ts,tsx}`
- Verify only deprecated files import them
- Update any remaining imports found

**Acceptance Criteria**:
- [ ] No legacy imports in features folder
- [ ] All features use feature imports
- [ ] Search results documented
- [ ] Any found imports updated
- [ ] TypeScript compiles

---

## Task 6.3: Delete Legacy Components

**Action**: Remove legacy component files (after thorough verification)

**Requirements**:
- **WAIT**: Only do this after phases 1-5 are complete and tested
- Delete: `frontend/src/components/Scenes.tsx`
- Delete: `frontend/src/components/Scenes.css` (if exists)
- Delete: `frontend/src/components/DeviceControl.tsx`
- Delete: `frontend/src/components/DeviceControl.css` (if exists)
- Delete: `frontend/src/components/BatteryIcon.tsx`
- Delete: `frontend/src/components/BatteryIcon.css` (if exists)
- Run full test suite before deletion
- Create git branch for safety

**Pre-deletion Checklist**:
- [ ] All phases 1-5 complete
- [ ] All tests passing
- [ ] Manual testing complete
- [ ] No remaining imports verified
- [ ] Git branch created
- [ ] Team notified (if applicable)

**Acceptance Criteria**:
- [ ] Legacy files deleted
- [ ] TypeScript compiles
- [ ] All tests pass
- [ ] Application runs without errors
- [ ] Git commit created
- [ ] Backup branch exists

---

## Verification Steps

1. Create backup branch: `git checkout -b backup-legacy-components`
2. Run full test suite: `npm run test`
3. Run type check: `npm run type-check`
4. Run linter: `npm run lint`
5. Build application: `npm run build`
6. Manual smoke test in browser
7. Check browser console for errors
8. Verify no missing imports
9. Test all major features
10. Create deletion commit with detailed message
