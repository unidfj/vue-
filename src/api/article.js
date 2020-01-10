// 引入的axios已经配置好基准路径
import axios from '@/utils/myaxios.js'

// 1.获取栏目的新闻数据
export const getPostList = (params) => {
    return axios({
        url: '/post',
        params
    })
}
//2 根据id获取文章详情页面
export const articleById = (id) => {
    return axios({
        url: `/post/${id}`
    })
}

//3 根据id点赞
export const dianzanById = (id) => axios({
    url: `/post_like/${id}`
})


//4根据id收藏
export const shoucangById = (id) => axios({
    url: `/post_star/${id}`
})

//根据id获取文章的评论
export const commentById = (id, params) => axios({
    url: `/post_comment/${id}`,
    params
})

//根据id获取
export const replycomment = (id, data) => axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
})

//发布评论
export const sendcommment = (id,data)=>{
    return axios({
        method:'post',
        url:`/post_comment/${id}`,
        data
    })
}