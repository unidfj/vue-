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
// 更新用户数据
export const userupdate = (id, data) => {
    return axios({
        url: `/user_update/${id}`,
        method: 'post',
        data
    })
}

// 关注用户
export const followUser = (id) => {
    return axios({
        url: `/user_follows/${id}`
    })
}

// 取消关注用户
export const unfollowUser = (id) =>
    axios({
        url: `/user_unfollow/${id}`
    })

//用户关注列表
export const followlist = () => axios({
    url: `/user_follows`
})

//用户收藏列表
export const starlist = () => axios({
    url: '/user_star'
})

