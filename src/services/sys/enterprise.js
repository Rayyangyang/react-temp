import { request } from 'umi';

export async function query(params) {
  return request('/web/enterprise/findList', { params });
}
export async function changeState(data) {
  return request('/web/enterprise/updateState', { method: 'POST', data });
}
export async function resetPwd(data) {
  return request('/web/enterprise/resetPwd', { method: 'POST', data });
}
export async function update(data) {
  return request('/web/enterprise/save', { method: 'POST', data });
}
export async function remove(params) {
  return request('/web/enterprise/del', { method: 'DELETE', params });
}