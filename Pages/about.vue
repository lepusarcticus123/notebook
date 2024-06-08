<template>
    <h1>about</h1>
    <h1>{{ route.query }}</h1>
</template>

<script setup>
const route = useRoute();

// definePageMeta 是 Nuxt.js 框架中用于定义页面元数据的函数
//具名中间件
// definePageMeta({
//     middleware:'auth'
// })
// 匿名路由中间件
definePageMeta({
    middleware: defineNuxtRouteMiddleware(() => {
        let user = false;
        if (!user) {
            return navigateTo('/login')
        }
    })
})
</script>
<style scoped></style>