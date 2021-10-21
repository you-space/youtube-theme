<template>
  <router-view />
</template>
<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply text-gray-800 dark:text-white transition-colors ease-in;
}
</style>
