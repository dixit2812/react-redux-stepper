import React from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { formModeActions } from '../store/formSlice';

type TableRowData = {
    type: string;
    label: string;
    checked: boolean;
    is_dominant: boolean | null;
};

type TableProps = {
    data: TableRowData[];
    category: string;
};

const BuildingTable: React.FC<TableProps> = ({ data, category }) => {
    const dispatch = useAppDispatch();
    const tableData = data;

    const getStoredValue = (type: string) => {
        return tableData.find((item) => item.type === type);
    };

    const handleCheckboxChange = (type: string , category: string) => {
        dispatch(formModeActions.toggleBuildingCheckbox({ type, category }));
    };

    const handleRadioToggle = (type: string, category: string) => {
        const currentValue = getStoredValue(type)?.is_dominant;
        dispatch(formModeActions.setDominant({ type,category, value: !currentValue }));
    };

    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col" className="fs-4" />
                <th scope="col" className="fs-4">{category === 'buildingQuality' ? 'Building Quality' : 'Building Condition'}</th>
                <th scope="col" className="fs-4">Dominant?</th>
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
                                    onChange={() => handleCheckboxChange(storedValue.type, category)}
                                />
                            </div>
                        </td>
                        <td className="fs-4">{storedValue.label}</td>
                        <td className="fs-4">
                            <div className="form-check">
                                {storedValue.checked && storedValue.is_dominant !== null && (
                                    <div className="mt-2">
                                        {storedValue.is_dominant ? (
                                            <label className="btn btn-outline-success" onClick={() => handleRadioToggle(storedValue.type, category)}>
                                                Yes
                                            </label>
                                        ) : (
                                            <label className="btn btn-outline-danger" onClick={() => handleRadioToggle(storedValue.type, category)}>
                                                No
                                            </label>
                                        )}
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

export default BuildingTable;
