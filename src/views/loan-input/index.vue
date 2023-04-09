<template>
  <GFormCreator :conf="inputConf" ref="createForm">
    <template>
      <div>
        <el-button type="primary" @click="doCreate">立即创建</el-button>
        <el-button @click="doReset">重置</el-button>
      </div>
    </template>
  </GFormCreator>
</template>

<script>
import inputConf from "./inputPageConf";
import { createLoan } from "@/apis/loan"
export default {
  data() {
    return {
      inputConf,
    };
  },
  methods: {
    doCreate() {
      this.$refs.createForm.validate((data) => {
        if(!data) return this.$message('校验失败');
        // const data1 = {
        //   name: "12",
        //   birthday: "2023-04-03T16:00:00.000Z",
        //   sex: "man",
        //   identity_card: "1",
        //   marriage: "married",
        //   education: "highschool",
        //   address1: "1",
        //   address2: "2",
        //   phone: "3",
        //   mobile_phone: "4",
        //   company: "6",
        //   trade: "education",
        //   position: "8",
        //   address3: "9",
        //   company_phone: "0",
        //   company_email: "6",
        //   company_type: "4",
        //   income: "546",
        //   contact: "56",
        //   contact_phone: "546",
        //   contact_name: "456",
        //   contact2: "456",
        //   contact2_phone: "546",
        //   contact2_dep: "546",
        //   remark: "56",
        //   contact2_name: "456",
        //   contact2_pos: "546546",
        // };
          console.log("data", data);
          let [res, err] = createLoan(data)
          if(err) return this.$message('创建用户失败');
          this.$message('创建申请成功');
      });
    },
    doReset() {
      this.$refs.createForm.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
::deep .el-card__header {
  line-height: 20px;
  text-align: left;
}
</style>