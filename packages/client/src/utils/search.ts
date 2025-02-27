import { defaultPages, API_URL, SearchReponse } from "../constants";

export const fetchAndFilter = async (value: string, page = defaultPages) => {
    const hotelsData = await fetch(`${API_URL}/search?query=${value}&hotels_page=${page.hotels_page}&countries_page=${page.countries_page}&cities_page=${page.cities_page}`);

    return await hotelsData.json() as SearchReponse;
}