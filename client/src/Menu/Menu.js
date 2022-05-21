import * as React from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Tabs } from '@mui/material';

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

    const tabs = ["Feladatkezelő","Feladatbank","Bejelentkezés","Regisztráció","Feladatsoraim","Szerkesztett feladatsor","Profil","Kijelentkezés"]
    const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return (

<Box sx={{ width: '100%' }}>
  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
   <Tabs value={value} onChange={handleChange} aria-label="lab API tabs example">
     { tabs.map((tab,i)=> <Tab label={tab} index={i} />) }
    </Tabs> }
  </Box>
  <Box>
    { tabs.map((tab,i)=> <TabPanel value={value} index={i}>{tab}</TabPanel>)}
  </Box>
  </Box>
    );
}