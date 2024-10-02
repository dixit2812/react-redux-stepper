 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
 // @ts-nocheck
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState: {
    id: string,
    address: string,
    landUse: any[],
    buildingQuality: any[],
    buildingCondition: any[],
    quality: any[],
    selectedQuality: number,
    condition: string,
    mapCenter: object,
    markerPosition: object,
    list: [],
    isError: boolean
} = {
    id: '',
    address: '',
    landUse: [
        {
            type: 'single-family-residential',
            label: "Single-Family Residential",
            checked: false,
            is_concern: false
        },{
            type: 'residential-townhouse',
            label: "Residential Townhouse",
            checked: false,
            is_concern: false
        },{
            type: 'residential-condominium',
            label: "Residential Condominium",
            checked: false,
            is_concern: false
        }, {
            type: '24-unit-residential',
            label: "2-4 Unit Residential",
            checked: false,
            is_concern: false
        }, {
            type: 'high-den-apartments',
            label: "High Density Apartments",
            checked: false,
            is_concern: false
        }, {
            type: 'med-den-apartments',
            label: "Medium Density Apartments",
            checked: false,
            is_concern: false
        }, {
            type: 'low-den-apartments',
            label: "Low Density Apartments",
            checked: false,
            is_concern: false
        },
        {
            type: 'mobile-home-parks',
            label: "Mobile Home Parks",
            checked: false,
            is_concern: false
        },
        {
            type: 'individual-home-parks',
            label: "Individual Home Parks",
            checked: false,
            is_concern: false
        },
        {
            type: 'commercial-office',
            label: "Commercial Office",
            checked: false,
            is_concern: false
        },
        {
            type: 'commercial-industrial',
            label: "Commercial Industrial",
            checked: false,
            is_concern: false
        },
        {
            type: 'commercial-retails',
            label: "Commercial Retail",
            checked: false,
            is_concern: false
        }
    ],
    buildingQuality: [
        {type: 'a+', label: "A+", checked: false, is_dominant: false},
        {type: 'a', label: "A", checked: false, is_dominant: false},
        {type: 'a-', label: "A-", checked: false, is_dominant: false},
        {type: 'b+', label: "B+", checked: false, is_dominant: false},
        {type: 'b', label: "B", checked: false, is_dominant: false},
        {type: 'b-', label: "B-", checked: false, is_dominant: false},
        {type: 'c+', label: "C+", checked: false, is_dominant: false},
        {type: 'c', label: "C", checked: false, is_dominant: false},
        {type: 'c-', label: "C-", checked: false, is_dominant: false},
        {type: 'd+', label: "D+", checked: false, is_dominant: false},
        {type: 'd', label: "D", checked: false, is_dominant: false},
        {type: 'd-', label: "D-", checked: false, is_dominant: false},
        {type: 'e+', label: "E+", checked: false, is_dominant: false},
    ],
    buildingCondition: [
        {type: 'newly-built', label: "Newly Built", checked: false, is_dominant: false},
        {type: 'fully-remodeled', label: "Fully Remodeled", checked: false, is_dominant: false},
        {type: 'partially-remodeled', label: "Partially Remodeled", checked: false, is_dominant: false},
        {type: 'maintained', label: "Maintained", checked: false, is_dominant: false},
        {type: 'moderate', label: "Moderate", checked: false, is_dominant: false},
        {type: 'poor', label: "Poor", checked: false, is_dominant: false},
        {type: 'very-poor', label: "Very Poor", checked: false, is_dominant: false},
        {type: 'tear-down', label: "Tear Down/New Build", checked: false, is_dominant: false},
    ],
    quality: [10,9,8,7,6,5,4,3,2,1],
    selectedQuality: 10,
    mapCenter: { lat: 37.7749, lng: -122.4194 },
    markerPosition: null,
    condition: "1",
    list: [],
    isError: false,
}

export const formMode = createSlice({
    name: 'formMode',
    initialState,
    reducers: {
        changeValue(state, action) {
            const {inputId, inputValue} = action.payload;
            if (inputId in state) {
                state[inputId] = inputValue;
            }
        },
        toggleLandUseCheckbox(state, action) {
            const { type } = action.payload;
            const land = state.landUse.find(p => p.type === type);
            if (land) {
                land.checked = !land.checked;
            }
        },
        setConcern(state, action) {
            const { type, value } = action.payload;
            const property = state.landUse.find(p => p.type === type);
            if (property) {
                property.is_concern = value;
            }
        },
        toggleBuildingCheckbox(state, action) {
            const { type, category } = action.payload;
            const property = state[category]?.find(p => p.type === type);
            if (property) {
                property.checked = !property.checked;
            }
        },
        setDominant(state, action) {
            const { type, category, value } = action.payload;
            const property = state[category]?.find(p => p.type === type);
            if (property) {
                property.is_dominant = value;
            }
        },
        resetStoreData(state) {
            // return initialState;
            Object.assign(state, initialState);
        },
        showValidationError(state) {
            state.isError = true
        },
        hideValidationError(state) {
            state.isError = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDetails.pending, (state) => {
                state.isError = false
            })
            .addCase(fetchDetails.fulfilled, (state, action) => {
                const data = action.payload;
                state.id = data.id;
                state.address = data.address;
                state.landUse = data.landUse;
                state.buildingQuality = data.buildingQuality;
                state.buildingCondition = data.buildingCondition;
                state.selectedQuality = data.selectedQuality;
                state.condition = data.condition;
                state.mapCenter = data.mapCenter;
                state.markerPosition = data.markerPosition;
            })
            .addCase(fetchDetails.rejected, (state) => {
                state.isError = true
            })
            .addCase(fetchList.pending, (state) => {
                state.isError = false
            })
            .addCase(fetchList.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(fetchList.rejected, (state) => {
                state.isError = true
            })
            .addCase(submitData.pending, (state) => {
                state.isError = false
            })
            .addCase(submitData.fulfilled, (state, action) => {
                // state.submittedData = action.payload;
                console.log(state, action)
            })
            .addCase(submitData.rejected, (state) => {
                state.isError = true
            });

    },

})

export const fetchDetails: any = createAsyncThunk(
    'formMode/fetchDetails',
    async (id:string, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/details`,{id: id})
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const fetchList: any = createAsyncThunk(
    'formMode/fetchList',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/list`)
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const submitData = createAsyncThunk(
    'formMode/submitData',
    async (data: any, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/form`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const formModeActions = formMode.actions
