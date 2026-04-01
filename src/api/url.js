import axios from "axios";

const BACKEND_URL=axios.create({
    baseURL:"https://note-app-hjrz.onrender.com/api/v1/noteapp"
})
export default BACKEND_URL