<template>
  <div>
    <jodit-editor v-model="content"/>
  </div>
</template>
<script setup>
import "../node_modules/jodit-vue/node_modules/jodit/build/jodit.es2018.en.min.css";
import { JoditEditor } from 'jodit-vue';
import { ref } from 'vue';

// Editor content
const content = ref('<h1>Hello Jodit Vue</h1>');

// Editor configuration options
const editorConfig = {
  // Jodit configuration options
};

watch(content, (newValue) => {
  console.log(newValue)
}, {immediate: true})

</script>