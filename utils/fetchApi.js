export const baseURL = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
	if (url) {
		return await fetch(baseURL + url, {
			headers: {
				"X-RapidAPI-Host": "bayut.p.rapidapi.com",
				"X-RapidAPI-Key": process.env.NEXT_PUBLIC_BAYUT_API_KEY,
			},
		}).then((res) => {
			console.info("$--%%%%%%%%%--$  Fetch successfull  $--%%%%%%%%%--$");
			return res.json();
		});
	}
};
