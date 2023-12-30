export function logI(message?: any, ...optionalParams: any[]) {
    if (__DEV__) {
        console.log(message, ...optionalParams)
    }
}

export function logE(message?: any, ...optionalParams: any[]) {
    if (__DEV__) {
        console.error(message, ...optionalParams)
    }
}