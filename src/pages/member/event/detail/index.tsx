import { useEffect, useState } from "react";
import MemberLayout from "../../../../components/layouts/MemberLayout";
import { Flex, Text, VStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_API_URL } from "../../../../helpers/url";
import axios from "axios";
import Cookies from "js-cookie";
import { Event } from "../../../../models/ResponseEvent";
import LoadingPage from "../../../../components/Loading";
import { Icon } from "@iconify/react";
import back from "@iconify/icons-ion/arrow-back";

const DetailEventPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState<Event>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(BASE_API_URL + "/event/" + id, {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      })
      .then((res) => {
        setEvent(res.data.data);
        console.log(res.data.data);

        setIsLoading(false);
      });
  }, [id]);
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <MemberLayout title="Detail Event">
      <Flex justifyContent={"center"} alignItems={"center"} py={3}>
        <Text
          position={"absolute"}
          left={5}
          top={4}
          onClick={() => {
            navigate("/member/event");
          }}
        >
          <Icon icon={back} />
        </Text>
        <Text fontSize={"16px"} fontWeight={"bold"}>
          {"Detail Event"}
        </Text>
      </Flex>
      <VStack mt={5} w={"full"} px={3}>
        <iframe
          src={
            "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d7906.045112707632!2d" +
            event?.longitude +
            "!3d" +
            event?.latitude +
            "!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1701140121819!5m2!1sid!2sid"
          }
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0 }}
          allowFullScreen
        ></iframe>
        <Text fontSize={"18px"} fontWeight={"bold"} mt={3} mb={-2}>
          {event?.nama_event}
        </Text>
        <Text fontSize={"12px"} color={"#333333"} fontStyle={"italic"}>
          {event?.lokasi + " - " + event?.tgl_event}
        </Text>
        <Text fontSize={"16px"} mt={3} textAlign={"justify"}>
          {event?.deskripsi}
        </Text>
        <Text></Text>
      </VStack>
    </MemberLayout>
  );
};

export default DetailEventPage;
