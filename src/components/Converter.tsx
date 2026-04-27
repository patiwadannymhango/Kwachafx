// import { useState } from "react";
// import { convertCurrency } from "../utils/convert";

// interface Props {
//   rates: Record<string, number>;
// }

// const Converter: React.FC<Props> = ({ rates }) => {

//   const [amount, setAmount] = useState<number>(100);
//   const [from, setFrom] = useState<string>("ZMW");
//   const [to, setTo] = useState<string>("USD");

//   const result = convertCurrency(amount, from, to, rates);

//   return (
//     <div style={{ marginTop: "20px" }}>
//       <h2>Currency Converter</h2>

//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(Number(e.target.value))}
//       />

//       <select value={from} onChange={(e) => setFrom(e.target.value)}>
//         {Object.keys(rates).map((cur) => (
//           <option key={cur}>{cur}</option>
//         ))}
//       </select>

//       <span> → </span>

//       <select value={to} onChange={(e) => setTo(e.target.value)}>
//         {Object.keys(rates).map((cur) => (
//           <option key={cur}>{cur}</option>
//         ))}
//       </select>

//       <p>
//         Result: {result.toFixed(2)} {to}
//       </p>
//     </div>
//   );
// };

// export default Converter;

import { useState } from "react";
import { convertCurrency } from "../utils/convert";

import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Paper,
} from "@mui/material";

interface Props {
  rates: Record<string, number>;
}

const Converter: React.FC<Props> = ({ rates }) => {
  const [amount, setAmount] = useState<number>(100);
  const [from, setFrom] = useState<string>("ZMW");
  const [to, setTo] = useState<string>("USD");

  const result = convertCurrency(amount, from, to, rates);

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Currency Converter
      </Typography>

    <Grid></Grid>
    
      <Grid container spacing={2} sx={{ alignItems: "center" }}>
        {/* Amount Input */}
        <Grid size={12}>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </Grid>

        {/* From Currency */}
        <Grid size={5}>
          <FormControl fullWidth>
            <InputLabel>From</InputLabel>
            <Select
              value={from}
              label="From"
              onChange={(e) => setFrom(e.target.value)}
            >
              {Object.keys(rates).map((cur) => (
                <MenuItem key={cur} value={cur}>
                  {cur}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Arrow */}
        <Grid size={2} sx={{ textAlign: "center" }}>
          <Typography variant="h6">→</Typography>
        </Grid>

        {/* To Currency */}
        <Grid size={5}>
          <FormControl fullWidth>
            <InputLabel>To</InputLabel>
            <Select
              value={to}
              label="To"
              onChange={(e) => setTo(e.target.value)}
            >
              {Object.keys(rates).map((cur) => (
                <MenuItem key={cur} value={cur}>
                  {cur}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Result */}
        <Grid size={12}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">
              Result: {result.toFixed(2)} {to}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Converter;
