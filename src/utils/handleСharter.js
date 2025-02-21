
import { incline } from "lvovich";

export const handleСharter = (data) => {
     const legalBasePost = data?.management?.post ? data?.management?.post : '';
   
    console.log(incline({ first: 'Алексей', last: 'Холмогоров', middle: 'Сергеевич' }, 'genitive'))
    /*   if (legalBasePost == 'ГЕНЕРАЛЬНЫЙ ДИРЕКТОР') {
          legalBasePost = 'генерального директора'
      }
  
      if (legalBasePost == 'ДИРЕКТОР') {
          legalBasePost = 'Директора'
      } */


    if (data?.type == "INDIVIDUAL") {
        const objectname = incline({ first: data?.fio?.name, last: data?.fio?.surname, middle: data?.fio?.patronymic }, 'genitive')
        return `В лице ИП ${objectname.last} ${objectname.first} ${objectname.middle}, действующего на основании Устава`
    } else {
        const objectname = incline({ first: data?.managers?.[0]?.fio?.name, last: data?.managers?.[0].fio?.surname, middle: data?.managers?.[0].fio?.patronymic }, 'genitive')
        return `В лице ${legalBasePost} ${objectname.last} ${objectname.first} ${objectname.middle}, действующего на основании Устава`
    }

    /*   if (data?.type !== "INDIVIDUAL" && data?.managers?.[0]?.fio?.gender == 'MALE') {
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
      } */



}

