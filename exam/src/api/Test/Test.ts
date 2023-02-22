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
