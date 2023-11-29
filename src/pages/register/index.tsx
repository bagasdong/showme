import { Flex } from "@chakra-ui/react";
import RegisterCard from "./components/RegisterCard";
import { Color } from "../../helpers/color";

const RegisterPage = () => {
  return (
    <Flex
      position={"absolute"}
      minH={"100vh"}
      minW={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={{ sm: "white", base: Color.primary }}
    >
      <RegisterCard />
    </Flex>
  );
};

export default RegisterPage;
