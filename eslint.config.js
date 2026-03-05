import antfu from '@antfu/eslint-config'

export default antfu(
  {
    react: true,
    typescript: true,
    stylistic: true,
  },
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
  },
  {
    ignores: [
      '.pnpm-store',
      'dist',
      'node_modules',
      'PRD.md',
    ],
  },
)
