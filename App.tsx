import { FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { searchTMDB } from "./api/axios";
import LogoSvg from "./components/LogoSVG";
import MoviesRow from "./components/MoviesRow";
import { Result } from "./models/MoviesResponse";
import { COLORS } from "./Utils/colors";
import {
  PLACEHOLDER_MOVIE_SEARCH,
  PLACEHOLDER_TV_SEARCH
} from "./Utils/constants";
import { SearchType } from "./Utils/utils";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Result[]>();
  const [tvShows, setTvShows] = useState<Result[]>();
  const [placeHolder, setPlaceHolder] = useState(PLACEHOLDER_MOVIE_SEARCH);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "movie", title: "Movie" },
    { key: "tv", title: "TV" }
  ]);

  const peformSearch = async () => {
    let type: SearchType = index == 0 ? "movie" : "tv";
    searchTMDB(type, query).subscribe(results =>
      type == "movie" ? setMovies(results) : setTvShows(results)
    );
  };

  const MovieScreen = () => {
    return (
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={movies}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => <MoviesRow type="movie" item={item} />}
        />
      </View>
    );
  };

  const TVScreen = () => {
    return (
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={tvShows}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => <MoviesRow type={"tv"} item={item} />}
        />
      </View>
    );
  };
  const renderScene = SceneMap({
    movie: MovieScreen,
    tv: TVScreen
  });
  const initialLayout = { width: Dimensions.get("window").width };
  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color: COLORS.secondary, fontSize: 16 }}>
          {route.title}
        </Text>
      )}
      indicatorStyle={{ backgroundColor: COLORS.tertiary }}
      style={{ backgroundColor: COLORS.primary }}
    />
  );
  return (
    <View style={styles.back}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />

        <View style={styles.header}>
          <LogoSvg width={50} height={50} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>TMDB Search</Text>
          </View>
        </View>
        <View style={{ paddingTop: 8 }}>
          <TextInput
            style={styles.search}
            placeholder={placeHolder}
            onChangeText={text => setQuery(text)}
            value={query}
            onSubmitEditing={async () => await peformSearch()}
          />
          <TouchableOpacity
            onPress={async () => await peformSearch()}
            style={styles.searchIcon}
          >
            <FontAwesome name="search" size={30} color="gray" />
          </TouchableOpacity>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={i => {
            setIndex(i);
            setPlaceHolder(
              i == 0 ? PLACEHOLDER_MOVIE_SEARCH : PLACEHOLDER_TV_SEARCH
            );
          }}
          initialLayout={initialLayout}
          renderTabBar={renderTabBar}
        />
        {/* <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={movies}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => <MoviesRow item={item} />}
          />
        </View> */}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: COLORS.primary
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary
  },
  logo: {
    width: 100,
    height: 50
  },
  titleContainer: {
    padding: 8
  },
  title: {
    color: COLORS.secondary,
    fontSize: 34,
    fontWeight: "bold"
  },
  search: {
    fontSize: 24,
    paddingVertical: 8,
    paddingLeft: 16
  },
  searchIcon: {
    position: "absolute",
    right: 16,
    top: 8
  }
});
