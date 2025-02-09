export const handleNumbers = (str) => {
    let reg = /[A-Za-zA-Яа-яЁё]/g;
    const numStr = str.replace(reg, "");
    return numStr
}