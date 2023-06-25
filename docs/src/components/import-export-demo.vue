<script setup>
/**
 * Probably just use this as reference. might be easier than to v-model in and out with props
 * https://vuejs.org/guide/components/props.html
 * http://localhost:5173/material-design-3-import-export-ext/demos/demo-playground.html
 *
 * need to rollup...
 *     "vite:build": "vite build",
 */
import { ref } from 'vue'
import { computed } from 'vue'
import {sampleCoreColorsTheme} from "##/lib/materialDesignThemeColorConstants.mjs";
import {generateScreenshotsFileNames} from "#src/create-screenshots/generateScreenshotsFileNames.mjs";
// import {generatePuppeteerJSON} from "#src/generate-pupp-json/generate-pupp-json.mjs";
import {generatePuppeteerJSON} from "##/dist/generate-pupp-json.mjs";
import CoreColors from "#docs/src/components/utils/coreColors.vue";
//    rollup "vite:build": "vite build",


// /** @type {MaterialThemeCoreColors} - JSON */
const oInputRaw = ref({...sampleCoreColorsTheme});//
const sOutputRaw = ref("");
const oInput = computed({
  get(){
    return JSON.stringify(oInputRaw.value);
  },
  /**
   * @param newValue {string}
   */
  set(newValue){
    try{
      oInputRaw.value = JSON.parse(newValue);
    }catch (e) {
      // sInput.value = e.message;
      sOutputRaw.value = e.message;
    }
  }
})
/**
 * Get json
 * @type {ComputedRef<unknown>}
 */
const oOutput = computed(() => {
  if(sOutputRaw.value){
    return sOutputRaw.value;
  }
  const coreColor=oInputRaw.value;
  // console.log(coreColor);
  //so sInput
  const prefix = generateScreenshotsFileNames(coreColor).prefix;
  const jsonFileName = `${prefix}.json`;
  const tmp =generatePuppeteerJSON(coreColor, null,jsonFileName);
  return JSON.stringify(tmp, null, 2);
  // const prefix = 'sdf'
  // const prefix = generateScreenshotsFileNames(coreColor).prefix
  // return jsonFileName;//maybe should rename it and get rid of the #
})
/**
 * Also need anchor or w/e to download... later
 * use highlightsjs or something for the codeblock... iunno
 * @type {ComputedRef<unknown>}
 */
const jsonFileName = computed(() => {
  if(sOutputRaw.value){
    return 'N/A';//should disable the button as well...
  }
  const coreColor=oInputRaw.value;
  const prefix = generateScreenshotsFileNames(coreColor).prefix;
  const jsonFileName = `${prefix}.json`;
  return jsonFileName;//maybe should rename it and get rid of the #
})
//todo download
/**
 * @param e {PointerEvent}
 */
const downloadEvent = (e)=>{
  // console.log('download event');

}
</script>
<!--  Import Export-->
<template>
  <div>
<!--    <input :class="$style.vueinput" v-model="sInput"/>-->
<!--    adhoc-->
    <core-colors v-if="!sOutputRaw" :core-colors="oInputRaw"/>
<!--    fix later-->
    <textarea :class="$style.vueinput" v-model="oInput"/>
  </div>
  <div>
    <textarea readonly :class="$style.vueinput" v-model="oOutput"/>
  </div>
  <div>
<!--    fixme better css from somewhere... add highlight etc. -->
<!--    <button :class="$style.vuebutton"-->
<!--            @click="downloadEvent"-->
<!--        type="button">Download JSON - {{ jsonFileName }}</button>-->
<!--    todo make download button an icon or w/e-->
    <a :href="`data:text/json;charset=utf-8,${encodeURIComponent(oOutput)}`"
       :download="jsonFileName"
       class="$style.vuebutton"
       type="button">Download JSON - {{ jsonFileName }}</a>

  </div>
</template>
<!--  quick and dirty css todo-->
<style module>

.vueinput {
  margin: 4px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
}

.vueinput:focus {
  outline: none;
  border-color: blue;
  box-shadow: 0 0 5px blue;
}
.vuebutton {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.vuebutton:hover {
  background-color: #0056b3;
}

.vuebutton:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>