import Button from "@mui/material/Button";
import {AccountCircle} from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {AuthLogout} from "../../models";
import {useNavigate} from "react-router-dom";
import {confirmationConfigDefault, ModalConfirmation} from "../commons/Confirmation";
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {Stack} from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ListIcon from '@mui/icons-material/List';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import {CommonContext} from "../../App";
import {RoutePath} from "../../Router";


export const MenuList = (props) => {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [listMenu, setListMenu] = React.useState([]);
    const [userName, setUserName] = React.useState("");
    const [confirmationConfig, setConfirmationConfig] = React.useState(confirmationConfigDefault);
    const {translate} = React.useContext(CommonContext);
    const t = translate.t;

    React.useEffect(() => {
        if (props.isLogin) {
            setUserName(props.cookie.name);
            setListMenu(memberSettings);
            menuSetting();
        }
    }, [props.cookie.token])

    const handleLogout = () => {
        setConfirmationConfig({
            open: true
            , title: "log.out"
            , okFunction: logOut
            , content: "are.you.sure.want.to.log.out.?"
        });
    }

    const logOut = () => {
        AuthLogout(props.cookie.token)
            .then((data) => {
                const date = new Date();
                const expiresDate = new Date(date.getTime() - 1000);
                const options = {
                    path: '/',
                    expires: expiresDate,
                }

                props.removeCookie("token", options);
                props.removeCookie("name", options);
            })
            .finally(() => {
                navigate("/");
            })
    }

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handlePageNavigation = (path) => {
        navigate(path)
    }

    const memberSettings = [
        {
            key: "profile"
            , func: () => {handlePageNavigation(RoutePath.profiles)}
            , icon: <AccountBoxIcon/>
        },
        {
            key: "log.out"
            , func: handleLogout
            , icon: <LogoutIcon/>
        },
    ];

    const adminSetting = [
        {
            key: "member"
            , func: () => {handlePageNavigation(RoutePath.users)}
            , icon: <GroupIcon/>
        },
        {
            key: "corpus"
            , func: () => {handlePageNavigation(RoutePath.corpuses)}
            , icon: <FormatListBulletedIcon/>
        },
        {
            key: "token"
            , func: () => {handlePageNavigation(RoutePath.tokens)}
            , icon: <ListIcon/>
        },
        {
            key: "about"
            , func: () => {handlePageNavigation(RoutePath.aboutEditor)}
            , icon: <BorderColorIcon/>
        },
        {
            key: "theme"
            , func: () => {handlePageNavigation(RoutePath.themes)}
            , icon: <ColorLensIcon/>
        },
    ]

    const menuSetting = () => {
        if (props.isAdmin) {
            setListMenu(adminSetting.concat([...memberSettings]));
        }
    }

    const menuList = <>
        <ModalConfirmation confirmationConfig={confirmationConfig}/>
        <Button
            sx={{color: 'white', my: 2}}
            endIcon={<AccountCircle/>}
            onClick={handleOpenUserMenu}
        >{userName.split(" ")[0]}</Button>
        <Menu
            sx={{mt: '45px'}}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
            {listMenu.map((setting) => (
                <MenuItem key={setting.key} onClick={handleCloseUserMenu} hover>
                    <Stack direction={"row"} spacing={2} alignItems={"center"} onClick={setting.func}>
                        {setting.icon} <Typography>{t(setting.key)}</Typography>
                    </Stack>
                </MenuItem>
            ))}
        </Menu>
    </>

    return (<>{menuList}</>)
}