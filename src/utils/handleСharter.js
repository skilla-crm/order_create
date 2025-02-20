
/* 
export const handleСharter = (data) => {
    let legalBasePost = data?.management?.post ? data?.management?.post : '';
    let managerName = data?.management?.name ? data?.management?.name : '';

    if (legalBasePost == 'ГЕНЕРАЛЬНЫЙ ДИРЕКТОР') {
        legalBasePost = 'генерального директора'
    }

    if (legalBasePost == 'ДИРЕКТОР') {
        legalBasePost = 'Директора'
    }


    if (data?.type == "INDIVIDUAL") {
        legalBasePost == 'ИП'
    }

    if (data?.type !== "INDIVIDUAL" && data?.managers?.[0]?.fio?.gender == 'MALE') {
        managerName = `${data?.managers?.[0]?.fio?.surname}а ${data?.managers?.[0]?.fio?.name}а ${data?.managers?.[0]?.fio?.patronymic}а`
    }

    if (data?.type !== "INDIVIDUAL" && data?.managers?.[0]?.fio?.gender == 'FEMALE') {
        managerName = `${data?.managers?.[0]?.fio?.surname}ой ${data?.managers?.[0]?.fio?.name} ${data?.managers?.[0]?.fio?.patronymic}`
    }

    if (data?.type == "INDIVIDUAL" && data?.fio?.gender == 'FEMALE') {
        managerName = `${data?.[0]?.fio?.surname}ой ${data?.[0]?.fio?.name} ${data?.[0]?.fio?.patronymic}`
    }

    if (data?.type == "INDIVIDUAL" && data?.fio?.gender == 'FEMALE') {
        managerName = `${data?.[0]?.fio?.surname} ${data?.[0]?.fio?.name} ${data?.[0]?.fio?.patronymic}`
    }

    console.log(RussianName('Холмогоров', 'Алексей', 'Сергеевич'))



}

 */