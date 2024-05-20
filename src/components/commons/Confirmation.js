import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import {CommonContext} from "../../App";

export const confirmationConfigDefault = {
    open: false
    , title: ""
    , okFunction: () => {
    }
    , content: ""
}

export const ModalConfirmation = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [confirmationConfig, setConfirmationConfig] = React.useState(confirmationConfigDefault);
    const {translate, themeColor} = React.useContext(CommonContext);
    const t = translate.t;

    React.useEffect(() => {
        setConfirmationConfig(props.confirmationConfig);
    }, [props.confirmationConfig])

    const handleCancel = () => {
        setConfirmationConfig({
            ...confirmationConfig
            , open: false
        })
    };

    const handleOk = () => {
        setConfirmationConfig({
            ...confirmationConfig
            , open: false
        })

        confirmationConfig.okFunction();
    };

    return (
        <React.Fragment>
            <Dialog
                fullScreen={fullScreen}
                open={confirmationConfig.open}
                onClose={handleCancel}
                aria-labelledby="responsive-dialog-title"
                maxWidth={"md"}
            >
                <DialogTitle id="responsive-dialog-title">
                    {t(confirmationConfig.title)}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t(confirmationConfig.content)}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant={"contained"}
                        sx={{backgroundColor: themeColor.danger}}
                        autoFocus onClick={handleCancel}
                    >
                        {t('cancel')}
                    </Button>
                    <Button
                        variant={"contained"}
                        sx={{backgroundColor: themeColor.success}}
                        onClick={handleOk} autoFocus
                    >
                        {t('ok')}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}