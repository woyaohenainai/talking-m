<template>
  <div class="heme-container">
       <van-nav-bar class="nav-bar" fixed>
         <van-button
         class="searchBtn"
         slot="title"
         type="info"
         size="small"
         round
         icon="search">
           搜索
          </van-button>
      </van-nav-bar>
         <van-tabs v-model="active" animated class="channel">
          <van-tab :title="channel.name"
          v-for="channel in channels" :key = channel.id
          >
          <article-list ref="article-list" :channel="channel" />
          </van-tab>
          <!-- 接口失效仅为展示效果 -->
          <van-tab title="css"><article-list :channel="channel" /></van-tab>
          <van-tab title="html"><article-list :channel="channel" /></van-tab>
          <van-tab title="vue"><article-list :channel="channel" /></van-tab>
          <van-tab title="js"><article-list :channel="channel" /></van-tab>
          <van-tab title="react"><article-list :channel="channel" /></van-tab>
          <van-tab title="jq"><article-list :channel="channel" /></van-tab>
          <!-- 接口失效仅为展示效果 -->
          <div class="place" slot="nav-right">
            <i class="iconfont icon-gengduo"></i>
          </div>
        </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-List'
export default {
  name: 'my',
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  components: {
    ArticleList
  },
  created () {
    this.loadingChannels()
  },
  methods: {
    async loadingChannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less">
.heme-container{
  padding-bottom: 100px;
  padding-top: 172px;
  .van-nav-bar__title{
    max-width: unset;
}
  .searchBtn{
    height: 64px;
    width: 555px;
    background-color: #5babfb;
    font-size: 28px;
    border: 0px;
  }
  .van-tabs__wrap{
    height: 82px;
  }
  .channel{
    margin-right: 50px;
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    .van-tab{
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
      min-width: 200px;
    }
  }
  .van-tabs__line{
    width: 31px;
    height: 6px;
    background-color: #3296fa;
  }
  .van-tab--active{
    color: #333 !important;
  }
   .place{
     position: fixed;
     right: 0;
     display: flex;
    justify-content: center;
    align-items: center;
    //  background-color: pink;
      width: 66px;
      height: 82px;
      opacity: 0.8;
      .iconfont{
        font-size: 32px;
      }
      &:before{
        content: "";
        width: 2px;
        height: 100%;
        background-image: url("../../assets/gradient-gray-line.png");
        background-size: contain;
        position: absolute;
        left: 0;
      }
    }
}
</style>
