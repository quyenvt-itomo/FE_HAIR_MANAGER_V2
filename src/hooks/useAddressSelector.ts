import { useEffect, useState } from "react";

type Ward = { Name: string };
type District = { Name: string; Wards: Ward[] };
type City = { Name: string; Districts: District[] };

export const useAddressSelector = (
  selectedCity?: string,
  selectedDistrict?: string,
) => {
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  useEffect(() => {
    fetch("/select-address/location-data.json")
      .then((res) => res.json())
      .then((data: City[]) => setCities(data));
  }, []);

  useEffect(() => {
    const city = cities.find((c) => c.Name === selectedCity);
    setDistricts(city?.Districts || []);
    setWards([]);
  }, [selectedCity, cities]);

  useEffect(() => {
    const city = cities.find((c) => c.Name === selectedCity);
    const district = city?.Districts.find((d) => d.Name === selectedDistrict);
    setWards(district?.Wards || []);
  }, [selectedDistrict, selectedCity, cities]);

  return { cities, districts, wards };
};
