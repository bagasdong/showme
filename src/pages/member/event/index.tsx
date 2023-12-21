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
import {
  Event,
  EventCategory,
  ResponseEvent,
} from "../../../models/ResponseEvent";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_API_URL } from "../../../helpers/url";
import { Icon } from "@iconify/react";
import back from "@iconify/icons-ion/arrow-back";
import sort from "@iconify/icons-ion/funnel-outline";
import { Color } from "../../../helpers/color";

interface EventCardProps extends FlexProps {
  title?: string | undefined;
  desc?: string | undefined;
  location?: string | undefined;
  date?: string | undefined;
}

const EventCard = ({ title, desc, location, date, id }: EventCardProps) => {
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
      <Flex flexDir={"column"} w={"full"} gap={1}>
        <Text fontSize={"14px"} fontWeight={"bold"}>
          {title}
        </Text>
        <Text fontSize={"12px"} noOfLines={3}>
          {desc}
        </Text>
        <Text fontSize={"10px"} color={"#333333"} fontStyle={"italic"} mt={3}>
          {location} - {date}{" "}
        </Text>
      </Flex>
    </Flex>
  );
};

const EventPage = () => {
  const [events, setEvents] = useState<Event[] | undefined>([]);
  const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<string | null>("");
  const [sortTerm, setSortTerm] = useState<string | null>("");
  const navigate = useNavigate();

  const handleSort = (e: string) => {
    setSortTerm(e);
  };

  const handleCategory = (e: string) => {
    setCategory(e);
  };

  useEffect(() => {
    const getCategoryEvent = () => {
      axios
        .get(BASE_API_URL + "/event-category", {
          headers: { Authorization: `Bearer ${Cookies.get("userToken")}` },
        })
        .then((res) => {
          setEventCategories(res.data.data);
          getEvents();
        })
        .catch(() => {
          setIsLoading(false);
        });
    };

    const getEvents = () => {
      axios
        .get(
          BASE_API_URL + "/event?category=" + category + "&sort=" + sortTerm,
          {
            headers: { Authorization: `Bearer ${Cookies.get("userToken")}` },
          }
        )
        .then((res) => {
          const response: ResponseEvent = res.data;
          setEvents(response.data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    };

    setIsLoading(true);
    getCategoryEvent();
  }, [category, sortTerm]);
  return (
    <MemberLayout title="Event">
      <Flex justifyContent={"center"} pt={3}>
        <Text
          position={"absolute"}
          left={5}
          top={4}
          onClick={() => {
            navigate("/member");
          }}
        >
          <Icon icon={back} />
        </Text>
        <Text fontSize={"16px"} fontWeight={"bold"}>
          {"Event"}
        </Text>
      </Flex>
      <HStack w={"full"} my={5} px={5} gap={5}>
        <Select
          placeholder="Kategori"
          bgColor={"white"}
          icon={<Icon icon={sort} />}
          iconColor="#666"
          onChange={(e) => handleCategory(e.target.value)}
        >
          {eventCategories.map((cat, index) => {
            return (
              <option key={index} value={cat.id}>
                {cat.nama_kategori}
              </option>
            );
          })}
        </Select>
        <Select
          placeholder="Urutkan"
          bgColor={"white"}
          icon={<Icon icon={sort} />}
          iconColor="#666"
          onChange={(e) => handleSort(e.target.value)}
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
          {events?.map((event, index) => {
            return (
              <EventCard
                key={index}
                id={"" + event.id}
                title={event.nama_event}
                desc={event.deskripsi}
                location={event.lokasi}
                date={event.tgl_event}
              />
            );
          })}
        </Flex>
      )}
    </MemberLayout>
  );
};

export default EventPage;
