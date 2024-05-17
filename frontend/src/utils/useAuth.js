export const useAuth = () => {
    const token = localStorage.getItem('jwtToken')
    if (token) {
        return true;
    } else {
        return false
    }
};