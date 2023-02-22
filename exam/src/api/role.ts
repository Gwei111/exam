import request from "../utils/request";
// 获取角色
export const roleList = (data: any) => {
  return request.get('role/list', data)
}
// 添加角色接口
export const roleAdd = (data: any) => {
    return request.post('role/add', data)
  }

  // 删除角色
export const roleDelete = (data: any) => {
    return request.get('role/delete', data)
  }
  // 获取获取权限功能列表接口
export const menuList = (data: any) => {
    return request.get('menu/list', data)
  }