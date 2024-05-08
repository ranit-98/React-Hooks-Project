import React, { useEffect, useState } from "react";
import Layout from "../../CommonComponent/Layout";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/Auth";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import HourglassLoader from "../../CommonComponent/HourglassLoader";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Course = () => {
  const [auth] = useAuth();

  // State to manage image URLs for each course
  const [courseImages, setCourseImages] = useState({});

  // Function to get course details from the API
  const getCourseDetails = async () => {
    const response = await axios.get(
      `https://restapinodejs.onrender.com/api/course`,
      {
        headers: {
          "x-access-token": auth?.token,
        },
      }
    );
    return response?.data;
  };

  // Use the useQuery hook to fetch course data
  const {
    data: courseData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courseData"],
    queryFn: getCourseDetails,
  });

  // Function to fetch course image using the imageId
  const fetchCourseImage = async (course) => {
    if (!course || !course._id) return null;

    try {
      const response =course._id && await axios.get(
        `${process.env.React_App_API_BASE_URL}/course/photo/${course._id}`,
        {
          headers: {
            "x-access-token": auth?.token,
          },
          responseType: "blob",
        }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setCourseImages((prevImages) => ({
        ...prevImages,
        [course._id]: imageUrl,
      }));
    } catch (error) {
      console.error("Error fetching course image:", error);
    }
  };

  // Fetch course images when course data is available
  useEffect(() => {
    if (courseData?.Courses) {
      courseData.Courses.map((course) => {
        fetchCourseImage(course);
      });
    }
  }, [courseData?.Courses]);


  if (isError) {
    return <p>Error loading courses</p>;
  }

  return (
    <Layout>
        {isLoading && <HourglassLoader/>}
      {!isLoading &&<Container maxWidth="xl">
        <Typography variant="h4" align="center" gutterBottom>
          Our Courses
        </Typography>
        <Grid container spacing={2}>
          {courseData?.Courses?.map((course) => (
            <Grid item xs={12} sm={6} md={3} key={course._id}>
             
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="300"
                      src={courseImages[course._id]} 
                      alt={course.title}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {course.name}
                      </Typography>
                      <Typography variant="h6" component="div" gutterBottom>
                        ₹{course.fees}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.duration}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" variant="contained" style={{marginLeft:"7rem"}}>
                      Buy now
                    </Button>
                  </CardActions> 
                </Card>
            
            </Grid>
          ))}
        </Grid>
      </Container>}
    </Layout>
  );
};

export default Course;
