import axios from '@/utils/myaxios';
export const lanmu=()=>{
    return axios({
        url:'/category'
    })
} 