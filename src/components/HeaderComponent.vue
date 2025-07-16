<template>
  <div class="header">
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
          {{ t('home') }}
        </q-tooltip>
      </router-link>
    </section>

    <section class="actions" v-if="$q.screen.width > 800 || isApp">
      <q-btn flat round color="primary" icon="mdi-translate" aria-label="Idioma">
        <q-menu
          anchor="bottom middle"
          self="top middle"
          :offset="[0, 25]"
          style="background-color: transparent"
        >
          <q-list class="center-flags" style="padding: 0">
            <q-item clickable v-close-popup @click="setLang('es-ES')" style="padding: 4px">
              <q-item-section avatar style="width: auto; padding: 0">
                <img src="/flags/es.svg" class="flag" />
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="setLang('en-US')" style="padding: 4px">
              <q-item-section avatar style="width: auto; padding: 0">
                <img src="/flags/en.svg" class="flag" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </section>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
import { ref, watch, computed } from 'vue'

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
})
const { t } = useI18n()

const lang = ref(locale.value)
const $q = useQuasar()
const route = useRoute()
//methods
const setLang = (l) => {
  lang.value = l
  locale.value = l
}
// computed&watchs
watch(lang, (val) => {
  locale.value = val
})
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
  background-color: rgba(7, 32, 52, 0.509);
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
.actions {
  justify-self: right;
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
    padding: 1rem 1rem;
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
