import { z } from "zod";

export const PAGE_LIMIT = 5;

export interface Hotel {
    chain_name: string;
    hotel_name: string;
    addressline1: string;
    addressline: string;
    zipcode: string;
    city: string;
    state: string;
    country: string;
    countryisocode: string;
    star_ratin:string;
}

export const hotelCreationSchema = z.object({
    chain_name: z.string(),
    hotel_name: z.string(),
    addressline1: z.string(),
    addressline: z.string().optional(),
    zipcode: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    countryisocode: z.string(),
    star_ratin: z.number(),
});

export const hotelUpdateSchema = z.object({
    chain_name: z.string().optional(),
    hotel_name: z.string().optional(),
    addressline1: z.string().optional(),
    addressline: z.string().optional(),
    zipcode: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    countryisocode: z.string().optional(),
    star_ratin: z.number().optional(),
});