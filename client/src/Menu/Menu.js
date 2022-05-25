import * as React from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Tabs } from '@mui/material';
import { Registration } from '../Registration/Registration';
import { Login } from '../Login/Login';
import Main from '../Main/Main';
import TaskList from '../TaskList/TaskList';
import TaskStorage from '../TaskStorage/TaskStorage';
import { Logout } from '../Logout/Logout';
import { logout, selectLoggedInUser } from '../state/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Profile } from '../Profile/Profile';

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



  

export function Menu() {
    const user = useSelector(selectLoggedInUser);
    const [value, setValue] = React.useState(0);
    const handleLogout = () => {
      
      dispatch(logout());
      setValue(0); 
  }
    const loggedOutTabs = ["Task Manager","Task storage","Login","Register"]
    const loggedInTabs = ["Task Manager","Task storage","My tasklists","Edited tasklist","Profile","Logout"]
    const loggedOutContents = [<Main/>,<TaskStorage/>,<Login/>,<Registration/>]
    const loggedInContents = [<Main/>,<TaskStorage/>,<TaskList/>,null,<Profile handler ={handleLogout}/>,<Logout handler ={handleLogout}/>]
    const [tabs, setTabs] = React.useState(loggedOutTabs);
    const [contents,setContents] = React.useState(loggedOutContents);

    const dispatch = useDispatch();

    
    React.useEffect(()=>
    {
      setTabs(user?loggedInTabs:loggedOutTabs)
      setContents(user?loggedInContents:loggedOutContents)
      console.log(user);
    },[user])


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return (

<Box sx={{ width: '100%' }}>
  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
   <Tabs value={value} onChange={handleChange} aria-label="lab API tabs example">
     { tabs.map((tab,i)=> <Tab key={i} label={tab} index={i} />) }
    </Tabs>
  </Box>
  <Box>
    { tabs.map((tab,i)=> <TabPanel key={i} value={value} index={i}>{contents[i]}</TabPanel>)}
  </Box>
  </Box>
    );
}

