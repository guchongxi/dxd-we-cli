const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

export const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

/**
 * 返回当前页面完整的url（包括参数）
 *
 * @param {Int} pageId 页面 id
 * pageId 0 当前页面
 * pageId -1 上一个页面
 */
export function getPageUrl(pageId = 0, needOptions = true) {

  const routeList = getCurrentPages();
  const curPage = routeList[routeList.length - 1 + pageId];

  if (!curPage) {
    return {};
  }

  const { route, options } = curPage;
  if (needOptions) {
    const queryStr = Object.keys(options).map(key => `${key}=${options[key]}`).join('&');

    return queryStr ? `${route}?${queryStr}` : route;
  } else {
    return route;
  }
}
