import { useNavigate } from "react-router-dom";
import MemberLayout from "../../../components/layouts/MemberLayout";
import {
  Flex,
  FlexProps,
  HStack,
  Image,
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Product, ResponseProduct } from "../../../models/ResponseProduct";
import axios from "axios";
import { BASE_API_URL, BASE_URL } from "../../../helpers/url";
import Cookies from "js-cookie";
import { Icon } from "@iconify/react";
import back from "@iconify/icons-ion/arrow-back";
import sort from "@iconify/icons-ion/funnel-outline";
import { Color } from "../../../helpers/color";
import HTMLString from "react-html-string";

interface ProductCardProps extends FlexProps {
  title?: string | undefined;
  desc?: string | undefined;
  img?: string | undefined | null;
  harga?: string | undefined;
}

const ProductCard = ({ title, desc, img, harga, id }: ProductCardProps) => {
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
      <Image src={BASE_URL + img} w={"75px"} h={"75px"} borderRadius={"10px"} />
      <Flex flexDir={"column"} w={"230px"} gap={1}>
        <Text fontSize={"14px"} fontWeight={"bold"}>
          {title}
        </Text>
        <Text fontSize={"12px"} noOfLines={3}>
          <HTMLString html={desc ?? ""} />
        </Text>
        <Text fontSize={"10px"} color={"#333333"} fontStyle={"italic"} mt={3}>
          {harga}
        </Text>
      </Flex>
    </Flex>
  );
};

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortTerm, setSortTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const rupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  useEffect(() => {
    setIsLoading(true);
    const getProducts = () => {
      axios
        .get(BASE_API_URL + "/product?&sort=" + sortTerm, {
          headers: { Authorization: `Bearer ${Cookies.get("userToken")}` },
        })
        .then((res) => {
          const response: ResponseProduct = res.data;
          setProducts(response.data ?? []);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    };
    getProducts();
  }, [sortTerm]);

  return (
    <MemberLayout>
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
          {"Product"}
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
          {products?.map((product) => {
            return (
              <ProductCard
                key={product.id}
                id={"" + product.id}
                title={product.judul}
                desc={product.deskripsi}
                img={product.images?.length > 0 ? product.images[0].name : ""}
                harga={rupiah(parseInt(product.harga ?? "0"))}
              />
            );
          })}
        </Flex>
      )}
    </MemberLayout>
  );
};

export default ProductPage;
