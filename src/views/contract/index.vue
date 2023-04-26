<template>
  <!-- vue-fragment 解决dom -->
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
      <template #status="col">
        <el-table-column width="170" :prop="col.prop" :label="col.label">
          <template v-slot="{ row }">
            <el-tag :type="row.status | contractColor">{{
              row.status | contractText
            }}</el-tag>
          </template>
        </el-table-column>
      </template>

      <template v-slot:opts="col">
        <el-table-column :label="col.label" :width="col.width">
          <template v-slot="{ row }">
            <el-button
              :disabled="row.status > 5"
              @click="genContract(row.id)"
              type="primary"
              >生成合同</el-button
            >
            <el-button
              :disabled="row.status < 5"
              @click="downloadContractFile(row.id)"
              type="success"
              >下载合同</el-button
            >
          </template>
        </el-table-column>
      </template>
    </GTable>
  </div>
</template>
  
  <script>
import conf from "./conf";
import { pager, crud } from "@/mixins";
import { genContractFile, downloadContract } from "@/apis/loan";
import { downloadFile } from "@/utils";
export default {
  name: 'contract',
  mixins: [pager, crud],
  methods: {
    beforeInit() {
      this.url = "/contract/list";
      this.customField = {
        loadingTag: this.loadingTag,
      };
      return true;
    },
    async genContract(id) {
      if (!(await this.confirm("是否确认生成合同?"))) return;
      let [res, err] = await genContractFile(id);
      if (!res) return;
      this.init();
    },
    async downloadContractFile(id) {
      if (!(await this.confirm("是否确认下载合同?"))) return;
      let [res, err] = await downloadContract(id);
      if (!res) return;
      console.log(res, "下载文件的url");
      // 再次发起请求获取文件, 并实现下载
      let url = res?.data?.data?.url;
      if(!url) return;
      // 为了使用之前配置的baseUrl:'/api' 干掉/api
      await downloadFile(url.replace("/api", ""), "贷款合同-" + id + ".docx");
    },
  },
  created() {
    this.init();
  },
  data() {
    return {
      conf: conf,
      loadingTag: "tab9",
      tableData: [],
      editConf: {},
    };
  },
};
</script>
  
  <style scoped>
</style>