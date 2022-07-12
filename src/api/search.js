import request from "@/utils/request";

/**
 * @param(q)：传入的是搜索框里的字符串
 * 获取搜索联想建议
 */
export const getSearchSuggestion = (q) => {
  return request({
    method: "GET",
    url: "/v1_0/suggestion",
    params: {
      q,
    },
  });
};

/**
 * 获取搜索结果
 */
export function getSearch(params) {
  return request({
    method: "GET",
    url: "/v1_0/search",
    params,
  });
}
