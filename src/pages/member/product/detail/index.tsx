import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import LoadingPage from "../../../../components/Loading";
import MemberLayout from "../../../../components/layouts/MemberLayout";
import { Flex, Image, Text, VStack } from "@chakra-ui/react";
import { BASE_API_URL } from "../../../../helpers/url";
import { Product } from "../../../../models/ResponseProduct";
import { Icon } from "@iconify/react";
import back from "@iconify/icons-ion/arrow-back";
import { Color } from "../../../../helpers/color";

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
            product?.gambar ??
            "https://inkifi.com/pub/media/wysiwyg/instagram-photo-size/4.jpg"
          }
          w={"full"}
          borderRadius={"10px"}
        />
        <Text
          fontSize={"21px"}
          fontWeight={"bold"}
          textAlign={"end"}
          w={"full"}
          color={Color.primary}
          my={5}
        >
          {rupiah(parseInt(product?.harga ?? ""))}
        </Text>
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
          {product?.deskripsi}
        </Text>
      </VStack>
    </MemberLayout>
  );
};

export default DetailProductPage;
