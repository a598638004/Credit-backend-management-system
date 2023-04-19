import { request,pretty } from '@/utils/request' 

export const createLoan = (data)=>{
    return pretty(request({
        url:'/loan/create',
        method:'post',
        data,
    }))
}

export const queryLoan = (params,customField)=>{
    return pretty(request({
        url:'/loan/list',
        params,
        ...customField
    })) 
}

export const saveLoan = (data)=>{
    return pretty(request({
        url:'/loan/update',
        method:'put',
        data:data
    })) 
}
// /loan/delete/:id
export const deleteLoan = (id)=>{
    return pretty(request({
        url:'/loan/delete/' + id,
        method:'delete',
    })) 
}

// 提交
export const submitApprove = id =>{
    return pretty(request({
        url:'/loan/submitToApprove',
        method:'post',
        data:{
            id
        }
    })) 
}