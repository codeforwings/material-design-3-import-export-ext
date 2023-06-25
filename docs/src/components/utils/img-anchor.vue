<script setup>
import { withBase, useData } from 'vitepress'
import {defineProps,computed} from "vue";
// const { theme } = useData()
/**
 * props should just be the core colors?
 * expects vite-build to build certain functions
 */
const props = defineProps({
  baseDirPath: {//rename to value?
    type: String,
    default:"/create-shortcuts/",//todo make smarter
  },
  filename:{
    type: String,
    default: "themeM3-#6750A4-#958DA5-#B58392-#939094.dark.png",
  },
});
const alt = computed(() => {
  return Object.entries(props.filename);//maybe check the order?
});
const viteSrcHref = computed(() => {
  // encodeURIComponentForVitePress
  return withBase(props.baseDirPath+encodeURIComponent(props.filename));
});
/**
 * props should just be the core colors?
 * expects vite-build to build certain functions
 */
</script>

<template>
  <a target="_blank" :href="viteSrcHref">
    <img loading="lazy" :alt="alt" :src="viteSrcHref" />
  </a>
</template>

<style module>

</style>