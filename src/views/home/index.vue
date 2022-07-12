<template>
  <div class="home-container">
    <!--  顶部搜索框  -->
    <van-nav-bar fixed title="搜索">
      <template #title>
        <van-button
          icon="search"
          size="small"
          round
          class="vt-search-btn"
          type="info"
          to="/search"
          >搜索
        </van-button>
      </template>
    </van-nav-bar>
    <!--  频道列表  -->
    <van-tabs v-model="active" class="channel-tabs" animated swipeable>
      <van-tab v-for="item in userChannels" :key="item.id" :title="item.name">
        <ArticleList :channel="item"></ArticleList>
      </van-tab>

      <template #nav-right>
        <div class="placeholder"></div>
        <TouTiao
          icon="gengduo"
          class="hamburger-btn"
          @click.native="showPopup = true"
        ></TouTiao>
      </template>
    </van-tabs>
    <!--  汉堡弹出层  -->
    <van-popup
      v-model="showPopup"
      :style="{ height: '90%' }"
      position="bottom"
      closeable
      close-icon-position="top-left"
    >
      <ChannelEdit
        @toggleNav="toggleNav"
        :userChannels="userChannels"
        :active="active"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/channel";
import ArticleList from "@/views/home/components/article-list";
import ChannelEdit from "@/views/home/components/channel-edit";
import { USERCHANNELKEY } from "@/constants";
import { getLocal } from "@/utils/storage";

export default {
  name: "HomePage",
  components: { ChannelEdit, ArticleList },
  props: {},
  data() {
    return {
      showPopup: false,
      active: 0,
      userChannels: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getUserChannels();
  },
  mounted() {},
  methods: {
    // 子组件点击我的频道时，nav跟着变化
    toggleNav(index, status) {
      this.active = index;
      this.showPopup = status;
    },
    async getUserChannels() {
      // const res = await getUserChannels();
      // this.userChannels = res.data.data.channels;
      try {
        const token = this.$store.state.user?.token;
        let channels = getLocal(USERCHANNELKEY);
        // 如果用户已登录或者本地存储没数据，就从接口拿数据渲染
        if (token || !channels) {
          const res = await getUserChannels();
          channels = res.data.data.channels;
        }
        // 如果用户没登录但本地存储有数据，就直接从本地存储拿数据
        this.userChannels = channels;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding: 180px 0 110px 0;

  /deep/ .van-nav-bar__title {
    width: 75%;
    max-width: unset;

    .vt-search-btn {
      width: 100%;
      background-color: #5babfb;
      border: none;

      .van-icon {
        color: #fff;
      }
    }
  }

  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }

    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 80px;

      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }

    .van-tab--active .van-tab__text {
      color: #333 !important;
    }

    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }

    .van-tabs__nav {
      padding: 0;
    }

    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
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
      opacity: 0.902;

      i.toutiao {
        font-size: 33px;
      }
    }
  }
}
</style>
