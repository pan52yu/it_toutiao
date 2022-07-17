<template>
  <div>
    <van-picker
      title="更新昵称"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      :default-index="userInfo.gender"
    />
  </div>
</template>
<script>
import { Toast } from "vant";
import { editUserInfo } from "@/api/user";

export default {
  name: "UpdateGender",
  props: {
    userInfo: {
      type: Object,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
    };
  },
  methods: {
    async onConfirm(value) {
      let gender = null;
      value === "男" ? (gender = 0) : (gender = 1);
      Toast.loading({
        duration: 0, // 持续展示 toast
        message: "加载中...",
        forbidClick: true,
      });
      try {
        await editUserInfo({
          gender,
        });
        Toast.success("修改性别成功");
        this.userInfo.gender = gender;
        this.$emit("close");
      } catch (e) {
        Toast.fail("修改性别失败");
      }
    },
    onCancel() {
      this.$emit("close");
    },
  },
};
</script>
