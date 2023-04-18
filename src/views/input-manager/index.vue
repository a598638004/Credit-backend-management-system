<template>
  <div id="input-manager">
    <GSearchQuery>
      <template v-slot="{ q }">
        <el-button type="primary" @click="setQueryName(q)">搜索</el-button>
      </template>
    </GSearchQuery>
    <GTable
      :options="conf.options"
      :pageOptions="frontPageOptions"
      :data="tableData"
      :columns="conf.columns"
      @handleCurrentChange="currentPageChange"
      @size-change="sizeChange"
      @selection-change="onSelectionChange"
      loadingTag="tab1"
    >
      <template v-slot:status="col">
        <el-table-column :prop="col.prop" :label="col.label">
          <template v-slot="{ row }">
            <el-tag type="success">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
      </template>

      <template v-slot:opts="col">
        <el-table-column :label="col.label" :width="col.width">
          <template v-slot="{ row }">
            <el-button type="primary" @click="($event) => showEdit(row)"
              >编辑</el-button
            >
            <el-button type="danger">删除</el-button>
            <el-button type="success">提交审核</el-button>
          </template>
        </el-table-column>
      </template>
    </GTable>
    <el-dialog
      title="申请管理-编辑"
      :visible.sync="dialogVisible"
      @open="exist = true"
      @closed="exist = false"
      width="30%"
    >
      <!-- 不论如何都不会就地复用元素  
        <GFormCreator  :conf="editConf" @submit="save" :key="Math.random()" ></GFormCreator>
      -->
      <GFormCreator
        v-if="exist"
        :conf="editConf"
        @submit="save"
      ></GFormCreator> </el-dialog
    >>
  </div>
</template>

<script>
import loanListConf from "./loanListConf";
import GSearchQuery from "@/components/GSearchQuery.vue";
import { crud, pager } from "@/mixins";
import GFormCreator from "@/components/GFormCreator.vue";
import { sexOptions } from "@/conf";

export default {
  mixins: [crud, pager],
  data() {
    return {
      conf: loanListConf,
      tableData: [], // 表格数据，API接口获取
      loadingTag: "tab1",
      dialogVisible: false,
      exist: false,
      query: "",
    };
  },
  methods: {
    onSelectionChange(data) {
      console.log("选中改变了", data);
    },
    beforeInit() {
      this.url = "/loan/list";
      this.customField = {
        loadingTag: this.loadingTag,
      };
      return true;
    },
    showEdit(row) {
      this.editConf = {
        items: [
          [
            {
              colspan: 20,
              type: "input",
              key: "name",
              label: "姓名",
              value: row.name,
            },
          ],
          [
            {
              colspan: 20,
              type: "select",
              key: "sex",
              label: "性别",
              value: row.sex,
              options: sexOptions,
            },
          ],
        ],
        rules: {
          name: [{ required: true, message: "必须填写用户名" }],
          sex: [{ required: true, message: "必须填写性别" }],
        },
      };
      this.dialogVisible = true;
    },
    save(data) {
      console.log("保存数据", data);
      this.dialogVisible = false;
      this.$notify.success({
        title: "提示",
        message: "编辑成功",
        showClose: false,
      });
    },
  },
  created() {
    this.init();
  },
  components: { GSearchQuery, GFormCreator },
};
</script>