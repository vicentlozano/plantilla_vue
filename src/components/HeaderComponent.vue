<template>
  <div class="header"  :style="`background-color:${props.bgColor}; color:${props.textColor}`">
    <router-link to="/" class="title" v-if="$q.screen.width > 800">
      <span class="rotul">&lt;</span>{{ titlePage }}<span class="rotul">/&gt;</span>
    </router-link>
    <section class="routes">
      <router-link
        v-for="page in props.routes"
        :key="page.title"
        :to="page.route"
        :class="page.title === routeName ? 'custom-link on-route' : 'custom-link'"
      >
        <q-icon class="pre-icon" :name="page.iconName" />
        <span v-if="$q.screen.width > 1200"> {{ t(page.title) }} </span>
        <q-tooltip
          v-if="$q.screen.width > 800 && $q.screen.width < 1200"
          transition-show="flip-right"
          transition-hide="flip-left"
        >
          {{ t(page.title) }}
        </q-tooltip>
      </router-link>
    </section>

    <I18nComponent v-if="$q.screen.width > 800" :color="textColor" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import I18nComponent from './I18nComponent.vue'

//data
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
const { t } = useI18n()

const $q = useQuasar()
const route = useRoute()
//methods

const routeName = computed(() => route.name)
</script>

<style scoped>
.header {
  display: grid;
  grid-template-columns: 150px 1fr 150px;
  gap: 2rem;
  padding: 0.4rem 3rem;
  place-items: center;
  height: 3.4rem;
  backdrop-filter: blur(20px);
}
.routes {
  display: flex;
  gap: 12px;
}
.title {
  color: whitesmoke;
  font-weight: bold;
  font-size: 1.7rem;
  text-decoration: none;
}
.custom-link {
  display: flex;
  place-items: center;
  font-size: 1.1em;
  gap: 0.5rem;
  text-decoration: none;
  color: white;
  padding: 0.3rem 1rem;
  white-space: nowrap;
  border-radius: 30px;
  text-align: center;
}

.on-route {
  border-radius: 30px;
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.145);
}
.rotul {
  color: rgb(13, 116, 211);
  font-weight: 800;
  cursor: pointer;
}

@media (hover: hover) and (pointer: fine) {
  .custom-link:hover {
    border-radius: 30px;
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.05);
  }
}
@media (max-width: 800px) {
  .header {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0rem 1rem;
    place-items: center;
    height: 3.3rem;
  }
  .routes {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    gap: 1px;
  }
  .custom-link {
    padding: 0.5rem 0.5rem;
  }
}
</style>
