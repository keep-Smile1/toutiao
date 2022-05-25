import axios from 'axios'

import store from '@/store'
const request = axios.create({
  baseURL: 'https://toutiao.itheima.net/'
})

// 请求拦截器
request.interceptors.request.use(config => {
  // 请求发起经过
  // config 本次请求的请求配置对象
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  // 这里 务必要返回config 配置对象 否则请求就停在这里出不去
  // console.log(config)
  return config
}, error => {
  // 请求出错   会进这里
  return Promise.reject(error)
})

export default request
