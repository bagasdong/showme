import {
  FormControl,
  // FormHelperText,
  // FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface InputFormLoginProps extends InputProps {
  placeholder: string;
  type: string;
  value?: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
}

const InputFormLogin: React.FC<InputFormLoginProps> = ({
  placeholder,
  type,
  icon,
  rightIcon,
  ...rest
}) => {
  return (
    <FormControl>
      <InputGroup size="sm" bgColor="white" borderRadius={5}>
        <InputLeftElement pointerEvents="none" py={7} ms={2}>
          {icon}
        </InputLeftElement>
        <Input
          size={"lg"}
          borderRadius={10}
          type={type}
          placeholder={placeholder}
          py={7}
          fontSize={"18px"}
          bgColor={"#D0D3D4"}
          {...rest} // pass any additional props to the Chakra UI Input component
        />
        <InputRightElement py={7} pe={"15px"} _hover={{ cursor: "pointer" }}>
          {rightIcon}
        </InputRightElement>
      </InputGroup>
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </FormControl>
  );
};

export default InputFormLogin;
