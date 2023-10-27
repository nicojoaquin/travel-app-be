import { countryService } from '../services/index.js';

export const getCountries = async (_, res) => {
  const countries = await countryService.getCountries();
  return res.status(200).json(countries);
};

export const createCountry = async (_, res) => {
  const country = await countryService.createCountry();
  return res.status(200).json(country);
};
