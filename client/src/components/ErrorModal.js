import * as React from 'react';
import AuthContext from '../auth'
import { useContext,useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import { GlobalStoreContext } from '../store'



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ErrorModal() {
    const [open, setOpen] = React.useState(true);
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext)
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        console.log("click");
        auth.closeModal();
        setOpen(false);
    }

    // useEffect(() => {
    //     if (auth.errorMessage) {
    //         handleOpen();
    //     }
    //   }, [])

    let show = false;
    let message = "";
    if (auth.errorMessage) {
        show = true
        message = auth.errorMessage
    }
    return (
        <Modal
            open={show}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Alert severity="error">{message}</Alert>
                <Button
                    variant="contained"
                    onClick={handleClose}>
                    Close
                </Button>
            </Box>
        </Modal>
    );
}