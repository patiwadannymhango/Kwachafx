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
        my: 1,
        px: 1.5,
        py: 0.5,
        borderRadius: 2,
        border: "1px solid #f0f0f0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        backgroundColor: "#ffffff",
      }}
    >
      <CardContent sx={{ p: "8px !important" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left: Currency */}
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {currency}
          </Typography>

          {/* Right: Country */}
          <Typography variant="caption" color="text.secondary">
            {country}
          </Typography>
        </Box>

        {/* Rate */}
        <Typography
          variant="body2"
          sx={{ mt: 0.5, fontWeight: 500 }}
        >
          1 {currency} ={" "}
          <span style={{ fontWeight: 700 }}>
            {value.toFixed(2)} ZMW
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RateCard;