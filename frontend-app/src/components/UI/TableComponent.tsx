import React from 'react';
import {useAppDispatch} from '../../hooks/hooks';
import {formModeActions} from '../store/formSlice';

type TableRowData = {
    type: string;
    label: string;
    checked: boolean;
    is_concern: boolean | null;
};

type TableProps = {
    data: TableRowData[];
};

const TableComponent: React.FC<TableProps> = ({data}) => {
    const dispatch = useAppDispatch();
    const tableData = data;

    const getStoredValue = (type: string) => {
        return tableData.find((item) => item.type === type);
    };

    const handleCheckboxChange = (type: string) => {
        dispatch(formModeActions.toggleLandUseCheckbox({type}));
    };

    const handleRadioChange = (type: string, value: boolean) => {
        dispatch(formModeActions.setConcern({type, value}));
    };

    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col" className="fs-4"/>
                <th scope="col" className="fs-4">Land Use</th>
                <th scope="col" className="fs-4">Is this a concern?</th>
            </tr>
            </thead>
            <tbody>
            {data.map((row, idx) => {
                const storedValue = getStoredValue(row.type) || row;
                return (
                    <tr key={idx}>
                        <td>
                            <div className="form-check fs-4">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={storedValue.checked}
                                    onChange={() => handleCheckboxChange(storedValue.type)}
                                />
                            </div>
                        </td>
                        <td className="fs-4">{storedValue.label}</td>
                        <td className="fs-4">
                            <div className="form-check">
                                {storedValue.checked && (
                                    <div className="mt-2">
                                        <label className="me-3">
                                            <input
                                                id={`success-outlined-${storedValue.type}-${idx+1}`}
                                                className="btn-check"
                                                type="radio"
                                                name={`radio-${storedValue.type}`}
                                                value="true"
                                                checked={storedValue.is_concern === true}
                                                onChange={() => handleRadioChange(storedValue.type, true)}
                                            />
                                            <label className="btn btn-outline-success" htmlFor={`success-outlined-${storedValue.type}-${idx+1}`}>Yes</label>
                                        </label>
                                        <label>
                                            <input
                                                id={`danger-outlined-${storedValue.type}-${idx+2}`}
                                                className="btn-check"
                                                type="radio"
                                                name={`radio-${storedValue.type}`}
                                                value="false"
                                                checked={storedValue.is_concern === false}
                                                onChange={() => handleRadioChange(storedValue.type, false)}
                                            />
                                            <label className="btn btn-outline-danger" htmlFor={`danger-outlined-${storedValue.type}-${idx+2}`}>No</label>
                                        </label>
                                    </div>
                                )}
                            </div>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
};

export default TableComponent;
