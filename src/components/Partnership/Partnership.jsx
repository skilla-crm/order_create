import s from './Partnership.module.scss';
import { useState, useContext, useEffect } from 'react';
import { ParametrsContext } from '../../contexts/UserContext';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
//Api
import { getPartnershipCompanies } from '../../Api/Api';
import { getAddressExact } from '../../Api/ApiYandex';
//selector
import { selectorPartnership } from '../../store/reducer/Partnership/selector';
//slice
import { setDefaultCordinate } from '../../store/reducer/Address/slice';
import { setMinDurqtion } from '../../store/reducer/Details/slice';
import { setPartnership } from '../../store/reducer/Partnership/slice';
import { setRatesPartnership } from '../../store/reducer/Rates/slice';
import { setCustomer, setPayType } from '../../store/reducer/Customer/slice';
//components
import PartnershipInput from '../General/PartnershipInput/PartnershipInput';
import Header from '../General/Header/Header';



const Partnership = ({ loadParametrs, companyId, setPartnershipCompanies, setLoadPartnershipCompanies }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { partnerships } = useContext(ParametrsContext);
    const { partnership } = useSelector(selectorPartnership);
    const dispatch = useDispatch();

    const uniquePartnerships = partnerships?.filter((obj, index, self) =>
        index === self.findIndex((t) => t.id === obj.id)
    );

    useEffect(() => {
        if (partnership?.id) {
            setLoadPartnershipCompanies(true)
            getPartnershipCompanies(partnership?.id)
                .then(res => {
                    const data = res.data.data;
                    setPartnershipCompanies(data)
                    setLoadPartnershipCompanies(false)
                    const company = data?.find(el => el.id == companyId);
                    company && dispatch(setCustomer(company))

                    setSearchParams('')
                }
                )

        }
    }, [partnership])

    useEffect(() => {
        partnership?.city && getAddressExact(partnership?.city)
            .then(res => {
                const data = res.data.response?.GeoObjectCollection?.featureMember?.[0].GeoObject?.Point;
                const cordinate = data.pos.split(' ')
                dispatch(setDefaultCordinate([cordinate[1], cordinate[0]]))
            })

        partnership?.min_time && dispatch(setMinDurqtion(partnership?.min_time))
        partnership?.rates && dispatch(setRatesPartnership(partnership?.rates))
    }, [partnership])




    return (
        <div className={s.root}>
            <Header
                title={'Партнер'}
                buttonState={false}
                /*   PromptText={''} */
                forPro={false}
                buttonText={''}
                handleButton={null}
                hiddenPrompt={true}
            />
            <PartnershipInput
                sub={'ИНН или название'}
                list={uniquePartnerships}
                customer={partnership}
                value={partnership?.id}
                setValue={(data) => dispatch(setPartnership(data))}
                handleAdd={null}
                payType={1}
                error={false}
                errorText={'Выбери заказчика'}
                loadParametrs={loadParametrs}
            />
        </div>
    )
};

export default Partnership;