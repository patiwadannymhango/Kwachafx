import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Autocomplete,
  TextField,
} from "@mui/material";

import { fetchRates } from "./services/api";
import Converter from "./components/Converter";
import RateCard from "./components/RateCard";
import { currencies } from "./data/currencies";

const App = () => {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  // 🧠 store selected currencies (codes only)
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    fetchRates()
      .then((data) => {
        setRates(data.rates);
        setLoading(false);

        // default: only USD selected
        setSelected(["USD"]);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f7fb", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        KwachaFX
      </Typography>

      <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
        Real-time Zambian Kwacha Exchange Rates
      </Typography>

      {/* 🧠 Currency selector panel */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          Select currencies
        </Typography>

        <Autocomplete
          multiple
          options={currencies}
          value={currencies.filter((c) => selected.includes(c.code))}
          onChange={(_, newValue) => {
            setSelected(newValue.map((v) => v.code));
          }}
          getOptionLabel={(option) => `${option.code} - ${option.country}`}
          renderOption={(props, option) => (
            <li {...props}>
              <strong>{option.code}</strong> — {option.country}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search & select currencies"
              placeholder="Type USD, EUR, ZAR..."
            />
          )}
        />
      </Paper>

      {/* 💱 Exchange rates */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Exchange Rates
      </Typography>

      <Box>
        {currencies
          .filter((cur) => selected.includes(cur.code))
          .map((cur) => (
            <RateCard
              key={cur.code}
              currency={cur.code}
              country={cur.country}
              value={rates["ZMW"] / rates[cur.code]}
            />
          ))}
      </Box>

      {/* 🔁 Converter */}
      <Box sx={{ mt: 4 }}>
        <Converter rates={rates} />
      </Box>
    </Box>
  );
};

export default App;
