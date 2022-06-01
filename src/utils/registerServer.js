import request from '@/utils/request';

const registerServer = (option) => {
  const server = {};
  for (const key in option) {
    server[key] = (params) => {
      if (option[key].method?.toLowerCase() === 'post') {
        return request(option[key].url, {
          method: option[key].method,
          data: params,
        });
      }
      if (option[key].method?.toLowerCase() === 'get') {
        return request(option[key].url, { params });
      }
    };
  }
  return server;
};

export default registerServer;
