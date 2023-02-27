import request from "../../utils/request";
// 试卷列表接口
export const Text_List = (params: any) => {
  return request.get('subjects/list', params)
}

// 试卷单条数据删除接口
export const Text_del = (params: any) => {
  return request.get('subjects/delete', params)
}
// 获取详情
export const getSubjects = (params: any) => {
  return request.get('subjects/get', params)
}
// 获取试卷添加
export const AddSub = (params: any) => {
  return request.post('subjects/add', params)
}
// 获取试卷回显
export const SubUa = (params: any) => {
  return request.get('subjects/get', params)
}
// 试题试卷存入题库
export const QueList = (params: any) => {
  return request.get('database/list', params)
}
// 获取试卷下拉菜单
export const SeleList = (params: any) => {
  return request.get('department/list', params)
}
// 获取试卷穿梭框数据
export const ForList = (params: any) => {
  return request.get('teacher/list', params)
}
// 文件上传
export const databasequestion  = (params: any) => {
  return request.post('databasequestion/addlist', params)
}