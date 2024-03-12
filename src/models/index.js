import axios from "axios";

// const baseUrl = "https://stat-app-dot-stat-415110.et.r.appspot.com";
const baseUrl = "http://localhost:5000";

export const GetCorpusList = async (auth) => {
    try {
        const {data} = await axios.get(baseUrl + '/corpuses', {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })
        return data
    } catch (error) {
        throw error.response.data.message;
    }
}
export const AuthLogin = async (auth) => {
    try {
        const {data} = await axios.post(baseUrl + '/auth/login', auth)
        return data
    } catch (error) {
        throw error.response.data.message;
    }
}

export const AuthLogout = async (auth) => {
    try {
        const {data} = await axios.get(baseUrl + '/auth/logout', {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        })
        return data
    } catch (error) {
        throw error.response.data.message;
    }
}

export const GetCollocationList = async (tokens) => {
    try {
        const {data} = await axios.post(baseUrl + '/nltk/collocates', {
            tokens: tokens
        })

        return data
    } catch (error) {
        throw error.response.data.message;
    }
};

export const GetTokenList = async (text) => {
    try {
        const {data} = await axios.post(baseUrl + '/nltk/tokens', {
            text: text,
        })

        return data
    } catch (error) {
        throw error.response.data.message;
    }
}

export const GetTokenListUpload = async (formData) => {
    try {
        const {data} = await axios.post(baseUrl + '/nltk/tokens/upload',
            formData,
        )

        return data
    } catch (error) {
        throw error.response.data.message;
    }
}

export const GetConcordanceList = async (tokens, width) => {
    try {
        const {data} = await axios.post(baseUrl + '/nltk/concordances', {
            width: width,
            tokens: tokens
        })

        return data
    } catch (error) {
        throw error.response.data.message;
    }
};

export const GetWordFreqList = async (tokens) => {
    try {
        const {data} = await axios.post(baseUrl + '/nltk/word_frequencies', {
            tokens: tokens
        })

        return data
    } catch (error) {
        throw error.response.data.message;
    }
};

export const GetNgramList = async (tokens, size) => {
    try {
        const {data} = await axios.post(baseUrl + '/nltk/ngrams', {
            tokens: tokens
            , size: size
        })

        return data
    } catch (error) {
        throw error.response.data.message;
    }
};
