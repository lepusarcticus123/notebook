<template>
    <h1>{{ route.query.msg }}</h1>
    <h1>login</h1>
    <NuxtPage />
</template>

<script setup>
const route=useRoute()
</script>
<style scoped></style>