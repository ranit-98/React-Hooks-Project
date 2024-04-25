import React from "react";
import Layout from "../../CommonComponent/Layout";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Button, Box } from "@mui/material";
import Team from "./Team";
import Testimonial from "./Testimonial";
import HourglassLoader from "../../CommonComponent/HourglassLoader";
import Services from "./Services";

const Home = () => {
  // Function to fetch carousel images and data from the API
  const getCarouselImage = async () => {
    const res = await axios.get(
      `https://restapinodejs.onrender.com/api/banner`
    );
    return res?.data;
  };

  // Using React Query for fetching data
  const {
    isLoading,
    isError,
    data: carouselImage,
  } = useQuery({
    queryKey: ["carouselImages"],
    queryFn: getCarouselImage,
  });

  // Handling  error states

  if (isError) {
    return <p>Error loading data</p>;
  }

  return (
    <>
      <Layout>
        {isLoading && <HourglassLoader />}
        {!isLoading && (
          <>
            {" "}
            <Box sx={{ overflow: "hidden" }}>
              <div
                id="carouselExampleCaptions"
                className="carousel slide"
                data-ride="carousel"
              >
                {/* Carousel indicators */}
                <ol className="carousel-indicators">
                  {carouselImage?.bannerdata?.map((_, index) => (
                    <li
                      key={index}
                      data-target="#carouselExampleCaptions"
                      data-slide-to={index}
                      className={index === 0 ? "active" : ""}
                    ></li>
                  ))}
                </ol>

                {/* Carousel items */}
                <div className="carousel-inner">
                  {carouselImage?.bannerdata?.map((item, index) => (
                    <div
                      key={item._id}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <img
                        src={`https://restapinodejs.onrender.com/api/banner/photo/${item._id}`}
                        className="d-block w-100"
                        alt={item.title}
                        style={{ height: "100vh", objectFit: "cover" }}
                      />
                      <div className="carousel-caption d-none d-md-block">
                        <h5>{item.title}</h5>
                        <p>{item.description}</p>
                        <Button
                          variant="contained"
                          color="primary"
                          href={item.link}
                        >
                          {item.buttonText || "Read More"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Carousel controls */}
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-target="#carouselExampleCaptions"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-target="#carouselExampleCaptions"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </button>
              </div>
            </Box>
            <Team withLayout={false} />
            <Services />
            <Testimonial withLayout={false} />
          </>
        )}
      </Layout>
    </>
  );
};

export default Home;
