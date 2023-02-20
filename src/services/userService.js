import axios from "../axios";

const userService = {
    handleEventLogin(email, password) {
        return axios.post('/api/login', {email, password});
    },

    getAllUsers(id) {
        return axios.get(`/api/get-all-users?id=${id}`)
    },

    createNewUser(data) {
        return axios.post(`/api/create-new-user`, data);
    },

    deleteUser(id) {
        return axios.delete(`/api/delete-user`, {
            data: {
                id
            }
        });
    }

}

export default userService;