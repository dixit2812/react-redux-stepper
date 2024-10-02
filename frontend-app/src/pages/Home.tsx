import AppForm from '../components/UI/AppForm'
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {useEffect} from "react";
import {fetchDetails, fetchList, formModeActions} from "../components/store/formSlice";
import {toast} from "react-toastify";

const FormStepOne = () => {
    const dispatch = useAppDispatch()
    const {list} = useAppSelector(state => state.formMode)
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(formModeActions.resetStoreData());
        dispatch(fetchList())
    }, [])

    const onEdit = async (id) => {
        const response = await dispatch(fetchDetails(id));
        if (response.type.endsWith('fulfilled')) {
            navigate('/step-1');
        } else {
            toast.error('An unexpected error occurred.');
            return false;
        }
    }

    return (
        <>
            <div className="container-fluid">
                <AppForm text="" title="">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h2 className="app-form__heading">Property Analysis</h2>
                        <Link to={"/step-1"} className="btn btn-primary fs-4">
                            Add New
                        </Link>
                    </div>

                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col" className="fs-4">Properties</th>
                            <th scope="col" className="fs-4">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list.map((mp: any, k) => {
                            return <tr key={k}>
                                <td className="fs-4">{mp.address}</td>
                                <td className="fs-4">
                                    <button className="btn btn-primary fs-4" onClick={(e) => {
                                        e.preventDefault();
                                        onEdit(mp.id)
                                    }}> edit
                                    </button>
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </AppForm>
            </div>
        </>

    )
}

export default FormStepOne
