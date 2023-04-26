import { logout } from '@/apis/user';
import { Message } from 'element-ui';

export default {
    state: {
        isLogin: false,
        userInfo: null,
        userMenus: null, // 用户路由菜单
        cachedTags:[]
    },
    getters: {
        getIsLogin(state) {
            return state.isLogin
        },
        getUserInfo(state) {
            return state.userInfo
        },
        getUserMenus(state) {
            return state.userMenus;
        },
        getTags(state){
            return state.cachedTags;
        }
    },
    mutations: {
        delTag(state,tag) {
            // 判断原来是否存在,不存在才添加
            let index = state.cachedTags.findIndex(t=>{
               return tag.compName === t.compName
           });
           if (index !== -1) {
               state.cachedTags.splice(index,1);
           }
       },
       addTag(state,tag) {
           // 判断原来是否存在,不存在才添加
           let findTag = state.cachedTags.find(t=>{
               return tag.compName === t.compName
           });
           if (!findTag) {
               state.cachedTags.push(tag);
           }
       },
        changeIsLogin(state, payload) {
            state.isLogin = payload
        },
        changeUserInfo(state, payload) {
            state.userInfo = payload;
        },
        changeUserMenus(state, payload) {
            state.userMenus = payload;
        }
    },
    // 异步的行为放在action里面
    actions: {
        async doLogout({ commit }, payload) {
            let [res, err] = await logout();
            if(err){
                return Message.error("登录失败")
            }

            // 更改登录状态
            commit('changeIsLogin', false)
            commit('changeUserInfo', null)
            commit('changeUserMenus', null)
            // 清除本地存储
            window.sessionStorage.setItem('token', '')
        }
    }
}