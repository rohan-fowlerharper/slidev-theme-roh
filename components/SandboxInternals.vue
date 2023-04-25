<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import { Sandpack } from 'sandpack-vue3'
import { useActiveElement } from '@vueuse/core'
import { watch } from 'vue'
import { shortcutsEnabled } from '@slidev/client/state'
import type { SandpackPredefinedTemplate } from 'sandpack-vue3'

interface Props {
  showConsole?: boolean
  readOnly?: boolean
  code?: string
  pathToFolder?: string
  files?: string[]
  template?: SandpackPredefinedTemplate
}

const props = withDefaults(defineProps<Props>(), {
  showConsole: false,
  readOnly: false,
  template: 'react-ts',
})

const containerRef = ref<HTMLDivElement>()
const activeElement = useActiveElement()

const isFocused = computed(() => {
  if (!activeElement.value) return false
  return containerRef.value?.contains(activeElement.value)
})

watch(isFocused, () => {
  const shouldEnableShortcuts = !isFocused.value
  shortcutsEnabled.value = shouldEnableShortcuts
})

const reactDefault = {
  files: {
    'App.tsx': `import React from 'react'

export default function App() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}
`,
  },
}

const nodeDefault = {
  files: {
    'index.js': `console.log('Hello World')`,
  },
}

async function fetchFiles(fileNames: string[], pathToFolder: string) {
  const promises = fileNames.map((fileName) =>
    fetch(`${pathToFolder}/${fileName}`)
      .then((res) => {
        return res.text() as Promise<string>
      })
      .then((res) => {
        console.log(res)
        return res
      })
  )
  const files = await Promise.all(promises)

  return fileNames.reduce<Record<string, string>>((acc, file, index) => {
    acc[file] = files[index]
    return acc
  }, {})
}

async function assignFiles() {
  if (props.pathToFolder && props.files) {
    return await fetchFiles(props.files, props.pathToFolder)
  }

  if (props.code) {
    const fileName = props.template === 'react-ts' ? 'App.tsx' : 'index.js'

    return {
      [fileName]: props.code,
    }
  }

  if (props.template === 'react-ts') return reactDefault.files
  return nodeDefault.files
}

const files = await assignFiles()
</script>

<template>
  <div ref="containerRef">
    <Sandpack
      theme="dark"
      :template="props.template"
      :files="files"
      :options="{
        showConsole: props.showConsole,
        editorHeight: 450,
        autorun: true,
        editorWidthPercentage: 60,
        readOnly: props.readOnly,
      }"
    />
  </div>
</template>
