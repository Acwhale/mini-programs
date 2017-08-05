// pages/movies/more-movie/more-movie.js
var util = require("../../../utils/util.js");
var app = getApp();
Page({
  data: {
    requestUrl: "",
    totalCount: 0,
    isEmpty: true
  },

  onLoad: function (options) {
    var category = options.category;
    this.setData({
      category: category
    });
    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    };
    this.setData({
      requestUrl: dataUrl,
    });
    util.http(dataUrl, this.processDoubanData);
  },
  processDoubanData: function (movieDouban) {
    var movies = [];
    for (var idx in movieDouban.subjects) {
      var subject = movieDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        stars: util.converToStatArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      };
      movies.push(temp);
    }
    var totalMovies = {};
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    } else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    });
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.category,
    })
  },
  onReachBottom: function (event) {
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  onPullDownRefresh: function (event) {
    var refushUrl = this.data.requestUrl + "?start=0&count=20";
    this.data.movies = {};
    this.data.isEmpty = true;
    this.totalCount = 0;
    util.http(refushUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId,
    })
  }
})