<template>
  <div class="yt-chip">
    <slot />
  </div>
</template>

<style lang="postcss">
.yt-chip {
  @apply text-xs px-4 py-1;
  @apply rounded-sm uppercase font-bold;
  @apply bg-red-500 dark:bg-gray-800 text-white;
}
</style>
