import { request } from 'umi';

export async function query(params) {
  return request('/web/message/findList', { params });
}

export async function update(data) {
  return request('/web/message/save', { method: 'POST', data, requestType: 'json' });
}
