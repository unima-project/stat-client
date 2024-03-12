import React from 'react';
import {CorpusList} from "./Corpus";
import Box from '@mui/material/Box';
import {useCookies} from 'react-cookie';
import {GetCorpusList} from "../../models";
import {useNavigate} from "react-router-dom";

export const Corpus = () => {
    const navigate = useNavigate();
    const [corpusList, setCorpusList] = React.useState([]);
    const [cookie, setCookie] = useCookies(['token']);

    React.useEffect(() => {
        if (!cookie.token) navigate("/");
        GetCorpus();
    }, [cookie])
    const GetCorpus = () => {
        GetCorpusList(cookie.token)
            .then((data) => {
                setCorpusList(data.data);
            })
            .catch(error => {
                console.error("error get corpus:", error);
            })
    }

    return (<Box sx={{marginTop: 15}}>
        <CorpusList corpusList={corpusList}/>
    </Box>);
}