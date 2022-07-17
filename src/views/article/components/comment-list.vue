<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    error-text="出错啦~点我刷新"
    :immediate-check="false"
    :error.sync="error"
  >
    <!--   每一行的评论列表  -->
    <CommentItem
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click', $event)"
    ></CommentItem>
  </van-list>
</template>
<script>
import { getComments } from "@/api/comment";
import CommentItem from "@/views/article/components/comment-item";

export default {
  name: "CommentList",
  components: { CommentItem },
  props: {
    source: {
      type: [String, Number],
      required: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "a",
    },
  },
  data() {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 获取下一页数据的标记
      limit: 10, // 每次请求几条数据
      error: false, // 控制vant列表错误提醒
    };
  },
  created() {
    // 当你手动初始 onLoad 的话，它不会自动开始初始的 loading
    // 所以我们要手动的开启初始 loading
    this.loading = true;
    this.onLoad();
  },
  methods: {
    async onLoad() {
      try {
        const res = await getComments({
          type: this.type, //  评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source, // 源id，文章id或评论id
          offset: this.offset, // 评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit, // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        });
        console.log(res.data);
        this.list.push(...res.data.data.results);
        // 判断如果当前列表的最后一项,是所有的最后一项说明结束了
        if (res.data.data.end_id === res.data.data.last_id) {
          this.finished = true;
        } else {
          // 否者就把列表的最后一项存起来 作为下次请求的偏移量
          this.offset = res.data.data.last_id;
        }
      } catch (e) {
        this.error = true;
      }
      this.loading = false;
    },
  },
};
</script>
