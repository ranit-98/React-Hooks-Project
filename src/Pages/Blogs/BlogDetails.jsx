import React, { useState } from "react";
import Layout from "../../CommonComponent/Layout";
import { useAuth } from "../../Context/Auth";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CommentsSection from "./CommentSection";
import WriteComment from "./WriteComment";
import Button from "@mui/material/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

import RingLoader from "react-spinners/RingLoader";
const BlogDetails = () => {
  const { id } = useParams();
  const [auth] = useAuth();
  // Function to fetch blog details
  const getBlogDetails = async () => {
    const response = await axios.get(
      `https://restapinodejs.onrender.com/api/blogdetails/${id}`,
      {
        headers: {
          "x-access-token": auth?.token,
        },
      }
    );
    return response.data;
  };

  // Use Query hook to fetch blog details
  const { isLoading, isError, data } = useQuery({
    queryKey: ["blogDetails"],
    queryFn: getBlogDetails,
  });

  // Function to fetch the image for the blog
  const fetchImage = async () => {
    const response = await axios.get(
      `https://restapinodejs.onrender.com/api/blog/image/${id}`,
      {
        headers: {
          "x-access-token": auth?.token,
        },
        responseType: "blob",
      }
    );

    if (response.status === 200) {
      const imageBlobUrl = URL.createObjectURL(response.data);
      return imageBlobUrl;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  };

  // Use react-query to fetch the image
  const {
    data: imageUrl,
    error,
    isLoading: imageLoading,
  } = useQuery({
    queryKey: ["blogImage"],
    queryFn: fetchImage,
  });

  //Function to fetch no of Likes
  const getNoOfLikes = async () => {
    const res = await axios.put(
      `https://restapinodejs.onrender.com/api/blog/like/${id}`,
      {},
      {
        headers: {
          "x-access-token": auth?.token,
        },
      }
    );
    if (res.status === 200) {
      return res?.data;
    } else {
      throw new Error(`Unexpected response status: ${res.status}`);
    }
  };

  //Use React Query to fetch no of Likes
  const { data: likes, error: likesError } = useQuery({
    queryKey: ["likes"],
    queryFn: getNoOfLikes,
  });

  //Function to fetch no of Dislikes
  const getNoOfDislikes = async () => {
    const res = await axios.put(
      `https://restapinodejs.onrender.com/api/blog/unlike/${id}`,
      {},
      {
        headers: {
          "x-access-token": auth?.token,
        },
      }
    );
    if (res.status === 200) {
      return res?.data;
    } else {
      throw new Error(`Unexpected response status: ${res.status}`);
    }
  };
  //Use React Query to fetch no of Dislikes
  const { data: dislikes, error: dislikesError } = useQuery({
    queryKey: ["dislike"],
    queryFn: getNoOfDislikes,
  });

  // Function to fetch comments for the blog post
  const fetchComments = async () => {
    const response = await axios.get(
      `https://restapinodejs.onrender.com/api/comment/${id}`,
      {
        headers: {
          "x-access-token": auth?.token,
        },
      }
    );
    return response.data;
  };

  // Use react-query to fetch comments data
  const {
    data: commentsData,
    isLoading: commentsLoading,
    isError: commentsError,
    refetch: refetchComments,
  } = useQuery({
    queryKey: ["blogComments"],
    queryFn: fetchComments,
  });

  return (
    <Layout>
      {isLoading && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <RingLoader
          color="#36d7b7"
          size={150}
        />
        </div>
      )}
      {!isLoading && (
        <Container maxWidth="xl">
          <Paper
            elevation={3}
            style={{
              padding: "1rem 3rem",
              marginTop: "1rem",
              width: "100%",
              marginBottom: "1rem",
            }}
          >
            <CssBaseline />
            <Box mt={4}>
              {/* Loading and error states for blog details */}

              {isError && (
                <Typography variant="h6" color="error">
                  Error loading blog details
                </Typography>
              )}

              {/* Show the blog details and image */}
              {data && (
                <>
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={data.data.title}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                  )}
                  <Typography variant="h3" mt={3} mb={2}>
                    {data.data.title}
                  </Typography>
                  <Typography variant="body1" component="div">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.data.postText,
                      }}
                    />
                  </Typography>
                </>
              )}
              {/* For Like and Dislike */}
              <Box mt={2}>
                <Button variant="contained" color="primary">
                  <ThumbUpIcon style={{ marginRight: "8px" }} />
                  Like ({likes?.likes})
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: "1rem" }}
                >
                  <ThumbDownIcon style={{ marginRight: "8px" }} />
                  Dislike ({dislikes?.unlikes})
                </Button>
              </Box>
              {/* Add the WriteComment component to allow writing new comments */}
              <WriteComment
                blogId={id}
                auth={auth}
                onCommentPosted={refetchComments}
              />
              {/* Display comments using the new CommentsSection component */}
              {commentsData && (
                <CommentsSection
                  comments={commentsData.post.comment.comments}
                />
              )}
            </Box>
          </Paper>
        </Container>
      )}
    </Layout>
  );
};

export default BlogDetails;
