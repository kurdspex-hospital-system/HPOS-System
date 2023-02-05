import axios from "axios";
import { useDispatch } from "react-redux";
import { notificationActions } from "../store/notification-slice";

export const useGetRequest = () => {
    const dispatch = useDispatch();
    
    return (url, options = {}, callback) => {
      axios.get(url, options)
        .then((response) => {
          callback(response.data, response);
        })
        .catch((err) => {
          console.log(err)
          dispatch(notificationActions.activeNotification(err.response.data));
        })
    };
  };