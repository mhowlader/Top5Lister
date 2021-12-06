import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';



import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import Typography from '@mui/material/Typography';


export default function SplashScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    return (
        <div id="splash-screen">
            <Typography variant="h1" m={2} align="center">
                The Top 5 Lister
            </Typography>
            
            

            <Typography variant="h5">
                Welcome to the Top 5 Lister!

                Create, view, like, dislike Top 5 Lists to your hearts content.
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Button component={Link} variant="contained" to='/login' >
                        Login
                    </Button>
                </Grid>

                <Grid item xs={4}>
                    <Button xs={4} component={Link} variant="contained" to='/register' >
                        Register
                    </Button>
                </Grid>

                <Grid item xs={4}>
                    <Button xs={4} component={Link} variant="contained" to='/guest' >
                        Continue as Guest
                    </Button>
                </Grid>
            </Grid>
        </div>

    )
}