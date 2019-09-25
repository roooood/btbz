import React from 'react';

import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import Crash from './img/crash.svg';
import Coin from './img/coin.svg';
import Dice from './img/dice.svg';

import { t } from '../../locales';

let theme = createMuiTheme()
const styles = {
    title: {
        margin: theme.spacing(5),
        textTransform: 'uppercase',
    },
    container: {
        marginTop: theme.spacing(5),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        color: '#fff'
    },
    card: {
        maxWidth: 345,
        background: 'linear-gradient(90deg, rgba(36, 164, 234, 0.15) 10%, rgba(174, 110, 239, 0.15) 100%)'
    },
    media: {
        height: theme.spacing(25),
        backgroundSize: '50%'
    },
    games: {
        width: '100%'
    },
    action: {
        justifyContent: 'space-between'
    },
    play: {
        fontWeight: 'bold'
    }
};
theme = responsiveFontSizes(theme);

const gameList = [
    {
        name: t('crash'),
        logo: Crash
    },
    {
        name: t('dice'),
        logo: Dice
    },
    {
        name: t('coinFlip'),
        logo: Coin
    },
];
class Games extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Grid container style={styles.container} >
                <Grid container style={styles.title} justify="center">
                    <Typography align="center" variant="h2" color="textPrimary" >
                        {t('ourGames')}
                    </Typography >
                </Grid>
                <Grid container spacing={4} justify="center">
                    {gameList.map(item => {
                        return (
                            <Grid item xs={12} sm={6} md={4} align="center">
                                <Card style={styles.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            style={styles.media}
                                            image={item.logo}
                                            title={item.name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h3" component="h3" align="center">
                                                {item.name}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions style={styles.action}>
                                        <Button size="small" color="secondary" style={styles.play}>
                                            {t('paly')}
                                        </Button>
                                        <Button size="small" color="primary">
                                            {t('learnMore')}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>)
                    })}
                </Grid>
            </Grid>
        );
    }
}

export default Games;