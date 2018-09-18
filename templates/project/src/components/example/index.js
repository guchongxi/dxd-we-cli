Component({
  properties: {
    // 显示文案
    text: {
      type: String,
      value: ''
    }
  },
  methods: {
    /**
     * 点击文字
     */
    handleTap() {
      wx.wx.showToast({
        title: '点击文字',
        icon: 'none'
      });

      // 抛出事件
      this.triggerEvent('on-tap');
    }
  }
});
