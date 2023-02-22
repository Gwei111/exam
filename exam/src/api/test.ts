import request from "../utils/request";
// 考试列表
export const testList = (data: any) => {
  return request.get('test/list', data)
} 
// 考试详情 
export const testDetails = (data: any) => {
  return request.get('test/get', data)
  }
  // 删除考试 
  export const testDel = (data: any) => {
    return request.get('test/delete', data)
    }