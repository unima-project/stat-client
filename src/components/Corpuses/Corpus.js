import * as React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DownloadIcon from '@mui/icons-material/Download';
import {Button, Stack} from "@mui/material";
import Switch from "@mui/material/Switch";
import {corpusPublicStatusConfig, userType} from "../../models";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CorpusConfig from "./Config";
import {CommonTable} from "../commons/Table"

export const CorpusList = (props) => {
    const {dataTable, setupColumn, setRows} = CommonTable();

    React.useEffect(() => {
        setRowData();
        setupCurrentColumn();
    }, [props.corpusListMemo, props.userLevel])

    const setupCurrentColumn = () => {
        const config = new CorpusConfig(props.userLevel)
        setupColumn(config.SetColumns().columns);
    }

    const handleDeleteCorpus = (corpusId) => {
        props.setConfirmationConfig({
            open: true
            , title: "Delete Corpus"
            , okFunction: () => props.deleteCurrentCorpus(corpusId)
            , content: `Are you sure want to delete the corpus ?`
        });
    }

    const handleLoadCorpus = (corpusId, isDownload, userId) => {
        let content = `Are you sure want to load the corpus ?`
        if (isDownload) {
            content = `Are you sure want to download the token list ?`
        }

        props.setConfirmationConfig({
            open: true
            , title: isDownload ? "Download Corpus" : "Load Corpus"
            , okFunction: () => {
                props.loadCurrentCorpus(corpusId, isDownload, userId);
                if (props.isMember) {
                    props.handleModalClose();
                }
            }
            , content: content
        });
    }

    const publicOnChange = (event, corpus) => {
        const checked = event.target.checked ? 1 : 0;
        corpus.public = checked;
        props.setConfirmationConfig({
            open: true
            , title: "Update Corpus"
            , okFunction: () => {
                props.updateCurrentCorpus(corpus);
            }
            , content: `Are you sure want to set ${corpusPublicStatusConfig[checked].label} ?`
        });
    }

    const actionButton = (prop) => {
        return <Button
            size="small"
            variant="outlined"
            component="label"
            color={prop.color}
            onClick={prop.action}
            key={prop.key}
        >{prop.icon}</Button>
    }

    const deleteCorpusButton = (corpusId) => {
        return actionButton({
            color: "error"
            , action: () => handleDeleteCorpus(corpusId)
            , icon: <DeleteForeverIcon/>
            , key: 1,
        });
    }

    const loadCorpusButton = (corpusId, userId) => {
        return actionButton({
            color: "primary"
            , action: () => handleLoadCorpus(corpusId, false, userId)
            , icon: <VisibilityIcon/>
            , key: 2,
        })
    }

    const printCorpusTokenButton = (corpusId, userId) => {
        return actionButton({
            color: "success"
            , action: () => handleLoadCorpus(corpusId, true, userId)
            , icon: <DownloadIcon/>
            , key: 3,
        })
    }

    const setupActionButtonList = (userLevel, corpusId, userId) => {
        switch (userLevel) {
            case userType.USER_ADMIN:
                return [
                    loadCorpusButton(corpusId, userId)
                    , printCorpusTokenButton(corpusId, userId)
                    , deleteCorpusButton(corpusId)
                ];
            case userType.USER_MEMBER:
                return [
                    loadCorpusButton(corpusId, userId)
                    , printCorpusTokenButton(corpusId, userId)
                    , deleteCorpusButton(corpusId)
                ];
            default:
                return [
                    loadCorpusButton(corpusId, userId)
                    , printCorpusTokenButton(corpusId)
                ];
        }
    }

    const setRowData = () => {
        setRows(props.corpusListMemo.map((corpus, index) => {
            const checked = corpus.public === 1
            return {
                id: index + 1
                , user: corpus.user
                , corpus: corpus.corpus
                , public: <Switch
                    checked={checked}
                    onChange={(event) => {
                        publicOnChange(event, corpus);
                    }}
                />
                , created_at: corpus.created_at
                , action: <Stack direction="row" spacing={2}>
                    {
                        setupActionButtonList(props.userLevel, corpus.id, corpus.user_id).map(button => {
                            return button
                        })
                    }
                </Stack>
            }
        }));
    }

    return (<>{dataTable}</>)
}