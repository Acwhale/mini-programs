var app = getApp();
Page({
  data :{
    userInfo: {}
  },
  onLoad :function(options){
    var that = this;
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onTap: function (event) {
   
    wx.switchTab({
      url: '../posts/post',
    })

    // wx.redirectTo({
    //   url: '../posts/post',
    // })
  },
  onClearTap : function(){
    wx.clearStorage();
    console.log("success"); 
  }
 })
