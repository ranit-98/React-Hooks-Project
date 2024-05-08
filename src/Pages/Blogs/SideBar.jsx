
import React,{useEffect} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../Context/Auth";
import axios from "axios";
import { Link } from "react-router-dom";
import { Paper, Box } from "@mui/material";
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
  const [courseImages, setCourseImages] = React.useState({});
  
  // Function to get all categories
  const getAllCategories = async () => {
    const res = await axios.get(
      `${process.env.React_App_API_BASE_URL}/showallcategory`,
      {
        headers: {
          "x-access-token": auth?.token,
        },
      }
    );
    return res?.data;
  };

  // React Query Hook for categories
  const { isLoading: categoriesLoading, data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  // Function to get recent post data
  const getRecentPost = async () => {
    const response = await axios.get(
      `${process.env.React_App_API_BASE_URL}/letest-post`,
      {
        headers: {
          "x-access-token": auth?.token,
        },
      }
    );
    return response?.data;
  };

  // React Query Hook for recent posts
  const {
    data: recentPost,
    isLoading: recentPostLoading,
  } = useQuery({
    queryKey: ["recentPost"],
    queryFn: getRecentPost,
  });

  // Function to fetch course images
  const fetchCourseImage = async (course) => {
    if (!course || !course._id) return null;
    try {
      const response =
        course._id &&
        (await axios.get(
          `${process.env.React_App_API_BASE_URL}/blog/image/${course?._id}`,
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

  // Use effect to fetch course images when recent posts are available
  useEffect(() => {
    if (recentPost?.data) {
      recentPost?.data?.forEach((course) => {
        fetchCourseImage(course);
      });
    }
  }, [recentPost?.data]);

  return (
    <>
      {categoriesLoading ? (
        // Skeleton loading for categories
        <Skeleton variant="rectangular" width="100%" height={450} />
      ) : (
        <List sx={style}>
          <ListItem style={{ textAlign: "center", color: "white", backgroundColor: "black" }}>
            <ListItemText primary="Category" />
          </ListItem>
          {categories?.data?.map((category) => (
            <>
              <Link to={`/category/${category?._id}`} style={{ textDecoration: "none", color: "black" }}>
                <ListItem style={{ textAlign: "center" }}>
                  <ListItemText primary={category?.category} />
                </ListItem>
              </Link>
              <Divider component="li" />
            </>
          ))}
        </List>
      )}
      
      <h3 style={{color:"white", backgroundColor:"black"}}>Recent Posts</h3>
      
      <Box>
        {recentPostLoading ? (
          // Skeleton loading for recent posts
          <Skeleton variant="rectangular" width="100%" height={300} count={3} />
        ) : (
          recentPost?.data?.map((post, index) => (
            <Paper key={index} elevation={2} sx={{ marginBottom: 2, padding: 2 }}>
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
                <h6 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>
                  <Link to={`/blog-details/${post?._id}`} style={{color: "black"}}>
                    {post?.title}
                  </Link>
                </h6>
                <time style={{ fontSize: "0.85rem", color: "#6c757d" }}>
                  {new Date(post?.createdAt).toLocaleDateString()} at 
                  {new Date(post?.createdAt).toLocaleTimeString()}
                </time>
              </Box>
            </Paper>
          ))
        )}
      </Box>
    </>
  );
};

export default SideBar;
