export function requestCreator(options = {}) {
  const {
    header = {},
    successHandler = res => res,
    failHandler = err => err,
    beforeSendRequest,
    transformConfig
  } = options;
  function request(config) {
    // 整合默认Header与当前传入Header
    config.header = {
      ...header,
      ...config.header
    };
    // POST／PUT 请求方法处理
    if (config.method === 'POST' || config.method === 'PUT') {
      config.header['content-type'] = 'application/x-www-form-urlencoded';
    } else {
      config.header['content-type'] = 'application/json';
    }

    if (transformConfig && typeof transformConfig === 'function') {
      transformConfig(config);
    }

    // 请求前处理
    const ret = beforeSendRequest && beforeSendRequest(config);
    if (ret !== undefined) {
      return ret;
    }

    // 发起请求
    const retPromise = new Promise((resolve, reject) => {
      config.success = (res) => {
        const data = res.data;
        if (data.error) {
          reject(data.error);
        } else {
          resolve(data.data);
        }
      };
      config.fail = (err) => {
        reject(err);
      };

      wx.request(config);
    });
    return retPromise
      // 格式化
      .then(res => [res, config])
      .catch(err => Promise.reject([err, config]))
      // 处理
      .then(successHandler)
      .catch(failHandler);
  }
  Object.defineProperty(request, 'header', {
    get() {
      return header;
    }
  });
  request.updateHeader = (obj) => {
    Object.keys(obj).forEach(key => {
      header[key] = obj[key];
    });
  };
  return request;

}

export function requestHeaderCreator(options = {}) {
  const header = {};
  const nameMap = {
    'app-version': 'appVersion',
    'app-hard-name': 'appHardName',
    'app-os': 'appOS',
    'app-os-version': 'appOSVersion',
    'app-ac': 'appAc',
    'app-mc': 'appMc',
  }
  const propNames = Object.keys(nameMap);
  propNames.forEach(key => {
    const value = nameMap[key];
    const target = options[value];
    if (target) {
      header[key] = target;
    }
  })
  return header;

};
