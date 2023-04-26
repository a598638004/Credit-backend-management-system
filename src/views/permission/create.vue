<template>
  <GFormCreator ref="createForm" :conf="createConf"  @submit="doSubmit">
    <template #default>
      <div class="left">
        <el-button @click="doCreate" type="primary">创建管理员</el-button>
        <el-button @click="doReset">重置</el-button>
      </div>
    </template>
  </GFormCreator>
</template>

<script>
// import GFormCreator from "@/components/GFormCreator";
import createConf from "./createFormConf";
import {createUser} from "@/apis/user";
export default {
  name: 'permission-create',
  data() {
    return {
      createConf,
    };
  },
  methods: {
    doCreate() {
      // 调用submit
      this.$refs.createForm.validate(async data => {
        console.log("验证成功", data);
        if (data) {
          
          let [res, err] = await createUser(data)
          if(err) this.$message('创建失败')
          this.$message('创建成功')

          // 未完成跳转到用户列表

        } else {
          console.log("验证失败");
        }
      });
    },
    doReset() {
      this.$refs.createForm.reset();
    },
    doSubmit(data){
      console.log('提交事件触发。。',data);
    }
  },
//   components: { GFormCreator },
};
</script>

<style lang="scss" scoped>
</style>
