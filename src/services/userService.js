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

    editUser(user) {
        return axios.put(`/api/edit-user`, user);
    },

    deleteUser(id) {
        return axios.delete(`/api/delete-user`, {
            data: {
                id
            }
        });
    },
    getAllCodeService(inputType) {
        return axios.get(`/api/allcode?type=${inputType}`)
    }
}

export default userService;