 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
 // @ts-nocheck

import React, { useEffect, useRef } from 'react';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { FaHome } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { formModeActions } from '../store/formSlice';

const ConditionSlider: React.FC = () => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const sliderValue = useAppSelector((state) => state.formMode.condition);

    useEffect(() => {
        if (sliderRef.current && !sliderRef.current.noUiSlider) {
            noUiSlider.create(sliderRef.current, {
                start: [sliderValue || 2],
                range: {
                    min: 0.5,
                    max: 8,
                },
                step: 0.1,
                connect: 'lower',
                tooltips: {
                    to: function (value:any) {
                        return parseFloat(value).toFixed(2);
                    },
                },
                format: {
                    to: (value: number) => parseFloat(String(value)).toFixed(2),
                    from: (value: string) => Number(value),
                },
            });

            sliderRef.current.noUiSlider?.on('update', (values) => {
                const value = parseFloat(values[0]);
                const sliderClass = document.querySelector(`.quality-slider .noUi-base .noUi-connect`);
                sliderClass.style.backgroundColor = getSliderColor(value);
                dispatch(formModeActions.changeValue({ inputId: 'condition', inputValue: value }));
            });
        }
        return () => {
            if (sliderRef.current && sliderRef.current.noUiSlider) {
                sliderRef.current.noUiSlider.destroy();
            }
        };
    }, [dispatch, sliderValue]);

    const getSliderColor = (value: number) => {
        if (value < 1) return '#575757';
        if (value >= 1 && value <= 2) return '#A63322';
        if (value > 2 && value <= 3) return '#F4AB2C';
        if (value > 3 && value <= 4) return '#E6E85E';
        if (value > 4 && value <= 5) return '#74D170';
        if (value > 5 && value <= 6) return '#50C9D6';
        if (value > 6 && value <= 7) return '#3D3DDF';
        if (value > 7 && value <= 8) return '#AB40D7';
    };

    return (
        <div className="quality-slider-container mt-4">
            <h4 className="mb-5">Condition</h4>
            <div ref={sliderRef} className="quality-slider" id="slider-round"/>
            <div className="d-flex justify-content-between mt-3">
                <div><FaHome size={20} color="#575757" /></div>
                <div><FaHome size={20} color="#A63322" /></div>
                <div><FaHome size={20} color="#F4AB2C" /></div>
                <div><FaHome size={20} color="#E6E85E" /></div>
                <div><FaHome size={20} color="#74D170" /></div>
                <div><FaHome size={20} color="#50C9D6" /></div>
                <div><FaHome size={20} color="#3D3DDF" /></div>
                <div><FaHome size={20} color="#AB40D7" /></div>
            </div>
        </div>
    );
};

export default ConditionSlider;
