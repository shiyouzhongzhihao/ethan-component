import axios from "axios";

// 延迟1000毫秒(1秒)的函数 delay1000
const delay = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};
const request = axios.create({
  baseURL: 'http://192.168.1.115:3000',
  timeout: 10000, // 请求超时时间
});
// 请求拦截器
request.interceptors.request.use((config)=>{
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  async (response)=>{
    await delay();
    return response.data.data;
  },
  (error)=> {
    return error;
  }
);

export default request;
