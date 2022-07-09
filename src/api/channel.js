import request from "@/utils/request";
// 展示频道列表
export const getUserChannels = () => {
  return request({
    url: "/v1_0/user/channels",
    method: "GET",
  });
};
// 获取所有频道
export const getAllChannel = () => {
  return request({
    url: "/v1_0/channels",
    method: "GET",
  });
};
