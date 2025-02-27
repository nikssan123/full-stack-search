import { useEffect, useState, type ChangeEvent } from 'react';
import {
    DEBOUNCE_DELAY,
    HotelState,
    defaultHotelState,
    CountryState,
    defaultCountryState,
    CityState,
    defaultCityState,
    defaultPages,
    Page
} from '../constants';
import { fetchAndFilter } from '../utils/search';

function Home() {
    const [query, setQuery] = useState<string>("");
    const [hotels, setHotels] = useState<HotelState>(defaultHotelState);
    const [countries, setCountries] = useState<CountryState>(defaultCountryState);
    const [cities, setCities] = useState<CityState>(defaultCityState);
    const [showClearBtn, setShowClearBtn] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<Page>(defaultPages);

    useEffect(() => {
        if (query === "") {
            setHotels(defaultHotelState);
            setCountries(defaultCountryState);
            setCities(defaultCityState);
            setShowClearBtn(false);
            return;
        }

        const handler = setTimeout(async () => {
            const res = await fetchAndFilter(query);

            const { hotels, countries, cities } = res;

            setHotels((prev) => ({ ...prev, data: hotels.results, hasMore: hotels.hasMore }));
            setCountries((prev) => ({ ...prev, data: countries.results, hasMore: countries.hasMore }));
            setCities((prev) => ({ ...prev, data: cities.results, hasMore: cities.hasMore }));
            setShowClearBtn(true);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(handler);
    }, [query]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleLoadMoreHotels = async () => {
        const res = await fetchAndFilter(query, { ...currentPage, hotels_page: hotels.page + 1 });
        setCurrentPage((prev) => ({ ...prev, hotels_page: prev.hotels_page + 1 }));
        setHotels((prev) => ({
            data: [
                ...prev.data,
                ...res.hotels.results
            ],
            page: res.hotels.page,
            hasMore: res.hotels.hasMore
        }));
    };

    const handleLoadMoreCountries = async () => {
        const res = await fetchAndFilter(query, { ...currentPage, countries_page: countries.page + 1 });
        setCurrentPage((prev) => ({ ...prev, countries_page: prev.countries_page + 1 }));
        setCountries((prev) => ({
            data: [
                ...prev.data,
                ...res.countries.results
            ],
            page: res.countries.page,
            hasMore: res.countries.hasMore
        }));
    };
    const handleLoadMoreCities = async () => {
        const res = await fetchAndFilter(query, { ...currentPage, cities_page: cities.page + 1 });
        setCurrentPage((prev) => ({ ...prev, cities_page: prev.cities_page + 1 }));
        setCities((prev) => ({
            data: [
                ...prev.data,
                ...res.cities.results
            ],
            page: res.cities.page,
            hasMore: res.cities.hasMore
        }));
    };

    const handleClose = () => {
        setHotels(defaultHotelState);
        setCountries(defaultCountryState);
        setCities(defaultCityState);
        setQuery("");
        setShowClearBtn(false);
    }

    return (
        <div className="App">
            <div className="container">
                <div className="row height d-flex justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="dropdown"
                        // TODO: style={{ overflowX: 'hidden' }}
                        >
                            <div className="form">
                                <i className="fa fa-search"></i>
                                <input
                                    type="text"
                                    className="form-control form-input"
                                    placeholder="Search accommodation..."
                                    onChange={handleInputChange}
                                    value={query}
                                />
                                {showClearBtn && (
                                    <span className="left-pan" onClick={handleClose}>
                                        <i className="fa fa-close"></i>
                                    </span>
                                )}
                            </div>
                            {(!!hotels.data.length || !!countries.data.length || !!cities.data.length) && (
                                <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
                                    <h2>Hotels</h2>
                                    {hotels.data.length ? (
                                        <>
                                            {hotels.data.map((hotel, index) => (
                                                <li key={index}>
                                                    <a href={`/hotels/${hotel._id}`} className="dropdown-item">
                                                        <i className="fa fa-building mr-2"></i>
                                                        {hotel.hotel_name}
                                                    </a>
                                                    <hr className="divider" />
                                                </li>
                                            ))}
                                            {hotels.hasMore && (
                                                <button className="btn btn-secondary w-100" onClick={handleLoadMoreHotels}>
                                                    Load More Hotels
                                                </button>
                                            )}
                                        </>
                                    ) : (
                                        <p>No hotels matched</p>
                                    )}
                                    <h2>Countries</h2>
                                    {countries.data.length ? (
                                        <>
                                            {countries.data.map((country, index) => (
                                                <li key={index}>
                                                    <a href={`/countries/${country._id}`} className="dropdown-item">
                                                        <i className="fa fa-building mr-2"></i>
                                                        {country.country}
                                                    </a>
                                                    <hr className="divider" />
                                                </li>
                                            ))}
                                            {countries.hasMore && (
                                                <button className="btn btn-secondary w-100" onClick={handleLoadMoreCountries}>
                                                    Load More Countries
                                                </button>
                                            )}
                                        </>
                                    )
                                        : <p>No countries matched</p>}
                                    <h2>Cities</h2>
                                    {cities.data.length ? (
                                        <>
                                            {cities.data.map((city, index) => (
                                                <li key={index}>
                                                    <a href={`/cities/${city._id}`} className="dropdown-item">
                                                        <i className="fa fa-building mr-2"></i>
                                                        {city.name}
                                                    </a>
                                                    <hr className="divider" />
                                                </li>
                                            ))}
                                            {cities.hasMore && (
                                                <button className="btn btn-secondary w-100" onClick={handleLoadMoreCities}>
                                                    Load More Cities
                                                </button>
                                            )}
                                        </>
                                    )
                                        : <p>No cities matched</p>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;