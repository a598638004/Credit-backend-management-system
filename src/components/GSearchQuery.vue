<template>
  <el-row>
    <el-col :span="$scopedSlots.default ? 22 : 24">
      <el-input placeholder="请输入查询内容" v-model="query"></el-input>
    </el-col>
    <el-col :span="2">
      <!-- 按钮 -->
      <slot :q="query"></slot>
    </el-col>
  </el-row>
</template>

<script>
import { debounce } from "lodash";
export default {
  name: "GSearchQuery",
  data() {
    return {
      query: "",
    };
  },
  watch: {
    query: debounce(function (newVal) {
      // this.loadLoanByPage(1)
      if (this.$scopedSlots.default) return;
      this.$emit("setQueryName", newVal);
    }, 500),
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 10px;
}
</style>
