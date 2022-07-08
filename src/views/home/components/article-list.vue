<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      :success-text="successText"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="出错了,点击我重新加载~"
        @load="onLoad"
      >
        <article-item
          :article="item"
          v-for="(item, index) in list"
          :key="index"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item";

export default {
  name: "ArticleList",
  components: { ArticleItem },

  props: {
    channel: {
      type: Object,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false,
      successText: "",
    };
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        const res = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || +new Date(),
          with_top: 1,
        });
        console.log(res);
        this.list.push(...res.data.data.results);
        this.loading = false;
        // 数据已经请求完了
        if (res.data.data.results.length <= 0) {
          // 如果数据请求完毕，finished设为true
          this.finished = true;
        } else {
          this.timestamp = res.data.data.pre_timestamp;
        }
      } catch (e) {
        // 如果捕捉到错误，error属性该为true >> 展示错误的提示文字 >> 点击可以重新加载数据
        this.error = true;
        this.loading = false;
      }
    },
    async onRefresh() {
      const res = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || +new Date(),
        with_top: 1,
      });
      this.list = [...res.data.data.results, ...this.list];
      this.isLoading = false;
      this.successText = `加载了${res.data.data.results.length}条数据`;
    },
  },
};
</script>

<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow: auto;
}
</style>
