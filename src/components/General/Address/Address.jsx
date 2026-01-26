import s from './Address.module.scss';
import { useEffect, useState, useRef } from 'react';
//icons
import { ReactComponent as IconClose } from '../../../images/icons/iconClose.svg';
//API
import { getCordinateInfo, getMetro } from '../../../Api/ApiDadata';
import { getAddressExact, getAddressSuggest } from '../../../Api/ApiYandex';
//components
import MapAddress from '../MapAddress/MapAddress';
import Switch from '../Switch/Switch';
import Metro from '../Metro/Metro';
import InputText from '../Input/InputText';
//utils
import { adressStringUtility, addressUtility, adressStringUtility3 } from '../../../utils/AdressUtility';

const Address = ({ sub, address, setAddress, user, defaultCordinate, first, handleNoAdress, noAddress, addressForReturn, errorText, error, handleDelete }) => {
    const [query, setQuery] = useState(adressStringUtility(address) || '');
    const [openList, setOpenList] = useState(false)
    const [suggestions, setSuggestions] = useState([]);
    const [onFocus, setOnFocus] = useState(false);
    const listRef = useRef();

    useEffect(() => {
        address.city && setQuery(adressStringUtility(address))
    }, [address])

 /*    useEffect(() => {
        setQuery(addressForReturn)
    }, [addressForReturn]) */

    useEffect(() => {
        noAddress && setQuery('')
        if (noAddress) {
            setQuery('')
        }
    }, [noAddress])

    const handleAdress = (e) => {
        const value = e.currentTarget.value;
        setAddress({})
        setQuery(value)
        getAddressSuggest(value, defaultCordinate)
            .then(res => {
                const results = res.data.results
                setSuggestions(results)
            })
            .catch(err => console.log(err))
    }

    const handleSelectAddress = (el) => {
        const data = el.address;
        const { city, street, house, apartment } = addressUtility(data.component);
        getAddressExact(`${city} ${street} ${house}`)
            .then(res => {
                const data = res.data.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject?.Point;
                const cordinate = data ? data.pos.split(' ') : null
                setAddress({
                    city,
                    street,
                    house,
                    apartment,
                    lat: cordinate?.[1],
                    lng: cordinate?.[0],
                    stations: []
                })


                cordinate && getCordinateInfo(cordinate?.[1], cordinate?.[0])
                    .then(res => {
                        const data = res.data.suggestions?.[0]?.data?.metro;
                        if (data) {

                            let stations = []
                            data.forEach(el => {
                                getMetro(`${el.name} ${city}`)
                                    .then(res => {
                                        const color = res.data.suggestions?.[0]?.data?.color;
                                        const station = {
                                            ...el,
                                            color
                                        }
                                        stations = [...stations, station]

                                        setAddress({
                                            city,
                                            street,
                                            house,
                                            apartment,
                                            lat: cordinate?.[1],
                                            lng: cordinate?.[0],
                                            stations

                                        })


                                    })
                            })
                        }
                    })


            })
            .catch(err => console.log(err))



        setQuery(el.address.formatted_address);
        setSuggestions([])
    }

    const handleFocus = () => {
        setOnFocus(true)
        setOpenList(true)
    }

    const handleBlur = () => {
        setOnFocus(false)
    }



    const openModalPro = () => {
        document?.getElementById('pro-open')?.click();
    };

    const closeModal = (e) => {
        e.stopPropagation()
        if (listRef.current && !listRef.current.contains(e.target)) {
            setOpenList(false)
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);

    return (
        <div className={s.container}>
            {first && <span className={s.sub}>{sub}</span>}
            <div className={s.block}>
                <div ref={listRef} className={`${s.field} ${noAddress && s.field_disabled} ${first && s.field_first}  ${onFocus && s.field_focus}`}>
                    <input disabled={noAddress} onFocus={handleFocus} onBlur={handleBlur} value={query || ''} onChange={handleAdress}></input>


                    <ul className={`${s.list} ${openList && s.list_open}`}>
                        {suggestions?.map((el) => {
                            return <li onClick={() => handleSelectAddress(el)} key={el.uri}>{el.address.formatted_address}</li>
                        })}
                    </ul>
                </div>

                {first && <Switch
                    text={'Без адреса'}
                    switchState={noAddress}
                    handleSwitch={!user.pro ? openModalPro : handleNoAdress}
                    hidden={false}
                    forPro={!user.pro}
                />
                }

                {!first && <div onClick={handleDelete} className={s.delete}><IconClose /></div>
                }
            </div>
            <div className={`${s.info} ${address?.city && s.info_open}`}>
                <div className={s.manual}>
                    <InputText
                        disabledEdit={true}
                        value={adressStringUtility3(address)}
                    />

                    <div className={s.input_small}>
                        <InputText
                            disabledEdit={true}
                            value={address?.house}
                            placeholder={'Дом'}
                        />
                    </div>

                    <div className={s.input_small}>

                        <InputText
                            disabledEdit={false}
                            value={address?.apartment}
                            setValue={(value) => setAddress({ ...address, apartment: value })}
                            placeholder={'Кв/оф'}
                        />
                    </div>

                </div>

            </div>

            <div className={`${s.metro} ${address?.stations?.length > 0 && s.metro_open}`}>
                <Metro stations={address?.stations} />
            </div>


            <div className={`${s.error} ${error && s.error_vis}`}>
                <p>
                    {errorText}
                </p>
            </div>


        </div>
    )
};
export default Address;