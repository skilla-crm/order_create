export const SearchOrderType = (query, list) => {
    const result = list?.filter(el => el.name.toLowerCase().indexOf(query?.toLowerCase()) !== -1);
        return result
}
