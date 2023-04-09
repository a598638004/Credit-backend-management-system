import jwt from "jsonwebtoken";
import {secure} from '@/conf'

console.log(jwt)
// 解密获取用户信息
export const checkLogin = ()=>{
   const token = getToken();
   if (!token) return null;
   return jwt.decode(token,secure);

}
export const getToken = ()=>{
    return window.sessionStorage.getItem('token');
}