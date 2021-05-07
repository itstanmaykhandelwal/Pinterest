import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: "Client-ID w1j7vvWZ_MxZdBuUwn2oBPP11SipYZzaFVlvfdM6p0U",
  },
});