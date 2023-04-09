<template>
  <el-menu-item v-if="!item.children" :index="item.path">
    <span slot="title">{{ item?.meta?.title }}</span>
  </el-menu-item>
  <el-submenu v-else :index="item.path">
    <template slot="title"> {{ item?.meta?.title }} </template>
    <GAsideMenu v-for="(it, index) in item.children" :key="index" :item="it"></GAsideMenu>
  </el-submenu>
</template>

<script>
export default {
  name: "GAsideMenu",
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style>
</style>