<template>
  <div>
    <van-nav-bar class="vt-navBar-title" title="更新昵称">
      <template #left>
        <span style="color: #ffffff" @click="$emit('close')">取消</span>
      </template>
      <template #right>
        <span style="color: #ffffff" @click="editUserName">保存</span>
      </template>
    </van-nav-bar>
    <van-field
      v-model="userName"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入留言"
      show-word-limit
    />
  </div>
</template>
<script>
import { editUserInfo } from "@/api/user";
import { Toast } from "vant";

export default {
  name: "UpdateName",
  props: {
    userInfo: {
      type: Object,
    },
  },
  data() {
    return {
      userName: this.userInfo.name,
    };
  },
  methods: {
    async editUserName() {
      try {
        await editUserInfo({
          name: this.userName,
        });
        Toast.success("更新成功");
        this.userInfo.name = this.userName;
        this.$emit("close");
      } catch (e) {
        Toast.fail("更新失败");
      }
    },
  },
};
</script>
