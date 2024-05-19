import {Home} from './components/Home';
import {Tool} from './components/Tools';
import {ErrorPage} from './components/commons/ErrorPage';
import {Login} from './components/Auths';
import {UserProfile} from './components/Users/UserProfile';
import {User} from './components/Users';
import {Token} from "./components/Token";
import {AboutEditor} from "./components/AboutEditor";
import {Themes} from "./components/Themes";

const routes = [
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />
    },
    {
        path: '/tools',
        element: <Tool />
    },
    {
        path: '/auths/login',
        element: <Login />
    },
    {
        path: '/users/profiles',
        element: <UserProfile />
    },
    {
        path: '/users',
        element: <User />
    },
    {
        path: '/corpuses',
        element: <Tool />
    },
    {
        path: '/tokens',
        element: <Token />
    },
    {
        path: '/about_editor',
        element: <AboutEditor />
    },
    {
        path: '/themes',
        element: <Themes />
    }
];

export default routes;
