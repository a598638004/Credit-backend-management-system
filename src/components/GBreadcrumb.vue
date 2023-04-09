<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item 
        v-for="(r, i) in breadcrumbList" 
        :key="i" 
    >
        <span v-if="breadcrumbList.length - 1 === i">{{ r?.meta?.title }}</span>
        <router-link v-else :to="r">{{ r?.meta?.title }}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
  
<script>
export default {
  name: "GBreadcrumb",
  computed: {
    breadcrumbList(){
        return this.$route.matched.filter(r => r?.meta?.title)
    }
  },
  props: {
  },
};
</script>
  
<style>
</style>