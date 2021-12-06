import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import FunctionsIcon from '@mui/icons-material/Functions';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';





/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    const [value, setValue] = useState(0);
    const [sort, setSort] = useState("Publish Date (Newest)");
    const [view, setView] = useState("0");

    const handleSelectView = (event, newValue) => {
        setView(newValue);
    };

    const handleSort = (event, newValue) => {
        setSort(event.target.value);
    };

    let listCard = "";
    if (store) {
        listCard =
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
                {
                    store.idNamePairs.map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                
                        />
                    ))
                }
            </List>;
    }
    return (
        <div id="top5-list-selector">
            <Box sx={{ borderBottom: 0.5, borderColor: 'divider', width: "100%", display: "inline-flex" }}>
                <Tabs value={view} onChange={handleSelectView} aria-label="basic tabs example" sx={{ width: "35%" }}>
                    <Tab icon={<HomeIcon />} label="Home" {...a11yProps(0)} />
                    <Tab icon={<PeopleIcon />} label="All" {...a11yProps(1)} />
                    <Tab icon={<PersonIcon />} label="Users" {...a11yProps(2)} />
                    <Tab icon={<FunctionsIcon />} label="Community" {...a11yProps(3)} />
                </Tabs>

                <Box sx={{ width: "35%" }}>
                    <TextField margin="normal" id="outlined-basic" label="Search" variant="outlined" fullWidth />
                </Box>

                <Box
                    sx={{
                        width: "30%",
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        p: 1,
                        m: 1
                    }}
                >
                    {/* <Typography variant="h5">SORT BY</Typography> */}
                    <FormControl sx={{width:3/4}}>
                        <InputLabel id="demo-simple-select-label">SORT BY</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sort}
                            label="SORT"
                            onChange={handleSort}
                        >
                            <MenuItem value={"Publish Date (Newest)"}>Publish Date (Newest)</MenuItem>
                            <MenuItem value={"Publish Date (Oldest)"}>Publish Date (Oldest)</MenuItem>
                            <MenuItem value={"Views"}>Views</MenuItem>
                            <MenuItem value={"Likes"}>Likes</MenuItem>
                            <MenuItem value={"Dislikes"}>Dislikes</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

            </Box>


            {/* <TabPanel value={value} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel> */}

            <div id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </div>


            <div id="list-selector-heading">
                <Fab
                    color="primary"
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </div>
        </div>)
}

export default HomeScreen;