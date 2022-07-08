<template>
  <div>
    Demo
    <hr />
    <p>{{ index }}</p>
    <p>{{ $store.state.user.name }}</p>
    <p>{{ $store.state.user.age }}</p>
    <input type="number" @keydown.enter="changeIndex" v-model.number="num" />
    <button @click="indexs">点我index+1</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      num: 0,
    };
  },
  created() {
    console.log(mapState);
  },
  computed: {
    ...mapState(["index"]),
  },
  methods: {
    indexs() {
      this.$store.commit("addIndex");
      this.$store.commit("changeName");
    },
    changeIndex() {
      this.$store.commit("changeIndex", this.num);
      this.num = 0;
    },
  },
};
</script>

<style scoped></style>
