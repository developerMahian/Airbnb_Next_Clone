import axios from "axios";

export const baseURL = "https://bayut.p.rapidapi.com";

const controller = new AbortController();

export const fetchApi = async (url, timeout) => {
  const fetchURL = baseURL + "/" + url;

  const { data } = await axios.get(fetchURL, {
    signal: controller.signal,
    headers: {
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.BAYUT_API_KEY,
    },
  });

  timeout && setTimeout(() => controller.abort(), 2000);

  return data;
};
