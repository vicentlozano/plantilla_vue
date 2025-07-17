<template>
  <section
    class="mini-header"
    :style="`background-color:${props.bgColor}; color:${props.textColor}`"
  >
    <router-link to="/" class="title">
      <span class="rotul">&lt;</span>{{ titlePage }}<span class="rotul">/&gt;</span>
    </router-link>
    <section class="actions-route">
      <div class="title-route">
        <span class="route-text">{{ routeText }}</span>
      </div>
      <I18nComponent :color="textColor" />
    </section>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import I18nComponent from './I18nComponent.vue'
//props && emits
const props = defineProps({
  bgColor: {
    type: String,
    default: 'primary',
  },
  textColor: {
    type: String,
    default: 'primary',
  },
  titlePage: {
    type: String,
    required: true,
  },
})
const { t, locale } = useI18n()
const route = useRoute()

const routeName = computed(() => (typeof route.name === 'string' ? route.name : ''))

const routeText = computed(() => {
  if (!routeName.value) return ''
  locale.value // <-- forcem dependència reactiva a l'idioma
  return t(routeName.value)
})
</script>

<style scoped>
.mini-header {
  display: grid;
  grid-template-columns: 1fr min-content;
  align-items: center;
  justify-items: start;
  grid-row: 1;
  padding-left: 2rem;
  padding-right: 0.5rem;
  height: 3.3rem;
  position: sticky;
  top: 0;
  backdrop-filter: blur(20px);
  z-index: 1;
}
.mini-header-hamburguer {
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  align-items: center;
  justify-items: start;
  grid-row: 1;
  padding-left: 2rem;
  padding-right: 0.5rem;
  height: 3.3rem;
  position: sticky;
  top: 0;
  backdrop-filter: blur(20px);
  background-color: rgba(7, 32, 52, 0.509);
  z-index: 1;
}
.title {
  color: whitesmoke;
  text-align: center;
  font-weight: bold;
  font-size: 1.7rem;
  text-decoration: none;
}
.rotul {
  color: rgb(13, 116, 211);
  font-weight: 800;
}
.actions-route {
  display: flex;
  flex-direction: row;
  justify-items: right;
  align-items: center;
}
.route-text {
  white-space: nowrap;
  font-size: 1.3em;
  font-weight: 600;
  padding-right: 1.5rem;
}
.center-flags {
  background-color: rgba(20, 31, 45, 0.662);
  display: grid;
  grid-template-rows: 1fr 1fr;
  place-content: center;
  height: 100px;
  width: 65px;
}

.flag {
  padding: 0.5rem;
  height: 100%;
  width: 100%;
}
.custom-link {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  font-size: 1.1em;
  gap: 0.5rem;
  text-decoration: none;
  color: black(247, 0, 0);
  padding: 0.3rem 0.5rem;
  white-space: nowrap;
  text-align: center;
}

.on-route {
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.145);
}
</style>
