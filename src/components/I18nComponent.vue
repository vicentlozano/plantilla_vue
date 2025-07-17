<template>
  <section class="actions">
    <q-btn flat round :color="props.color" icon="mdi-translate" aria-label="Idioma" size="11px">
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
</template>

<script setup>
import { ref, watch } from 'vue'

import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

//props&&emits
const props = defineProps({
  color: {
    type: String,
    default: 'black',
  },
})
const lang = ref(locale.value)

//methods
const setLang = (l) => {
  lang.value = l
  locale.value = l
}
// computed&watchs
watch(lang, (val) => {
  locale.value = val
})
</script>

<style lang="scss" scoped>
.actions {
  justify-self: right;
}
.flag {
  padding: 0.5rem;
  height: 100%;
  width: 100%;
}
.center-flags {
  background-color: rgba(20, 31, 45, 0.662);
  display: grid;
  grid-template-rows: 1fr 1fr;
  place-content: center;
  height: 100px;
  width: 65px;
}
</style>
