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
    <div
      class="bg-cover bg-center h-screen w-full relative"
      style="
        background-image: url(https://assets-prd.ignimgs.com/2022/08/03/scarlet-violet-map-ai-1659557720105.jpg);
      "
    >
      <RouterView />
    </div>
  </div>
</template>
