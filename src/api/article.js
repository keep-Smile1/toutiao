import request from '@/utils/request'

// 获取文章列表数据
export function getArticleList (params) {
  return request({
    method: 'get',
    url: '/v1_0/articles',
    params
  })
}
