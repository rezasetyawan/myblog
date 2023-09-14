const isArrayEqual = (a: [], b: []) => {
    if (a.length !== b.length) {
        return false
    } else {
        a.every((item, index) => {
            return item === b[index]
        })
    }

    return true

}

// const dfiuoduf = (a: [], b: []) => {
//     if (a.length !== b.length) {
//         return false
//     } else {
//         a.every((item, index) => {
//             return item === b[index]
//         })
//     }

// }

export { isArrayEqual }