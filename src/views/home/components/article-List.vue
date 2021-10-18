<template>
  <div class="article-List">
    <van-pull-refresh
     v-model="refreshing"
     @refresh="onRefresh"
     >
   <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :error.sync="error"
  error-text="请求失败，点击重新加载"
>
  <van-cell v-for="item in list" :key="item" :title="item" />
</van-list>
</van-pull-refresh>
  </div>
</template>

<script>
import getArticle from '@/api/article'
export default {
  name: 'articleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      refreshing: false,
      timestamp: null
    }
  },
  methods: {
    async onLoad () {
      // 发送文章列表请求
      try {
        const { data } = await getArticle({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        // 请求结果放入数组
        const { results } = data.data
        this.list.push(...results)
        // 修改加载状态
        this.loading = true
        // 判断是否全部加载完成
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        console.log('失败', err)
      }
    },
    // 下拉刷新
    async onRefresh () {
      try {
        const { data } = await getArticle({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        this.list.unshift(...data.data.results)
        this.refreshing = false
      } catch (err) {
        console.log('失败', err)
      }
    }
  }
}
</script>

<style lang="less">
.article-List{
  height: 79vh;
  overflow-y: auto;
}
</style>
