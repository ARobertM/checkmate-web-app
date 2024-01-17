import axios , {AxiosError} from 'axios'

const api = axios.create({
    baseURL : 'http://localhost:9000/api'
})

