import React from 'react';
import {Button} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import Grid from "@mui/material/Unstable_Grid2";
import {GetAllTokenList} from "../../models";
import {CommonContext} from "../../App";
import List from "../../Helpers/list";
import {exportTxt} from "../../Helpers/download";
import {alertSeverity} from "../commons/Alert";

export const ExportToken = (props) => {
    const {setLoading, themeColor, translate} = React.useContext(CommonContext);
    const t = translate.t;

    const exportToken = (token_list) => {
        const tokens = getStringTokenList(token_list)
        const allToken = new List(tokens)
            .SortAsc()
            .SetNumbering()
            .list

        exportTxt(allToken, "all_token_list");
    }

    const getStringTokenList = (tokenList) => {
        return tokenList.map((token) => {
            return token.token;
        })
    }

    const GetTokenList = () => {
        setLoading(true);
        GetAllTokenList()
            .then(data => {
                const tokenList = data.data;
                if (tokenList.length > 0) {
                    exportToken(tokenList);
                }
            })
            .catch(error => {
                props.setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: error
                })
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return <Grid container>
        <Button
            size="small"
            variant="contained"
            onClick={GetTokenList}
            startIcon={<DownloadIcon/>}
            sx={{minWidth: 150, minHeight: 40, backgroundColor: themeColor.secondary}}
        >{t('token.list')}</Button>
    </Grid>
}