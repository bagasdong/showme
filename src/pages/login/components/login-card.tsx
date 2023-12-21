import { Button, Flex, Image, Link, Text, VStack } from "@chakra-ui/react";
import { Color } from "../../../helpers/color.ts";
import InputFormLogin from "../../../components/Input";
import { MdPersonOutline } from "@react-icons/all-files/md/MdPersonOutline";
import { MdLockOutline } from "@react-icons/all-files/md/MdLockOutline";
import { Icon } from "@iconify/react";
import eye from "@iconify/icons-ion/eye-outline";
import eye_off from "@iconify/icons-ion/eye-off-outline";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

const LoginCard = () => {
  const { login, isLoginLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <Flex
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"space-between"}
      bgColor={Color.primary}
      w={{ sm: "400px", base: "full" }}
      h={{ sm: "auto", base: "100vh" }}
      borderRadius={10}
      pt={12}
      boxShadow={"lg"}
    >
      <Image
        src={"https://admin.voiceconvert.id/assets/images/logo.png"}
        mb={{ base: "10" }}
        p={3}
        bgColor={"white"}
        borderRadius={15}
        w={{ base: "100px" }}
      />
      <Flex
        flexDir={"column"}
        w={"full"}
        alignItems={"center"}
        px={12}
        pt={10}
        pb={{ base: 20, sm: 20 }}
        bg={"white"}
        borderTopRadius={"50"}
        gap={3}
      >
        <Text
          fontSize={"34px"}
          fontWeight={"bold"}
          textAlign={"center"}
          mb={-3}
        >
          LOGIN
        </Text>
        <Text fontSize={"12px"} textAlign={"center"} mb={"10"}>
          Selamat datang di SMART TRANSLATOR <br />
          TUNANETRA
        </Text>
        <form onSubmit={handleLogin}>
          <VStack>
            <InputFormLogin
              type={"text"}
              placeholder={"Username"}
              icon={<MdPersonOutline size="24px" />}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              isRequired={true}
            />
            <InputFormLogin
              type={show ? "text" : "password"}
              placeholder={"Password"}
              icon={<MdLockOutline size="24px" />}
              rightIcon={
                <Icon
                  icon={show ? eye : eye_off}
                  fontSize={"20px"}
                  onClick={() => setShow(!show)}
                />
              }
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              isRequired={true}
              errorBorderColor="red"
            />
            <Button
              isLoading={isLoginLoading}
              bgColor={Color.primary}
              color={"white"}
              w={"full"}
              variant={"outline"}
              py={7}
              _hover={{
                bgColor: "white",
                color: "black",
              }}
              _loading={{
                bgColor: "white",
                color: "black",
              }}
              type="submit"
              onClick={handleLogin}
            >
              Login
            </Button>
          </VStack>
        </form>
        <Text w={"full"} textAlign={"start"} fontSize={"12px"} mt={2}>
          <Link href="https://admin.voiceconvert.id/password/reset">
            Forgot Password?
          </Link>
        </Text>
        <Button
          isDisabled={isLoginLoading}
          bgColor={"white"}
          w={"full"}
          variant={"outline"}
          py={7}
          borderColor={"black"}
          _hover={{
            bgColor: Color.primary,
            color: "white",
            borderColor: Color.primary,
          }}
          _focus={{
            borderColor: Color.primary,
          }}
          onClick={() => navigate("/guest")}
        >
          Guest
        </Button>
        <Text fontSize={"12px"} textAlign={"center"} mb={-3} mt={5}>
          Belum Mempunyai Akun?{" "}
        </Text>
        <Link href="/register" mb={0}>
          Register
        </Link>
      </Flex>
    </Flex>
  );
};

export default LoginCard;
