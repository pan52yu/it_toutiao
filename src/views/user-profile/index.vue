<template>
  <div class="user-profile">
    <van-nav-bar title="个人信息">
      <template #left>
        <van-icon
          @click="$router.back()"
          color="white"
          name="arrow-left"
        ></van-icon>
      </template>
    </van-nav-bar>
    <input type="file" hidden ref="file" @change="onFileChange" />
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <template #default>
        <van-image round class="vt-img" :src="userInfo.photo"></van-image>
      </template>
    </van-cell>
    <van-cell
      @click="isShowUsername = true"
      :value="userInfo.name"
      title="昵称"
      is-link
    ></van-cell>
    <van-cell
      :value="userInfo.gender === 1 ? '女' : '男'"
      title="性别"
      is-link
      @click="isShowGender = true"
    ></van-cell>
    <van-cell
      @click="isShowBirthday = true"
      :value="userInfo.birthday"
      title="生日"
      is-link
    ></van-cell>
    <!--  修改昵称弹窗  -->
    <van-popup
      v-model="isShowUsername"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdateName
        :userInfo="userInfo"
        @close="isShowUsername = false"
      ></UpdateName>
    </van-popup>
    <!--  修改性别弹窗  -->
    <van-popup v-model="isShowGender" position="bottom">
      <UpdateGender
        :userInfo="userInfo"
        @close="isShowGender = false"
      ></UpdateGender>
    </van-popup>
    <!--  修改生日弹窗  -->
    <van-popup v-model="isShowBirthday" position="bottom">
      <UpdateBirthday
        :userInfo="userInfo"
        @close="isShowBirthday = false"
      ></UpdateBirthday>
    </van-popup>
    <!-- 编辑头像弹窗 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      style="height: 100%"
    >
      <UpdatePhoto
        v-if="isUpdatePhotoShow"
        :img="img"
        @close="isUpdatePhotoShow = false"
        @update-photo="userInfo.photo = $event"
      ></UpdatePhoto>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
import UpdateName from "@/views/user-profile/components/update-name";
import UpdateGender from "@/views/user-profile/components/update-gender";
import UpdateBirthday from "@/views/user-profile/components/update-birthday";
import UpdatePhoto from "@/views/user-profile/components/update-photo";

export default {
  name: "UserProfile",
  components: { UpdatePhoto, UpdateBirthday, UpdateGender, UpdateName },
  data() {
    return {
      isShowUsername: false,
      isShowGender: false,
      isShowBirthday: false,
      userInfo: {},
      isUpdatePhotoShow: false,
      img: null, // 预览的图片
    };
  },
  created() {
    this.getUserProfile();
  },
  methods: {
    async getUserProfile() {
      const res = await getUserProfile();
      this.userInfo = res.data.data;
    },
    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0];
      console.log(file); // 一个File对象
      // 基于文章对象获取 blob 数据
      this.img = window.URL.createObjectURL(file);
      console.log(this.img); // blob:http://localhost:10086/c8bdbf57-e3d5-4e11-8935-ea0250a86e8b
      // 展示预览图片弹出层
      this.isUpdatePhotoShow = true;

      // file-input 如果选了同一个文件不会触发 change 事件
      // 解决办法就是每次使用完毕，把它的 value 清空
      this.$refs.file.value = "";
    },
  },
};
</script>
<style lang="less" scoped>
.user-profile {
  /deep/ .vt-img {
    width: 80px;
    height: 80px;
  }
}
</style>
