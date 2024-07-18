import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { IApiResponse } from 'utils/types';

export const showToast = (toastData: IApiResponse) => {
  if (Array.isArray(toastData.message)) {
    toastData.message.forEach(msg => {
      if (toastData.success) {
        toast.success(msg);
      } else {
        toast.error(msg);
      }
    });
  } else {
    if (toastData.success) {
      toast.success(toastData.message);
    } else {
      toast.error(toastData.message);
    }
  }
};

export default showToast;
 