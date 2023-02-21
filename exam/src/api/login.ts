import request from "../utils/request";
// 登录
export const checklogin = (data: any) => {
  return request.post('teacher/checklogin', data)
}