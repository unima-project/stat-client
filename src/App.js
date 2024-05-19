import * as React from "react";
import {Container} from '@mui/material';
import routes from './Router';
import {MainMenu} from './components/Menu';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Loading} from "./components/commons/Loading";
import {createContext, useState} from "react";
import {GetTheme} from "./models";
import {AlertNotification, alertSeverity} from "./components/commons/Alert";
import {SetupCookies} from "./Helpers/cookie";
import {defaultThemeColor} from "./components/Themes";

export const CommonContext = createContext(null);

function App() {
    const {cookie} = SetupCookies();
    const [loading, setLoading] = React.useState(false);
    const [themeColor, setThemeColor] = useState(defaultThemeColor);
    const [alertStatus, setAlertStatus] = React.useState({
        message: "", severity: alertSeverity.INFO
    });

    React.useEffect(() => {
        getTheme(cookie.token);
    }, [cookie])

    const getTheme = (token) => {
        setLoading(true);
        GetTheme(token)
            .then((data) => {
                if (data.data !== null) {
                    setThemeColor(JSON.parse(data.data.color));
                }
            })
            .catch((error) => {
                setAlertStatus({
                    severity: alertSeverity.ERROR
                    , message: error
                })
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <CommonContext.Provider value={{loading, setLoading, themeColor}}>
            <BrowserRouter basename='/'>
                <Loading open={loading}/>
                <AlertNotification alertStatus={alertStatus} setAlertStatus={setAlertStatus}/>
                <MainMenu/>
                <Container>
                    <Routes>
                        {routes.map((route) => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={route.element}
                            />
                        ))}
                    </Routes>
                </Container>
            </BrowserRouter>
        </CommonContext.Provider>
    );
}

export default App;