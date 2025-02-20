import { useEffect, useRef, memo } from 'react';
import s from './MapAddress.module.scss';
import placeMarker from '../../../images/placeMarker.png';
import { YMaps, Map, Placemark, YMapMarker } from '@pbe/react-yandex-maps';
const API_KEY_MAP = process.env.REACT_APP_API_KEY_MAP;

/* const Icon = () => {
    return (
        <IconChewron />
    )
} */

const MapAddress = ({ lat, lng, defaultCordinate, width, height }) => {
    const mapRef = useRef();

    return (
        <YMaps
            query={{
                apikey: API_KEY_MAP
            }}>

            <Map
                ref={mapRef}
                width={width}
                height={height}
                defaultState={{
                    center: defaultCordinate, zoom: 10,
                    controls: [],
                }}
                state={{
                    center: lat && lat !== '0.000000' ? [lat, lng] : defaultCordinate,
                    zoom: lat && lat !== '0.000000' ? 16 : 10,
                    controls: []
                }}

                options={{
                    suppressMapOpenBlock: true
                }}


            >
                {lat && <Placemark geometry={[lat, lng]}
                    options={{
                        iconLayout: "default#image",
                        iconImageSize: [42, 42],
                        iconImageHref: placeMarker
                    }}
                />
                }
            </Map>

        </YMaps>
    )
};
export default memo(MapAddress);