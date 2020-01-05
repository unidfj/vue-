
import axios from '@/utils/myaxios';
export const login=(data)=>{
    return axios({
        method:'post',
        url:'/login',
        data    
    })
}
export const getUserContentById =(id)=>{
    return axios({
        url:`/user/${id}`,
        headers:{'Authorization':localStorage.getItem('heimatoutiao')}//传入token
    })
}