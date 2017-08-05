// pages/movies/movie-detail/movie-detail.js
import {Movie} from "class/Movie.js";
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.id;
    var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
    var movie = new Movie(url);
    var that = this;
    movie.getMovieData(function(movie){
      that.setData({
        movie: movie,
      });
    })
  },
  viewMoviePostImg:function(event){
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      current:src, 
      urls: [src],
    })
  }
})