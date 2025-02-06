import './DigitalTimer.scss';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';
import { useRef } from 'react';

const DigitalTimer = ({ setOpen, setValue, value, nosub }) => {
    const [anim, setAnim] = useState(false);
    const modalRef = useRef();

    const theme = createTheme({
        typography: {
            fontFamily: 'Inter, sans-serif',
        }
    })

    useEffect(() => {
        setTimeout(() => {
            setAnim(true);
        })
    }, []);

    function onChange(newValue) {
        setValue(dayjs(newValue))
    };

    const closeModal = (e) => {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setAnim(false);

            setTimeout(() => {
                setOpen(false)
            }, 200)
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', closeModal);

        return () => document.removeEventListener('mouseup', closeModal);
    }, []);
    return (
        <div ref={modalRef} className={`timer ${anim && 'timer_anim'}`}>
            <div className='headercustom'>
                <p>Часы</p>
                <p>Мин.</p>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <ThemeProvider theme={theme}>
                    <MultiSectionDigitalClock
                        ampm={false}
                        value={value}
                        onChange={onChange}
                    />
                </ThemeProvider>
            </LocalizationProvider>
        </div>
    )
};

export default DigitalTimer;