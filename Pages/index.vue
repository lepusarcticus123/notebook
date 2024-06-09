<template>
  <!-- 配置主题颜色 -->
    <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#607D8B',
      },
    }"></a-config-provider>
  
<hello-world />

<NuxtLink to="/about">跳转到about</NuxtLink>
<a-button type="primary">大家好</a-button>
</template>

<script setup>

</script>
<style scoped>

</style>