import React from 'react';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {CommonContext} from "../../App";
import In from "../../config/translations/in.json";
import En from "../../config/translations/en.json";

export const Translations = () => {
    const defaultLangItems = [
        {value: In, label: "IN", icon: <span className="fi fi-id"></span>}
        , {value: En, label: "EN", icon: <span className="fi fi-us"></span>}
    ];

    const {translate, setupTranslate,  themeColor} = React.useContext(CommonContext);
    const [language,setLanguage] = React.useState(defaultLangItems);

    const langOnChange = (e) => {
        setupTranslate(e.target.value);
    }

    const langControl = <FormControl sx={{marginRight: 3}} size="small">
        <Select
            value={translate.source}
            onChange={langOnChange}
            sx={{backgroundColor: themeColor.primary, color: 'inherit'}}
        >
            {
                language.map((item, index) => {
                    return (
                        <MenuItem value={item.value} key={index}>
                            <Stack direction="row" spacing={1} alignItems={"center"}>
                                <Typography>{item.icon}</Typography>
                                <Typography fontSize="10pt">{item.label}</Typography>
                            </Stack>
                        </MenuItem>)
                })
            }
        </Select>
    </FormControl>

    return (<>{langControl}</>)
}