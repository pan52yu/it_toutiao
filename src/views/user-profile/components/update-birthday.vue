<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="confirm"
      @cancel="$emit('close')"
    />
  </div>
</template>
<script>
import dayjs from "dayjs";
import { editUserInfo } from "@/api/user";
import { Toast } from "vant";

export default {
  name: "UpdateBirthday",
  props: {
    userInfo: {
      type: Object,
    },
  },
  data() {
    return {
      minDate: new Date(1900, 1, 1),
      maxDate: new Date(),
      currentDate: new Date(this.userInfo.birthday),
    };
  },
  methods: {
    async confirm(time) {
      const date = dayjs(time).format("YYYY-MM-DD");
      Toast.loading({
        duration: 0, // 持续展示 toast
        message: "加载中...",
        forbidClick: true,
      });
      try {
        await editUserInfo({
          birthday: date,
        });
        Toast.success("更新成功");
        this.userInfo.birthday = date;
        this.$emit("close");
      } catch (e) {
        Toast.fail("更新失败");
      }
    },
  },
};
</script>
