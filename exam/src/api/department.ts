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
// 添加题库
export const deleadd= (data: any) => {
  return request.post('database/add', data)
}
// 根据题库id获取试题列表
export const databasequestion= (data: any) => {
  return request.get('databasequestion/list', data)
}
// 题库试题删除
export const datadelete= (data: any) => {
  return request.get('databasequestion/delete', data)
}
// 题库试题批量删除
export const databdeleteall= (data: any) => {
  return request.post('databasequestion/deleteall', data)
}
// 根据id下载单个题库试题列表
// 导出防止乱码{responseType: 'blob'}
export const exportExcel= (data: any) => {
  return request.get('databasequestion/exportExcel', data,{responseType: 'blob'})
}
// 题库试题添加
export const dataadd= (data: any) => {
  return request.post('databasequestion/add', data)
}
// 获取老师信息
export const teachelistr= (data: any) => {
  return request.get('teacher/list', data)
}
// 删除角色
export const roledelete= (data: any) => {
  return request.get('teacher/delete', data)
}
// 添加老师信息
export const teacheradd= (data: any) => {
  return request.post('teacher/add', data)
}
// 老师修改密码
export const teacherchangePass= (data: any) => {
  return request.post('teacher/changePass', data)
}

