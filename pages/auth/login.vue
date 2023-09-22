<script setup lang="ts">

definePageMeta({
    middleware: 'is-admin',
    layout: 'default-layout'
})
</script>
<template>
    <div></div>
    <AuthorSignIn />
</template>