import {apiMethod, HitApi} from "./index";

export const ApiToken = () => {
    const GetAllTokenList = async () => {
        try {
            const apiRequest = {
                method: apiMethod.GET
                , url: '/tokens'
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    };

    const DeleteToken = async (tokenId, token) => {
        try {
            const apiRequest = {
                method: apiMethod.DELETE
                , url: '/tokens/delete?id=' + tokenId
                , headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await HitApi(apiRequest)
            return data
        } catch (error) {
            throw error.response.data.message;
        }
    };

    return {
        GetAllTokenList
        , DeleteToken
    }
}