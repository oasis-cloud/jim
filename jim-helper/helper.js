let loginPlugin = requirePlugin("loginPlugin");
const app = getApp();
Page({
  data: {
    env: app.isDev ? "预发" : "生产",
    pin: loginPlugin.getStorageSync("jdlogin_pt_pin"),
    openId: wx.getStorageSync("oP_key"),
    h5ModalShow: false,
    holder: "",
  },
  onLoad() {
    // 0:h5, 1:商品详情
    this.go2Type = 0;
    this.textAreaVal = "";
  },
  onShow() {},
  onUnload() {},
  handleSwitchEnv(e) {
    app.isDev = !app.isDev;
    app.initAPI();
    this.setData({
      env: app.isDev ? "预发" : "生产",
    });
    console.log(app);
  },
  handleScanCode(e) {
    wx.scanCode({
      success(res) {
        console.log("testCase-scanCode res:", res);
        wx.switchTab({
          url: `/${res.path}`,
          fail() {
            wx.navigateTo({
              url: `/${res.path}`,
            });
          },
        });
      },
    });
  },
  bindTextAreaBlur(e) {
    console.log(e.detail.value);
    this.textAreaVal = e.detail.value;
  },
  handleShowProModal() {
    this.go2Type = 1;
    this.setData({
      h5ModalShow: true,
      holder: "输入skuId",
    });
  },
  handleShowH5Modal() {
    this.go2Type = 0;
    this.setData({
      h5ModalShow: true,
      holder: "输入H5链接，点击确定按钮可复制小程序完整路径",
    });
  },
  handleShowMinModal() {
    this.go2Type = 2;
    this.setData({
      minModalShow: true,
      holder: "输入小程序路径，点击确定按钮可复制小程序完整路径",
    });
  },
  handleCloseModal() {
    this.textAreaVal = "";
    this.setData({
      h5ModalShow: false,
      holder: "",
    });
  },
  handleGo2H5(e) {
    let url = `/pages/login/wv-common/wv-common?h5_url=${encodeURIComponent(this.textAreaVal)}`;
    this.setData2Clipboard(url);
    wx.navigateTo({
      url: url,
    });
  },
  handleGo2Product(e) {
    wx.navigateTo({
      url: `/pages/product/product?wareId=${this.textAreaVal}`,
    });
  },
  handleGo2MinPath(e) {
    wx.switchTab({
      url: this.textAreaVal,
      fail: () => {
        wx.navigateTo({ url: this.textAreaVal });
      },
    });
  },
  handleGo(e) {
    if (!this.textAreaVal) return;
    switch (this.go2Type) {
      case 0:
        this.handleGo2H5();
        break;
      case 1:
        this.handleGo2Product();
        break;
      case 2:
        this.handleGo2MinPath();
        break;
    }
  },
  handleCopyOpenId() {
    this.setData2Clipboard(this.data.openId);
  },
  handleCopyPin() {
    this.setData2Clipboard(this.data.pin);
  },
  setData2Clipboard(data) {
    wx.setClipboardData({
      data: data,
      success(res) {
        wx.getClipboardData({
          success(res) {
            wx.showToast({
              icon: "none",
              title: "已复制",
            });
          },
        });
      },
    });
  },
});
