import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from './component/Header';
import Footer from './component/Footer';

import Home from './route/home/Home';
import Login from './route/sign/Login';
import Register from './route/sign/Register';
import Setting from './route/setting/Setting';

import Crash from './route/crash/Crash';


class MyRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        // return (
        //     <Box display="flex" flex={1} alignItems="center" justifyContent="center" width="100%" height="100%" >
        //         <CircularProgress size={70} thickness={2} />
        //     </Box>
        // )
        return (
            <div>
                <Router>
                    <Header />
                    <Route exact path={'/'} component={Home} />
                    <Route exact path={'/login'} component={Login} />
                    <Route exact path={'/register'} component={Register} />
                    <Route exact path={'/setting'} component={Setting} />
                    <Route exact path={'/crash'} component={Crash} />
                </Router>
            </div>
        );
    }
}

export default MyRouter;