
// interface Props {
//   currency: string;
//   country: string;
//   value: number;
// }

// const RateCard: React.FC<Props> = ({ currency, country, value }) => {
//   return (
//     <div
//       style={{
//         padding: "10px",
//         margin: "10px 0",
//         border: "1px solid #ddd",
//         borderRadius: "8px",
//         background: "#fff",
//       }}
//     >
//       <strong> {currency} </strong> - {country} {currency} = {value.toFixed(2)} ZMW
//     </div>
//   );
// };

// export default RateCard;

import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface Props {
  currency: string;
  country: string;
  value: number;
}

const RateCard: React.FC<Props> = ({ currency, country, value }) => {
  return (
    <Card
      sx={{
        my: 1.5,
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        boxShadow: "none",
        backgroundColor: "#fff",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>

            {currency}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {country}
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ mt: 1 }}>
          1 {currency} ={" "}
          <strong>{value.toFixed(2)} ZMW</strong>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RateCard;
