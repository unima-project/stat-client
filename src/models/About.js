import {apiMethod, HitApi} from "./index";

export const ApiAbout = () => {
    const GetAbout = async () => {
        try {
            const apiRequest = {
                method: apiMethod.GET
                , url: '/abouts'
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    };

    const UpdateAbout = async (content, token) => {
        try {
            const apiRequest = {
                method: apiMethod.PUT
                , url: '/abouts/update'
                , headers: {
                    Authorization: `Bearer ${token}`
                }
                , data: {
                    content: content
                }
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    };

    const AddAbout = async (content, token) => {
        try {
            const apiRequest = {
                method: apiMethod.POST
                , url: '/abouts/add'
                , headers: {
                    Authorization: `Bearer ${token}`
                }
                , data: {
                    content: content
                }
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    };

    return {
        GetAbout
        , UpdateAbout
        , AddAbout
    }
}