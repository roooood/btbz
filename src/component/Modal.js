import React from 'react';
import autoBind from 'react-autobind';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fade from '@material-ui/core/Fade';

import Setting from '../route/setting/Setting';
import Login from '../route/sign/Login';
import Register from '../route/sign/Register';
const routs = { Login, Register, Setting }

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            component: null
        };
        autoBind(this);
        window.ee.on('hideHeaderModal', this.handleClose)
        window.ee.on('showHeaderModal', this.show)
    }
    handleClose() {
        this.setState({ open: false })
    }
    show(component) {
        this.setState({ open: true, component: routs[component] })
    }
    render() {
        return (
            <Dialog
                fullWidth={false}
                maxWidth={'md'}
                open={this.state.open}
                onClose={this.handleClose}
            >
                {/* <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle> */}
                <DialogContent>
                    <Fade timeout={1000}>
                        <this.state.component inModal={true} />
                    </Fade>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions> */}
            </Dialog>
        );
    }
}

export default Modal;