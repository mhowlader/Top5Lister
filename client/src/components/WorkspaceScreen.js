import { useContext,useState } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [listName,setListName] = useState(store.currentList.name);
    const [listItems,setListItems] = useState(store.currentList.items);
    const [top5List, setTop5List] = useState(
        {
            listName: store.currentList.name,
            listItems: store.currentList.items
        }
    );

    let itemNames = [];
    function updateItem(index, name) {
        itemNames=[...listItems];
        itemNames[index]=name;
        setListItems(itemNames);
    }


    let editItems = "";
    if (store.currentList) {
        editItems =
            <List id="edit-items" sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
                {
                    store.currentList.items.map((item, index) => (
                        <Box sx={{ display: "inline-flex" }}>
                            <Typography variant="h4">{index+1}.</Typography>
                            <Top5Item
                                key={'top5-item-' + (index + 1)}
                                text={item}
                                index={index}
                                updateItemName = {updateItem}
                            />
                        </Box>
                    ))
                }
            </List>;
    }

    function handleUpdateListName(event) {
        setListName(event.target.value);
    }
    function handleSave(event) {
        setTop5List({
            listName:listName,
            listItems:itemNames
        });
        let tlist={
            listName:listName,
            listItems: listItems
        }
        store.saveList(store.currentList._id,tlist);
    }

    function handlePublish(event) {
        setTop5List({
            listName:listName,
            listItems:itemNames
        });

        let tlist={
            listName:listName,
            listItems: listItems
        }

        store.publishList(store.currentList._id,tlist);
    }
    return (
        <div id="top5-workspace">
            <Box sx={{width:1/2, m:1}}>
                <TextField 
                    fullWidth
                    inputProps={{ style: { fontSize: 32 } }}
                    id="list-name"
                    label= "List Name"
                    name="list-name"
                    className='top5-item'
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    defaultValue={store.currentList.name}
                    onChange={handleUpdateListName}
                
                />

            </Box>
            <div id="workspace-edit">
                {editItems} 
            </div>

            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button variant="contained" sx={{p: 1, m: 1,}} onClick={handleSave}>Save</Button>
                <Button variant="contained" sx={{p: 1, m: 1,}} onClick={handlePublish}>Publish</Button>

            </Box>
            
        </div>
    )
}

export default WorkspaceScreen;