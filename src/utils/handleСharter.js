
import { incline } from "lvovich";

export const handleСharter = (data) => {
    let legalBasePost = data?.management?.post ? data?.management?.post.toLowerCase() : '';

    if (legalBasePost == 'генеральный директор') {
        legalBasePost = 'генерального директора'
    }

    if (legalBasePost == 'директор') {
        legalBasePost = 'директора'
    }

    if (legalBasePost == 'президент, председатель правления') {
        legalBasePost = 'президента, председателя правления'
    }


    if (data?.type == "INDIVIDUAL") {
        return `действующий на основании листа записи Единого государственного реестра индивидуальных предпринимателей`
    }

    if (data?.type !== "INDIVIDUAL") {
        const objectname = incline({ first: data?.managers?.[0]?.fio?.name, last: data?.managers?.[0].fio?.surname, middle: data?.managers?.[0].fio?.patronymic }, 'genitive')
        return `в лице ${legalBasePost} ${objectname.last} ${objectname.first} ${objectname.middle}, действующего на основании Устава`
    }
}

