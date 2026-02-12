#!/bin/sh

# Setup script for Git hooks
echo "🔧 Setting up Git hooks..."

# Make sure hooks directory exists
mkdir -p .git/hooks

# Copy hooks (if they exist in scripts directory)
if [ -f "scripts/pre-commit" ]; then
    cp scripts/pre-commit .git/hooks/pre-commit
    chmod +x .git/hooks/pre-commit
    echo "✅ Pre-commit hook installed"
fi

if [ -f "scripts/pre-push" ]; then
    cp scripts/pre-push .git/hooks/pre-push
    chmod +x .git/hooks/pre-push
    echo "✅ Pre-push hook installed"
fi

echo "🎉 Git hooks setup complete!"
echo "Hooks will run automatically on git commit and push."
