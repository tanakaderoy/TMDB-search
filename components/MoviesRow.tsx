import React from "react";
import { Image, Linking, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { Result } from "../models/MoviesResponse";
import { COLORS } from "../Utils/colors";
import { getTmdbImage } from "../Utils/utils";

interface Props {
  item: Result;
}

const MoviesRow = ({ item }: Props) => {
  const handleClick = (id: Number) => {
    Linking.canOpenURL("https://www.themoviedb.org/movie/" + id).then(
      supported => {
        if (supported) {
          Linking.openURL("https://www.themoviedb.org/movie/" + id);
        } else {
          console.log(
            "Don't know how to open URI: " +
              "https://www.themoviedb.org/movie/" +
              id
          );
        }
      }
    );
  };

  return (
    <View style={styles.movieRow}>
      <View>
        <Image
          resizeMode="cover"
          source={{ uri: getTmdbImage(item.poster_path) }}
          style={styles.poster}
        />
        <View style={styles.ratingContainer}>
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: 12,
              fontWeight: "normal"
            }}
          >
            {Math.floor(item.vote_average * 10) + "%"}
          </Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text>{item.overview}</Text>
        <View style={styles.buttonRow}>
          <Button
            style={{ paddingVertical: 8, paddingHorizontal: 8 }}
            type="outline"
            buttonStyle={{
              backgroundColor: COLORS.tertiary,
              borderRadius: 15,
              width: 50,
              height: 30
            }}
            titleStyle={{
              color: "#fff",
              fontSize: 12,
              textAlign: "center",
              fontWeight: "700"
            }}
            title="Play"
            onPress={() => console.log("Playing" + item.title)}
          />
          <Button
            style={{ paddingVertical: 8 }}
            type="outline"
            buttonStyle={{
              backgroundColor: "#fff",
              borderRadius: 15,
              width: 50,
              height: 30
            }}
            titleStyle={{
              color: "#000",
              fontSize: 12,
              textAlign: "center",
              fontWeight: "700"
            }}
            title="View"
            onPress={() => handleClick(item.id)}
          />
        </View>
      </View>
    </View>
  );
};

export default MoviesRow;

const styles = StyleSheet.create({
  poster: {
    width: 150,
    height: 225,
    borderRadius: 8
  },
  movieRow: {
    flex: 1,
    flexDirection: "row",
    padding: 16
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: "700"
  },
  textContainer: {
    flex: 1,
    paddingStart: 10
  },
  buttonRow: {
    flexDirection: "row",
    paddingVertical: 8
  },
  ratingContainer: {
    position: "absolute",
    left: 8,
    bottom: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center"
  }
});
