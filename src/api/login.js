import request from "@/utils/request";

// 登陆接口 login
export const login = (data) => {
  return request({
    url: "/v1_0/authorizations",
    method: "POST",
    data,
  });
};
// 获取短信验证码 getSmsCode
export const getSmsCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
  });
};

// 获取用户信息接口
export const getUserInfo = () => {
  return request({
    url: "/v1_0/user",
    method: "GET",
  });
};
