// pages/detail/detail.js
var common = require("../../utils/common.js")
Page({

  /**
   * 页面的初始数据
   */
    /**
   * 页面的初始数据
   */
  data: {
    artical:{
    id: '264698',
    title: '标题',
    poster: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage1.jpg',
    content: '  内容',
    add_date: '2022-08-19'
    },
    isAdd:false
},


  onLoad(options) {
    let id = options.id
    console.log(id)
    //检查当前新闻是否在收藏夹中
    var newartical = wx.getStorageSync(id)
    //存在
    if(newartical != '')
    {
      this.setData({
        isAdd:true,
        artical:newartical
      })
    }
    //不存在
    else{
      let result = common.getNewsDetail(id)
      console.log(result)
      //获取新闻内容
      if(result.code == '200'){
        this.setData({
          artical:result.news,
          isAdd:false
        })
      }
    }
  },
  /*添加收藏*/
  addFavorites:function () {
    let artical = this.data.artical
    wx.setStorageSync(artical.id, artical)    //将文章放入缓存区
    this.setData({
      isAdd:true
    })
  },
  /*取消收藏 */
  cancelFavorites:function() {
    let artical = this.data.artical
    wx.removeStorageSync(artical.id)
    this.setData({
      isAdd:false
    })
  },




})