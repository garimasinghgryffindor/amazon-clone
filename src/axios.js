import axios from "axios";

const instance = axios.create({
    baseURL: 'https://us-central1-clone-e7677.cloudfunctions.net/api'  // API URL / (cloud function url )
            // http://localhost:5001/clone-e7677/us-central1/api
});

export default instance;


