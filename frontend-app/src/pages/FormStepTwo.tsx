import BottomPanel from '../components/UI/BottomPanel'
import AppForm from '../components/UI/AppForm'
import StepNumber from '../components/UI/StepNumber'
import {useAppSelector} from '../hooks/hooks'
import BuildingTable from "../components/UI/BuildingTable";

const FormStepOne = () => {
    const {buildingQuality, buildingCondition} = useAppSelector(state => state.formMode)

    const handleValidation = async () => {
        return true;
    }

    return (
        <>
            <StepNumber pageNumber={2}/>
            <div className="container-fluid">
                <AppForm title="Quality & Condition" text="">
                    <div className="plan-container">
                        <div className="row">
                            <div className="col-md-6">
                                <BuildingTable data={buildingQuality} category="buildingQuality"/>
                            </div>
                            <div className="col-md-6">
                                <BuildingTable data={buildingCondition} category="buildingCondition"/>
                            </div>

                        </div>

                    </div>
                </AppForm>
                <BottomPanel valdiationFn={handleValidation} stepNumber={2}/>
            </div>
        </>
    )
}

export default FormStepOne
