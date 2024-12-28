import { capitalize } from "@mui/material";

//types
import { TCountryData } from "@/@types/proxy";

const formatProxyGeoData = (data: TCountryData[]) => {
    return data.map((c) => ({
        label: capitalize(c.name),
        value: c.code,
    }));
}

export default formatProxyGeoData;