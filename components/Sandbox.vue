<script setup lang="ts">
import type { SandpackPredefinedTemplate } from 'sandpack-vue3'
import SandboxInternals from './SandboxInternals.vue'

interface Props {
  pathToFolder?: string
  files?: string[]
  showConsole?: boolean
  code?: string
  template?: SandpackPredefinedTemplate
}

const props = withDefaults(defineProps<Props>(), {
  showConsole: false,
  template: 'react-ts',
})
</script>

<template>
  <Suspense>
    <SandboxInternals
      :showConsole="props.showConsole"
      :pathToFolder="props.pathToFolder"
      :files="props.files"
      :template="props.template"
    />
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
