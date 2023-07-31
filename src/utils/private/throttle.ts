/*
 * 函数节流
 */
const throttle = function (fn, limit = 250) {
    let wait = false,
        result

    return function (this /* ...args */) {
        if (wait === false) {
            wait = true
            setTimeout(() => {
                wait = false
            }, limit)
            // eslint-disable-next-line prefer-rest-params
            result = fn.apply(this, arguments)
        }

        return result
    }
}

export default throttle;
