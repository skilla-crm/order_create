export const adressStringUtility = (address) => {
    const addressString = `${address?.city ? address?.city : ''}${address?.street ? ' ' + address?.street : ''}${address?.house ? ' ' + address?.house : ''}${address?.k ? ' ' + address?.k : ''}`
    return addressString
}

export const adressStringUtility2 = (address) => {
    const addressString = `${address?.street ? ' ' + address?.street : ''}, ${address?.house ? ' ' + address?.house : ''}${address?.k ? ' ' + address?.k : ''}`
    return addressString
}


export const cityStringUtility = (data) => {
    const city = `${data.city_with_type ? data.city_with_type : ''}${data.city_with_type && data.settlement_with_type ? ', ' : ''}${data.settlement_with_type ? data.settlement_with_type : ''}`;
    return city;
}

/*  если нет "LOCALITY" указываем "PROVINCE" и 'AREA'  
            
            если нет "STREET" то   
            "DISTRICT" или 'HYDRO' или 'STATION' или 'RAILWAY_STATION' или 'ROUTE'  
             или 'VEGETATION' или 'AIRPORT' или 'OTHER'

            "HOUSE" - дом вместе с корпусом */

export const addressUtility = (data) => {
    const isCity = data?.find(el => el.kind[0] == "LOCALITY")?.name;
    const isProvince = data?.find(el => el.kind[0] == "PROVINCE")?.name;
    const isArea = data?.find(el => el.kind[0] == "AREA")?.name;
    const isStreet = data?.find(el => el.kind[0] == "STREET")?.name;
    const isDistrict = data?.find(el => el.kind[0] == "DISTRICT")?.name;
    const isRoute = data?.find(el => el.kind[0] == "ROUTE")?.name;
    const isStation = data?.find(el => el.kind[0] == "STATION")?.name;
    const isRailway = data?.find(el => el.kind[0] == "RAILWAY_STATION")?.name;
    const isMetro = data?.find(el => el.kind[0] == "METRO_STATION")?.name;
    const isAirport = data?.filter(el => el.kind[0] == "AIRPORT")?.map((el, i) => { return i == 0 ? el.name : ` ${el.name}` });
    const isOther = data?.find(el => el.kind[0] == "OTHER")?.name;

    const isHydro = data?.find(el => el.kind[0] == "HYDRO")?.name;
    const isVegetation = data?.find(el => el.kind[0] == "VEGETATION")?.name;

    const isHouse = data?.find(el => el.kind[0] == "HOUSE")?.name;
    const isEntrance = data?.find(el => el.kind[0] == "ENTRANCE")?.name;
    const isApartment = data?.find(el => el.kind[0] == "APARTMENT")?.name;

    const city = isCity ? isCity : `${isProvince ? isProvince : ''}${isArea && isProvince ? ' ' + isArea : isArea && !isProvince ? isArea : ''}`;
    const street = isStreet ?
        isStreet :
        `${isDistrict ? isDistrict : ''}${isRoute ? isRoute : ''}${isStation && isRoute ? ' ' + isStation : isStation && !isRoute ? isStation : ''}${isMetro && isRoute ? ' ' + isMetro : isMetro && !isRoute ? isMetro : ''}${isRailway && isRoute ? ' ' + isRailway : isRailway && !isRoute ? isRailway : ''}${isAirport ? isAirport : ''}${isVegetation ? isVegetation : ''}${isHydro ? isHydro : ''}${isOther ? isOther : ''}`
    const house = `${isHouse ? isHouse : ''}`
    return {
        city,
        street,
        house,
        apartment: isApartment ? isApartment : '',
    }
}

/* {isEntrance && isHouse ? ' ' + isEntrance : isEntrance && !isHouse ? isEntrance : ''} */