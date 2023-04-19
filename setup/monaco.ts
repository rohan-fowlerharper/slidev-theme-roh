import { defineMonacoSetup } from '@slidev/types'

export default defineMonacoSetup(async (monaco) => {
  return {
    theme: {
      light: 'vs-dark',
      dark: 'vs-dark',
    },
  }
})
