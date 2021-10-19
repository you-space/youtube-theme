<script lang="ts">
import { defineComponent, h } from 'vue'
import HomePage from './Home/-Index.vue'

export default defineComponent({
  setup(_, ctx) {
    return () => h(HomePage, ctx)
  },
})
</script>
