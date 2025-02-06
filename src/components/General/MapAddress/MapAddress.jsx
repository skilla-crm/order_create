import { useEffect, useRef } from 'react';
import s from './MapAddress.module.scss';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

/* const Icon = () => {
    return (
        <IconChewron />
    )
} */

const MapAddress = ({ openMap, lat, lng }) => {
    const mapRef = useRef();
  

    return (
        <div className={`${s.container} ${!openMap && s.container_hidden}`}>
            <YMaps>
         
                <Map
                    ref={mapRef}
                    width={'100%'}
                    height={280}
                    state={{ center: [lat, lng], zoom: 16 }}
                >
                    <Placemark geometry={[lat, lng]} /* iconContent={<Icon />} options={{

                        iconCaption: 'хуй',
                    }} */
                    />
                </Map>
            </YMaps>
        </div >
    )
};
export default MapAddress;