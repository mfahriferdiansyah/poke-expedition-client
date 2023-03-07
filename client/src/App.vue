<script>
import { RouterLink, RouterView } from 'vue-router'
import vSidebar from './components/Sidebar.vue'
export default {
  components: {
    vSidebar
  }
}
</script>

<template>
  <div class="flex">
    <aside class="h-screen sticky top-0">
      <vSidebar />
    </aside>
    <RouterView />
  </div>

</template>
