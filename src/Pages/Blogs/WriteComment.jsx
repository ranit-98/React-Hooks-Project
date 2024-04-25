import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const WriteComment = ({ blogId, auth, onCommentPosted }) => {
  const { register, handleSubmit, reset } = useForm();
  const [isPosting, setIsPosting] = useState(false);


  const onSubmit = async (commentData) => {
    setIsPosting(true);
    try {
      const response = await axios.post(
        `https://restapinodejs.onrender.com/api/blog/${blogId}/comment/create`,
        commentData,
        {
          headers: {
            "x-access-token": auth?.token,
          },
        }
      );

      // Call onCommentPosted callback to update the comments list in parent component
      if (response.status === 201) {
        onCommentPosted();
        reset();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Box mt={4}>
      <h1>Write your Comment:</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("name", { required: true })}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("email", { required: true })}
        />
        <TextField
          label="Write a comment"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          {...register("comment", { required: true })}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isPosting}
          style={{ marginTop: "1rem" }}
        >
          Post Comment
        </Button>
      </form>
    </Box>
  );
};

export default WriteComment;
