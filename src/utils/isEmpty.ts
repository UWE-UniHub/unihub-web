export const isEmpty = (test: Record<string | number | symbol, unknown> | undefined) => {
    if(!test) return true;
    return Object.keys(test).length === 0;
}