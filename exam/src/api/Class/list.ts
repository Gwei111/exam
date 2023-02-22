import request from "../../utils/request";
// 班级列表接口
export const Class_List = (params: any) => {
  return request.get('classes/list', params)
}
//班级单独删除接口
export const DelList = (params: any) => {
  return request.get('classes/delete', params)
}
// 班级批量删除接口
export const getDelAll = (params: any) => {
  return request.post('classes/deleteall', params)
}
// 班级添加接口
export const Add = (params: any) => {
  return request.post('classes/add', params)
}