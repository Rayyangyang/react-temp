import { request } from 'umi';


export async function query(params) {
  return request('/web/user/findList', { params });
}

export async function update(data) {
  return request('/web/user/save', { method: 'POST', data });
}
export async function remove(data) {
  return request('/web/user/del', { method: 'DELETE', data });
}
export async function updatePsd(data) {
  return request('/web/user/updatePwd', { method: 'POST', data });
}
export async function updateManager(data) {
  return request('/web/user/updateManager', { method: 'POST', data });
}
