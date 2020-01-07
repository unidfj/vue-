import axios from '@/utils/myaxios';
// 文件上传
export const fileupload=(data)=>{
    return axios({
        url:'/upload',
        method:'post',
        data
    })
}