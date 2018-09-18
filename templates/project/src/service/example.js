const app = getApp();

const host = 'https://dxy.com';

export function getSectionListRequest() {
  return app.request({
    url: `${host}/app/i/ask/sectiongroup/list`,
    data: {
      items_per_page: 50
    }
  })
}
