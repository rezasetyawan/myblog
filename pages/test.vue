<script setup>
import { showSuccessToast, showErrorToast } from '~/utils/toast';
</script>

<template>
  <button @click="() => showSuccessToast('success')">success</button>
  <button @click="() => showErrorToast('error')">error</button>
</template>