<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshing"
      :success-text="refreshTip"
      @refresh="onRefresh"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
        <article-item
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        ></article-item> </van-list
    ></van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article.js'
import articleItem from '../../../components/article-item/index.vue'
export default {
  components: { articleItem },

  name: 'ArticleList',
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
      timestamp: null, // 请求下一页数据的时间
      error: false,
      refreshing: false,
      refreshTip: ''// 下拉更新 提示文字
    }
  },
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      try {
        const { data: { data: { results, timestamp } } } = await getArticleList({
          // 频道ID
          channel_id: this.channel.id,
          // 你可以把 timestamp 理解为页码
          timestamp: this.timestamp || Date.now()
        })

        // console.log('@@@', results)
        // 模拟随机失败的情况
        // if (Math.random() > 0.2) {
        //   JSON.parse('dsnajndjsa')
        // }

        this.list.push(...results)

        this.loading = false

        if (timestamp === null) {
          // this.timestamp = results.pre_timestamp

          this.finished = true
        }
        this.timestamp = timestamp
      } catch (error) {
        console.log('失败')
        this.loading = false
        this.error = true
      }
    },
    async onRefresh () {
      try {
        const { data: { data: { results } } } = await getArticleList({
          // 1获取数据
          // 频道ID
          channel_id: this.channel.id,
          // 你可以把 timestamp 理解为页码
          timestamp: Date.now(),
          with_out: 1
        })
        // 模拟随机失败的情况
        // if (Math.random() > 0.2) {
        //   JSON.parse('dsnajndjsa')
        // }
        // 将数据追加到顶部
        this.list.unshift(...results)
        this.refreshTip = `更新了${results.length}条数据`
      } catch (error) {
        this.refreshTip = '刷新失败'
      }

      // 关闭下拉更新状态
      this.refreshing = false
    }

  }

}
</script>

<style lang='less' scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
