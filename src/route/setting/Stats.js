
import React from 'react';
import autoBind from 'react-autobind';

import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { t } from '../../locales';

import request from '../../helper/Fetch';

import { connect } from 'react-redux';
import { User } from '../../redux/action/user';

let theme = createMuiTheme()
const styles = {
    info: {
        backgroundColor: 'rgb(49, 49, 49)',
        color: '#fff',
        padding: theme.spacing(1)
    },
    bold: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    title: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: theme.spacing(2)
    },
    item: {
        marginRight: 5,
        fontWeight: 'bold',
        marginTop: theme.spacing(4)
    },
    label: {
        marginRight: 5
    },
}
const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: 'rgb(49, 49, 49)',
        color: theme.palette.common.white,
        textTransform: 'uppercase'
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        autoBind(this);
    }
    componentDidMount() {
        request('user/stats', { token: this.props.user.token }, res => {
            this.setState({ loading: false })
            if (res.success) {


            }
            else {

            }
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <Box justifyContent="center" display="flex">
                    <CircularProgress size={30} color="secondary" thickness={3} />
                </Box>
            )
        }
        return (
            <div >
                <Grid container alignItems="center">
                    <Grid item container style={styles.info} alignItems="center">
                        <Grid xs={6}  >
                            <Typography style={styles.bold} variant="h6" >
                                {this.props.user.username}
                            </Typography >
                        </Grid>
                        <Grid xs={6} align="right">
                            <Typography display="inline" color="secondary" style={styles.join}>
                                {t('joined')} :
                        </Typography >
                            <Typography display="inline" >-</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container alignItems="center" style={styles.item}>
                        <Grid xs={12} item >
                            <Typography style={styles.title}>
                                {t('performance')} :
                            </Typography >
                        </Grid>
                        <Grid xs={6}  >
                            <Typography display="inline" style={styles.label}>
                                {t('gamesPlayed')} :
                            </Typography >
                            <Typography display="inline" align="right">-</Typography>
                        </Grid>
                        <Grid xs={6} >
                            <Typography display="inline" style={styles.label}>
                                {t('totalWagered')} :
                            </Typography >
                            <Typography display="inline" align="right">- {t('bit')}</Typography>
                        </Grid>
                    </Grid>

                </Grid>
            </div>
        );
    }
}

export default connect(state => state)(Stats);