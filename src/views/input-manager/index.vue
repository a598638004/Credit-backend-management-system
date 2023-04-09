<template>
  <GTable 
    :options="conf.options"
    :pageOptions="conf.pageOptions"
    :data="tableData"
    :columns="conf.columns"
		@handleCurrentChange="handleCurrentChange"
		loadingTag="tab1"
  >

  </GTable>
</template>

<script>
import loanListConf from "./loanListConf"
import { queryLoan } from "@/apis/loan"
export default {
    data(){
        return {
            conf: loanListConf,
            tableData: [],  // 表格数据，API接口获取
        }
    },
    methods: {
      async loadLoanByPage(page){
				// 1. 后续需要管理pageNo 页码
        // 2. 发请求获取数据, 传递到table组件中
        // this.conf.options.loading = true;
				let [res, err] = await queryLoan({
					pageNo: page,
          pageSize: 10
				},{ loadingTag: 'tab1' })
				console.log("list数据", res, err);
				this.tableData = res?.data?.data?.data?.data;
      },
			handleCurrentChange(page){
				this.loadLoanByPage(page)
			}
    },
    created(){
			this.loadLoanByPage(1)
    }
}
</script>

<style>

</style>