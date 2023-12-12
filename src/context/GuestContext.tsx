import { useToast } from "@chakra-ui/react";
import { ReactNode, createContext } from "react";

interface GuestContextProps {
  showToast: (
    type: "info" | "warning" | "success" | "error" | "loading",
    title: string | null,
    subtitle: string | null
  ) => void;
}

export const GuestContext = createContext<GuestContextProps>({
  showToast: () => {},
});

interface GuestProvidersProps {
  children: ReactNode;
}

export const GuestProvider = ({ children }: GuestProvidersProps) => {
  const toast = useToast();
  const showToast = (
    type: "info" | "warning" | "success" | "error" | "loading",
    title: string | null,
    subtitle: string | null
  ) => {
    toast({
      title: title,
      description: subtitle,
      status: type,
      variant: "subtle",
      position: "top",
      isClosable: true,
    });
  };

  return (
    <GuestContext.Provider value={{ showToast }}>
      {children}
    </GuestContext.Provider>
  );
};
