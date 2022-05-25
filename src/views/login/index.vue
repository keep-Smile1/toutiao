<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar">
      <van-icon name="cross" slot="left" @click="$router.back()" />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        type="number"
        maxlength="11"
        :rules="[
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3-9]\d{9}$/, message: '请填写正确的手机号' },
        ]"
      >
        <i slot="left-icon" class="toutiao toutiaoshouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        type="number"
        maxlength="6"
        :rules="[
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '请填写正确的验证码' },
        ]"
      >
        <i slot="left-icon" class="toutiao toutiaoyanzhengma"></i>
        <template #button>
          <!-- 倒计时  时间 -->
          <van-count-down
            v-if="isCountShow"
            @finish="isCountShow = false"
            :time="1000 * 60"
            format="ss s"
          />
          <van-button
            class="send-sms-btn"
            round
            size="small"
            type="default"
            v-else
            native-type="button"
            @click="onSendSms"
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'LoginPage',
  data () {
    return {
      isCountShow: false,
      user: {
        mobile: '15611111111',
        code: '246810'
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      // 获取表单数据
      const user = this.user
      // 表单验证
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true, // 禁用背景点击
        duration: 2000// 持续时间，默认是2000  如果为0则持续展示
      })
      // 提交表单请求登录
      try {
        const res = await login(user)
        // console.log('成功', res)
        // console.log('打印', res.data.data)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
        // 登录成功 跳转回 原来登录页面
        // 不严谨
        this.$router.back()
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }

      // 根据请求响应结果处理后续操作
    },
    async  onSendSms () {
      // 1 效验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证通过')
      } catch (error) {
        console.log('验证失败', error)
      }

      // 2 验证通过 显示倒计时
      this.isCountShow = true

      // 3请求发送验证码
      try {
        const res = await sendSms(this.user.mobile)
        console.log('发送成功', res)
        this.$toast('发送成功')
      } catch (error) {
        this.isCountShow = false // 关闭倒计时
        if (error.response.status === 429) {
          this.$toast('请稍后再试')
        } else {
          this.$toast('发送失败,请稍后再试')
        }
      }
    }

  }

}
</script>

<style lang='less' scoped>
.toutiao {
  font-size: 37px;
}
.send-sms-btn {
  width: 160px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}
.login-btn-wrap {
  padding: 53px 33px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
  }
}
</style>
