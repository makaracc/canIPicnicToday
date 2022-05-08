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
import fromUnixTime from "date-fns/fromUnixTime";

const Melbourne = {
  lat: -37.840935,
  lon: 144.946457,
};

export const App: React.FC = () => {
  const [city, setCity] = React.useState("");
  const [latlng, setLatLng] = React.useState(Melbourne);
  const [data, setData] = React.useState();

  const handleCityChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };

  const getWeather = async (lat: number, lon: number) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${
          import.meta.env.VITE_API
        }`
      )
      .then((res) => {
        console.log(res.data.daily);
        setData(
          res.data.daily.map(
            (d: { dt: any; feels_like: { day: any }; rain: any }) => ({
              date: fromUnixTime(d.dt),
              temp: d.feels_like.day - 273.15,
              rain: d.rain,
            })
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // TODO:
  // Take the percentage of rain during the day and calculate it as yes or no to picnic
  const getPicnic = (rain: number) => {
    if (rain > 0.1) {
      return true;
    }
    return false;
  };

  // Take temperature into consideration
  const getTemperature = (temp: number) => {
    if (temp > 20) {
      return true;
    }
    return false;
  };

  // Take humidity into consideration
  const getHumidity = (humidity: number) => {
    if (humidity > 0.5) {
      return true;
    }
    return false;
  };

  // Take wind speed into consideration
  // Take cloudiness into consideration
  // Take the time of day into consideration
  // Take yesterday's weather into consideration if your friend lie
  // Change date to dd/mmm/yyy format

  const handleCanIPicnic = () => {
    if (city === "Melbourne") {
      getWeather(latlng.lat, latlng.lon);
    }
    console.log(fromUnixTime(1647223200));
  };

  const component = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        direction="row"
        width="30%"
        gap={2}
        justifyContent="center"
        alignItems="center"
        minWidth="100%"
      >
        <FormControl sx={{ width: "20%" }}>
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
        <Button variant="contained" color="primary" onClick={handleCanIPicnic}>
          Can I Picnic?
        </Button>
      </Stack>
      {JSON.stringify(data)}
    </Box>
  );
  return component;
};
