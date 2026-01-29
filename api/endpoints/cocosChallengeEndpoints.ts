import { ApiQueryTypes } from "../constants";
import { Endpoint } from "../types";

export const Portfolio: Endpoint = {
    url: '/portfolio',
    method: ApiQueryTypes.GET,
};

export const Instruments: Endpoint = {
    url: '/instruments',
    method: ApiQueryTypes.GET,
};

export const Search: Endpoint = {
    url: '/search',
    method: ApiQueryTypes.GET,
};

export const Orders: Endpoint = {
    url: '/orders',
    method: ApiQueryTypes.POST,
};
