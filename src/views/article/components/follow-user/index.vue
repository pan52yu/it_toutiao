<template>
  <van-button
    v-if="value"
    @click="goFollow"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="isLoading"
    >关注
  </van-button>
  <van-button
    @click="goFollow"
    class="follow-btn"
    round
    size="small"
    :loading="isLoading"
    v-else
    >已关注
  </van-button>
</template>
<script>
import { addFollow, deleteFollow } from "@/api/user";
import { Notify } from "vant";

export default {
  name: "FollowUser",
  props: {
    value: {
      type: [Boolean],
    },

    aut_id: {
      type: [String, Number],
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    console.log(this);
  },
  methods: {
    async goFollow() {
      this.isLoading = true;
      try {
        if (this.value) {
          //  点击进行取消关注
          await deleteFollow(this.aut_id);
        } else {
          //  点击进行关注
          await addFollow(this.aut_id);
        }
        this.$emit("input", !this.value);

        Notify({
          type: "success",
          message: !this.value ? "取消关注" : "关注成功",
        });
        this.isLoading = false;
      } catch (e) {
        this.isLoading = false;
        Notify({
          type: "danger",
          message: "操作失败",
        });
      }
    },
  },
};
</script>
