
import React from 'react';
import autoBind from 'react-autobind';

import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { t } from '../../locales';

import request from '../../helper/Fetch';
import { emailPattern } from '../../helper';
import { connect } from 'react-redux';
import { User } from '../../redux/action/user';

let theme = createMuiTheme()
const styles = {
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    delete: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    }
}


class Security extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            expanded: 'panel3',

            password: null,
            newPass: null,
            pError: false,
            pHelp: null,

            email: '',
            eError: false,
            eHelp: null,

            confirmDelete:false,
        };
        autoBind(this);
    }

    tabHide() {
        this.setState({ expanded: false });
    }
    tabChange(panel) {
        if (this.state.loading)
            return;
        return (event, isExpanded) => {
            this.setState({ expanded: isExpanded ? panel : false });
        }
    }

    changeOldPassword(e) {
        this.setState({ password: e.target.value })
    }
    changeNewPassword(e) {
        this.setState({ newPass: e.target.value }, () => {
            let short = this.state.newPass.length < 8;
            this.setState({
                pError: short,
                pHelp: short ? t('passwordIsShort') : null
            });
        })
    }
    savePassword() {
        this.setState({ loading: true });
        let { password, newPass } = this.state;
        request('user/password_change', { token: this.props.user.token, password, newPass }, res => {
            this.setState({ loading: false })
            if (res.success) {
                this.notify({ message: t(res.message), type: 'success' });
            }
            else {
                this.notify({ message: t(res.message), type: 'error' });
            }
        });
    }

    changeEmail(e) {
        this.setState({ email: e.target.value.toLowerCase() }, () => {
            let valid = !emailPattern.test(this.state.email);
            this.setState({
                eError: valid,
                eHelp: valid ? t('emailIsInvalid') : null
            });
        })
    }
    checkEmail() {
        if (this.state.email.length < 4 || this.state.eError)
            return;
        request('user/email_check', { email: this.state.email }, res => {
            this.setState({
                eError: !res.success,
                eHelp: t(res.message)
            });
        });
    }
    saveEmail() {
        this.setState({ loading: true });
        let { password, email } = this.state;
        request('user/email_change', { token: this.props.user.token, password, email }, res => {
            this.setState({ loading: false })
            if (res.success) {
                this.notify({ message: t(res.message), type: 'success' });
            }
            else {
                this.notify({ message: t(res.message), type: 'error' });
            }
        });
    }

    showConfirmDelete() {
        this.setState({ confirmDelete: true });
    }
    hideConfirmDelete() {
        this.setState({ confirmDelete: false });
    }
    deleteAccount() {
        this.setState({ loading: true });
        let { password } = this.state;
        request('user/delete_account', { token: this.props.user.token, password }, res => {
            this.setState({ loading: false })
            if (res.success) {
                this.notify({ message: t(res.message), type: 'success' });
            }
            else {
                this.notify({ message: t(res.message), type: 'error' });
            }
        });
    }
    notify(data) {
        window.ee.emit('notify', data)
    }
    render() {
        return (
            <div style={styles.root}>
                <ExpansionPanel expanded={this.state.expanded === 'panel1'} onChange={this.tabChange('panel1')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography style={styles.heading}>{t('updatePassword')}</Typography>
                        <Typography style={styles.secondaryHeading}></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={this.changeOldPassword}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label={t('currentPassword')}
                                    type="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={this.changeNewPassword}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    error={this.state.pError}
                                    fullWidth
                                    name="npassword"
                                    label={t('newPassword')}
                                    type="password"
                                    autoComplete="current-password"
                                    helperText={this.state.pHelp}
                                />
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions>
                        <Button size="small" onClick={() => this.tabHide()}>{t('cancel')}</Button>
                        <Button size="small" color="primary" onClick={() => this.savePassword()}>
                            {this.state.loading ? <CircularProgress color="secondary" size={18} thickness={3} /> : t('save')}
                        </Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
                <ExpansionPanel expanded={this.state.expanded === 'panel2'} onChange={this.tabChange('panel2')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography style={styles.heading}>{t('updateEmail')}</Typography>
                        <Typography style={styles.secondaryHeading}></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={this.changeOldPassword}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label={t('currentPassword')}
                                    type="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={this.changeEmail}
                                    onBlur={this.checkEmail}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    error={this.state.eError}
                                    fullWidth
                                    id="email"
                                    label={t('recoveryEmail')}
                                    name="email"
                                    autoComplete="email"
                                    helperText={this.state.eHelp}
                                />
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions>
                        <Button size="small" onClick={() => this.tabHide()}>{t('cancel')}</Button>
                        <Button size="small" color="primary" onClick={() => this.saveEmail()}>
                            {this.state.loading ? <CircularProgress color="secondary" size={18} thickness={3} /> : t('save')}
                        </Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
                <ExpansionPanel expanded={this.state.expanded === 'panel3'} onChange={this.tabChange('panel3')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography style={styles.heading}>{t('deleteAccount')}</Typography>
                        <Typography style={styles.secondaryHeading}></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {t('deleteAccountDesc')}
                    </ExpansionPanelDetails>
                    <Button fullWidth variant="outlined" onClick={this.showConfirmDelete} color="secondary" style={styles.delete}>
                        {t('delete')}
                    </Button>
                    <Dialog open={this.state.confirmDelete} onClose={this.hideConfirmDelete} >
                        <DialogTitle>{t('confirmDelete')}</DialogTitle>
                        <DialogContent>
                            <DialogContentText> {t('confirmDeleteDesc')}</DialogContentText>
                            <TextField
                                onChange={this.changeOldPassword}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label={t('currentPassword')}
                                type="password"
                                autoComplete="current-password"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.hideConfirmDelete} color="primary">
                                {t('cancel')}
                            </Button>
                            <Button onClick={this.deleteAccount} color="secondary" >
                                {this.state.loading ? <CircularProgress color="secondary" size={18} thickness={3} /> : t('delete')}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </ExpansionPanel>
            </div>
        );
    }
}

export default connect(state => state)(Security);