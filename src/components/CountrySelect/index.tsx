import { useEffect, useState } from "react";

//components
import CustomSelect from "../CustomSelect";

//API
import { getProductRegions } from "@/API/productsService";

//types
import { TFieldProps } from "@/@types/base";
import { TCountryData } from "@/@types/proxy";

type TCountrySelectProps = TFieldProps & {
  id: number;
};

const CountrySelect: React.FC<TCountrySelectProps> = ({ id, value, setValue }) => {
  const [countries, setCountries] = useState<TCountryData[]>([]);

  useEffect(() => {
    if (id) {
      (async () => {
        const data = await getProductRegions(id);
        setCountries(data);
        if (data.length > 0) {
          setValue(data[0].code);
        }
      })();
    }
  }, [id]);

  const formattedCountries = countries.map((i) => ({ label: i.name, value: i.code }));

  return (
    <CustomSelect label="Country" data={formattedCountries} value={value} setValue={setValue} />
  );
};

export default CountrySelect;
