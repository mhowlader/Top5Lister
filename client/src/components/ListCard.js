import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;
    const [newComment, setNewComment] = useState("");

    const [expanded, setExpanded] = useState(false);


    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    function like() {
        store.like();
    }

    

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleExpand(event) {
        //event.stopPropagation();
        if (!expanded) {
            setExpanded(true);
            if (idNamePair.published) {
                store.incrementView(idNamePair._id);
            }
        } else {
            setExpanded(false);
        }


    }

    function handleComment(event) {
        if (event.code === "Enter") {
            //let index = event.target.id.substring("list-".length);
            let text = event.target.value;
            setNewComment(text);
            store.addNewComment(text, idNamePair._id);
        }
    }



    function doNothing(event) {
        let hello = "hello";
    }
    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let editList = null;
    let views = null;
    let dates = null;
    if (!idNamePair.published) {
        editList =
            <IconButton id={idNamePair._id} onClick={(event) => { handleLoadList(event, idNamePair._id) }} aria-label='edit'>
                <EditIcon style={{ fontSize: '48pt' }} />
            </IconButton>
    } else {
        views = <Typography sx={{m:1}}> {"Views: " + idNamePair.views} </Typography>
        dates = <Typography sx={{m:1}}> {"Publish Date: " + idNamePair.date} </Typography>
    }

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            style={{ width: '100%' }}
            button
            // onClick={(event) => {
            //     handleLoadList(event, idNamePair._id)
            // }
            // }
            style={{
                fontSize: '48pt'
            }}
        >

            <Accordion onClick={doNothing} expanded={expanded} TransitionProps={{ unmountOnExit: true }} sx={{ width: 10 / 10 }}>
                <AccordionSummary sx={{ display: "flex" }}>
                    <Box sx={{ width: 5 / 10, p: 1 }}>{idNamePair.name}</Box>
                    {dates}
                    <Box sx={{ p: 1, width: 2 / 10, display: 'flex' }}>

                        <IconButton onClick={handleToggleEdit} aria-label='edit'>
                            <ThumbUpIcon style={{ fontSize: '24pt' }} />
                        </IconButton>
                        <Typography> {idNamePair.likes.length} </Typography>

                        
                        <IconButton onClick={handleToggleEdit} aria-label='edit'>
                            <ThumbDownIcon style={{ fontSize: '24pt' }} />
                        </IconButton>

                        <Typography> {idNamePair.dislikes.length} </Typography>

                        {views}

                        

                        {editList}
                    </Box>
                    <Box sx={{ p: 1, width:3/10}}>
                        <IconButton onClick={(event) => {
                            handleDeleteList(event, idNamePair._id)
                        }} aria-label='delete'>
                            <DeleteIcon style={{ fontSize: '48pt' }} />
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={(event) => {
                            handleExpand(event)
                        }} aria-label='delete'>
                            <ExpandMoreIcon style={{ fontSize: '48pt' }} />
                        </IconButton>
                    </Box>


                </AccordionSummary>
                <AccordionDetails>
                    <Grid container sx={{ height: 250 }}>
                        <Grid item xs={6}>
                            <List>
                                {
                                    idNamePair.items.map((item, index) => (
                                        <ListItem disablePadding>
                                            <ListItemText primary={(index + 1) + ". " + item} />
                                        </ListItem>
                                    ))
                                }

                            </List>
                        </Grid>
                        <Grid item xs={6} sx={{ maxHeight: "100%", overflow: "auto" }}>
                            <List>
                                {
                                    idNamePair.comments.map((comment) => (
                                        <ListItem disablePadding>
                                            <ListItemText primary={comment.body} secondary={comment.username} />
                                        </ListItem>
                                    ))

                                }

                            </List>
                            <TextField
                                margin="normal"
                                fullWidth
                                onKeyPress={handleComment}
                                label="Add Comment"
                            >

                            </TextField>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>



        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{ style: { fontSize: 48 } }}
                InputLabelProps={{ style: { fontSize: 24 } }}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;