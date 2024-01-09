import { useNavigate } from "react-router-dom";
import MemberLayout from "../../../components/layouts/MemberLayout";
import {
  Flex,
  FlexProps,
  HStack,
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Product, ResponseProduct } from "../../../models/ResponseProduct";
import axios from "axios";
import { BASE_API_URL } from "../../../helpers/url";
import Cookies from "js-cookie";
import { Icon } from "@iconify/react";
import back from "@iconify/icons-ion/arrow-back";
import sort from "@iconify/icons-ion/funnel-outline";
import { Color } from "../../../helpers/color";
import HTMLString from "react-html-string";

interface GalleryCardProps extends FlexProps {
  title?: string | undefined;
  desc?: string | undefined;
}

const GalleryCard = ({ title, desc, id }: GalleryCardProps) => {
  const navigate = useNavigate();

  return (
    <Flex
      bgColor={"white"}
      w={"full"}
      px={5}
      py={3}
      shadow={"md"}
      borderRadius={"10px"}
      gap={3}
      alignItems={"center"}
      onClick={() => navigate("" + id)}
      _hover={{ cursor: "pointer" }}
    >
      <Flex flexDir={"column"} w={"230px"} gap={1}>
        <Text fontSize={"14px"} fontWeight={"bold"}>
          {title}
        </Text>
        <HTMLString html={desc ?? ""} />
      </Flex>
    </Flex>
  );
};

const GalleryPage = () => {
  const [galleries, setGalleries] = useState<Product[]>([]);
  const [sortTerm, setSortTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const getGalleries = () => {
      axios
        .get(BASE_API_URL + "/gallery?&sort=" + sortTerm, {
          headers: { Authorization: `Bearer ${Cookies.get("userToken")}` },
        })
        .then((res) => {
          const response: ResponseProduct = res.data;
          setGalleries(response.data ?? []);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    };
    getGalleries();
  }, [sortTerm]);

  return (
    <MemberLayout title="Gallery">
      <Flex justifyContent={"center"} pt={3}>
        <Text
          position={"absolute"}
          left={5}
          top={4}
          onClick={() => {
            navigate(-1);
          }}
          cursor={"pointer"}
        >
          <Icon icon={back} />
        </Text>
        <Text fontSize={"16px"} fontWeight={"bold"}>
          {"Gallery"}
        </Text>
      </Flex>
      <HStack w={"full"} my={5} px={5} gap={5}>
        <Select
          placeholder="Urutkan"
          bgColor={"white"}
          icon={<Icon icon={sort} />}
          iconColor="#666"
          onChange={(e) => setSortTerm(e.target.value)}
        >
          <option value="latest">Terbaru</option>
          <option value="oldest">Terlama</option>
        </Select>
      </HStack>
      {isLoading ? (
        <Spinner mt={5} color={Color.primary} />
      ) : (
        <Flex
          flexDir={"column"}
          gap={3}
          px={5}
          w={"full"}
          position={"relative"}
        >
          {galleries?.map((gallery) => {
            return (
              <GalleryCard
                key={gallery.id}
                id={"" + gallery.id}
                title={gallery.judul}
                desc={gallery.deskripsi}
              />
            );
          })}
        </Flex>
      )}
    </MemberLayout>
  );
};

export default GalleryPage;
