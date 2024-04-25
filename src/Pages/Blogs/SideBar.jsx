import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/Auth";
import axios from "axios";
import { Link } from "react-router-dom";
import { Paper, Box } from "@mui/material";
import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
const style = {
  py: 0,
  width: "100%",
  maxWidth: 360,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};


const SideBar = () => {
  
  const [auth] = useAuth();
  // State to manage image URLs for each course
  const [courseImages, setCourseImages] = useState({});
  //Function to get Category Details
  const getAllCategories = async () => {
    const res = await axios.get(
      `https://restapinodejs.onrender.com/api/showallcategory`,
      {
        headers: {
          "x-access-token": auth?.token,
        },
      }
    );
    return res?.data;
  };

  // React Query Hook to fetch the Category Data
  const {
    isLoading,
    isError,
    data: categories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  //Fuction to get the Recent Post Data from API
  const getRecentPost = async () => {
    const response = await axios.get(
      `https://restapinodejs.onrender.com/api/letest-post`,
      {
        headers: {
          "x-access-token": auth?.token,
        },
      }
    );
    return response?.data;
  };

  //React Query Hook to fetch the Recent Post Data
  const {
    data: recentPost,
    isLoading: recentPostLoading,
    isError: recentPostError,
  } = useQuery({
    queryKey: ["recentPost"],
    queryFn: getRecentPost,
  });

  // Function to fetch Recent Post image using the imageId
  const fetchCourseImage = async (course) => {
    if (!course || !course._id) return null;
    //console.log("recent Post",course?._id);
    try {
      const response =
        course._id &&
        (await axios.get(
          `https://restapinodejs.onrender.com/api/blog/image/${course?._id}`,
          {
            headers: {
              "x-access-token": auth?.token,
            },
            responseType: "blob",
          }
        ));

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
  React.useEffect(() => {
    if (recentPost?.data) {
      recentPost?.data?.map((course) => {
        fetchCourseImage(course);
      });
    }
  }, [recentPost?.data._id]);
  //console.log("recent page", recentPost);

  return (
    <>
      <List sx={style}>
        <ListItem
          style={{
            textAlign: "center",
            color: "white",
            backgroundColor: "black",
          }}
        >
          <ListItemText primary="Category" />
        </ListItem>
        {categories?.data?.map((category) => {
          return (
            <>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/category/${category?._id}`}
              >
                <ListItem style={{ textAlign: "center" }}>
                  <ListItemText primary={category?.category} />
                </ListItem>
              </Link>
              <Divider component="li" />
            </>
          );
        })}
      </List>
      <h3 style={{color:"white",backgroundColor:"black"}}>Recent Posts</h3>

      <Box>
        {recentPost?.data?.map((post, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{ marginBottom: 2, padding: 2 }}
          >
            <Box>
            {courseImages[post?._id] ? (
                  <img
                    src={courseImages[post?._id]}
                    alt={`Image for ${post?.title}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "4px",
                    }}
                  />
                ) : (
                  // Render Skeleton while image is loading
                  <Skeleton variant="rectangular" width="100%" height={200} />
                )}
            </Box>
            <Box sx={{ marginTop: 1 }}>
              <h6
                style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}
              >
                <Link to={`/blog-details/${post?._id}`} style={{color:"black"}}>
                  {post?.title}
                </Link>
              </h6>
              <time
                datetime={post?.date}
                style={{ fontSize: "0.85rem", color: "#6c757d" }}
              >
                {new Date(post?.createdAt).toLocaleDateString()} at {}
                 {new Date(post?.createdAt).toLocaleTimeString()}
              </time>
            </Box>
          </Paper>
        ))}
      </Box>
    </>
  );
};
export default SideBar;


