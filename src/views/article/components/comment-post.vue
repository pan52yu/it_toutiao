<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="onPost" :disabled="message.length <= 0"
      >发布
    </van-button>
  </div>
</template>

<script>
import { addComment } from "@/utils/comment";
import { Toast } from "vant";

export default {
  name: "CommentPost",
  props: {
    target: {
      type: [Number, String],
      required: true,
    },
    type: {
      type: [String, Number],
      default: "a",
    },
  },
  // inject:['articleId']
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      Toast.loading({
        message: "加载中...",
        duration: 0,
        forbidClick: true,
      });
      try {
        const res = await addComment({
          target: this.target, // 评论目标id（评论文章即文章id，对评论进行回复则为评论id）
          content: this.message, // 评论内容
          art_id: this.type === "c" ? this.articleId : null, // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        });
        console.log(res);
        Toast.success("评论成功！");
        this.$emit("postSusses", res.data.data.new_obj);
        this.message = "";
      } catch (e) {
        console.log(e);
        Toast.success("评论失败！");
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;

  .post-field {
    background-color: #f5f7f9;
  }

  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;

    &::before {
      display: none;
    }
  }
}
</style>
