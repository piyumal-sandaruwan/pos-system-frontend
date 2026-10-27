// import {
//   Card,
//   CardContent,
//   Box,
//   Typography,
// } from "@mui/material";

// interface StatCardProps {
//   title: string;
//   value: string | number;
//   icon: React.ReactNode;
//   subtitle?: string;
// }

// const StatCard = ({
//   title,
//   value,
//   icon,
//   subtitle,
// }: StatCardProps) => {
//   return (
//     <Card
//       elevation={0}
//       sx={{
//         border: "1px solid #e5e7eb",
//         borderRadius: 3,
//         height: "100%",
//       }}
//     >
//       <CardContent sx={{ p: 3 }}>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             mb: 2,
//           }}
//         >
//           <Typography
//             sx={{
//               fontSize: 14,
//               fontWeight: 600,
//               color: "#6b7280",
//             }}
//           >
//             {title}
//           </Typography>

//           <Box
//             sx={{
//               width: 44,
//               height: 44,
//               borderRadius: 2,
//               bgcolor: "#f3f4f6",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#111827",
//             }}
//           >
//             {icon}
//           </Box>
//         </Box>

//         <Typography
//           sx={{
//             fontSize: 30,
//             fontWeight: 700,
//             color: "#111827",
//             lineHeight: 1.2,
//           }}
//         >
//           {value}
//         </Typography>

//         {subtitle && (
//           <Typography
//             sx={{
//               mt: 1,
//               fontSize: 12,
//               color: "#9ca3af",
//             }}
//           >
//             {subtitle}
//           </Typography>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default StatCard;

import { Box, Card, CardContent, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
}

export default function StatCard({
  title,
  value,
  description,
  icon,
}: StatCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        border: "1px solid #e5e7eb",
        borderRadius: 3,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
        },
      }}
    >
      <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2.5,
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>
            {title}
          </Typography>

          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2.5,
              bgcolor: "#edf5e5",
              color: "#426d26",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: { xs: 25, md: 28 },
            fontWeight: 750,
            lineHeight: 1.3,
            color: "#102c24",
            overflowWrap: "anywhere",
          }}
        >
          {value}
        </Typography>

        <Typography sx={{ mt: 1, fontSize: 12, color: "#94a3b8" }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}