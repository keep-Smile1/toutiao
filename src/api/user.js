// 用户相关请求模块
import request from '@/utils/request'

// import store from '@/store/index.js'

export function login (data) {
  return request({
    method: 'post',
    url: '/v1_0/authorizations',
    data
  })
}

// 发送验证码
export function sendSms (mobile) {
  return request({
    method: 'get',
    url: '/v1_0/sms/codes/' + mobile
  })
}

// 获取用户自己的信息
export function getUserInfo () {
  return request({
    method: 'get',
    url: '/v1_0/user'
    // 发送请求头数据
    // headers: {
    // 接口授权才能访问
    //   Authorization: 'Bearer ' + store.state.user.token
    // }
  })
}

// 获取用户频道列表
export function getUserChannels () {
  return request({
    method: 'get',
    url: '/v1_0/user/channels'
  })
}
