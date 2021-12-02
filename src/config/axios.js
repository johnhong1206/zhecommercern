import axios from 'axios';

const instance = axios.create({
  // THE API (cloud function) URL
  baseURL: 'https://ultimateone-webstripe.herokuapp.com/',

  //"http://localhost:9000"
  //"https://ultimateone-webstripe.herokuapp.com/"
  //"https://cb90-115-132-160-180.ngrok.io"
});

export default instance;
