import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Autocomplete,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import { fetchRates } from "./services/api";
import Converter from "./components/Converter";
import RateCard from "./components/RateCard";
import { currencies } from "./data/currencies";
import logo from "./assets/logo.png";

const App = () => {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<string[]>([]);

  // 🛡️ Disclaimer modal state
  const [openDisclaimer, setOpenDisclaimer] = useState(false);

  useEffect(() => {
    fetchRates()
      .then((data) => {
        setRates(data.rates);
        setLoading(false);
        setSelected(["USD"]);
      })
      .catch(() => setLoading(false));

    // Show disclaimer once per user
    // const seen = localStorage.getItem("seenDisclaimer");
    // if (!seen) {
    //   setOpenDisclaimer();
    //   localStorage.setItem("seenDisclaimer", "true");
    // }
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f5f7fb",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* MAIN CONTENT */}
      <Box sx={{ flex: 1, p: 3 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            mb: 2,
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="KwachaFX Logo"
            sx={{ width: 70, height: 60 }}
          />

          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            KwachaFX
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
          Real-time Zambian Kwacha Exchange Rates
        </Typography>

        {/* Currency selector */}
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

        {/* Exchange rates */}
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

        {/* Converter */}
        <Box>
          <Converter rates={rates} />
        </Box>
      </Box>

      {/* FOOTER */}
      <Box
        component="footer"
        sx={{
          textAlign: "center",
          py: 2,
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Designed by Enax Technology Limited © {new Date().getFullYear()}
        </Typography>

        {/* 👇 Disclaimer trigger */}
        <Typography
          variant="body2"
          sx={{ cursor: "pointer", color: "primary.main", mt: 0.5 }}
          onClick={() => setOpenDisclaimer(true)}
        >
          Disclaimer
        </Typography>
      </Box>

      {/* 🛡️ DISCLAIMER MODAL */}
      <Dialog open={openDisclaimer} onClose={() => setOpenDisclaimer(false)}>
        <DialogTitle>Disclaimer</DialogTitle>

          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              KwachaFX provides exchange rate information for general reference and
              convenience. The data displayed in this application is sourced from a
              third-party API and is updated periodically.
            </Typography>

            <Typography variant="body2" sx={{ mb: 2 }}>
              While we aim to keep the information as accurate and up to date as possible,
              exchange rates can change frequently and may differ from the rates offered
              by banks, financial institutions, or money transfer services at the time of
              a transaction.
            </Typography>

            <Typography variant="body2" sx={{ mb: 2 }}>
              This application is not a financial service provider and does not offer
              financial advice. The rates shown should be used as a general guide rather
              than a guaranteed or final price for any currency exchange.
            </Typography>

            <Typography variant="body2">
              We recommend confirming exchange rates directly with your chosen provider
              before making any financial decisions or transactions. By using KwachaFX,
              you acknowledge that the information is provided for informational purposes
              and may vary in real-world use.
            </Typography>
          </DialogContent>


        <DialogActions>
          <Button onClick={() => setOpenDisclaimer(false)} variant="contained">
            I Understand
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default App;
