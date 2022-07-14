<template>
  <van-button :loading="isLoading" class="btn" @click="changCollected">
    <template #icon>
      <van-icon
        :color="isCollected ? 'red' : ''"
        :name="isCollected ? 'star' : 'star-o'"
      ></van-icon>
    </template>
  </van-button>
</template>
<script>
import { addCollect, deleteCollect } from "@/api/article";

export default {
  name: "CollectArticle",
  model: {
    prop: "isCollected",
    event: "changCollected",
  },
  props: {
    isCollected: {
      type: Boolean,
    },
    aut_id: {
      type: String,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async changCollected() {
      try {
        this.isLoading = true;
        if (this.isCollected) {
          await deleteCollect(this.aut_id);
        } else {
          await addCollect(this.aut_id);
        }
        this.$emit("changCollected", !this.isCollected);
        this.$toast.success(!this.isCollected ? "收藏成功" : "取消收藏");
      } catch (e) {
        this.$toast.fail("操作失败，请重试！");
      }
      this.isLoading = false;
    },
  },
  created() {},
};
</script>
<style scoped lang="less">
.btn {
  border: none;
}
</style>
