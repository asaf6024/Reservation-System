import * as React from 'react';
//css
import './nav.css'

//MUI
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const Nav = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);

    }
    const LinkTab = (props) => {
        return (
            <Tab
                component="a"
                onClick={(event) => {
                    event.preventDefault();
                }}
                {...props}
            />
        );
    }

    return (
        <Box sx={{ width: '100%' }} className='nav'>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
                <LinkTab label="Reservation System" href=" /" className='navItem' />
                <img src='/Group.png' className='grpupImage' alt='group' />
            </Tabs>
        </Box>
    );
}
export default Nav