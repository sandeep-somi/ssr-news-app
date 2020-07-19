import { API_URL } from './constants';
import axios from 'axios';

export function generateUrl(path) {

  return API_URL + path;
}

export function apiReq(endPoint, data, method, headers) {
  return new Promise((res, rej) => {

      headers = {
          ...headers
      }

      if (method === 'get' || method === 'delete') {
          data = {
              params: data,
              headers
          }
      }
      axios[method](endPoint, data, { headers }).then((result) => {
          let { data } = result;

          if (data.status === false) {

              return rej(data);
          }

          return res(data);
      }).catch((err) => {
          return rej(err);
      });
  })
}

export function apiGet(endPoint, data, headers = {}) {
  return apiReq(generateUrl(endPoint), data, 'get', headers);
}