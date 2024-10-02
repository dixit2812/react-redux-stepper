import {useState} from "react";
import AppForm from '../components/UI/AppForm'
import BottomPanel from '../components/UI/BottomPanel'
import StepNumber from '../components/UI/StepNumber'
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {submitData} from "../components/store/formSlice";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const FormStepFour = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const data = useAppSelector(state => state.formMode)
    const [disableSubmit, setDisableSubmit] = useState(false)
    const submit = async () => {
        try {
            setDisableSubmit(true);
            const response = await dispatch(submitData({
                id: data.id ? data.id : null,
                address: data.address,
                landUse: data.landUse,
                buildingQuality: data.buildingQuality,
                buildingCondition: data.buildingCondition,
                selectedQuality: data.selectedQuality,
                mapCenter: data.mapCenter,
                markerPosition: data.markerPosition,
                condition: data.condition
            }));
            if (response.type.endsWith('fulfilled')) {
                const {meta} = response.payload;
                const {status, message} = meta;
                if (status === 0) {
                    setDisableSubmit(false)
                    toast.error(message);
                } else {
                    toast.success(message);
                    navigate('/')
                }
            } else {
                setDisableSubmit(false)
                toast.error('An unexpected error occurred.');
            }
        } catch (error) {
            setDisableSubmit(false)
            toast.error(error.message);
        }
    }

    return (
        <>
            <StepNumber pageNumber={4}/>
            <div className="container-fluid">
                <AppForm title="Summary" text="">
                    <div className="row">
                        <div className="row col-md-12">
                            <div className="col-md-6 mb-4">
                                <div className="col-md-12 border-bottom mb-1">
                                    <label className="form-label fs-4 fw-bold">Property Address</label>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center fs-4">
                                        <span className="fs-4">{data.address ?? ''}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-6 mb-5">
                                <div className="col-md-12 d-flex justify-content-between border-bottom mb-1">
                                    <label className="form-label fs-4 fw-bold">Land Use</label>
                                    <label className="form-label fs-4 fw-bold">Is this a concern?</label>
                                </div>
                                <ul className="list-group list-group-flush">
                                    {data?.landUse.filter(fl => fl.checked).map((mp, k) => {
                                        return <li key={k} className="list-group-item d-flex justify-content-between align-items-center fs-4">
                                            {mp.label}
                                            <span className="fs-4">{mp.is_concern ? 'Yes' : 'No'}</span>
                                        </li>
                                    })}
                                </ul>
                            </div>
                            <div className="col-md-6 mb-5">
                                <div className="col-md-12 d-flex justify-content-between border-bottom mb-1">
                                    <label className="form-label fs-4 fw-bold">Building Quality</label>
                                    <label className="form-label fs-4 fw-bold">Dominant?</label>
                                </div>
                                <ul className="list-group list-group-flush">
                                    {data?.buildingQuality.filter(fl => fl.checked).map((mp, key) => {
                                        return <li key={key} className="list-group-item d-flex justify-content-between align-items-center fs-4">
                                            {mp.label}
                                            <span className="fs-4">{mp.is_dominant ? 'Yes' : 'No'}</span>
                                        </li>
                                    })}
                                </ul>
                            </div>
                            <div className="col-md-6 mb-5">
                                <div className="col-md-12 d-flex justify-content-between border-bottom mb-1">
                                    <label className="form-label fs-4 fw-bold">Building Condition</label>
                                    <label className="form-label fs-4 fw-bold">Dominant?</label>
                                </div>
                                <ul className="list-group list-group-flush">
                                    {data?.buildingCondition.filter(fl => fl.checked).map((mp, i) => {
                                        return <li key={i} className="list-group-item d-flex justify-content-between align-items-center fs-4">
                                            {mp.label}
                                            <span className="fs-4">{mp.is_dominant ? 'Yes' : 'No'}</span>
                                        </li>
                                    })}
                                </ul>
                            </div>
                            <div className="col-md-6 mb-5">
                                <div className="col-md-12 border-bottom mb-1">
                                    <label className="form-label fs-4 fw-bold">Quality And Condition</label>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center fs-4">
                                        Current Quality
                                        <span className="fs-4">{data.selectedQuality ?? ''}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center fs-4">
                                        Current condition
                                        <span className="fs-4">{data.condition ?? ''}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </AppForm>
                <BottomPanel valdiationFn={submit} stepNumber={4} disableButton={disableSubmit}/>
            </div>
        </>
)
}

export default FormStepFour
