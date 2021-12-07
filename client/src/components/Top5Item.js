import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [draggedTo, setDraggedTo] = useState(0);
    const [text, setText] = useState("");

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let index = event.target.id.substring("list-".length);
            let text = event.target.value;
            store.addUpdateItemTransaction(index - 1, text);
        }
    }

    


    let editStatus = false;
    if (store.isItemEditActive) {
        editStatus = true;
    }
    let { index,updateItemName } = props;

    function handleUpdateText(event) {
        setText(event.target.value);
        updateItemName(index,event.target.value);
    }

    let itemClass = "top5-item";
    

    let cardElement =
        <TextField
            margin="normal"
            required
            fullWidth
            id={"item-" + (index + 1)}
            label={"Item #" + (index + 1)}
            name="item"
            autoComplete="Top 5 List Item"
            className='top5-item'
            onKeyPress={handleKeyPress}
            onChange={handleUpdateText}
            defaultValue={props.text}
            inputProps={{ style: { fontSize: 32 } }}
            InputLabelProps={{ style: { fontSize: 24 } }}
            autoFocus
        />

    return (
        cardElement
    );
}

export default Top5Item;