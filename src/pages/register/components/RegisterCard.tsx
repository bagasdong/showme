import { Box, Button, Flex, Link, Text, useToast } from "@chakra-ui/react";
import InputFormLogin from "../../../components/Input";
import { Icon } from "@iconify/react";
import eye from "@iconify/icons-ion/eye-outline";
import eye_off from "@iconify/icons-ion/eye-off-outline";
import email_icon from "@iconify/icons-ion/ios-email-outline";
import password_icon from "@iconify/icons-ion/lock-closed-outline";
import person_out_icon from "@iconify/icons-ion/person-outline";
import person_icon from "@iconify/icons-ion/person";
import { Color } from "../../../helpers/color";
import { useContext, useState } from "react";
import axios, { AxiosError } from "axios";
import { BASE_API_URL } from "../../../helpers/url";
import { AuthContext } from "../../../context/AuthContext";

const RegisterCard = () => {
  const { login } = useContext(AuthContext);
  const [show, setShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const handleRegister = () => {
    setIsLoading(true);
    axios
      .post(BASE_API_URL + "/register", {
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: password,
      })
      .then(() => {
        login(email, password);
      })
      .catch((err: AxiosError) => {
        if (err.code == "ERR_BAD_REQUEST") {
          toast({
            title: "Email already exists.",
            status: "error",
            position: "top",
            isClosable: true,
          });
        }
        setIsLoading(false);
      });
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
      <Box w={"100px"} h={"100px"} backgroundColor={"white"} mb={20}></Box>
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
          REGISTER
        </Text>
        <Text fontSize={"12px"} textAlign={"center"} mb={"10"}>
          Selamat datang di SMART TRANSLATOR <br />
          TUNANETRA
        </Text>
        <InputFormLogin
          type={"email"}
          placeholder={"Email"}
          icon={<Icon icon={email_icon} fontSize={"24px"} />}
          isRequired={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputFormLogin
          type={"text"}
          placeholder={"Firstname"}
          icon={<Icon icon={person_out_icon} fontSize={"20px"} />}
          isRequired={true}
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <InputFormLogin
          type={"text"}
          placeholder={"Lastname"}
          icon={<Icon icon={person_icon} fontSize={"20px"} />}
          isRequired={true}
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <InputFormLogin
          type={show ? "text" : "password"}
          placeholder={"Password"}
          icon={<Icon icon={password_icon} fontSize={"24px"} />}
          rightIcon={
            <Icon
              icon={show ? eye : eye_off}
              fontSize={"20px"}
              onClick={() => setShow(!show)}
            />
          }
          isRequired={true}
          errorBorderColor="red"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={handleRegister}
          isLoading={isLoading}
          bgColor={Color.primary}
          color={"white"}
          w={"full"}
          variant={"outline"}
          py={7}
          mt={3}
          _hover={{
            bgColor: "white",
            color: "black",
          }}
          _loading={{
            bgColor: "white",
            color: "black",
          }}
        >
          Register
        </Button>
        <Text fontSize={"12px"} textAlign={"center"} mb={-3} mt={5}>
          Sudah Mempunyai Akun?{" "}
        </Text>
        <Link href="/login" mb={0}>
          Login
        </Link>
      </Flex>
    </Flex>
  );
};

export default RegisterCard;
