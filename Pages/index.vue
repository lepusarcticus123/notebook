<template>
  <!-- 配置主题颜色 -->
    <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#607D8B',
      },
    }"></a-config-provider>
    <nuxt-link to="/note/write">write</nuxt-link>
</template>

<script setup>

</script>
<style scoped>

</style>