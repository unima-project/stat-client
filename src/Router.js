import {Home} from './components/Home';
import {Tool} from './components/Tools';
import {ErrorPage} from './components/commons/ErrorPage';
import {Login} from './components/Auths';
import {UserProfile} from './components/Users/UserProfile';
import {User} from './components/Users';
import {Token} from "./components/Token";
import {AboutEditor} from "./components/AboutEditor";
import {Themes} from "./components/Themes";

export const RoutePath = {
    home: '/'
    , tools: '/tools'
    , login: '/auths/login'
    , profiles: '/users/profiles'
    , users: '/users'
    , corpuses: '/corpuses'
    , tokens: '/tokens'
    , aboutEditor: '/about_editors'
    , themes: '/themes'
}

const routes = [
    {
        path: RoutePath.home
        , element: <Home />
        , errorElement: <ErrorPage />
    },
    {
        path: RoutePath.tools
        , element: <Tool />
    },
    {
        path: RoutePath.login
        , element: <Login />
    },
    {
        path: RoutePath.profiles
        , element: <UserProfile />
    },
    {
        path: RoutePath.users
        , element: <User />
    },
    {
        path: RoutePath.corpuses
        , element: <Tool />
    },
    {
        path: RoutePath.tokens
        , element: <Token />
    },
    {
        path: RoutePath.aboutEditor
        , element: <AboutEditor />
    },
    {
        path: RoutePath.themes
        , element: <Themes />
    }
];

export default routes;
