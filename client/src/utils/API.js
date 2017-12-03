import axios from "axios";

export default {
  // Gets all books
  getCheckins: function(userId, date) {
    return axios.get(`/api/user/${userId}/checkin/${date}`);
  },
  // Deletes the book with the given id
  // deleteArticle: function(id) {
  //   return axios.delete("/api/articles/" + id);
  // },
  // Saves an article to the database
  // saveArticle: function(articleData) {
  //   return axios.post("/api/articles", articleData);
  // },
  // Searches for articles
  // searchArticles: function(searchData) {

  //   return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?", {
  //     params: {
  //       'api-key': "a8a983c3b5a54362b6db445d7cff457a",
  //       'q': searchData.topic,
  //       'begin_date': searchData.startYear +"0101",
  //       'end_date': searchData.endYear +"1231"
  //     }
  //   });
  // }
};