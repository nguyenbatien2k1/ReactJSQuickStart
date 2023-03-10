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
    },

    getOutStandingDoctorService(limit) {
        return axios.get(`/api/outstanding-doctor?limit=${limit}`);
    },

    getAllDoctors() {
        return axios.get(`/api/all-doctors`);
    },

    createInfoDoctor(data) {
        return axios.post(`/api/info-doctor`, data)
    },

    getDetailDoctor(doctorId) {
        return axios.get(`/api/detail-doctor?doctorId=${doctorId}`);
    },

    bulkCreateSchedule(data) {
        return axios.post(`/api/bulk-create-schedule`, data);
    },

    getScheduleDoctorByDate(doctorId, date) {
        return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
    },

    getMedicalAddressDoctorById(doctorId) {
        return axios.get(`/api/get-medical-address-doctor-by-id?doctorId=${doctorId}`);
    },

    getProfileDoctorById(doctorId) {
        return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
    },

    postBookAppointment(data) {
        return axios.post(`/api/patient-book-appointment`, data);
    },

    postVerifyBookAppointment(token, doctorId) {
        return axios.post(`/api/verify-book-appointment?token=${token}&doctorId=${doctorId}`);
    },

    createNewSpecialty(data) {
        return axios.post(`/api/create-new-specialty`, data);
    },

    getAllSpecialty() {
        return axios.get(`/api/get-all-specialty`);
    },

    getDetailSpecialtyById(specialtyId, location) {
        return axios.get(`/api/get-detail-specialty-by-id?specialtyId=${specialtyId}&location=${location}`)
    },

    createNewClinic(data) {
        return axios.post(`/api/create-new-clinic`, data);
    },

    getAllClinic() {
        return axios.get(`/api/get-all-clinic`);
    },

    getDetailClinicById(clinicId) {
        return axios.get(`/api/get-detail-clinic-by-id?clinicId=${clinicId}`)
    },

    getAllPatientForDoctor(doctorId, date) {
        return axios.get(`/api/get-list-patient?doctorId=${doctorId}&date=${date}`)
    },

    postSendRemedy(data) {
        return axios.post(`/api/send-remedy`, data)
    },

    postCreateHandbook(data) {
        return axios.post(`/api/create-handbook`, data)
    },

    getDetailHandbookById(handbookId) {
        return axios.get(`/api/get-detail-handbook-by-id?handbookId=${handbookId}`)
    },

    getAllHandbook() {
        return axios.get(`/api/get-all-handbook`)
    },

}

export default userService;