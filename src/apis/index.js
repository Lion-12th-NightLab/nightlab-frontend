import axios from "axios";
import { useNavigate } from "react-router-dom";
//기존에 저장된 토큰을 활용해서, 서버에 요청을 보내기 위한 간략한 로직 구성
const getAccessToken = () => {
  const user = localStorage.getItem("user");
  if(user) {
    try{
      const userObj = JSON.parse(user);
      return userObj.access_token || "";
    } catch(error){
      console.error("Failed to parse user from localStorage.", error);
      return "";
    }
  }
}

//로컬스토리지에 accessToken 저장
const setAccessToken = (token) => {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      const userObj = JSON.parse(user);
      userObj.access_token = token;
      localStorage.setItem('user', JSON.stringify(userObj));
    } catch (error) {
      console.error('Failed to parse user from localStorage.', error);
    }
  }
};

//refresh_token은 유효기간이 2주이므로 당장 로직 구성 x 
const getRefreshToken = () =>{
  const user = localStorage.getItem("user");
  if(user){
    try{
      const userObj = JSON.parse(user);
      return userObj.refresh_token || "";
    } catch(error){
      console.error("Failed to parse user from localStorage.", error);
      return "";
    }
  }
}

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, //Cookie 세션 진행

  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  }
});


//axios의 인스턴스의 config를 던져준다.
instance.interceptors.request.use((config)=> {
  const token = getAccessToken();
  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config; //config 갱신 
})

//response 인터셉터 - 1: 성공시 콜백, 2: 실패시 콜백
instance.interceptors.response.use((response)=>response, 
  async (error) => {
    const originalRequest = error.config;
    
    //추후 RefershToken 도 만류될 수 있는데, 일단 그 부분 로직 구성은 생략(2주이기 때문)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = getRefreshToken();
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/kakao/token_reissue`, { refresh_token: refreshToken });
        console.log("재발급 실행:",response);
        const newAccessToken = response.data.access_token;
        setAccessToken(newAccessToken);

        //전역설정은 필요 없음
        //axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        return instance(originalRequest); // 실패한 요청 다시 시도
      } catch (err) {
        const navigate = useNavigate();
        console.error('Failed to refresh access token:', err);
        localStorage.removeItem('user');
        //window.location.href = '/';
        navigate("/");
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
)

export function get(...args){
  return instance.get(...args);
}

export function post(...args){
  return instance.post(...args);
}

export function put(...args){
  return instance.put(...args);
}

export function patch(...args){
  return instance.patch(...args);
}

export function del(...args){
  return instance.delete(...args);
}

