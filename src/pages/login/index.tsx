import { Flex } from "@chakra-ui/react";
import { Color } from "../../helpers/color.ts";
import LoginCard from "./components/login-card";

function LoginPage() {
  return (
    <Flex
      position={"absolute"}
      minH={"100vh"}
      minW={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={{ sm: "white", base: Color.primary }}
    >
      <LoginCard />
    </Flex>
  );
}

export default LoginPage;
