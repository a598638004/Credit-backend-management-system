<template>
    <div id="approve">
      <GSearchQuery @setValue="setQueryName"></GSearchQuery>
      <GTable
        :options="conf.options"
        :pageOptions="frontPageOptions"
        :data="tableData"
        :loadingTag="loadingTag"
        :columns="conf.columns"
        @handleCurrentChange="currentPageChange"
        @size-change="sizeChange"
      >
        
      <template #reg_time="col">
          <el-table-column width="300" :prop="col.prop" :label="col.label">
              <template v-slot="{ row }">
                  <span>{{ row.reg_time | birthday }}</span>
              </template>
          </el-table-column>
      </template>
      <template #role_name="col">
          <el-table-column width="200" :prop="col.prop" :label="col.label">
              <template v-slot="{ row }">
                  <span>{{ row.role_name | role }}</span>
              </template>
          </el-table-column>
      </template>

      </GTable>
    </div>
  </template>
  
  <script>
  import conf from "./conf";
  import { pager, crud } from "@/mixins";
  import { convertBirthday } from "@/filters";
  import { approveFirstPass, approveFirstReject } from "@/apis/loan"
  import Vue from "vue";
  export default {
    mixins: [pager, crud],
    methods: {
      beforeInit() {
        this.url = "/user/list";
        this.customField = {
          loadingTag: this.loadingTag,
        };
        // 告知服务器用另一种结构返回数据
        this.params = {
            type:'new'
        }
        return true;
      },
    },
    created() {
      this.init();
    },
    data() {
      return {
        conf: conf,
        loadingTag: "tab3",
        tableData: [],
        editConf: {},
      };
    },
  };
  </script>
  
  <style scoped>
  </style>