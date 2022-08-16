import axios from 'axios';

const instance = axios.create({
    baseURL:'https://my-blog-mini-project-production.up.railway.app/'
})

export default instance;