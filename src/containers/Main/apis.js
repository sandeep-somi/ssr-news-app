import { apiGet } from '../../utils';

export function searchAPI(data) {
  return apiGet('/search', data);
}