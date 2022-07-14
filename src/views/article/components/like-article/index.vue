<template>
  <van-button class="vt-btn" :loading="isLoading" @click="changAttitude">
    <template #icon>
      <van-icon
        :color="attitude === 1 ? 'red' : ''"
        :name="attitude === 1 ? 'good-job' : 'good-job-o'"
      />
    </template>
  </van-button>
</template>
<script>
import { addLike, deleteLike } from "@/api/article";

export default {
  name: "LikeArticle",
  model: {
    prop: "attitude",
    event: "changAttitude",
  },
  props: {
    attitude: {
      type: Number,
    },
    art_id: {
      type: String,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async changAttitude() {
      try {
        this.isLoading = true;
        if (this.attitude === -1) {
          await addLike(this.art_id);
        } else {
          await deleteLike(this.art_id);
        }
        this.$emit("changAttitude", -this.attitude);
        this.$toast.success(this.isCollected === -1 ? "点赞成功" : "取消点赞");
      } catch (e) {
        this.$toast.fail("操作失败，请重试！");
      }
      this.isLoading = false;
    },
  },
};
</script>
<style lang="less" scoped>
.vt-btn {
  border: none;
}
</style>
