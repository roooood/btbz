
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
        textTransform: 'uppercase'
    },
    label: {
        textTransform: 'uppercase',
        marginRight: 5
    },
    item: {
        textTransform: 'uppercase',
        marginRight: 5,
        fontWeight: 'bold',
        marginTop: theme.spacing(4)
    }
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

class OverView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
        autoBind(this);
    }
    componentDidMount() {
        request('user/overview', { token: this.props.user.token }, res => {
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
                            <Typography display="inline" color="secondary" style={styles.label}>
                                {t('joined')} :
                        </Typography >
                            <Typography display="inline" >-</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={styles.item}>
                            {t('balance')} :
                            </Typography >
                        <Typography >-</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={styles.item}>
                            {t('breakdown')} :
                            </Typography >
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>{t('type')}</StyledTableCell>
                                    <StyledTableCell align="right">{t('bit')}</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow >
                                    <StyledTableCell component="th" scope="row">
                                        {t('withdraw')}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">-</StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow >
                                    <StyledTableCell component="th" scope="row">
                                        {t('deposit')}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">-</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default connect(state => state)(OverView);