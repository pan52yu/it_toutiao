<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
        :to="`/article/${item.aut_id}`"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from "@/api/search";

export default {
  name: "SearchResult",
  components: {},
  props: {
    searchText: {
      type: String,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      const { data } = await getSearch({
        page: this.page, // 页码
        per_page: this.perPage, // 每页大小
        q: this.searchText, // 搜索关键字
      });
      this.list = [...this.list, ...data.data.results];
      // 如果接口有数据，就让页码＋1
      if (data.data.results.length) {
        this.page++;
        this.loading = false;
      } else {
        this.finished = true;
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
