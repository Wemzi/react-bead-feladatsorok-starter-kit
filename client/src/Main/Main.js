import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function Main() {
  return (
      <>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Task Manager
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Are you a teacher? Manage your super cool super important tasks of your students here.
                Get real time and efficient feedbacks with state of the art solutions from Lukacs Gmbh.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
            </Stack>
          </Container>
        </Box>
        </>
  );
}