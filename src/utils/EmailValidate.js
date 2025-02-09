export const emailValidate = (value) => {
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if(value.match(isValidEmail)) {
        return true
    } else {
        return false
    }
}