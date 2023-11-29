import { Center, Flex, Spinner } from "@chakra-ui/react";

const LoadingPage = () => {
  return (
    <Flex
      w={"100vw"}
      h={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    </Flex>
  );
};

export default LoadingPage;
