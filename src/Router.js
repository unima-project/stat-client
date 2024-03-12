import {Home} from './components/Home';
import {Tool} from  './components/Tool';
import {ErrorPage} from './components/ErrorPage';
import {Login} from './components/Auths';
import {Corpus} from './components/Corpuses';

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
        path: '/auth/login',
        element: <Login />
    },
    {
        path: '/corpuses',
        element: <Corpus />
    }
];

export default routes;
