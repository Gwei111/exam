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
  // 部门列表 
  export const departmentList = (data: any) => {
    return request.get('department/list', data)
  }
  // 班级列表  
  export const classList = (data: any) => {
    return request.get('classes/list', data)
  }
  //老师列表 
  export const teacherList = (data: any) => {
    return request.get('teacher/list', data)
  }
  // 题库列表
  export const baseList = (data: any) => {
    return request.get('database/list', data)
  }
  // 考试添加 
  export const testAdd = (data: any) => {
    return request.post('test/add', data)
  }
  // 穿梭框 学生列表 
  export const studentlist = (params: any) => {
    return request.get('student/list', params)
  }
// 考试分析 
export const testAnalyse = (params: any) => {
  return request.get('test/analyse', params)
}
// 获取学员列表 
export const studentTest = (params: any) => {
  return request.get('student/test', params)
}
