import axios from "axios";

const BASEURL = "https://120.234.103.35:9001"

const request = axios.create({
  baseURL: BASEURL,
  timeout: 20000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const passUrls = ["/auth/captcha"];
    if (!passUrls.includes(config.url)) {
      // 判断请求是否是登录接口
      config.headers.Authorization = "Bearer " + localStorage.getItem("token"); // 如果不是登录接口，就给请求头里面设置token
    }
    if(config.url === "/auth/login") {
      config.headers.Authorization = "Basic d2V4X2VtZXJnOldleEAkJSFRQTQyOA=="; // 如果不是登录接口，就给请求头里面设置token

    }
    return config; // 返回这个配置对象，如果没有返回，这个请求就不会发送出去
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    let code = res.data.code; // 获取后端返回的状态码
    if (code === 200) {
      // 成功
      return res.data; // 返回里面的数据，在使用这个axios时，获取到的东西就是这里返回的东西
    } else if (code == 401) {
      // token失效
    } else {
      return res.data;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
