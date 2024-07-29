import request from "./request";

export function loginApi(data) {
  return request({
    url: "/auth/login",
    method: "post",
    params: data,
  });
}

export function getCode() {
  return request({
    url: "/auth/captcha",
    method: "get",
  });
}