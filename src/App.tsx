import React from "react";
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

export const App: React.FC = () => {
  const [city, setCity] = React.useState("");

  const handleCityChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };

  const component = (
    <Box
      sx={{ display: "flex", textAlign: "center", justifyContent: "center" }}
    >
      <Stack direction="row" width="30%" gap={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={city}
            label="Age"
            onChange={handleCityChange}
          >
            <MenuItem value="">Ten</MenuItem>
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
