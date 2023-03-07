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
    <vSidebar />
    <RouterView />
  </div>

</template>
