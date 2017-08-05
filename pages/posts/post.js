var  postsData = require('../../data/posts-data.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.setData({
      postList: postsData.postList
    });
  },

  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
    })
  }, 
  
  //target:当前点击的组件,currentTarget:是事件获取的组件
  onSwiperTap:function(event){
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  }
})