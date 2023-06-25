<script setup>
import { defineProps, computed } from 'vue';
import {DefaultCoreColors} from "##/lib/materialDesignThemeColorConstants.mjs";
const props = defineProps({
  coreColors: {//rename to value?
    type: Object,
    //todo validation etc.
    default: () => ({
      ...DefaultCoreColors
    }),
  }
  ,
});
const coreColorsValues = computed(() => {
  return Object.entries(props.coreColors);//maybe check the order?
});
/**
 * Quick and dirty first...
 * https://www.w3schools.com/css/tryit.asp?filename=trycss_color_hex2
 * https://www.w3schools.com/css/css_colors_hex.asp
 * Find color picker? lol why redo it though honestly
 * look into later
 * https://www.material-tailwind.com/docs/html/installation
 *
 * https://vitepress.dev/guide/asset-handling
 * hmm...
 */

</script>

<template>
<!--  {{coreColorsValues}}-->
<!--  <span v-for="color in coreColorsValues" :style="{backgroundColor: color}">{{color}}</span>-->
<!--  <span v-for="color in coreColorsValues" :style="{backgroundColor: color}+';width:100px;'">{{ "".padEnd(7) }}</span>-->
<!--  best way might be to use the css from material theme...-->
<!--  <i v-for="color in coreColorsValues" :style="{backgroundColor: color}">{{ "".padEnd(7,'&nbsp;') }}</i>-->
  <div :title="color[0]" :class="$style.colorBlock" v-for="color in coreColorsValues" :style="{backgroundColor: color[1]}"></div>
<!--  <div v-for="color in coreColorsValues" :style="{backgroundColor: color}"></div>-->
<!--<span style="background-color:#ff0000;">#ff0000</span>-->
<!--<span style="background-color:#0000ff;">#0000ff</span>-->
<!--<span style="background-color:#3cb371;">#3cb371</span>-->
<!--<span style="background-color:#ee82ee;">#ee82ee</span>-->
</template>

<style module>
  .colorBlock {
    width: 2em;
    height: 2em;
    display: inline-block;
    margin-right: 0.5em;
  }
</style>