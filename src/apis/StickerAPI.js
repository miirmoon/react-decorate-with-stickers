import axios from "axios";

const api = axios.create({
  baseURL: "https://messenger.stipop.io/",
  headers: {
    apikey: process.env.REACT_APP_STIPOP_API_KEY,
  },
});

export const stiApi = {
  searchStikers: (data, success, fail) => {
    api
      .get("v1/search", {
        params: {
          q: data.keyword,
          userId: "test",
          lang: "ko",
          countryCode: "KR",
          pageNumber: data.pageNumber,
        },
      })
      .then(success)
      .catch(fail);
  },
};
