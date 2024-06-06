import mongoose from "mongoose";
const { Schema } = mongoose;

const notificationSchema = new Schema({
  notification: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

const NotificationSet = mongoose.model(
  'NotificationSet',
  notificationSchema,
  { strict: true }
);

export default NotificationSet;
