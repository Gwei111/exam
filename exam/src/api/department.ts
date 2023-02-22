import request from "../utils/request";
//部门列表
export const departmentlist = (data: any) => {
  return request.get('department/list', data)
}
// 添加部门
export const departmentadd= (data: any) => {
  return request.post('department/add', data)
}
// 删除部门
export const departmentdelete= (data: any) => {
  return request.get('department/delete', data)
}
// 题库列表
export const databaselist= (data: any) => {
  return request.get('database/list', data)
}
// 删除题库
export const databasedelete= (data: any) => {
  return request.get('database/delete', data)
}
// 批量删除题库
export const deleteall= (data: any) => {
  return request.post('database/deleteall', data)
}