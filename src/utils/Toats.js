import { toast } from 'react-toastify';



export const errorToast = (message) => {
    toast.error(message, {
        toastStyle: { backgroundColor: '#FF0000', color: '#fff' },
        autoClose: 1000,
    });
}

export const successToast = (message) => {
    toast.success(message, {
        toastStyle: { backgroundColor: '#28a745', color: '#fff' },
        autoClose: 1000,
    });
}

export const infoToast = (message) => {
    toast.info(message, {
        toastStyle: { backgroundColor: '#17a2b8', color: '#fff' },
        autoClose: 1000,
    });
}

export const warnToast = (message) => {
    toast.warn(message, {
        toastStyle: { backgroundColor: '#ffc107', color: '#fff' },
        autoClose: 1000,
    });
}

