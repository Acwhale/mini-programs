var util = require("../../../../utils/util.js");
class Movie {
  constructor(url) {
    this.url = url;
  }
  getMovieData(cb) {
    this.cb = cb;
    util.http(this.url, this.processDoubanData.bind(this));
  }
  processDoubanData(data) {
    var director = {
      avatar: "",
      name: "",
      id: "",
    };
    if (!data) {
      return;
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large;
      }
    }
    director.name = data.directors[0].name;
    director.id = data.directors[0].id;
    var movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originaltitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      genres: data.genres.join('、'),
      stars: util.converToStatArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.converToCastString(data.casts),
      castsInfo: util.converToCastInfos(data.casts),
      summary: data.summary,
    }
    this.cb(movie);
  }
}
export {Movie}