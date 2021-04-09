const axios = require("axios");
const thirdParty = {
    get(param) {
        var prms = new URLSearchParams(param);
        return axios.get(`/api/admin/thirdParty?${prms.toString()}`);
    }
};
export default thirdParty;