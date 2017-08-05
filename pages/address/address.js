// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  onChooseTap:function(event){
    wx.chooseAddress({
      success:function(res){
        console.log(res)
      }
    })
  },
  onCheckSession:function(){
    wx.checkSession({
      success: function(res) {
        console.log(res);
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onOpensetting:function(){
    wx.openSetting({
      success:(res)=>{
        console.log(res)
      }
    })
  },
  onStartRecord:function(){
    wx.startRecord({
      success:function(res){
        console.log(res)
      }
    })
  },
  ONshowShareMenu:function(){
    wx.showShareMenu({
      withShareTicket:true,
    })
  },
  ONhideShareMenu:function(){
    wx.hideShareMenu({
      
    })
  }

})