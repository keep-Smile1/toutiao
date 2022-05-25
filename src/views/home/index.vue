<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        slot="title"
        type="info"
        round
        size="small"
        icon="search"
        class="van-btn"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 文章列表 -->
        <article-list :channel="item"></article-list>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiaogengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import ArticleList from './components/article-list.vue'
import { getUserChannels } from '@/api/user.js'
export default {
  name: 'HomePage',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,
      channels: [] // 频道列表
    }
  },
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
        console.log(data)
      } catch (error) {
        this.$toast('获取频道列表失败')
      }
    }
  }

}
</script>

<style lang='less' scoped>
/deep/.van-nav-bar__title {
  max-width: unset;
}
.van-tabs__wrap {
  height: 82px;
  position: fixed;
  left: 0;
  width: 100%;
  top: 92px;
  z-index: 1;
}
.home-container {
  padding-top: 100px;
  padding-bottom: 100px;
  .van-btn {
    width: 555px;
    height: 64px;
    font-size: 28px;
    background-color: #5babfb;
    border: none;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    // .van-tabs__nav {
    // }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      color: #777;
    }
    .van-tabs__nav {
      padding: 0;
    }
    .van-tabs__line {
      width: 32px !important;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }

    .van-tab--active {
      color: #333;
    }
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.9;
    i.toutiao {
      font-size: 33px;
    }
    &:before {
      position: absolute;
      left: 0;
      content: "";
      width: 1px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
  .placeholder {
    width: 66px;
    height: 82px;
    flex-shrink: 0;
  }
}
</style>
