export const handleSearchCompany = (query, list) => {
    const result = list?.filter(el => el.name.concat(el?.inn)?.toLowerCase().indexOf(query?.toLowerCase()) !== -1);
    return result;
}