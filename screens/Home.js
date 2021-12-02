import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Platform,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import HeaderTabs from "../components/home/HeaderTabs";
import SearchBar from "../components/home/SearchBar";
import Categories from "../components/home/Categories";
import BottomTabs from "../components/home/BottomTabs";
import RestaurantItem, {
  localRestaurants,
} from "../components/home/RestaurantItem";
import { Divider } from "react-native-elements/dist/divider/Divider";

const YELP_API_KEY =
  "kJrYl7wXSvOUn1VfdkEgpc4UAkwSBNpQAT1RE9yZDVNYEFbTkNQJdR3hTQJIZXl8pLPW5cCeDfefGqqzCb_5VHKOFizlKkeF3D8ZHauKssPucElfjHMkMRbm1VmmYXYx";
export default function Home({ navigation }) {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState("San Francisco");
  const [activeTab, setActiveTab] = useState("Delivery");

  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) => {
        setRestaurantData(
          json.businesses.filter((business) =>
            business.transactions.includes(activeTab.toLowerCase())
          )
        );
      });
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);
  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <StatusBar hidden />
      <View style={{ marginTop: 0, backgroundColor: "#fff", padding: 15 }}>
        <HeaderTabs setActiveTab={setActiveTab} activeTab={activeTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItem
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs />
    </SafeAreaView>
  );
}
