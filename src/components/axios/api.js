import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

API.interceptors.request.use(
  function (config) {
    console.log("요청 성공 전 호출");
    return config;
  },
  function (error) {
    console.log("요청 에러 직전 호출");
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  function (response) {
    console.log("응답 성공 전 호출");
    return response;
  },

  function (error) {
    console.log("응답 실패 전 호출");
    return Promise.reject(error);
  }
);

export default API;
