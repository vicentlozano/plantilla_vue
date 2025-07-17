<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      elevated
      :style="`background-color:${props.bgColor}; color:${props.textColor};   backdrop-filter: blur(20px);
`"
    >
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <q-icon :name="routeText.icon" />
          </q-avatar>
          {{ routeText.route }}
        </q-toolbar-title>
        <I18nComponent :color="textColor" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      overlay
      no-swipe-close
      elevated
      :width="$q.screen.width < 400 ? 200 : 300"
      :style="`background-color:${props.bgColor}; color:${props.textColor};   backdrop-filter: blur(20px);
`"
    >
      <q-list>
        <q-toolbar-title class="title-sidebar">
          <q-avatar size="30px">
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          {{ titlePage }}
        </q-toolbar-title>
        <q-separator color="white" />
        <q-item
          v-for="page in props.routes"
          :key="page.title"
          clickable
          @click="goTo(page.route)"
          :class="page.title === routeName ? 'custom-link on-route' : 'custom-link'"
        >
          <q-item-section avatar class="icon">
            <q-icon :name="page.iconName" />
          </q-item-section>
          <q-item-section>{{ t(page.title) }}</q-item-section>
        </q-item>
        <q-separator color="white" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import { ref, computed } from 'vue'
import I18nComponent from './I18nComponent.vue'
const router = useRouter()

//props&&emits
const props = defineProps({
  routes: {
    type: Array,
    required: true,
  },
  titlePage: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: 'primary',
  },
  textColor: {
    type: String,
    default: 'primary',
  },
})
//data
const leftDrawerOpen = ref(false)
const route = useRoute()

const routeName = computed(() => route.name)

//methods
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
function goTo(path) {
  router.push(path)
  leftDrawerOpen.value = false
}

//computed
const routeText = computed(() => {
  if (!routeName.value) return ''
  locale.value // <-- forcem dependència reactiva a l'idioma
  let route = props.routes.find((page) => page.title === routeName.value)
  return { route: t(routeName.value), icon: route.iconName }
})
</script>

<style lang="scss" scoped>
.custom-link {
  display: grid;
  grid-template-columns: min-content 1fr;
  justify-content: start;
  font-size: 1.1em;
  gap: 0rem;
  text-decoration: none;
  color: white;
  padding: 0.3rem 1rem;
  white-space: nowrap;
}

.on-route {
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.145);
}
.icon {
  min-width: min-content;
}
.title-sidebar {
  padding: 1rem 1.4rem;
  text-align: left;
  background-color: rgba(0, 0, 0, 0.63);
}
</style>
