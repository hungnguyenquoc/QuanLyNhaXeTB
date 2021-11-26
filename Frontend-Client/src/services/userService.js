import axios from '../axios';

const userService = {
    // 
    handleLogin(userName, passWord) {
        return axios.post('/api/NhanVien/Login', {userName, passWord});
    },
    getUser() {
        const userStr = sessionStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        else {
            return null;
        }
    },
    getToken() {
        return sessionStorage.getItem('token') || null;
    },
    setUserSession(token, user) {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
    }, 
    removeUserSession() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    }
}

export default userService;