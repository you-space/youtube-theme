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
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  @apply bg-gray-300 dark:bg-gray-600;
}

/* Handle */
::-webkit-scrollbar-thumb {
  @apply bg-gray-400 dark:bg-gray-500;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-500 dark:bg-gray-400;
}
</style>
