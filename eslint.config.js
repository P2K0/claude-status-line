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
      '.agent',
      '.agents',
      'dist',
      'node_modules',
      'PRD.md',
    ],
  },
)
