import AppForm from '../components/UI/AppForm'
import BottomPanel from '../components/UI/BottomPanel'
import StepNumber from '../components/UI/StepNumber'
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {formModeActions} from "../components/store/formSlice";
import ConditionSlider from "../components/UI/Slider";

const FormStepThree = () => {
    const dispatch = useAppDispatch();
    const {quality, selectedQuality} = useAppSelector(state => state.formMode)

    const handleChange = (id, value: number) => {
        dispatch(formModeActions.changeValue({inputId: id, inputValue: value}));
    };

    const handleValidation = async () => {
        return true;
    };

    return (
        <>
            <StepNumber pageNumber={3}/>
            <div className="container-fluid">
                <AppForm title="Subject Current Quality & Condition" text="">
                    <div className="row">
                        <div className="col-md-6 mb-5">
                            <h4 className="mb-5">Quality</h4>
                            <div className="d-flex flex-wrap gap-2">
                                {quality.map((quality: any) => (
                                    <button
                                        key={quality}
                                        id="selectedQuality"
                                        className={`btn round-btn fs-4 ${selectedQuality === quality ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleChange('selectedQuality', quality)
                                        }}
                                    >
                                        {quality}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <ConditionSlider/>
                        </div>
                    </div>
                </AppForm>
                <BottomPanel valdiationFn={handleValidation} stepNumber={3}/>
            </div>
        </>
    )
}

export default FormStepThree
