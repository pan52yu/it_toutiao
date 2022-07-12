<template>
  <div class="search-suggestion">
    <van-cell
      @click="handleClick(item)"
      v-for="(item, index) in list"
      :key="index"
      icon="search"
    >
      <template #default>
        <div v-html="highLight(item)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/api/search";
import { debounce } from "lodash/function";

export default {
  name: "SearchSuggestion",
  props: {
    searchText: {
      type: String,
    },
  },
  data() {
    return {
      list: [],
    };
  },
  watch: {
    searchText: {
      immediate: true,
      handler: debounce(function (value) {
        this.getSearchSuggestion(value);
      }, 500),
    },
  },
  methods: {
    // 处理点击
    handleClick(val) {
      this.$emit("onSearch", val);
    },
    // 强调 / 突出
    highLight(item) {
      const reg = new RegExp(this.searchText, "gi");
      return item.replace(
        reg,
        `<span style="color: red">${this.searchText}</span>`
      );
    },
    async getSearchSuggestion(q) {
      const res = await getSearchSuggestion(q);
      this.list = res.data.data.options;
      // this.list = res.data.data.options.map((item) => {
      //   const reg = new RegExp(this.searchText, "gi");
      //   return item.replace(
      //     reg,
      //     `<span style="color: red">${this.searchText}</span>`
      //   );
      // });
    },
  },
};
</script>

<style scoped></style>
