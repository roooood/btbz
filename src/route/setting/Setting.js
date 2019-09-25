
import React from 'react';
import autoBind from 'react-autobind';

import { createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import { t } from '../../locales';

import request from '../../helper/Fetch';

import { connect } from 'react-redux';
import { User } from '../../redux/action/user';

import OverView from './OverView';
import Stats from './Stats';
import Security from './Security'

let theme = createMuiTheme()
const styles = {
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}
class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            tab: 2,

            username: '',
            password: '',

            uError: false,
            pError: false,

            uHelp: null,
            pHelp: null,
        };
        autoBind(this);
    }
    handleChange(e, tab) {
        this.setState({ tab })
    }
    handleChangeIndex(tab) {
        this.setState({ tab })
    }
    notify(data) {
        window.ee.emit('notify', data)
    }
    goto(Component, e) {
        if ('inModal' in this.props) {
            e.preventDefault()
            window.ee.emit('showHeaderModal', Component);
        }
    };
    render() {
        return (
            <Container component="main" maxWidth="md">
                <div style={styles.paper}>
                    <Tabs
                        value={this.state.tab}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        centered
                    >
                        <Tab label={t('overView')} />
                        <Tab label={t('stats')} />
                        <Tab label={t('security')} />

                    </Tabs>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={this.state.tab}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <TabPanel value={this.state.tab} index={0} dir={theme.direction}>
                            <OverView />
                        </TabPanel>
                        <TabPanel value={this.state.tab} index={1} dir={theme.direction}>
                            <Stats />
                        </TabPanel>
                        <TabPanel value={this.state.tab} index={2} dir={theme.direction}>
                            <Security/>
                         </TabPanel>
                    </SwipeableViews>
                </div>
            </Container>

        );
    }
}

export default connect(state => state)(Setting);