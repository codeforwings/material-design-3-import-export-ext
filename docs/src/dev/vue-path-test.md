<script setup>
  import { ref } from 'vue'
  //so it was from the package.json import...
  //https://nodejs.dev/en/api/v18/packages/#subpath-imports
  // import helloWorld from '##/docs/hello-world.vue'
  import helloWorld from '#docs/hello-world.vue'
  const count = ref(0)
</script>

# Testing Vue Pathing
* [Node Subpath Imports](https://nodejs.dev/en/api/v18/packages/#subpath-imports)
* use prefix
  * '##'
  * '#src' 
  * '#docs'
<helloWorld/>
```js-vue
count: {{count}}
```

<!-- https://vitepress.dev/guide/using-vue#using-vue-in-markdown -->

