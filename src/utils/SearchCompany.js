export const handleSearchCompany = (query, list) => {
    const result = list?.filter(el => el.name.toLowerCase().indexOf(query?.toLowerCase()) !== -1);
    const result2 = list?.filter(el => el.inn.toLowerCase().indexOf(query?.toLowerCase()) !== -1);

    if(result?.length >= 1) {
        return result
    }

    if(result2?.length >= 1) {
        return result2
    }

    if(result?.length == 0 && result2?.length == 0) {
        return []
    }
}
/* concat(el?.inn)?. */