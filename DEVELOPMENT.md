# Development Guide

## Git Hooks

This project includes Git hooks to ensure code quality before commits and pushes.

### Pre-commit Hook
- **Runs automatically** before each commit
- **ESLint**: Checks JS/TS files for linting issues
- **Stylelint**: Checks CSS/SCSS files for style issues
- **Blocks commit** if any linting fails

### Pre-push Hook
- **Runs automatically** before each push
- **TypeScript compilation**: Ensures project builds successfully
- **Blocks push** if build fails

### Setup

To install/reinstall the Git hooks:

```bash
npm run setup-hooks
```

### Manual Hook Management

Hook files are located in:
- `.git/hooks/pre-commit` - Pre-commit hook
- `.git/hooks/pre-push` - Pre-push hook
- `scripts/pre-commit` - Source file for pre-commit hook
- `scripts/pre-push` - Source file for pre-push hook

### Bypassing Hooks (Not Recommended)

If you absolutely need to bypass hooks:

```bash
# Bypass pre-commit
git commit --no-verify

# Bypass pre-push  
git push --no-verify
```

⚠️ **Warning**: Bypassing hooks is not recommended as it may introduce linting issues or broken builds to the repository.

### Troubleshooting

If hooks aren't working:

1. Make sure hooks are executable:
   ```bash
   chmod +x .git/hooks/pre-commit .git/hooks/pre-push
   ```

2. Reinstall hooks:
   ```bash
   npm run setup-hooks
   ```

3. Check hook permissions:
   ```bash
   ls -la .git/hooks/
   ```
