import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import {SetupCookies} from '../../Helpers/cookie';
import {MenuList} from "./MenuList";
import {UserProfile} from "../../Helpers/userProfile";
import HomeIcon from '@mui/icons-material/Home';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {CommonContext} from "../../App";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {Stack} from "@mui/material";
import In from "../../config/translations/in.json";
import En from "../../config/translations/en.json";

export const MainMenu = () => {
    const {cookie, removeCookie} = SetupCookies();
    const {isAdmin, isLogin} = UserProfile();
    const {themeColor, translate, setupTranslate} = React.useContext(CommonContext);
    const t = translate.t;

    React.useEffect(() => {
    },[isAdmin, isLogin, cookie]);

    const homeMenu = <>
        <Link to={'/'}>
            <Button
                sx={{my: 2, color: 'white'}}
                startIcon={<HomeIcon/>}
            >{t('about')}</Button>
        </Link>
        <Link to={'/tools'}>
            <Button
                sx={{my: 2, color: 'white'}}
                startIcon={<QueryStatsIcon/>}
            >{t('corpus.analysis')}</Button>
        </Link>
    </>

    const setupHomeMenu = () => {
        if (!isAdmin) {
            return homeMenu
        } else {
            return <></>
        }
    }

    const langItems = [
        {value: In, label: "IN"}
        , {value: En, label: "EN"}
    ];

    const langOnChange = (e) => {
        setupTranslate(e.target.value);
    }

    const langControl = <FormControl sx={{marginRight: 3}} size="small">
                <Select
                    value={translate.source}
                    onChange={langOnChange}
                    sx={{backgroundColor: 'white'}}
                >
                    {
                        langItems.map((item, index) => {
                            return (
                                <MenuItem value={item.value} key={index}>
                                    <Stack direction="row" spacing={1} alignItems={"center"}>
                                        {/*<Typography>{item.icon(16)}</Typography>*/}
                                        <Typography fontSize="10pt">{item.label}</Typography>
                                    </Stack>
                                </MenuItem>)
                        })
                    }
                </Select>
            </FormControl>

    return (
        <AppBar position="fixed" sx={{backgroundColor: themeColor.primary}}>
            <Container>
                <Toolbar disableGutters>
                    {langControl}
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {process.env.REACT_APP_TITLE}
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {setupHomeMenu()}
                    </Box>
                    {
                        isLogin ?
                            <MenuList
                                cookie={cookie}
                                removeCookie={removeCookie}
                                isAdmin={isAdmin}
                                isLogin={isLogin}
                            /> :
                            <Link to={'/auths/login'}>
                                <Button
                                    sx={{my: 2, color: 'white'}}
                                    endIcon={<VpnKeyIcon/>}
                                >{t('login')}</Button>
                            </Link>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}