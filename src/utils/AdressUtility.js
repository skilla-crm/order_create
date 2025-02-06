export const adressStringUtility = (address) => {
    const addressString = `${address?.city ? address?.city : ''}${address?.street ? ' ' + address?.street : ''}${address?.house ? ' ' + address?.house : ''}${address?.k ? ' ' + address?.k : ''}`
    return addressString
}


export const cityStringUtility = (data) => {
    const city = `${data.city_with_type ? data.city_with_type : ''}${data.city_with_type && data.settlement_with_type ? ', ' : ''}${data.settlement_with_type ? data.settlement_with_type : ''}`;
    return city;
}