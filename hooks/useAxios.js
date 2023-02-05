import axios from "axios";
import { useDispatch } from "react-redux";
import { notificationActions } from "../store/notification-slice";

export const useAxios = () => {
  const dispatch = useDispatch();

  return {
    get: (url, options = {}, callback) => {
      axios.get(url, options)
        .then((response) => {
          callback(response.data, response);
        })
        .catch((err) => {
          console.log(err)
          dispatch(notificationActions.activeNotification(err.response.data));
        })
    },
    post: (url, data, options = {}, callback) => {
      axios.post(url, data, options)
        .then((response) => {
          callback(response.data, response);
        })
        .catch((err) => {
          console.log(err)
          dispatch(notificationActions.activeNotification(err.response.data));
        })
    }
  };
};
