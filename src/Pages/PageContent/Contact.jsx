import React from "react";
import Layout from "../../CommonComponent/Layout";
import { Box, Paper, TextField, Button, Container, Typography,Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async(data) => {
    console.log("Form data:", data);
   const upData={
        name: data.name,
        email:data.email,
        phone:data.phone,
        message:data.message
   }
   try{
        const res=await axios.post(`https://restapinodejs.onrender.com/api/contact/create`,upData)
        toast.success(res?.data?.message)
        reset()
   }catch(error){
    console.log(error);
   }
  };

  return (
    <Layout>
      <Box
        sx={{
          width: "100%",
          height: "350px",
          border: "0",
          overflow: "hidden",
        }}
      >
        <iframe
          style={{ border: 0, width: "100%", height: "100%" }}
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
          frameBorder="0"
          allowFullScreen
        />
      </Box>

      <Container id="contact" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Location section */}
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center">
              <LocationOnIcon sx={{ mr: 2, color: "primary.main" }} />
              <div>
                <Typography variant="h6">Location:</Typography>
                <Typography variant="body1">
                  A108 Adam Street
                  <br />
                  New York, NY 535022
                </Typography>
              </div>
            </Box>
          </Grid>

          {/* Email section */}
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center">
              <EmailIcon sx={{ mr: 2, color: "primary.main" }} />
              <div>
                <Typography variant="h6">Email:</Typography>
                <Typography variant="body1">
                  info@example.com
                  <br />
                  contact@example.com
                </Typography>
              </div>
            </Box>
          </Grid>

          {/* Call section */}
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center">
              <PhoneIcon sx={{ mr: 2, color: "primary.main" }} />
              <div>
                <Typography variant="h6">Call:</Typography>
                <Typography variant="body1">
                  +1 5589 55488 51
                  <br />
                  +1 5589 22475 14
                </Typography>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Contact Us
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Your Name"
                variant="outlined"
                fullWidth
                {...register("name", { required: true, minLength: 4 })}
                error={errors.name}
                helperText={errors.name ? "Please enter at least 4 characters" : ""}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                label="Your Email"
                variant="outlined"
                fullWidth
                type="email"
                {...register("email", { required: true, pattern: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/ })}
                error={errors.email}
                helperText={errors.email ? "Please enter a valid email" : ""}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                {...register("phone", { required: true, minLength: 8 })}
                error={errors.phone}
                helperText={errors.phone ? "Please enter at least 8 characters for the subject" : ""}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                label="Message"
                variant="outlined"
                fullWidth
                multiline
                rows={5}
                {...register("message", { required: true })}
                error={errors.message}
                helperText={errors.message ? "Please write something" : ""}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Button variant="contained" color="primary" type="submit">
                Send Message
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Contact;
