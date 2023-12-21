import Swal, { SweetAlertResult } from 'sweetalert2';

const sweetAlertService = {
    showAlert: (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
        Swal.fire({
            icon: type,
            title: type.charAt(0).toUpperCase() + type.slice(1),
            text: message,
        });
    },

    showConfirm: async (title: string, text: string, id?: string | number): Promise<SweetAlertResult> => {
        return Swal.fire({
            title: title,
            text: text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        });
    },
};

export default sweetAlertService;
