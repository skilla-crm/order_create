export const handleTextNumEnding = (num) => {
    if(num == 1) {
        return 'час'
    }

    if(num == 2 || num == 3 || num == 4) {
        return 'часа'
    }

    if(num > 4) {
        return 'часов'
    }
}

