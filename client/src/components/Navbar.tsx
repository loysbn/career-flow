import { Box, Flex, Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <div>
      <Box p={10}>
        <Flex justify="space-between" align="center" mb={10}>
          <Text fontSize="2xl" fontWeight="bold" color="white">
            CareerFlow
          </Text>
        </Flex>
      </Box>
    </div>
  );
};

export default Navbar;
