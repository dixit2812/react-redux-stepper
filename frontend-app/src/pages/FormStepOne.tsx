 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
 // @ts-nocheck

import {useEffect, useRef, useState} from 'react';
import BottomPanel from '../components/UI/BottomPanel';
import AppForm from '../components/UI/AppForm';
import Input from '../components/UI/Input';
import StepNumber from '../components/UI/StepNumber';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {addressValidationMessages, addressValidations} from '../util/validation';
import {GoogleMap, Marker, Autocomplete, useLoadScript} from '@react-google-maps/api';
import {formModeActions} from "../components/store/formSlice";
import * as Yup from "yup";
import TableComponent from "../components/UI/TableComponent";
import {generateRandomString} from "../util/helper";

const libraries = ['places'];

const FormStepOne = () => {
    const dispatch = useAppDispatch();
    const {landUse, markerPosition, mapCenter, address} = useAppSelector((state) => state.formMode);
    const autocompleteRef = useRef(null);

    const [markerId, setMarkerId] = useState(generateRandomString(7));
    const [errorMessages, setErrorMessages] = useState(addressValidationMessages());
    const [errors, setErrors] = useState(addressValidations());

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
        libraries,
    });

    const validationSchema = Yup.object().shape({
        address: Yup.string().required('Please select address')
    });

    useEffect(() => {
        if (!isLoaded) return;
        setMarkerId(generateRandomString(7))
    }, [isLoaded, dispatch]);

    const handlePlaceChanged = () => {
        const place = autocompleteRef.current.getPlace();
        if (!place.formatted_address || !place.geometry) {
            return;
        }
        dispatch(formModeActions.changeValue({inputValue: place.formatted_address, inputId: 'address'}));
        const location = place.geometry.location;
        const newCenter = {lat: location.lat(), lng: location.lng()};
        dispatch(formModeActions.changeValue({inputValue: newCenter, inputId: 'mapCenter'}));
        dispatch(formModeActions.changeValue({inputValue: newCenter, inputId: 'markerPosition'}));
    };

    const handleValidation = async () => {
        try {
            await validationSchema.validate({address}, {abortEarly: false});
            setErrors(addressValidations());
            setErrorMessages(addressValidationMessages());
            return true;
        } catch (validationError) {
            const validationErrors = addressValidations();
            const newErrorMessages = addressValidationMessages();
            validationError.inner.forEach((error) => {
                validationErrors[error.path] = true;
                newErrorMessages[error.path] = error.message;
            });
            setErrors(validationErrors);
            setErrorMessages(newErrorMessages);
            return false;
        }
    };

    return (
        <>
            <StepNumber pageNumber={1}/>
            <div className="container-fluid">
                <AppForm text="" title="Neighbourhood Land Uses">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="col-md-12">
                                {isLoaded && <Autocomplete
                                    onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                                    onPlaceChanged={handlePlaceChanged}
                                >
                                    <Input
                                        required={true}
                                        inputType="text"
                                        identifier="address"
                                        placeholder="Enter Property Address"
                                        label="Address"
                                        isInvalid={errors.address}
                                        errorMessage={errorMessages.address}
                                    />
                                </Autocomplete>}
                            </div>
                            <div className="col-md-12">
                                <TableComponent data={landUse}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            {isLoaded && <GoogleMap
                                center={mapCenter}
                                zoom={19}
                                mapContainerStyle={{height: '400px', width: '100%'}}
                            >
                                {markerPosition && markerPosition.lat && (
                                    <Marker key={markerId} visible={true} position={markerPosition}/>
                                )}
                            </GoogleMap>}
                        </div>
                    </div>
                </AppForm>
                <BottomPanel valdiationFn={handleValidation} stepNumber={1}/>
            </div>
        </>
    );
};

export default FormStepOne;
