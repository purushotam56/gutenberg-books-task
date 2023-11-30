import axios, { AxiosRequestConfig } from 'axios';
// config
// import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: `http://skunkworks.ignitesol.com:8000` });

axiosInstance.defaults.headers.common["app-user"] = "user"

axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
};

// ----------------------------------------------------------------------

// export const endpoints = {
//     books: {
//         getAll: '/admin/inquiry',
//         updateInquiry: '/admin/inquiry',
//         convertToUser: 'admin/inquiry/convertouser/'
//     }
// };