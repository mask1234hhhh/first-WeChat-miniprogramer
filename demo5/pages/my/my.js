// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  /**
   * 页面的初始数据
   */
  data: {
    //临时微信用户昵称和头像
    isLogin: false,
    nickName:"未登录",
    src:"/images/index.png",
    //临时收藏夹新闻数据
    newsList:[],
    num:0
  },

  // 获取用户信息
  getMyInfo: function(e) {
    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        console.log(res)
        this.setData({
          isLogin: true,
          src: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
      }
    })
    this.getMyfavorites();

  },
  //获取收藏列表
  getMyfavorites:function(){
    let info = wx.getStorageInfoSync();
    let keys = info.keys;
    let num = keys.length;
    console.log(keys)
    let myList = [];
    for(var i = 0;i<num-1;i++){
      let obj = wx.getStorageSync(keys[i]);
      myList.push(obj);
    }
    //更新收藏列表
    this.setData({
      newsList:myList,
      num:num-1
    })
  },

   /**
   * 生命周期函数--监听页面显示
   */
  onShow:function() {
    //如果已经登录
    if(this.data.isLogin === true){
      console.log("更新列表")
    //更新收藏列表
      this.getMyfavorites()
    }
  },
  /**
   * 
   * 自定义函数--跳转新页面浏览新闻内容
   */
  goToDetail:function(e){
    //获取携带的data-id数据
    let id = e.currentTarget.dataset.id;
    //携带新闻的ID进行页面的跳转
    wx.navigateTo({
      url: '../detail/detail?id='+id
    })
  },

onLoad(options) {
    if(wx.getUserProfile){
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },


 
})