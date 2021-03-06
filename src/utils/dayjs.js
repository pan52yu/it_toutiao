import dayjs from "dayjs";

import "dayjs/locale/zh-cn.js";
import relativeTime from "dayjs/plugin/relativeTime";
import Vue from "vue";

dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

Vue.filter("relativeTime", (value) => {
  return dayjs().to(dayjs(new Date(value)));
});
