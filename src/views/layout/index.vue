<template>
  <div class="tabbar-container">
    <router-view/>
    <van-tabbar class="tabbar" route>
        <van-tabbar-item to="/">
          <i class="iconfont icon-shouye"></i>
          <span>首页</span>
        </van-tabbar-item>
        <van-tabbar-item to="/qa">
          <i class="iconfont icon-wenda"></i>
          <span>问答</span>
        </van-tabbar-item>
        <van-tabbar-item to="/video">
          <i class="iconfont icon-shipin"></i>
          <span>视频</span>
        </van-tabbar-item>
        <van-tabbar-item to="/my">
          <i class="iconfont icon-wode"></i>
          <span>我的</span>
        </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less">
.tabbar-container {
    .tabbar {
        .iconfont{
            font-size: 40px;
            display: block;
            text-align: center;
        }
        span {
            font-size: 20px;
            vertical-align: middle;
        }
    }
}
</style>
