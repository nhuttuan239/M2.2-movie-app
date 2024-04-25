import React, { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import MCard from "./MCard";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import { useSearchParams } from "react-router-dom";

function SearchResult() {
  //APIKEY TRONG ENV

  const [loading, setLoading] = useState();
  const [movieList, setMovieList] = useState([]);
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `search/movie?query=${q}&api_key=${API_KEY}&language=en-US`
        );
        setMovieList(res.data.results);
        console.log(q);
        console.log(res.data.results);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [q]);
  const placeholder = [0, 1, 2, 3, 4];
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );

  return (
    <>
      <Typography variant="h5" mb={2}>
        RESULT
      </Typography>
      <Divider />

      <Grid container direction="row" spacing={5} mt={2}>
        {loading
          ? placeholder.map((item) => (
              <Grid item xs={6} sm={4} md={3}>
                {detailSkeleton}
              </Grid>
            ))
          : movieList.map((item) => (
              <>
                <Grid item xs={6} sm={4} md={3}>
                  <MCard item={item} />
                </Grid>
              </>
            ))}
      </Grid>
    </>
  );
}

export default SearchResult;
