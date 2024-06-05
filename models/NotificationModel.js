import mongoose from "mongoose";
const { Schema } = mongoose;

const notificationSchema = Schema({
  name: {
    type: String,
  },
  date: {
    type: Date,
  },
  status: {
    type: String,
  },
  user: {
    type: String,
  },
});

const NotificationSet = mongoose.model('NotificationSet', notificationSchema);

export default NotificationSet