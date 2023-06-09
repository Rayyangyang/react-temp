import { request } from 'umi';



//礼物
export async function query_gift(params) {
  return request('/admin/gift/list', { params })
}
export async function update_gift(params) {
  return request('/admin/gift/save', { method: 'post', data: params })
}

export async function remove_gift(params) {
  return request('/admin/gift/del', { method: 'delete', data: params })
}

//审核
export async function query_audit(params) {
  return request('/admin/user/audit/list', { params })
}
export async function update_audit(params) {
  return request('/admin/user/audit/save', { method: 'post', data: params })
}
//用户
export async function query_user(params) {
  return request('/admin/user/list', { params })
}
export async function query_indent(params) {
  return request('/admin/indent/list', { params })
}
export async function query_rank(params) {
  return request('/admin/indent/rankList', { params })
}
export async function kick_out(params) {
  return request('/admin/user/kickOut', { method: 'post', data: params })
}
export async function update_user(params) {
  return request('/admin/user/update', { method: 'put', data: params })
}
export async function saveSettle(params) {
  return request('/admin/user/saveSettle', { method: 'post', data: params })
}


