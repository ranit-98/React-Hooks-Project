
import React from "react";
import Layout from "../../CommonComponent/Layout";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link, useParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import HourglassLoader from "../../CommonComponent/HourglassLoader";
import SideBar from "./SideBar";
import CardMedia from "@mui/material/CardMedia";
import axios from "axios";
import { useAuth } from "../../Context/Auth";
import { useQuery } from "@tanstack/react-query";
import { useState,useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));



const BlogsByCategory = () => {
  const { categoryId } = useParams();
  const [auth] = useAuth();
  const [blogsImage, setBlogsImage] = useState({});

  // Fetching blogs based on category
  const fetchBlogs = async () => {
  const response = await axios.get(
    `${process.env.React_App_API_BASE_URL}/category/post/${categoryId}`,
    {
      headers: {
        "x-access-token": auth?.token,
      },
    }
  );
  return response.data.data;
};
  // Use React Query to fetch Blogs Data
  const {
    data: blogs,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ["blogsByCategory", categoryId, auth?.token],
    queryFn: fetchBlogs,
  });

  // Function for fetching images
  const fetchBlogImage = async (blog) => {
    try {
      const response = await axios.get(
        `${process.env.React_App_API_BASE_URL}/blog/image/${blog?._id}`,
        {
          headers: {
            "x-access-token": auth?.token,
          },
          responseType: "blob",
        }
      );
      const imageUrl = URL.createObjectURL(response.data);
      setBlogsImage((prevImages) => ({
        ...prevImages,
        [blog._id]: imageUrl,
      }));
    } catch (error) {
      console.error("Error fetching blog image:", error);
    }
  };

  // Calling image function
  useEffect(() => {
    if (blogs) {
      blogs.forEach((blog) => {
        fetchBlogImage(blog);
      });
    }
  }, [blogs, auth?.token]);

  if (fetchError) {
    return <div>Error loading blogs: {fetchError.message}</div>;
  }

  return (
    <Layout>
      {isLoading && <HourglassLoader />}
      {!isLoading && (
        <Container maxWidth="xl" style={{ marginTop: "2rem" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <Item>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell align="center">
                          Description
                        </StyledTableCell>
                        <StyledTableCell align="center">Photo</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {blogs?.map((blog) => (
                        <StyledTableRow key={blog._id}>
                          <StyledTableCell component="th" scope="row">
                            <h3>{blog.title}</h3>
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            dangerouslySetInnerHTML={{
                              __html: blog.postText.slice(0, 200),
                            }}
                          />
                          <StyledTableCell align="center">
                            {blogsImage[blog._id] ? (
                              <CardMedia
                                component="img"
                                src={blogsImage[blog._id]}
                                alt={blog.title}
                                style={{
                                  width: "250px",
                                  height: "200px",
                                  objectFit: "contain",
                                }}
                              />
                            ) : (
                              // Show Skeleton while image is loading
                              <Skeleton variant="rectangular" width={250} height={200} />
                            )}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Link to={`/blog-details/${blog._id}`}>
                              <Button variant="contained">
                                <VisibilityIcon />
                              </Button>
                            </Link>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Item>
            </Grid>
            <Grid item xs={12} md={3}>
              <Item>
                <SideBar />
              </Item>
            </Grid>
          </Grid>
        </Container>
      )}
    </Layout>
  );
};

export default BlogsByCategory;
