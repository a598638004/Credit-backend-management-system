<template>
  <el-container>
    <el-aside width="240px">
      <el-menu
        router
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <GAsideMenu
          v-for="(item, i) in menus"
          :key="i"
          :item="item"
        ></GAsideMenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <GBreadcrumb />
        <div>
          <GDropdown
            @command="doCommand"
            :title="'admin'"
            :items="[{ key: 'logout', label: '退出' }]"
          />
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template> 

<script>
import GAsideMenu from "@/components/GAsideMenu.vue";
import GBreadcrumb from "@/components/GBreadcrumb";
import GDropdown from "@/components/GDropdown";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Layout",
  components: { GAsideMenu, GBreadcrumb, GDropdown },
  computed: {
    ...mapGetters({
      menus: "user/getUserMenus",
    }),
  },
  methods: {
    ...mapActions({
      doLogout: "user/doLogout",
    }),
    async doCommand(e) {
      if (e === "logout") {
        await this.doLogout();
        // 外部没有依赖里面的值
        // 依赖的是执行顺序
        window.location.reload();
      }
    },
  },
};
</script>

<style scoped>
.el-header {
  /* background-color: #568bc9; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

.el-container {
    height: 100%;
}
.el-menu-vertical-demo {
    border:none;
}

.el-menu{
  /* width: 240px; */
  height: 100%;
}
</style>