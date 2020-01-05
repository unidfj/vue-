//封装axios方法哼
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
// axios.defaults.baseURL = 'http://127.0.0.1:3000'

// 拦截器
// 请求拦截器  每次发请求都会执行的方法   要做什么:  验证有没有token有就发送Authorization=token
axios.interceptors.request.use(function (config) {
    let token = localStorage.getItem('heimatoutiao')
    if (token) config.headers.Authorization = token
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 响应拦截器  相应回来都是执行的方法   要做什么:   返回的数据有没有获取失败的 失败回退上一页
axios.interceptors.response.use(function (response) {
    // console.log(response);
    if (response.data.message == '用户信息验证失败!' || response.data.message == '用户信息验证失败') {
        alert(response.data.message)
        //这里不能调用路由`.`
        location.href='#/login'
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});



export default axios