import axios from "axios";
import {ApiNltk} from "./Nltk";
import {ApiAuth} from "./Auth";
import {ApiCorpus} from "./Corpus";
import {ApiUser} from "./User";
import {ApiToken} from "./Token";
import {ApiAbout} from "./about";

const baseUrl = process.env.REACT_APP_SERVER_BACKEND_URL;
const timeOut = 30000

const axiosInstance = axios.create({
    baseURL: baseUrl
    , timeout: timeOut
});

export const apiMethod = {
    POST: "post"
    , GET: "get"
    , DELETE: "delete"
    , PATCH: "patch"
    , PUT: "put"
}

export const HitApi = async (apiRequest) => {

    try {
        return await axiosInstance({
            method: apiRequest.method
            , url: apiRequest.url
            , data: apiRequest.data
            , headers: apiRequest.headers
        })
    } catch (error) {
        throw error;
    }
}

export const {
    GetCollocationList
    , GetTokenList
    , GetTokenListUpload
    , GetConcordanceList
    , GetWordFreqList

    , GetNgramList
} = ApiNltk();

export const {
    AuthLogin
    , AuthLogout
} = ApiAuth();

export const {
    LoadCorpus
    , DeleteCorpus
    , SaveCorpus
    , GetCorpusList
    , UpdateCorpusPublicStatus

    , corpusPublicStatusConfig
    , corpusPublicStatus
    , GetPublicCorpusList
    , LoadPublicCorpus
} = ApiCorpus();

export const  {
    userType
    , GetUserProfile
    , UpdateUserPassword
    , GetUserList
    , DeleteUser

    , userStatus
    , UpdateUser
    , CreateUser
    , ResetUserPassword
    , userTypeConfig

    , defaultUserData
    , userTypeItems
} = ApiUser();

export const {
    GetAllTokenList
    , DeleteToken
} = ApiToken();

export const {
    GetAbout
    , UpdateAbout
    , AddAbout
} = ApiAbout();