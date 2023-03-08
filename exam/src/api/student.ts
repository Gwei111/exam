import request from "../utils/request";
// 获取学生列表
export const studentList = (data: any) => {
  return request.get('student/list', data)
}
// 添加学生信息
export const studentAdd = (data: any) => {
  return request.post('student/add', data)
}

// 删除学生信息
export const studentDelete = (data: any) => {
  return request.get('student/delete', data)
}
// 上传学生信息
export const studentUpload = (data: any) => {
  return request.post('student/upload', data)
}
// 学生修改密码
export const studentChangepass = (data: any) => {
  return request.post('student/changepass', data)
}
// 修改学生信息（学生端修改）
export const studentUpdate = (data: any) => {
  return request.post('student/update', data)
}
// 批量删除学生信息
export const studentDeleteall = (data: any) => {
  return request.post('student/deleteall', data)
}
// 获取学生信息
export const studentInofo = (data: any) => {
  return request.post('student/info', data)
}
//班级列表
export const classesList = (data: any) => {
  return request.get('classes/list', data)
}
// 部门列表
export const departmentsList = (data: any) => {
  return request.get('department/list', data)
}