<template>
  <section class="actions">
    <q-btn flat round :color="props.color" icon="mdi-translate" aria-label="Idioma" size="11px">
      <q-menu auto-close>
        <q-list style="min-width: 100px">
          <q-item clickable v-close-popup @click="setLang('es-ES')">
            <q-item-section> {{$t('spanish')}} </q-item-section>
          </q-item>
          <q-item clickable  @click="setLang('en-US')">
            <q-item-section>{{$t('english')}} </q-item-section>
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
</style>
