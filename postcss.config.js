// 写配置 做px 到 rem 转换
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue (value) {
        return value.file.indexOf('vant') > -1 ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
