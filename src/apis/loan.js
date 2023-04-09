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