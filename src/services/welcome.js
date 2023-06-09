
import { request } from 'umi';


 
export async function statistics(params) {
  return request('/admin/indent/findStatisticsList', { params })
}
 
 
export async function findFeePlatform(params) {
  return request('/admin/indent/findFeePlatform', { params })
}
 