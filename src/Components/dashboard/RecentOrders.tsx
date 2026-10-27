
// import {
//   Box,
//   Button,
//   Card,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

// export interface DashboardOrder {
//   _id: string;
//   date: string;
//   totalCost: number;
//   products: unknown[];
//   customer: string;
// }

// interface RecentOrdersProps {
//   orders: DashboardOrder[];
//   getCustomerName: (customerId: string) => string;
//   formatDate: (date: string) => string;
//   formatCurrency: (value: number) => string;
//   onGeneratePdf: () => void;
//   isGeneratingPdf: boolean;
// }

// export default function RecentOrders({
//   orders,
//   getCustomerName,
//   formatDate,
//   formatCurrency,
//   onGeneratePdf,
//   isGeneratingPdf,
// }: RecentOrdersProps) {
//   return (
//     <Card
//       elevation={0}
//       sx={{
//         border: "1px solid #e5e7eb",
//         borderRadius: 3,
//         overflow: "hidden",
//       }}
//     >
//       <Box
//         sx={{
//           px: { xs: 2, sm: 2.5 },
//           py: 2.2,
//           borderBottom: "1px solid #eef2f7",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           gap: 2,
//         }}
//       >
//         <Box>
//           <Typography sx={{ fontSize: 16, fontWeight: 750, color: "#102c24" }}>
//             Recent Orders
//           </Typography>
//           <Typography sx={{ mt: 0.4, fontSize: 12, color: "#94a3b8" }}>
//             Your latest order transactions
//           </Typography>
//         </Box>

//         <Button
//           variant="outlined"
//           size="small"
//           onClick={onGeneratePdf}
//           disabled={isGeneratingPdf}
//           startIcon={<PictureAsPdfOutlinedIcon />}
//           sx={{
//             flexShrink: 0,
//             borderRadius: 2,
//             textTransform: "none",
//             fontWeight: 700,
//             color: "#426d26",
//             borderColor: "#b8d4a0",
//             "&:hover": {
//               bgcolor: "#edf5e5",
//               borderColor: "#426d26",
//             },
//           }}
//         >
//           {isGeneratingPdf ? "Generating..." : "Export PDF"}
//         </Button>
//       </Box>

//       {orders.length === 0 ? (
//         <Box
//           sx={{
//             minHeight: 180,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Typography sx={{ fontSize: 13, color: "#94a3b8" }}>
//             No orders available yet.
//           </Typography>
//         </Box>
//       ) : (
//         <Box sx={{ width: "100%", overflowX: "auto" }}>
//           <Table sx={{ minWidth: 600 }}>
//             <TableHead>
//               <TableRow sx={{ bgcolor: "#f8faf7" }}>
//                 {["Order ID", "Date", "Customer", "Total"].map((heading) => (
//                   <TableCell
//                     key={heading}
//                     align={heading === "Total" ? "right" : "left"}
//                     sx={{
//                       py: 1.7,
//                       px: 2.5,
//                       borderBottom: "1px solid #eef2f7",
//                       fontSize: 11,
//                       fontWeight: 750,
//                       color: "#64748b",
//                       textTransform: "uppercase",
//                       letterSpacing: "0.06em",
//                     }}
//                   >
//                     {heading}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {orders.map((order) => (
//                 <TableRow
//                   key={order._id}
//                   sx={{
//                     "&:hover": { bgcolor: "#fafcf8" },
//                     "&:last-child td": { borderBottom: 0 },
//                   }}
//                 >
//                   <TableCell sx={{ px: 2.5, py: 2, fontSize: 13 }}>
//                     <Typography
//                       component="span"
//                       sx={{
//                         px: 1,
//                         py: 0.6,
//                         borderRadius: 1.5,
//                         bgcolor: "#edf5e5",
//                         color: "#426d26",
//                         fontSize: 12,
//                         fontWeight: 750,
//                       }}
//                     >
//                       #{order._id.slice(-6).toUpperCase()}
//                     </Typography>
//                   </TableCell>

//                   <TableCell sx={{ py: 2, fontSize: 13, color: "#64748b" }}>
//                     {formatDate(order.date)}
//                   </TableCell>

//                   <TableCell sx={{ py: 2, fontSize: 13, color: "#334155" }}>
//                     {getCustomerName(order.customer)}
//                   </TableCell>

//                   <TableCell
//                     align="right"
//                     sx={{
//                       px: 2.5,
//                       py: 2,
//                       fontSize: 13,
//                       fontWeight: 750,
//                       color: "#102c24",
//                       whiteSpace: "nowrap",
//                     }}
//                   >
//                     {formatCurrency(order.totalCost)}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Box>
//       )}
//     </Card>
//   );
// }

import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

export interface DashboardOrder {
  _id: string;
  date: string;
  totalCost: number;
  products: unknown[];
  customer: string;
}

interface RecentOrdersProps {
  orders: DashboardOrder[];
  getCustomerName: (customerId: string) => string;
  formatDate: (date: string) => string;
  formatCurrency: (value: number) => string;
  onGeneratePdf: () => void;
  isGeneratingPdf: boolean;
}

export default function RecentOrders({
  orders,
  getCustomerName,
  formatDate,
  formatCurrency,
  onGeneratePdf,
  isGeneratingPdf,
}: RecentOrdersProps) {
  const headings = ["Order ID", "Date", "Customer", "Total"];

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        border: "1px solid #dcebe2",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 18px rgba(6, 78, 59, 0.025)",
      }}
    >
      <Box
        sx={{
          px: { xs: 2, sm: 2.5 },
          py: 2.2,
          borderBottom: "1px solid #eaf2ed",
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 17, fontWeight: 750, color: "#102c24" }}>
            Recent Orders
          </Typography>
          <Typography sx={{ mt: 0.4, fontSize: 12, color: "#82938a" }}>
            Your latest order transactions
          </Typography>
        </Box>

        <Button
          variant="outlined"
          size="small"
          onClick={onGeneratePdf}
          disabled={isGeneratingPdf}
          startIcon={<PictureAsPdfOutlinedIcon />}
          sx={{
            minHeight: 36,
            px: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 650,
            color: "#047857",
            borderColor: "#a7d8bf",
            "&:hover": {
              bgcolor: "#ecfdf5",
              borderColor: "#047857",
            },
          }}
        >
          {isGeneratingPdf ? "Generating..." : "Download PDF"}
        </Button>
      </Box>

      {orders.length === 0 ? (
        <Box
          sx={{
            minHeight: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontSize: 13, color: "#82938a" }}>
            No orders available yet.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <Table sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f3f8f4" }}>
                {headings.map((heading) => (
                  <TableCell
                    key={heading}
                    align={heading === "Total" ? "right" : "left"}
                    sx={{
                      py: 1.6,
                      px: 2.5,
                      borderBottom: "1px solid #e5eee8",
                      fontSize: 11,
                      fontWeight: 750,
                      color: "#647b6e",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order._id}
                  sx={{
                    transition: "background-color 150ms ease",
                    "&:hover": { bgcolor: "#f7fbf8" },
                    "&:last-child td": { borderBottom: 0 },
                  }}
                >
                  <TableCell sx={{ px: 2.5, py: 2 }}>
                    <Typography
                      component="span"
                      sx={{
                        px: 1,
                        py: 0.6,
                        borderRadius: 1.5,
                        bgcolor: "#ecfdf5",
                        color: "#047857",
                        fontSize: 12,
                        fontWeight: 750,
                        whiteSpace: "nowrap",
                      }}
                    >
                      #{order._id.slice(-6).toUpperCase()}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ py: 2, fontSize: 13, color: "#647b6e", whiteSpace: "nowrap" }}>
                    {formatDate(order.date)}
                  </TableCell>

                  <TableCell sx={{ py: 2, fontSize: 13, color: "#33483c" }}>
                    {getCustomerName(order.customer)}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      px: 2.5,
                      py: 2,
                      fontSize: 13,
                      fontWeight: 750,
                      color: "#102c24",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatCurrency(order.totalCost)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Card>
  );
}
