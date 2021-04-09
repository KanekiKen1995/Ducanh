const axios = require("axios");
const app = {
    list(param) {
        var prms = new URLSearchParams(param);
        return axios.get(`/api/admin/app?${prms.toString()}`);
    }
};
export default app;