import React from 'react';
import {ExportToken} from "./ExportToken";
import {TokenList} from "./TokenList";
import Grid from "@mui/system/Unstable_Grid";
import {DeleteToken, GetAllTokenList} from "../../models";
import {AlertNotification, alertSeverity} from "../commons/Alert";
import {CommonContext} from "../../App";
import {confirmationConfigDefault, ModalConfirmation} from "../commons/Confirmation";
import {SetupCookies} from "../../Helpers/cookie";

export const Token = (props) => {
    const [tokens, setTokens] = React.useState([]);
    const {setLoading, themeColor, translate} = React.useContext(CommonContext);
    const [alertStatus, setAlertStatus] = React.useState({
        message: "", severity: alertSeverity.INFO
    });
    const [confirmationConfig, setConfirmationConfig] = React.useState(confirmationConfigDefault);
    const {cookie} = SetupCookies();
    const t = translate.t;

    React.useEffect(() => {
        GetTokenList();
    }, [])

    const tokensMemo = React.useMemo(() => {
        return tokens;
    }, [tokens])

    const GetTokenList = () => {
        setLoading(true);
        GetAllTokenList()
            .then(data => {
                setTokens(data.data);
            })
            .catch(error => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: error
                })
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const deleteCurrentToken = (token_id) => {
        setLoading(true);
        DeleteToken(token_id, cookie.token)
            .then(data => {
                setAlertStatus({
                    severity: alertSeverity.SUCCESS
                    , message: data.message
                })
                GetTokenList();
            })
            .catch(error => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: error
                })
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return(
        <Grid container sx={{marginTop: 10, color: themeColor.primary}}>
            <Grid container justifyContent={"center"}  sx={{width: '100%'}}>
                <h2>{t('token.list')}</h2>
            </Grid>
            <Grid container justifyContent={"flex-end"} sx={{width: '100%'}}>
                <ExportToken setAlertStatus={setAlertStatus} />
            </Grid>
            <Grid container justifyContent={"center"} sx={{width: '100%', marginTop: 3}}>
                <ModalConfirmation confirmationConfig={confirmationConfig}/>
                <AlertNotification alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
                <TokenList
                    tokensMemo={tokensMemo}
                    setConfirmationConfig={setConfirmationConfig}
                    deleteCurrentToken={deleteCurrentToken}
                />
            </Grid>
        </Grid>
    )
}