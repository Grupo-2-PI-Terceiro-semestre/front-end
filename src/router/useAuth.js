import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const useAuth = () => {

    const sessionExpired = () => {

        if (verifyAuth()) {
            return
        }
        clearCookies();
        Swal.fire({
            title: "Atenção!",
            text: "Sessão expirada. Você será redirecionado para a página de login.",
            icon: "error",
            confirmButtonText: "Ok",
            showCancelButton: false,
            allowOutsideClick: false,

            didClose: () => {
                redirectToLogin();
            }
        });
    };

    return { sessionExpired };
};

const verifyAuth = () => {
    return Cookies.get('token') === undefined
}

const redirectToLogin = () => {
    document.location.href = '/login';
}

const clearCookies = () => {
    Cookies.remove('user');
    Cookies.remove('token');
    Cookies.remove('empresa');
}

export default useAuth;
