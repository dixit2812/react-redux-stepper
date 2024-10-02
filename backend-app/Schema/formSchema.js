const mongoose = require('mongoose');

const landUseSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: [
            'single-family-residential',
            'residential-townhouse',
            'residential-condominium',
            '24-unit-residential',
            'high-den-apartments',
            'med-den-apartments',
            'low-den-apartments',
            'mobile-home-parks',
            'individual-home-parks',
            'commercial-office',
            'commercial-industrial',
            'commercial-retails'
        ],
    },
    label: {
        type: String,
        required: true,
    },
    checked: {
        type: Boolean,
        default: false,
    },
    is_concern: {
        type: Boolean,
        default: false,
    },
}, { _id: false });

const buildingQualitySchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['a+', 'a', 'a-', 'b+', 'b', 'b-', 'c+', 'c', 'c-', 'd+', 'd', 'd-', 'e+'],
    },
    label: {
        type: String,
        required: true,
    },
    checked: {
        type: Boolean,
        default: false,
    },
    is_dominant: {
        type: Boolean,
        default: false,
    },
}, { _id: false });

// Sub-schema for Building Condition items
const buildingConditionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: [
            'newly-built',
            'fully-remodeled',
            'partially-remodeled',
            'maintained',
            'moderate',
            'poor',
            'very-poor',
            'tear-down'
        ],
    },
    label: {
        type: String,
        required: true,
    },
    checked: {
        type: Boolean,
        default: false,
    },
    is_dominant: {
        type: Boolean,
        default: false,
    },
}, { _id: false });

const coordinatesSchema = new mongoose.Schema({
    lat: {
        type: Number,
        required: true,
        min: -90,
        max: 90,
    },
    lng: {
        type: Number,
        required: true,
        min: -180,
        max: 180,
    },
}, { _id: false });


const formSchema = new mongoose.Schema({
    address: {
        type: String,
        required: [true, 'Address is required'],
    },

    landUse: {
        type: [landUseSchema],
        default: [],
    },

    buildingQuality: {
        type: [buildingQualitySchema],
        default: [],
    },

    buildingCondition: {
        type: [buildingConditionSchema],
        default: [],
    },

    selectedQuality: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
        default: 10,
    },

    mapCenter: {
        type: coordinatesSchema,
        required: true,
        default: { lat: 37.7749, lng: -122.4194 },
    },

    markerPosition: {
        type: coordinatesSchema,
        default: null,
    },

    condition: {
        type: String,
        required: true,
        default: "1",
    },
}, {
    timestamps: true,
    collection: 'forms',
});

formSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

formSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('forms', formSchema);
