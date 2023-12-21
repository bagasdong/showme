import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import LoadingPage from "../../../../components/Loading";
import MemberLayout from "../../../../components/layouts/MemberLayout";
import { Flex, Image, Text, VStack } from "@chakra-ui/react";
import { BASE_API_URL, BASE_IMAGE_URL } from "../../../../helpers/url";
import { Product } from "../../../../models/ResponseProduct";
import { Icon } from "@iconify/react";
import back from "@iconify/icons-ion/arrow-back";
import { Color } from "../../../../helpers/color";
import HTMLString from "react-html-string";

const DetailProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const rupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(BASE_API_URL + "/product/" + id, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      })
      .then((res) => {
        setProduct(res.data.data);
        setIsLoading(false);
      });
  }, [id]);
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <MemberLayout title="Detail Product">
      <Flex justifyContent={"center"} alignItems={"center"} py={3}>
        <Text
          position={"absolute"}
          left={5}
          top={4}
          onClick={() => {
            navigate("/member/");
          }}
          _hover={{ cursor: "pointer" }}
        >
          <Icon icon={back} />
        </Text>
        <Text fontSize={"16px"} fontWeight={"bold"}>
          {"Detail Product"}
        </Text>
      </Flex>
      <VStack px={3} mt={5}>
        <Image
          src={
            product?.gambar
              ? BASE_IMAGE_URL + product.gambar
              : "https://inkifi.com/pub/media/wysiwyg/instagram-photo-size/4.jpg"
          }
          w={"full"}
          borderRadius={"10px"}
        />
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
          <Text
            fontSize={"21px"}
            fontWeight={"bold"}
            textAlign={"start"}
            w={"full"}
            color={Color.primary}
            my={5}
          >
            {rupiah(parseInt(product?.harga ?? "0"))}
          </Text>
          <Link
            to={
              "https://api.whatsapp.com/send/?phone=628112651934&text=Halo+Showme%2C+saya+tertarik+dengan+produk+%2A" +
              product?.judul +
              "%2A%2C+apakah+bisa+dibantu%3F&type=phone_number&app_absent=0"
            }
          >
            <Flex
              w={"150px"}
              h={"40px"}
              bgColor={Color.primary}
              color={"white"}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"5px"}
            >
              <Text>Pesan Produk</Text>
            </Flex>
          </Link>
        </Flex>
        <Text
          fontSize={"18px"}
          fontWeight={"bold"}
          mb={-2}
          textAlign={"start"}
          w={"full"}
        >
          {product?.judul}
        </Text>

        <Text fontSize={"14px"} mt={3} mb={-2} textAlign={"start"} w={"full"}>
          <HTMLString html={product?.deskripsi ?? ""} />
        </Text>
      </VStack>
    </MemberLayout>
  );
};

export default DetailProductPage;
