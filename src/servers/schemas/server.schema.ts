import * as mongoose from 'mongoose';

export const ServerSchema = new mongoose.Schema({
    name: String,
    ip: String,
    available: Boolean,
    createdAt: Date,
    updatedAt: Date
});
