import request from "@/utils/request";

/**
 * 添加关注
 */
export const addFollow = (userId) => {
  return request({
    method: "POST",
    url: "/v1_0/user/followings",
    data: {
      target: userId,
    },
  });
};

/**
 * 取消关注
 */
export const deleteFollow = (userId) => {
  return request({
    method: "DELETE",
    url: `/v1_0/user/followings/${userId}`,
  });
};

/**
 * 获取当前登录用户的个人资料
 */
export const getUserProfile = () => {
  return request({
    method: "GET",
    url: "/v1_0/user/profile",
  });
};

// 编辑用户个人资料
export const editUserInfo = (query) => {
  return request({
    url: "/v1_0/user/profile",
    method: "PATCH",
    data: query,
  });
};

/**
 * 更新用户照片资料
 */
export const updateUserPhoto = (data) => {
  return request({
    method: "PATCH",
    url: "/v1_0/user/photo",
    data,
  });
};
