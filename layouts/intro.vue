<template>
  <div class="slidev-layout intro bg-intro">
    <img src="/assets/daa-primary-full.svg" alt="logo" v-bind:width="300" />
    
    <div class="my-auto px-20">
      <slot />
    </div>

    <img src="/assets/daa-white-line.svg" alt="white line" width="980" class="mt-10">
  </div>
</template>
