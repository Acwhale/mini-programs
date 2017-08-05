var util = require("../../utils/util.js");
var app = getApp();
Page({
  data: {
    searchResult:{},
    inTheaters: {},
    comingSoon: {},
    top250: {},
    containerShow: true,
    searchPanelShow: false,
  },
  onLoad: function (event) {
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?statr=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?statr=0&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?statr=0&count=3";
    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");
  },
  getMovieListData: function (url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: "GET",
      header: {
        "Content-Type": "application"
      },
      success: function (res) {
        that.processDoubanData(res.data, settedKey, categoryTitle);
      },
      fail: function (error) {

      }
    })
  },
  onCancelImgTap: function () {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      // searchResult:{}
    })
  },
  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true,
    });
  },
  onBindComfirm: function (event) {
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase+ "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl,"searchResult","");
  },

  processDoubanData: function (movieDouban, settedKey, categoryTitle) {
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
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    };
    this.setData(readyData);
  },
  onMoreTap: function (event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    })
  },
  onMovieTap:function(event){
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId ,
    })
  }

})