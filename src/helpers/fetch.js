export const fetchData = async (url,obj) => {
    const resp = await fetch(url,obj);
    const data = await resp.json();
    return data;
}