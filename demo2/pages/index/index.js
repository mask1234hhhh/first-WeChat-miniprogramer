Page({
  getWeather: function() {
    var that = this;

    // 第一步：通过地理位置搜索 API 获取城市编号
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup',
      data: {
        location: that.data.region[2], // 使用城市名称（例如：芜湖市）
        key: '8ed2b89756654fafb7f53598b88936df'
      },
      success: function(res) {
        if (res.data && res.data.code === "200") {
          var cityId = res.data.location[0].id; // 获取第一个匹配的城市编号

          // 第二步：使用获取的城市编号获取天气信息
          wx.request({
            url: 'https://devapi.qweather.com/v7/weather/now',
            data: {
              location: cityId, // 使用城市编号
              key: '8ed2b89756654fafb7f53598b88936df'
            },
            success: function(res) {
              console.log(res.data);
              that.setData({ now: res.data.now });
            },
            fail: function(error) {
              console.error("获取天气信息失败：", error);
            }
          });
        } else {
          console.error("城市编号获取失败：", res.data.code);
        }
      },
      fail: function(error) {
        console.error("地理位置搜索失败：", error);
      }
    });
  },

  /**
   * 页面的初始数据
   */
  data: {
    region: ['安徽省', '芜湖市', '镜湖区'],
    now: {
      temp: 0,
      text: '未知',
      icon: '999',
      humidity: 0,
      pressure: 0,
      vis: 0,
      windDir: 0,
      windSpeed: 0,
      windScale: 0
    }
  },

  regionChange: function(e) {
    this.setData({ region: e.detail.value });
    this.getWeather();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getWeather();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    
  }
})
