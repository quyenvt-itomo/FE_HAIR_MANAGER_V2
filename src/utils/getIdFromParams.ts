export const getIdFromParams = (): number  => {
    const queryParams = new URLSearchParams(window.location.search);
    return Number(queryParams.get("id"));
};