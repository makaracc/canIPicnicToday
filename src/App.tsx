import React, { useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import axios from "axios";

const Melbourne = {
  lat: -37.840935,
  long: 144.946457,
};

export const App: React.FC = () => {
  const [city, setCity] = React.useState("");

  const handleCityChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };

  useEffect(() => {
    console.log(JSON.stringify(import.meta.env.VITE_API));
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${
          Melbourne.lat
        }&lon=${Melbourne.long}&exclude=minutely&appid=${
          import.meta.env.VITE_API
        }`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const component = (
    <Box
      sx={{ display: "flex", textAlign: "center", justifyContent: "center" }}
    >
      <Stack direction="row" width="30%" gap={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={city}
            label="City"
            onChange={handleCityChange}
          >
            <MenuItem value="Melbourne">Melbourne</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary">
          {" "}
          Show{" "}
        </Button>
      </Stack>
    </Box>
  );
  return component;
};
