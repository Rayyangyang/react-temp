import { request } from 'umi';

export async function query(params) {
  return request('/web/constant/findList', { params });
}

export async function update(data) {
  return request('/web/constant/save', { method: 'POST', data });
}
export async function remove(params) {
  return request('/web/constant/del', { method: 'DELETE', params });
}