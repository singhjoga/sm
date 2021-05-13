
export function isEmptyObject(value: Record<string, any>) {
    return value && Object.keys(value).length === 0 && value.constructor === Object;
}
export function parseJson(text: string) {
    try {
        return JSON.parse(text);
    } catch(err) {
       return null
    }
}