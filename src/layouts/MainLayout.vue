<template>
  <div class="grid" v-if="isApp || $q.screen.width >= 801">
    <HeaderComponent
      class="header-app"
      :routes="headerRoutes"
      :titlePage="titlePage"
      bgColor="rgba(7, 32, 52, 0.509);
"
      textColor="white"
    />
    <router-view />
    <RouteBar
      v-if="$q.screen.width < 800 && isApp"
      :routes="headerRoutes"
      :titlePage="titlePage"
      bgColor="rgba(7, 32, 52, 0.509)
"
      textColor="white"
    />
  </div>
  <HeaderQuasarComponent
    v-else
    :routes="headerRoutes"
    :titlePage="titlePage"
    bgColor="rgba(7, 32, 52, 0.509);
"
    textColor="white"
  />
</template>

<script setup>
import HeaderComponent from 'src/components/HeaderComponent.vue'

import { useQuasar } from 'quasar'
import RouteBar from 'src/components/RouteBar.vue'
import HeaderQuasarComponent from 'src/components/HeaderQuasarComponent.vue'

//data
const $q = useQuasar()

const headerRoutes = [
  { title: 'home', route: '/', iconName: 'mdi-home' },
  { title: 'aboutme', route: '/aboutme', iconName: 'mdi-account' },
  { title: 'example', route: '/example', iconName: 'mdi-folder-outline' },
]
const isApp = true
const titlePage = 'example'

//methods
</script>

<style scoped>
.grid {
  display: grid;
  width: 100%;
  grid-template-rows: min-content 1fr;

  background: white;
  min-height: 100vh;
}

.header-app {
  position: sticky;
  top: 0;
  z-index: 1;
}
.header {
  position: sticky;
  top: 0;
  z-index: 1;
}

@media (max-width: 800px) {
  .grid {
    display: grid;
    width: 100%;
    grid-template-rows: min-content 1fr min-content;
  }
  .header-app {
    grid-row: 3;
    position: sticky;
    bottom: 0;
    backdrop-filter: blur(20px);
    background-color: rgba(7, 32, 52, 0.509);
    z-index: 1;
  }
}
</style>
