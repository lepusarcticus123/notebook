<template>
    <h1>User:{{ route.params.group }}{{ route.params.id }}</h1>
</template>

<script setup>
// useRoute函数会返回一个代表当前路由的对象。
//这个对象包含了当前路由的所有信息，如路径、查询参数、哈希值等。
const route =useRoute()

</script>
<style scoped>
</style>