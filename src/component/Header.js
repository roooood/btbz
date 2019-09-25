
import React from 'react';
import autoBind from 'react-autobind';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Hidden from '@material-ui/core/Hidden';
import MenuItem from '@material-ui/core/MenuItem';
import { createMuiTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import Games from '@material-ui/icons/Games';
import BarChart from '@material-ui/icons/BarChart';
import HelpOutline from '@material-ui/icons/HelpOutline';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PermIdentity from '@material-ui/icons/PermIdentity';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Settings from '@material-ui/icons/Settings';
import AttachMoney from '@material-ui/icons/AttachMoney';

import { t } from '../locales';

import Modal from './Modal';

import { connect } from 'react-redux';
import { User } from '../redux/action/user';

let theme = createMuiTheme()
const styles = {
    root: {
        flexGrow: 1,
    },
    appbar: {
        background: 'linear-gradient( 135deg, #24a4ea 10%, #ae6eef 100%)'
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        flexGrow: .1,
    },
    button: {
        margin: theme.spacing(.5),
        color: '#fff'
    },
    bold: {
        fontWeight: 500
    },
    subIcon: {
        fontSize: 20,
        marginRight: theme.spacing(1),
    }
};

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            help: null,
            account: null,
            menu: false
        };
        autoBind(this);
    }
    openMenu() {
        this.setState({ menu: true })
    }
    hideMenu() {
        this.setState({ menu: false })
    }
    openHelp(event) {
        this.setState({ help: event.currentTarget })
    }
    closeHelp() {
        this.setState({ help: null })
    }
    openAccount(event) {
        this.setState({ account: event.currentTarget })
    }
    closeAccount() {
        this.setState({ account: null })
    }
    logOut() {
        this.closeAccount();
        this.props.dispatch(User(null));
    }
    goto(Component, e) {
        this.closeAccount();
        this.closeHelp();
        if (e)
            e.preventDefault()
        this.modal.show(Component)
    };

    render() {
        return (
            <div style={styles.root}>
                <Modal ref={r => this.modal = r} />
                <AppBar position="static">
                    <Toolbar style={styles.appbar}>
                        <Hidden only={['md', 'lg', 'xl']}>
                            <IconButton onClick={this.openMenu} edge="start" style={styles.menuButton} color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                        <Typography variant="h6" style={styles.title} >
                            {t('brand')}
                        </Typography>
                        <Hidden only={['xs', 'sm']}>
                            <Button style={styles.button} >
                                <Games />
                                {t('games')}
                            </Button>
                            <Button style={styles.button}>
                                <SwapHoriz />
                                {t('cashier')}
                            </Button>
                            <Button style={styles.button} >
                                <BarChart />
                                {t('statistics')}
                            </Button>
                            <Button style={styles.button} onClick={this.openHelp}>
                                <HelpOutline />
                                {t('help')}
                            </Button>
                            <Menu
                                open={Boolean(this.state.help)}
                                anchorEl={this.state.help}
                                onClose={this.closeHelp}
                            >
                                <MenuItem onClick={this.closeHelp}>{t('faq')}</MenuItem>
                                <MenuItem onClick={this.closeHelp}>{t('support')}</MenuItem>
                                <MenuItem onClick={this.closeHelp}>{t('help')}</MenuItem>
                            </Menu>
                        </Hidden>
                        <div style={styles.grow} />
                        {this.props.user.isLogin
                            ? <div>
                                <Button style={styles.button} onClick={this.openAccount}>
                                    <PermIdentity />
                                    <Typography style={styles.bold} >{this.props.user.username}</Typography>
                                </Button>
                                <Menu
                                    open={Boolean(this.state.account)}
                                    anchorEl={this.state.account}
                                    onClose={this.closeAccount}
                                >
                                    <MenuItem >
                                        <Link to="/setting" onClick={(e) => this.goto('Setting', e)}>
                                            <Settings style={styles.subIcon} />{t('setting')}
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={this.logOut}><PowerSettingsNew style={styles.subIcon} />{t('logOut')}</MenuItem>
                                </Menu>
                                <Button style={styles.button} >
                                    <AttachMoney />
                                    <Typography>{this.props.user.balance || 0}</Typography>
                                </Button>
                            </div>
                            : <div>
                                <Link to="/register" onClick={(e) => this.goto('Register', e)}>
                                    <Button style={styles.button}>{t('register')}</Button>
                                </Link>
                                <Link to="/login" onClick={(e) => this.goto('Login', e)}>
                                    <Button style={styles.button}>{t('login')}</Button>
                                </Link>
                            </div>
                        }
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.menu} onClose={this.hideMenu}>
                    <div
                        role="presentation"
                        onClick={this.hideMenu}
                        onKeyDown={this.hideMenu}
                    >
                        <List>
                            <ListItem button >
                                <ListItemIcon><Games /></ListItemIcon>
                                <ListItemText primary={t('games')} />
                            </ListItem>
                            <ListItem button >
                                <ListItemIcon><SwapHoriz /></ListItemIcon>
                                <ListItemText primary={t('cashier')} />
                            </ListItem>
                            <ListItem button >
                                <ListItemIcon><BarChart /></ListItemIcon>
                                <ListItemText primary={t('statistics')} />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem button >
                                <ListItemIcon><HelpOutline /></ListItemIcon>
                                <ListItemText primary={t('faq')} />
                            </ListItem>
                            <ListItem button >
                                <ListItemIcon><HelpOutline /></ListItemIcon>
                                <ListItemText primary={t('support')} />
                            </ListItem>
                            <ListItem button >
                                <ListItemIcon><HelpOutline /></ListItemIcon>
                                <ListItemText primary={t('help')} />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default connect(state => state)(Header);