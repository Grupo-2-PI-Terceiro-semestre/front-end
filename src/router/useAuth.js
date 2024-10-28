import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const useAuth = () => {

    const logout = () => {
        Swal.fire({
            title: "Atenção!",
            text: "Sessão expirada. Você será redirecionado para a página de login.",
            icon: "error",
            confirmButtonText: "Ok",
            showCancelButton: false,
            allowOutsideClick: false,
            
            didClose: () => {
                clearCookies();
                document.location.href = '/login';
            }
        });
    };

    return { logout };
};

const clearCookies = () => {
    Cookies.remove('user');
    Cookies.remove('token');
    Cookies.remove('empresa');
}

export default useAuth;
