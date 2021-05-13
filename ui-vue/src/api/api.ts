
import { isEmptyObject, parseJson } from './utils'

export interface ErrorMessage {
    message: string;
    errorCode: string;
}
export interface ApiError extends ErrorMessage {
    status: number;
}
async function handleResponse(response: Response) {
    if (!response.ok) {
        let msg = response.statusText
        let errCode = ''
        const txt = await response.text()
        if (txt) {
            const errorResp: ErrorMessage = parseJson(txt)
            if (errorResp && errorResp.message) {
                msg = errorResp.message
                errCode = errorResp.errorCode?errorResp.errorCode:''
            } else {
                msg = txt
            }
        }
        const err = { status: response.status, message: msg, errorCode: errCode }
        return Promise.reject(err)
    }
    return response.json(); // parses JSON response into native JavaScript objects
}

export async function call(url: string, httpMethod: string, data = {}) {
    const response = await fetch(url, {
        method: httpMethod, // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: isEmptyObject(data) ? null : JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return handleResponse(response)
}

export async function post(url: string, data = {}) {
    return call(url, 'POST', data)
}
export async function get(url: string) {
    return call(url, 'GET')
}
export async function put(url: string, data = {}) {
    return call(url, 'PUT', data)
}
export async function patch(url: string, data = {}) {
    return call(url, 'PATCH', data)
}
export async function del(url: string) {
    return call(url, 'DELETE')
}

import mitt from 'mitt';
export const bus = mitt();