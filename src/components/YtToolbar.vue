<template>
  <div class="yt-toolbar">
    <slot />
  </div>
</template>

<style lang="postcss">
.yt-toolbar {
  min-height: 55px;
  @apply flex flex-wrap items-center w-full py-4 shadow-md;
}
</style>
