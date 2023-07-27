export const FetchApi = async (api, setState, params, key, LIMIT_TAKE) => {
    const res = await api(params, LIMIT_TAKE);
    if(res.data[key]){
        return setState(res.data[key])
    } else
    return setState(res.data);
}