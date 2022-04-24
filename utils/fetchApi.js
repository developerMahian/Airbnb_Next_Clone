import axios from "axios";

export const baseURL = "bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  const result = await axios.get(url, {
    headers: {
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.BAYUT_API_KEY,
    },
  });

  return result;
};
