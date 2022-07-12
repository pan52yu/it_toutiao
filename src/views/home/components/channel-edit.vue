<template>
  <div class="channel-edit">
    <van-cell style="text-align: center" title="频道编辑"></van-cell>
    <!--  我的频道  -->
    <van-cell title="我的频道">
      <template #default>
        <van-button
          @click="isEdit = !isEdit"
          class="vt-btn"
          round
          plain
          size="mini"
          type="danger"
          >{{ isEdit ? "完成" : "编辑" }}
        </van-button>
      </template>
    </van-cell>
    <!--  我的频道宫格   -->
    <van-grid class="my-channel" :gutter="10">
      <van-grid-item
        class="channel-grid"
        v-for="(value, index) in userChannels"
        :key="value.id"
        @click="onMyChannelClick(value, index)"
      >
        <template #icon v-if="isEdit && index !== 0">
          <van-icon name="clear"></van-icon>
        </template>
        <template #text>
          <span :class="['text', { active: active === index }]">{{
            value.name
          }}</span>
        </template>
      </van-grid-item>
    </van-grid>
    <!--  推荐频道  -->
    <van-cell title="推荐频道"></van-cell>
    <!--  推荐频道宫格   -->
    <van-grid :gutter="10">
      <van-grid-item
        class="recommend-grid"
        v-for="value in recommendChannels"
        :key="value.id"
        @click="addChannel(value)"
      >
        <template #text>
          <span class="text"><van-icon name="plus" /> {{ value.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { deleteUserChannel, getAddChannel, getAllChannel } from "@/api/channel";
import { differenceBy } from "@/utils/ludashi";
import { Notify, Toast } from "vant";
import { mapState } from "vuex";
import { USERCHANNELKEY } from "@/constants";
import { setLocal } from "@/utils/storage";

export default {
  name: "ChannelEdit",
  components: {},
  props: {
    userChannels: {
      type: Array,
      default: () => [],
    },
    active: {
      type: Number,
    },
  },
  data() {
    return {
      allChannels: [],
      array: [],
      isEdit: false,
    };
  },
  computed: {
    recommendChannels() {
      // 使用dashed插件处理数据
      return differenceBy(this.allChannels, this.userChannels, "id");
      // 原生过滤修改
      // return this.allChannels.filter((item) => {
      //   return !this.userChannels.some((uitem) => uitem.id === item.id);
      // });
    },
    ...mapState(["user"]),
  },
  watch: {},
  created() {
    this.getAllChannel();
  },
  mounted() {},
  methods: {
    async delChannel(channel) {
      try {
        if (this.user) {
          await deleteUserChannel(channel.id);
        } else {
          setLocal(USERCHANNELKEY, this.userChannels);
        }
        Toast("删除成功");
      } catch (e) {
        Toast("删除失败");
      }
    },
    // 点击切换或者删除我的编辑选项
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        // 编辑状态
        /* 编辑状态 >> 点击频道 >> 删除频道
           点击索引 大于 选中索引(active) --> 直接删除
           点击索引小于等于 >> 选中索引(active) >> 先删除/选中状态-1(同时当前频道弹层不能关闭)*/
        if (index === 0) {
          return Notify({
            type: "danger",
            message: "This is not allowed to delete！",
          });
        }
        if (index <= this.active) {
          this.$emit("toggleNav", this.active - 1, true);
        }
        this.userChannels.splice(index, 1);
        // 持久化
        this.delChannel(channel);
      } else {
        // 非编辑状态  >> 切换 >> 关弹层
        this.$emit("toggleNav", index, false);
      }
    },
    // 点击将推荐列表添加到我的频道里
    async addChannel(item) {
      this.userChannels.push(item);
      // 数据持久化
      // 未登录保存到本地存储中
      // 已登录保存到服务器中
      if (this.user) {
        try {
          const res = await getAddChannel({
            id: item.id,
            seq: this.userChannels.length,
          });
          console.log(res);
          Toast("添加成功");
        } catch (e) {
          Toast("添加失败");
        }
      } else {
        setLocal(USERCHANNELKEY, this.userChannels);
      }
    },
    // 获取全部的城市列表
    async getAllChannel() {
      const res = await getAllChannel();
      this.allChannels = res.data.data.channels;
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  .vt-btn {
    width: 100px;
  }

  .my-channel {
    /deep/ .van-icon-clear {
      position: absolute;
      top: -15px;
      right: -15px;
      font-size: 30px;
      color: #cacaca;
    }

    /deep/ .channel-grid {
      .van-grid-item__content {
        background-color: #f4f5f6;
      }

      .text {
        font-size: 24px;
        color: #222;
        margin-top: 0;

        &.active {
          color: red;
        }
      }
    }

    /deep/ .van-grid-item__icon-wrapper {
      position: unset;
    }
  }

  /deep/ .recommend-grid {
    .van-grid-item__content {
      background-color: #f4f5f6;
    }

    .text {
      font-size: 24px;
      color: #222;
      margin-top: 0;
    }
  }
}
</style>
