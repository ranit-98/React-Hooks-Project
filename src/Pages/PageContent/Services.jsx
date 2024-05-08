import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Container from '@mui/material/Container';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ?   "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
}));

const Services = () => {
  // Fuction to get Service data from API
  const getService = async () => {
    const res = await axios.get(
      `${process.env.React_App_API_BASE_URL}/service`
    );
    return res?.data;
  };

  // React Query Function for Service data
  const {
    data: service,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["service"],
    queryFn: getService,
  });
  console.log(service?.data);
  return (
    <>
   
        <Container maxWidth="xl" sx={{ marginTop: "2rem" }}>
        <Typography variant="h4" align="center" gutterBottom>
        Services
      </Typography>
            <Grid container spacing={3}>
                {service?.data?.map((serviceData) => (
                    <Grid item xs={12} sm={6} md={4} key={serviceData?.id}>
                        <Card sx={{ height: "15rem", padding: "1rem" }}>
                            <CardContent>
                                <Typography variant="h5" color="text.primary" gutterBottom>
                                    {serviceData?.name}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {serviceData?.details}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </>
  );
};

export default Services;
