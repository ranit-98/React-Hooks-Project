import React from 'react';
import { Container, Grid, Paper, Avatar, Typography, Box } from '@mui/material';
import { useAuth } from '../../Context/Auth';
import Layout from '../../CommonComponent/Layout';

const Profile = () => {
  const [auth] = useAuth();
  const [imageLoaded, setImageLoaded] = React.useState(true);

  const handleImageLoadError = () => {
    setImageLoaded(false);
  };

  return (
    <Layout>
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
            {imageLoaded ? (
              <Avatar
                alt={auth?.user?.name}
                src={`https://restapinodejs.onrender.com/${auth?.user?.photo}`}
                sx={{ width: 220, height: 220 }}
                onError={handleImageLoadError}
              />
            ) : (
              <Avatar
                alt={auth?.user?.name}
                src="img/profilepic.png"
                sx={{ width: 220, height: 220 }}
              />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Box>
              <Typography variant="h4" component="h2" gutterBottom>
                {auth?.user?.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Email: {auth?.user?.email}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Phone: {auth?.user?.mobile}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                ID: {auth?.user?._id}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </Layout>
  );
};

export default Profile;
