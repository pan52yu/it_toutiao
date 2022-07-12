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
// 设置用户频道列表（保存数据）数据持久化
export const getAddChannel = (channel) => {
  return request({
    url: "/v1_0/user/channels",
    method: "PATCH",
    data: {
      channels: [channel],
    },
  });
};
// 删除频道
export const deleteUserChannel = (channelId) => {
  return request({
    method: "DELETE",
    url: `/v1_0/user/channels/${channelId}`,
  });
};
