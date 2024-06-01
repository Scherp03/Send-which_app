import mongoose from 'mongoose';
import { Permissions, Roles } from '../../../userTypeDefinitions.js';

const userTypeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        enum: Object.values(Roles),
    },
    permissions: {
        type: [String],
        enum: Object.values(Permissions),
    },
});

const UserType = mongoose.model('UserType', userTypeSchema);
export default UserType;
