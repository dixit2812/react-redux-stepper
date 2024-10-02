const {STATUS_MESSAGES, STATUS} = require('./../Configs/constants');
const formModal = new (require('./../Models/formModel'))();

class FormController {
    async list(req, res) {
        try {
            let data = await formModal.list();
            res.handler.success(data, { status: STATUS.SUCCESS, message: STATUS_MESSAGES.LIST});
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    async details(req, res) {
        try {
            if (!req.body) {
                res.handler.validationMessage({status: STATUS.ERROR, message: STATUS_MESSAGES.INVALID_REQUEST});
                return;
            }
            let data = await formModal.findOne(req.body.id);
            res.handler.success(data, { status: STATUS.SUCCESS, message: STATUS_MESSAGES.LIST});
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    async add(req, res) {
        let data = req.body;
        let savedRecord;
        try {
            if (!data.address) {
                res.handler.validationMessage({status: STATUS.ERROR, message: STATUS_MESSAGES.ADDRESS_REQUIRED});
                return;
            }
            if (!data.selectedQuality) {
                res.handler.validationMessage({status: STATUS.ERROR, message: STATUS_MESSAGES.QUALITY_REQUIRED});
                return;
            }
            if (!data.condition) {
                res.handler.validationMessage({status: STATUS.ERROR, message: STATUS_MESSAGES.CONDITION_REQUIRED});
                return;
            }
            if (data.id) {
                savedRecord = await formModal.update(data.id,data);
            } else {
                savedRecord = await formModal.add(data);
            }

            return res.handler.created(savedRecord, {
                status: STATUS.SUCCESS,
                message: data.id ? STATUS_MESSAGES.FORM_UPDATE_SUCCESS : STATUS_MESSAGES.FORM_SAVE_SUCCESS
            });
        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = FormController;
