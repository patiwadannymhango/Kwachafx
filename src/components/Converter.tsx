import { useState } from "react";
import { convertCurrency } from "../utils/convert";
import { currencies } from "../data/currencies";

import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Divider,
} from "@mui/material";

import Grid from "@mui/material/Grid2";

interface Props {
  rates: Record<string, number>;
}

const Converter: React.FC<Props> = ({ rates }) => {
  const [amount, setAmount] = useState<number>(100);
  const [from, setFrom] = useState<string>("ZMW");
  const [to, setTo] = useState<string>("USD");

  const result = convertCurrency(amount, from, to, rates);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        mt: 4,
        mx: "auto",
        borderRadius: 3,
        border: "1px solid #f0f0f0",
        backgroundColor: "#ffffff",
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
        Currency Converter
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {/* GRID */}
      <Grid container spacing={1.5} sx={{ alignItems: "center", justifyContent: "center" }}>
        
        {/* Amount */}
        <Grid size={12}>
          <TextField
            fullWidth
            size="small"
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </Grid>

        {/* From */}
        <Grid size={5}>
          <FormControl fullWidth size="small">
            <InputLabel>From</InputLabel>
            <Select
              value={from}
              label="From"
              onChange={(e) => setFrom(e.target.value)}
            >
              {currencies.map((cur) => (
                <MenuItem key={cur.code} value={cur.code}>
                  {cur.code} — {cur.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Arrow */}
        <Grid size={2} sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: "1rem", color: "#888" }}>
            →
          </Typography>
        </Grid>

        {/* To */}
        <Grid size={5}>
          <FormControl fullWidth size="small">
            <InputLabel>To</InputLabel>
            <Select
              value={to}
              label="To"
              onChange={(e) => setTo(e.target.value)}
            >
              {currencies.map((cur) => (
                <MenuItem key={cur.code} value={cur.code}>
                  {cur.code} — {cur.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Result */}
      <Box
        sx={{
          mt: 3,
          p: 1.5,
          borderRadius: 2,
          background: "#f9f9f9",
          textAlign: "center",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Converted Amount
        </Typography>

        <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
          {result.toFixed(2)} {to}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {currencies.find(c => c.code === from)?.country} →{" "}
          {currencies.find(c => c.code === to)?.country}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Converter;