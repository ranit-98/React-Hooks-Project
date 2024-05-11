import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import MessageIcon from '@mui/icons-material/Message';
const CommentsSection = ({ comments }) => {
  const initialCommentLimit=0
  const loadPerClick=10
  const [commentLimit,setCommentLimit]=useState(initialCommentLimit)
  // Check if there are comments to display
  if (!comments || comments.length === 0) {
    return (
      <Typography variant="body1" color="textSecondary">
        No comments yet.
      </Typography>
    );
  }

  const handleLoadMore=()=>{
    setCommentLimit((prev)=>prev+loadPerClick)
  }
  // Render each comment
  return (
    <Box mt={4} mb={4}>
      {!commentLimit==0 && <Typography variant="h5" gutterBottom>
      <MessageIcon/>
        Comments:
      </Typography>}
      {comments.slice().reverse().slice(initialCommentLimit,commentLimit).map((comment) => (
        <Paper
          key={comment._id}
          variant="outlined"
          style={{ padding: "10px", marginBottom: "10px" }}
        >
          <Box display="flex" alignItems="center">
            {/* Initials or Avatar */}
            <Box
              width={40}
              height={40}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgcolor="#e0f7fa"
              borderRadius="50%"
              style={{ marginRight: "10px" }}
            >
              <Typography
                variant="subtitle1"
                style={{ color: "#00796b", fontWeight: "bold" }}
              >
                {comment.name.charAt(0)}
              </Typography>
            </Box>

            {/* Commenter name */}
            <Typography variant="h6" style={{ marginRight: "10px" }}>
              {comment.name}
            </Typography>
            <Typography
              variant="subtitle1"
              style={{ marginRight: "10px" }}
            >
              {comment.email}
            </Typography>

            {/* Comment date */}
            <Typography variant="caption" color="textSecondary">
              {new Date(comment.createdAt).toLocaleDateString()}
            </Typography>
          </Box>

          {/* Comment text */}
          <Typography variant="body1" style={{ marginTop: "5px" }}>
            {comment.comment}
          </Typography>
        </Paper>
      ))}
       <Button variant="contained" onClick={handleLoadMore} style={{marginLeft: "1rem",marginTop:"1rem"}}>{commentLimit===0?<><MessageIcon/> View Comments({commentData.length})</>:"Load More"}</Button>
    </Box>
  );
};

export default CommentsSection;
