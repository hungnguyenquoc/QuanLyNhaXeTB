import axios from '../axios';

const roleService = {
    getAllRole(msnv) {
        return axios.get(`/api/chucvu?MSNV=${msnv}`);
    },
}


export default roleService;