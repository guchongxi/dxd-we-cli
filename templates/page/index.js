import {
  getSectionListRequest
} from '../../service/index';

const app = getApp();

const pageConf = {
  data: {
    motto: 'Hello World',
    sectionList: []
  },
  onLoad() {
    console.log('Page Index Load');

    getSectionListRequest()
      .then(([res]) => {
        this.setData({
          sectionList: res
        });
        console.log('getSectionListRequest for test');
      })
  },
};

app.extend(true, pageConf, app.basePageConf);

Page(pageConf);
