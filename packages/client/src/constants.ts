
import { getCodeSandboxHost } from "@codesandbox/utils";

const codeSandboxHost = getCodeSandboxHost(3001);
export const API_URL = codeSandboxHost ? `https://${codeSandboxHost}` : 'http://localhost:3001';

export interface Hotel {
    _id: string;
    chain_name: string;
    hotel_name: string;
    city: string;
    country: string;
};

export interface HotelResponse {
  results: Hotel[];
  page: number;
  totalResults: number;
  totalPages: number;
  hasMore: boolean;
}

export interface City {
  _id: string;
  name: string;
}

export interface CityResponse {
  results: City[];
  page: number;
  totalResults: number;
  totalPages: number;
  hasMore: boolean;
}

export interface Country {
  _id: string;
  country: string;
}

export interface CountryResponse {
  results: Country[];
  page: number;
  totalResults: number;
  totalPages: number;
  hasMore: boolean;
}

export interface SearchReponse {
  cities: CityResponse;
  hotels: HotelResponse;
  countries: CountryResponse;
}

export interface HotelState {
    data: Hotel[];
    page: number;
    hasMore: boolean;
}

export const defaultHotelState = {
    data: [],
    page: 1,
    hasMore: false
}

export interface CountryState {
    data: Country[];
    page: number;
    hasMore: boolean;
}

export const defaultCountryState = {
    data: [],
    page: 1,
    hasMore: false
}

export interface CityState {
    data: City[];
    page: number;
    hasMore: boolean;
}

export const defaultCityState = {
    data: [],
    page: 1,
    hasMore: false
}

export interface Page {
    hotels_page: number;
    countries_page: number;
    cities_page: number;
}

export const defaultPages = {
    hotels_page: 1,
    countries_page: 1,
    cities_page: 1
}

export const DEBOUNCE_DELAY = 300;

export const mockSearchResponse: SearchReponse = {
  cities: {
    results: [
      { _id: 'city1', name: 'New York' },
      { _id: 'city2', name: 'London' },
      { _id: 'city3', name: 'Tokyo' }
    ],
    page: 1,
    totalResults: 3,
    totalPages: 1,
    hasMore: true
  },
  hotels: {
    results: [
      { _id: 'hotel1', chain_name: 'Hilton', hotel_name: 'Hilton New York', city: 'New York', country: 'USA' },
      { _id: 'hotel2', chain_name: 'Marriott', hotel_name: 'Marriott London', city: 'London', country: 'UK' },
      { _id: 'hotel3', chain_name: 'Shangri-La', hotel_name: 'Shangri-La Tokyo', city: 'Tokyo', country: 'Japan' }
    ],
    page: 1,
    totalResults: 3,
    totalPages: 1,
    hasMore: false
  },
  countries: {
    results: [
      { _id: 'country1', country: 'USA' },
      { _id: 'country2', country: 'UK' },
      { _id: 'country3', country: 'Japan' }
    ],
    page: 1,
    totalResults: 3,
    totalPages: 1,
    hasMore: false
  }
};