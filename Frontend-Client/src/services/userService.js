import axios from '../axios';

const userService = {
    // 
    handleLogin(userName, passWord) {
        return axios.post('/api/NhanVien/Login', {userName, passWord});
    },
    // 
    getAllUsers(msnv) {
        return axios.get(`/api/NhanVien?MSNV=${msnv}`);
    },
    createUserService(data) {
        console.log('data service',data);
        return axios.post('/api/NhanVien/Dky', data)
    },
    deleteUser(userId) {
        console.log('delete user', userId);
        return axios.delete(`/api/NhanVien/${userId}`);
    },
    updateUser(userId) {
        console.log('update user', userId);
        return axios.put(`/api/NhanVien/${userId}`);
    }
    }


export default userService;