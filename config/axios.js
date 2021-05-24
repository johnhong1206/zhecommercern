import axios from "axios";

const instance = axios.create({
  // THE API (cloud function) URL
  baseURL: "https://ultimateone-webstripe.herokuapp.com/",

  //"http://localhost:9000"
});

export default instance;
