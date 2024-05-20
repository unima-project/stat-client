import React from 'react';
import Box from "@mui/system/Box";
import {Button, Stack} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import {alertSeverity} from "../commons/Alert";
import {ModalCorpus} from "./ModalCorpus";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {CommonContext} from "../../App";

export const InputController = (props) => {
    const {themeColor} = React.useContext(CommonContext);

    const handleSaveCorpus = () => {
        props.setConfirmationConfig({
            open: true
            , title: "save.corpus"
            , okFunction: props.saveCorpus
            , content: "are.you.sure.want.to.save.the.corpus.?"
        });
    }

    return (<>
        <Box sx={{marginBottom: 1, textAlign: "center"}}>
                    <textarea
                        placeholder="text"
                        onChange={props.handleTextChange}
                        value={props.text}
                        rows={10}
                        cols={100}
                    />
        </Box>
        <Box>
            <Stack direction="row" spacing={1}>
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => props.handleReveal(props.text)}
                    startIcon={<VisibilityIcon/>}
                    sx={{minWidth: 110, backgroundColor: themeColor.primary}}
                >Reveal</Button>
                <Button
                    size="small"
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon/>}
                    sx={{minWidth: 110, backgroundColor: themeColor.info}}
                >Upload
                    {
                        props.fileName === "" ?
                            <input
                                type="file"
                                onChange={props.handleUpload}
                                accept="text/plain"
                                hidden
                            /> : <></>
                    }
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                        props.errorState();
                        props.resetState();
                        props.setAlertStatus({
                            severity: alertSeverity.INFO
                            , message: ""
                        });
                        props.setSaveStatus(false);
                    }}
                    startIcon={<RestartAltIcon/>}
                    sx={{minWidth: 110, backgroundColor: themeColor.danger}}
                >Reset</Button>
                {
                    props.isMember ?
                        <>
                            <ModalCorpus
                                loadCurrentCorpus={props.loadCurrentCorpus}
                                setConfirmationConfig={props.setConfirmationConfig}
                            />
                            {
                                props.saveStatus && props.text !== "" ?
                                    <Button
                                        size="small"
                                        variant="contained"
                                        onClick={handleSaveCorpus}
                                        startIcon={<SaveIcon/>}
                                        sx={{minWidth: 110, backgroundColor: themeColor.secondary}}
                                    >Save</Button>
                                    : <></>
                            }
                        </>
                        : <></>
                }
            </Stack>
        </Box>
    </>)
}