import { resolve } from 'node:path'
import { defineWindiSetup } from '@slidev/types'

export default defineWindiSetup(() => ({
  extract: {
    include: [resolve(__dirname, '../**/*.{vue,ts,md}')],
  },
  shortcuts: {
    // custom the default background
    'bg-main': 'bg-white text-[#181818] dark:(bg-[#121212] text-[#ddd])',
    'bg-intro': 'bg-[#40276E] text-[#ddd]',
  },
}))
