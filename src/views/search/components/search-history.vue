<template>
  <div>
    <van-cell title="搜索历史">
      <template #default>
        <template v-if="isDeleteStatus">
          <van-tag @click="delAllHistory" class="vt-tag" type="danger"
            >全部删除
          </van-tag>
          <van-tag class="vt-tag" type="success" @click="isDeleteStatus = false"
            >完成
          </van-tag>
        </template>
        <van-icon
          @click="isDeleteStatus = true"
          name="delete"
          v-else
        ></van-icon>
      </template>
    </van-cell>
    <van-cell
      @click="clickHistoryItem(item, index)"
      v-for="(item, index) in searchHistory"
      :key="index"
      :title="item"
    >
      <template #default v-if="isDeleteStatus">
        <van-icon name="clear"></van-icon>
      </template>
    </van-cell>
  </div>
</template>
<script>
export default {
  name: "SearchHistory",
  data() {
    return {
      isDeleteStatus: false,
    };
  },
  props: {
    searchHistory: {
      type: Array,
    },
  },
  methods: {
    // 点击历史列表中的每一项时
    clickHistoryItem(item, index) {
      // 当处于编辑状态时 直接删除点击的列表项
      if (this.isDeleteStatus) {
        this.searchHistory.splice(index, 1);
      } else {
        // 否则就触发自定义事件去搜索
        this.$emit("onSearch", item);
      }
    },
    // 删除所有历史列表项，触发自定义事件，让父组件去删除
    delAllHistory() {
      this.$emit("delAllHistory");
    },
  },
};
</script>
<style lang="less" scoped>
.vt-tag {
  margin-right: 10px;
}
</style>
