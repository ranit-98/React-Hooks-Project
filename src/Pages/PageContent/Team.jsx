import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Container,
  Grid,
} from "@mui/material";
import Layout from "../../CommonComponent/Layout";
import HourglassLoader from "../../CommonComponent/HourglassLoader";

const Team = ({ withLayout = true }) => {
  // Function to fetch team data from the API
  const getTeam = async () => {
    const res = await axios.get(`${process.env.React_App_API_BASE_URL}/team`);
    return res?.data;
  };

  // Use the useQuery hook to fetch data
  const {
    isLoading,
    isError,
    data: team,
  } = useQuery({
    queryKey: ["team"],
    queryFn: getTeam,
  });

  // Handle  error states

  if (isError) {
    return <p>Error loading data</p>;
  }

  //  Team content
  const teamContent = (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Our Team
      </Typography>
      <Container maxWidth="xl" style={{ marginTop: "2rem" }}>
        <Grid container spacing={2}>
          {team?.TeamMember?.map((member) => (
            <Grid item xs={12} sm={6} md={3} key={member._id}>
              <Card sx={{ maxWidth: 300 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="300"
                    image={`${process.env.React_App_API_BASE_URL}/team/photo/${member._id}`}
                    alt={member.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.possession}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );

  // Conditionally render the Layout wrapper based on the withLayout prop
  if (withLayout) {
    return (
      <Layout>
        {isLoading && <HourglassLoader />}
        {!isLoading && teamContent}
      </Layout>
    );
  } else {
    return teamContent;
  }
};

export default Team;
