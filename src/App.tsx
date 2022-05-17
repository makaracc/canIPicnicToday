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
  Typography,
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
  const getWind = (wind: number) => {
    if (wind > 5) {
      return true;
    }
    return false;
  };

  // Take cloudiness into consideration
  const getClouds = (clouds: number) => {
    if (clouds > 0.5) {
      return true;
    }
    return false;
  };

  // Take the time of day into consideration
  const getTime = (time: number) => {
    if (time > 18) {
      return true;
    }
    return false;
  };

  // Take yesterday's weather into consideration if your friend lie
  const getYesterday = (yesterday: boolean) => {
    if (yesterday) {
      return true;
    }
    return false;
  };

  // Change date to dd/mmm/yyy format
  const getDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Normal from here
  const handleCanIPicnic = () => {
    if (city === "Melbourne") {
      getWeather(latlng.lat, latlng.lon);
    }
    console.log(fromUnixTime(1647223200));
  };

  // TODO:
  // Take the percentage of rain during the day and calculate it as yes or no to picnic
  const handleCanIPicnic2 = () => {
    if (city === "Melbourne") {
      getWeather(latlng.lat, latlng.lon);
    }
    console.log(fromUnixTime(1647223200));
  };

  useEffect(() => {
    handleCanIPicnic();
    handleCanIPicnic2();
  }, []);

  //show time
  const isRightTime = (time: number) => {
    if (time > 18) {
      return true;
    }
    return false;
  };

  // show yesterday
  const isYesterday = (yesterday: boolean) => {
    if (yesterday) {
      return true;
    }
    return false;
  };

  // show temperature
  const isHot = (temp: number) => {
    if (temp > 20) {
      return true;
    }
    return false;
  };

  // get weather
  const getWeather2 = (lat: number, lon: number) => {
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
      });
  };

  // show humidity
  const first = (
    <Box>
      <FormControl>
        <InputLabel id="demo-simple-select-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          onChange={handleCityChange}
        >
          <MenuItem value="Melbourne">Melbourne</MenuItem>
          <MenuItem value="Sydney">Sydney</MenuItem>
          <MenuItem value="Brisbane">Brisbane</MenuItem>
          <MenuItem value="Perth">Perth</MenuItem>
          <MenuItem value="Adelaide">Adelaide</MenuItem>
          <MenuItem value="Darwin">Darwin</MenuItem>
          <MenuItem value="Hobart">Hobart</MenuItem>
          <MenuItem value="Canberra">Canberra</MenuItem>
          <MenuItem value="Gold Coast">Gold Coast</MenuItem>
          <MenuItem value="Newcastle">Newcastle</MenuItem>
          <MenuItem value="Darwin">Darwin</MenuItem>
          <MenuItem value="Alice Springs">Alice Springs</MenuItem>
        </Select>
      </FormControl>
      <Box>
        <Button onClick={handleCanIPicnic}>Can I picnic?</Button>
        <Button onClick={handleCanIPicnic2}>Can I picnic?</Button>
      </Box>
    </Box>
  );

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
  return (
    <>
      {first}
      {component}
    </>
  );
};
