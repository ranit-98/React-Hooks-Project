import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CommentsSection = ({ comments }) => {
  // Check if there are comments to display
  if (!comments || comments.length === 0) {
    return (
      <Typography variant="body1" color="textSecondary">
        No comments yet.
      </Typography>
    );
  }

  // Render each comment
  return (
    <Box mt={4} mb={4}>
      <Typography variant="h5" gutterBottom>
        Comments:
      </Typography>
      {comments.slice().reverse().map((comment) => (
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
    </Box>
  );
};

export default CommentsSection;
