<script setup>
import { withBase, useData } from 'vitepress'
import {defineProps,computed} from "vue";
const { theme } = useData()
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
    required:true,
    // default: "themeM3-#6750A4-#958DA5-#B58392-#939094.dark.png",
  },
});
const alt = computed(() => {
  return Object.entries(props.filename);//maybe check the order?
});
const viteSrcHref = computed(() => {
  // encodeURIComponentForVitePress
  return withBase(props.baseDirPath+encodeURIComponent(props.filename));
});
</script>

<template>
<!--  <img :src="withBase('/viewPortsExamples/16by10_2.png')" />-->
<!--  <img :src="withBase('/viewPortsExamples/'+encodeURIComponent('16by10_2.png'))" />-->
<!--  also picture tag https://www.w3schools.com/html/html_images_picture.asp-->
<!--  add hyperlink / modal ? -->
<!--  <img loading="lazy" alt='todo' :src="withBase('/create-shortcuts/'+encodeURIComponent('themeM3-#6750A4-#958DA5-#B58392-#939094.dark.png'))" />-->
  <a target="_blank" :href="viteSrcHref">
    <img loading="lazy" :alt="alt" :src="viteSrcHref" />
  </a>
<!--  can i use slots here?-->
<!--<span>hi</span>-->
</template>

<style scoped>

</style>