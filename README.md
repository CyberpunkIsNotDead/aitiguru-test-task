# React + TypeScript + Vite with React Compiler

This template provides a minimal setup to get React working in Vite with HMR, ESLint rules, and the React Compiler enabled.

## React Compiler

✅ **React Compiler is enabled and configured!**

The React Compiler is automatically optimizing your components. It uses compilation mode "annotations" which means it will optimize components that are marked with the "use client" directive or have explicit optimization hints.

### Configuration

- **Babel Plugin**: `babel-plugin-react-compiler` is configured in `vite.config.ts`
- **Config File**: `react-compiler.config.json` with compilation mode set to "annotations"
- **Automatic Optimization**: Components are automatically optimized without manual memoization

### Usage

Simply write your React components as usual - the compiler will handle optimizations automatically:

```tsx
function MyComponent({ data, onUpdate }) {
  // No need for useMemo, useCallback, or React.memo
  // The compiler handles this automatically!
  const processed = data.map((item) => item.value * 2);

  return (
    <div>
      {processed.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
}
```

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
