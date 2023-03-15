import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Container,
  Fade,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [current, setCurrent] = useState(1);
  const [currentItems, setCurrentItems] = useState([]); 
    const [dense] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      const res = await axios.get("http://localhost:3306/data");
      if (res.status !== 200) {
        console.log("Error fetching orders");
        return;
      }
      setOrders(res.data);
      setCurrentItems(res.data.slice(0, 5));
      setIsLoading(false);
    };
    fetchOrders();
  }, []);

  const itemsPerPage = 5;
  const count = Math.ceil(orders.length / itemsPerPage);

  const handlePagination = (event: any, value: number) => {
    setCurrentItems(orders.slice((value - 1) * itemsPerPage, value * itemsPerPage));
    setCurrent(value);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "4em", marginBottom: "4em" }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid item xs={12} md={6}>
          <Typography
            sx={{ mt: 4, mb: 2, textAlign: "center" }}
            variant="h3"
            component="h1"
          >
            Orders
          </Typography>
          <Demo>
            <List dense={dense}>
              {currentItems.map((order: any, index: number) => {
                const formattedDate = new Date(order.date).toLocaleDateString(
                  "en-US",
                );
                return (
                  <Fade
                    in={true}
                    key={order.id}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <ListItem
                      secondaryAction={"Delete"}
                      sx={{ borderBottom: 1, borderColor: "gray" }}
                    >
                      <ListItemText primary={`Order id:  ${order.id}`} />
                      <ListItemText
                        primary={order.material}
                        secondary={`${order.quantity} kg`}
                      />
                      <ListItemText
                        primary="Address"
                        secondary={
                          order.deliveryAddress.substring(0, 20) + "..."
                        }
                      />
                      <ListItemText
                        primary="Delivery date"
                        secondary={formattedDate}
                      />
                    </ListItem>
                  </Fade>
                );
              })}
            </List>
          </Demo>
          {orders ? (
            <Pagination
              count={count}
              variant="outlined"
              page={current}
              onChange={handlePagination}
            />
          ) : null}
        </Grid>
      )}
    </Container>
  );
};

export default Orders;
