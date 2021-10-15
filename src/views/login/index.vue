<template>
  <div class="login-container">
      <!-- 登录导航栏 -->
      <van-nav-bar class="nav-bar" title="登录">
        <van-icon slot="left" name="cross" @click="$router.back()"/>
      </van-nav-bar>
      <!-- 登录表单验证 -->
      <van-form ref="loginFrom" @submit="onSubmit">
<van-field
    v-model="user.mobile"
    name="mobile"
    placeholder="请输入手机号"
    type="number"
    maxlength="11"
     :rules="userFromRules.mobile"
  >
  <i slot="left-icon" class="iconfont icon-shouji"></i>
  </van-field>
  <van-field
    v-model="user.code"
    name="code"
    placeholder="请填写验证码"
    type="num"
    maxlength="6"
     :rules="userFromRules.code"
  >
  <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
   <template #button>
     <van-count-down v-if="iscountDownShow" :time="time" format="ss s" @finish = "iscountDownShow = false" />
    <van-button v-else size="small" round type="primary" native-type="button" class="send-sms-btn" @click="onSendSms">发送验证码</van-button>
  </template>
  </van-field>
  <div class="login-btn-wapper" style="margin: 16px;">
    <!-- native-type="button"不会提交表单，设置为submit会提交表单 -->
    <van-button class="login-btn" block type="info" native-type="submmit">登录</van-button>
  </div>
</van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      iscountDownShow: false,
      time: 60 * 1000,
      user: {
        mobile: '',
        code: ''
      },
      userFromRules: {
        mobile: [{
          required: true,
          message: '请填写手机号',
          pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
        }],
        code: [{
          required: true,
          message: '请填写验证码'
        }]
      }

    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      // 1. 展示登陆中 loading
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认 2000，0 表示持续展示不关闭
      })

      // 2. 请求登录
      try {
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (err) {
        this.$toast.fail('登录失败')
      }
    },
    async onSendSms () {
      // 1 校验手机号码
      try {
        await this.$refs.loginFrom.validate('mobile')
        // 2 倒计时功能
        this.iscountDownShow = true
      } catch (err) {
        return console.log('验证失败', err)
      }

      try {
        await sendSms(this.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.$toast('发送失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
  .login-container{
    .iconfont{
      font-size: 37px;
    }
    .send-sms-btn{
      background-color: #ededed;
      color: #666666;
      height: 46px;
      width: 158px;
      line-height: 46px;
      font-size:22px;
      border: none;
    }
    .login-btn-wapper{
      padding: 53px 33px;
      .login-btn{
      border: none;
      background-color: #6db4fb;
     }
    }
  }
</style>
