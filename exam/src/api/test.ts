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
  // 批删
  export const testDelAll = (data: any) => {
    return request.post('test/deleteall', data)
  }
  // 修改状态
  export const testState = (data: any) => {
    return request.post('test/updateState', data)
  } 
  // 学生部门列表 
  export const departmentList = (data: any) => {
    return request.get('department/list', data)
  }
  // 班级列表  
  export const classList = (data: any) => {
    return request.get('classes/list', data)
  }
  // 题库列表 
  export const baseList = (data: any) => {
    return request.get('database/list', data)
  }