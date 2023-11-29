import {
  Button,
  Center,
  Flex,
  HStack,
  PinInput,
  PinInputField,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Color } from "../../helpers/color";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios, { AxiosError, AxiosResponse } from "axios";
import { BASE_API_URL } from "../../helpers/url";
import { Meta } from "../../models/Authentication";

// Define the AxiosError interface with the 'data' property
// Extend the AxiosResponse interface with your own custom data structure
// Define the CustomAxiosResponse interface
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CustomAxiosResponse<T = any> extends Omit<AxiosResponse<T>, "data"> {
  data: {
    meta: Meta;
  };
}

// Define the AxiosError interface with the 'response' property of type CustomAxiosResponse
interface AxiosErrorWithData extends AxiosError {
  response?: CustomAxiosResponse;
}

const OtpVerification = () => {
  const { user, authCheck } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResendLoading, setIsResendLoading] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const toast = useToast();

  const handleOtp = (otpVal: string) => {
    setIsLoading(true);
    axios
      .post(BASE_API_URL + "/register-check-otp", {
        email: user?.email,
        otp: otpVal,
      })
      .then((res: AxiosResponse) => {
        const meta: Meta = res.data.meta;
        toast({
          title: meta?.message,
          status: "success",
          position: "top",
          isClosable: true,
        });
        authCheck();
        setIsLoading(false);
      })
      .catch((err: AxiosErrorWithData) => {
        const meta: Meta | undefined = err.response?.data.meta;
        toast({
          title: meta?.message,
          status: "error",
          position: "top",
          isClosable: true,
        });
        setIsLoading(false);
      });
  };

  const handleResend = () => {
    setIsResendLoading(true);
    axios
      .post(BASE_API_URL + "/register-resend-otp", {
        email: user?.email,
      })
      .then((res: AxiosResponse) => {
        setTime(10);
        const meta: Meta = res.data.meta;
        toast({
          title: meta?.message,
          status: "success",
          position: "top",
          isClosable: true,
        });
        const intervalId = setInterval(() => {
          setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        setIsLoading(false);
        setIsResendLoading(false);
        return () => clearInterval(intervalId);
      })
      .catch((err: AxiosErrorWithData) => {
        setTime(0);
        const meta: Meta | undefined = err.response?.data.meta;
        toast({
          title: meta?.message,
          status: "error",
          position: "top",
          isClosable: true,
        });
        setIsResendLoading(false);
      });
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <Flex
      position={"absolute"}
      minH={"100vh"}
      minW={"100%"}
      flexDir={"column"}
      justifyContent={"start"}
      alignItems={"center"}
      px={5}
      py={10}
      gap={5}
    >
      <Text
        textAlign={"start"}
        w={"full"}
        fontSize={"28px"}
        fontWeight={"bold"}
      >
        Email verification
      </Text>
      <Text>
        Please enter the 4 digit OTP code that has been sent to your email.
      </Text>
      {isLoading ? (
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color={Color.primary}
            size="xl"
          />
        </Center>
      ) : (
        <VStack>
          <HStack my={5}>
            <PinInput otp onComplete={(e) => handleOtp(e)}>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <Text>Didn't receive the OTP? </Text>
          {time > 0 ? (
            <Text>{formatTime(time)}</Text>
          ) : (
            <Button onClick={handleResend} isLoading={isResendLoading}>
              Resend OTP
            </Button>
          )}
        </VStack>
      )}
    </Flex>
  );
};

export default OtpVerification;
