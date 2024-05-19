import {apiMethod, HitApi} from "./index";

export const ApiTheme = () => {
    const GetTheme = async () => {
        try {
            const apiRequest = {
                method: apiMethod.GET
                , url: '/themes'
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    };

    const UpdateTheme = async (color, token) => {
        try {
            const apiRequest = {
                method: apiMethod.PUT
                , url: '/themes/update'
                , headers: {
                    Authorization: `Bearer ${token}`
                }
                , data: {
                    color: color
                }
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    };

    const AddTheme = async (color, token) => {
        try {
            const apiRequest = {
                method: apiMethod.POST
                , url: '/themes/add'
                , headers: {
                    Authorization: `Bearer ${token}`
                }
                , data: {
                    color: color
                }
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    };

    return {
        GetTheme
        , UpdateTheme
        , AddTheme
    }
}