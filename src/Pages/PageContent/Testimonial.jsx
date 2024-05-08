import axios from "axios";
import React from "react";
import Layout from "../../CommonComponent/Layout";
import { useQuery } from "@tanstack/react-query";
import { Avatar,Card, CardContent, CardMedia, Typography, CardActionArea, Box } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import HourglassLoader from "../../CommonComponent/HourglassLoader";

const Testimonial = ({ withLayout = true }) => {
    // Function to fetch testimonials from the API
    const getTestimonial = async () => {
        const res = await axios.get(`${process.env.React_App_API_BASE_URL}/testimonial`);
        return res?.data;
    };

    // Use the useQuery hook to fetch data
    const { isLoading, isError, data: testimonialData } = useQuery({
        queryKey: ["testimonial"],
        queryFn: getTestimonial,
    });

    // Handle  error states
    
    if (isError) {
        return <p>Error loading data</p>;
    }

    // Render the testimonial content
    const testimonialContent = (
        // <Container maxWidth="xl" sx={{ marginTop: 4 }}>
        //     <Typography variant="h1" align="center" gutterBottom>
        //         Testimonials
        //     </Typography>
        //     <Grid container spacing={4}>
        //         {testimonialData?.testimonials?.map((member) => (
        //             <Grid item xs={12} sm={6} md={4} key={member._id}>
        //                 <Card sx={{ height: "100%", borderRadius: 2, boxShadow: 3 }}>
        //                     <CardActionArea>
        //                         <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
        //                             <CardMedia
        //                                 component="img"
        //                                 height="450"
        //                                 width="300"
        //                                 image={`https://restapinodejs.onrender.com/api/testimonials/photo/${member._id}`}
        //                                 alt={member.name}
        //                                 style={{
        //                                     borderRadius: "50%",
        //                                     objectFit: "cover",
        //                                 }}
        //                             />
        //                         </Box>
        //                         <CardContent sx={{ textAlign: "center", paddingBottom: 2 }}>
        //                             <Typography variant="h6" gutterBottom>
        //                                 {member.name}
        //                             </Typography>
        //                             <Typography variant="body2" color="text.secondary" gutterBottom>
        //                                 {member.position}
        //                             </Typography>
        //                             <Typography variant="body2" color="text.secondary">
        //                                 "{member.talk}"
        //                             </Typography>
        //                         </CardContent>
        //                     </CardActionArea>
        //                 </Card>
        //             </Grid>
        //         ))}
        //     </Grid>
        // </Container>
       
<Container maxWidth="xl" sx={{ marginTop: 4 }}>
    <Typography variant="h4" align="center" gutterBottom>
        What Our Clients Say
    </Typography>
    <Grid container spacing={4}>
        {testimonialData?.testimonials?.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member._id}>
                <Card sx={{ height: "100%", borderRadius: 2, boxShadow: 3 }}>
                    <CardActionArea>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 2 }}>
                            <Avatar
                                src={`https://restapinodejs.onrender.com/api/testimonials/photo/${member._id}`}
                                alt={member.name}
                                sx={{ width: 150, height: 150, marginBottom: 2 }}
                            />
                            <CardContent sx={{ textAlign: "center" }}>
                                <Typography variant="h6" gutterBottom>
                                    {member.name}
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    {member.position}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
                                    "{member.talk}"
                                </Typography>
                            </CardContent>
                        </Box>
                    </CardActionArea>
                </Card>
            </Grid>
        ))}
    </Grid>
</Container>


    );

    // Conditionally render the Layout wrapper based on the withLayout prop
    if (withLayout) {
        return (
            <Layout>
                {isLoading && <HourglassLoader/>}
                {!isLoading && testimonialContent}
            </Layout>
        );
    } else {
        return testimonialContent;
    }
};

export default Testimonial;
