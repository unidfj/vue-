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