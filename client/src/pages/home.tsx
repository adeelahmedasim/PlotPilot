import React from 'react'
import { useList } from "@refinedev/core";
import  {PieChart, PropertyReferrals,
TotalRevenue,
PropertyCard,
TopAgent
} from '../components'

import { Typography, Box, Stack } from '@mui/material';



const Home = () => {
  const { data, isLoading, isError } = useList({
      resource: "properties",
      config: {
          pagination: {
              pageSize: 4,
          },
      },
  });

  const latestProperties = data?.data ?? [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Something went wrong!</Typography>;

  return (
      <Box>
          <Typography fontSize={25} fontWeight={700} color="#11142D">
              Dashboard
          </Typography>

          <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
              <PieChart
                  title="Properties for Sale"
                  value={684}
                  series={[75, 25]}
                  colors={["#275be8", "#c4e8ef"]}
              />
              <PieChart
                  title="Properties for Rent"
                  value={550}
                  series={[60, 40]}
                  colors={["#2A9D8F", "#C3F1EC"]}
              />
              <PieChart
                  title="Total customers"
                  value={5684}
                  series={[75, 25]}
                  colors={["#E76F51", "#F3C49E"]}
              />
              <PieChart
                  title="Properties for Cities"
                  value={555}
                  series={[75, 25]}
                  colors={["#E9C46A", "#E6D6AF"]}
              />
          </Box>

          <Stack
              mt="25px"
              width="100%"
              direction={{ xs: "column", lg: "row" }}
              gap={4}
          >
              <TotalRevenue />
              <PropertyReferrals />
          </Stack>

          <Box
              flex={1}
              borderRadius="15px"
              padding="20px"
              bgcolor="#fcfcfc"
              display="flex"
              flexDirection="column"
              minWidth="100%"
              mt="25px"
          >
              <Typography fontSize="18px" fontWeight={600} color="#11142d">
                  Latest Properties
              </Typography>

              <Box
                  mt={2.5}
                  sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}
              >
                  {latestProperties.map((property) => (
                      <PropertyCard
                          key={property._id}
                          id={property._id}
                          title={property.title}
                          location={property.location}
                          price={property.price}
                          photo={property.photo}
                      />
                  ))}
              </Box>
          </Box>
      </Box>
  );
};

export default Home;