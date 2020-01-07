import axios from '@/utils/myaxios';
export const login = (data) => {
    return axios({
        method: 'post',
        url: '/login',
        data
    })
}
export const getUserContentById = (id) => {
    return axios({
        url: `/user/${id}`,
        //传入token
    })
}
//get用户数据
export const userdata = (id) => {
    return axios({
        url: `/user/${id}`,
    })
}

export const userupdate = (id, data) => {
    return axios({
        url: `/user_update/${id}`,
        method: 'post',
        data
    })
}