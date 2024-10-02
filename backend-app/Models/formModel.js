const formSchema = require('./../Schema/formSchema');

class FormModel {

    async list() {
        return await formSchema.find();
    }

    async add(data) {
        return await formSchema.create(data);
    }

    async findOne(request_id) {
        return await formSchema.findById(request_id)
    }

    async update(request_id, data) {
        return await formSchema.findByIdAndUpdate(request_id, data, { new: true })
    }

    async delete(request_id) {
        return await formSchema.findByIdAndRemove(request_id)
    }
}

module.exports = FormModel;
