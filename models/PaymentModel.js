import mongoose from "mongoose";
const { Schema } = mongoose;

const notificationSchema = new Schema({
  notification: {
    type: String,
  },
  date: {
    type: Date,
  },
  link: {
    type: String,
  },
  status: {
    type: String,
  },
});

const NotificationSet = mongoose.model("NotificationSet", notificationSchema);

export default NotificationSet;
