import React from 'react';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


import Logo from './img/logo.png';
import Bg from './img/bg.png';
import End from './img/end.svg';

import { t } from '../../locales';
import Games from '../games/Games';

let theme = createMuiTheme()
const styles = {
    landing: {
        position: 'relative',
        paddingTop: 50,
        paddingBottom: 20,
        backgroundBlendMode: 'overlay',
        background: 'url(' + Bg + '),linear-gradient(90deg, #24a4ea 10%, #ae6eef 100%)'
    },
    end: {
        display: 'block',
        position: 'absolute',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        background: 'url(' + End + ')',
        backgroundSize: '100% 350px',
        bottom: 0,
        height: 350,
        zIndex: 1,
        backgroundSize: '100% 140px',
        height: 140,
    },
    description: {
        marginTop: theme.spacing(2),
    },
    logo: {
        width: theme.spacing(50),
    },
    container: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        color: '#fff'
    },
    brand: {
        marginRight: 10,
    },
};
theme = responsiveFontSizes(theme);

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <>
                <div style={styles.landing} >
                    <ThemeProvider theme={theme}>
                        <Grid container style={styles.container} >
                            <Grid item xs={6}>
                                <Typography display="inline" variant="h2" style={styles.brand} >
                                    {t('brand')} ,
                                </Typography >
                                <Typography display="inline" variant="h4" >
                                    {t('cryptoCasino')}
                                </Typography >
                                <Typography variant="h6" style={styles.description}>
                                    Just Sign Up now , play online and get free bonuses
                        </Typography>

                            </Grid>
                            <Grid item xs={6} container direction="row" justify="flex-end">
                                <img src={Logo} style={styles.logo} />
                            </Grid>
                        </Grid>
                        <div style={styles.end}></div>
                    </ThemeProvider>
                </div>
                <Games />
            </>
        );
    }
}

export default Home;