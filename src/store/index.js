import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modulesFn = require.context('./modules', true, /\.js$/);
console.log(modulesFn.keys())
// debugger;
const regex = /.*\/(.*)\.js$/

const modules = {};
// modulesFn.keys() 可以获取到上述满足条件的文件的加载路径
// modulesFn方法 modulesFn(路径) 获取模块
// {文件的加载路径user:模块}
modulesFn.keys().forEach(filepath => {
  console.log(filepath);
  let moduleName = regex.exec(filepath);
  console.log(moduleName);
  if (moduleName !== null) {
    moduleName = moduleName[1]
  }
  const moduleObj = modulesFn(filepath);
  modules[moduleName] = {
    namespaced: true,
    ...moduleObj.default
  }
})

export default new Vuex.Store({
  state: {
    loadings:{
      tab1:false
    }
  },
  getters: {
  },
  mutations: {
    // 某一个开关的loading状态改变
    settab1({loadings},payload){
      loadings.tab1 = payload;
    }
  },
  actions: {
  },
  modules
})
