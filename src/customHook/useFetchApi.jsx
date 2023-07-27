export const FetchApi = async (api, setState, params, LIMIT_TAKE) => {
    const res = await api(params, LIMIT_TAKE);
    if(res.data.Comments){
        return setState(res.data.Comments)
    } else
    return setState(res.data);
}