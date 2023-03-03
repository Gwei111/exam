import request from "../../utils/request";
//阅卷列表
export const List = (data: any) => {
  return request.get('test/list', data)
}
//获取考试学生列表
export const StuDentList = (data: any) => {
  return request.get('student/test', data)
}
// 阅卷三级联动
export const GetList = (data: any) => {
  return request.get('department/list', data)
}