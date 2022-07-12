<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowResult = false"
      />

      <!--   搜索结果模块   -->
      <SearchResult :searchText="searchText" v-if="isShowResult" />
      <!--   搜索建议模块   -->
      <SearchSuggestion
        :searchText="searchText"
        v-else-if="searchText"
        @onSearch="onSearch"
      ></SearchSuggestion>
      <!--   搜索历史组件   -->
      <SearchHistory
        @onSearch="onSearch"
        @delAllHistory="searchHistory = []"
        :searchHistory="searchHistory"
        v-else
      ></SearchHistory>
    </form>
  </div>
</template>

<script>
import SearchHistory from "@/views/search/components/search-history";
import SearchSuggestion from "@/views/search/components/search-suggestion";
import SearchResult from "@/views/search/components/search-result";
import { getLocal, setLocal } from "@/utils/storage";
import { HISTORYKET } from "@/constants";

export default {
  name: "SearchPage",
  components: { SearchResult, SearchSuggestion, SearchHistory },
  props: {},
  data() {
    return {
      searchText: "",
      isShowResult: false,
      searchHistory: getLocal(HISTORYKET) || [],
    };
  },
  computed: {},
  watch: {
    // 搜索持久化
    // 监听搜索历史记录的变化
    // 发生了变化时，把最新的数据保存在本地存储中
    // 注意：获取默认值是，从本地存储中拿，并且给个兜底空数组
    searchHistory(val) {
      setLocal(HISTORYKET, val);
    },
  },
  created() {},
  methods: {
    // 开始搜索
    onSearch(val) {
      console.log("开始搜索");
      this.isShowResult = true;
      this.searchText = val;
      const index = this.searchHistory.indexOf(val);
      if (index !== -1) {
        this.searchHistory.splice(index, 1);
      }
      this.searchHistory.unshift(val);
    },
    onCancel() {
      console.log("点击了取消");
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped></style>
