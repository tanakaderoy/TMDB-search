import { FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { searchMovie } from "./api/axios";
import LogoSvg from "./components/LogoSVG";
import MoviesRow from "./components/MoviesRow";
import { Result } from "./models/MoviesResponse";
import { COLORS } from "./Utils/colors";
import { PLACEHOLDER_SEARCH } from "./Utils/constants";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>();

  const peformSearch = async () => {
    let movies = await searchMovie(query);
    setResults(movies.results);
  };
  return (
    <View style={styles.back}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />

        <View style={styles.header}>
          <LogoSvg width={50} height={50} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>MoviesDB Search</Text>
          </View>
        </View>
        <View style={{ paddingTop: 8 }}>
          <TextInput
            style={styles.search}
            placeholder={PLACEHOLDER_SEARCH}
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
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={results}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => <MoviesRow item={item} />}
          />
        </View>
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
