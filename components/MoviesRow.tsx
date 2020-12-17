import React from "react";
import { Image, Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Result } from "../models/MoviesResponse";
import { COLORS } from "../Utils/colors";
import { getTmdbImage, SearchType } from "../Utils/utils";

interface Props {
  item: Result;
  type: SearchType;
}

interface ButtonProps {
  label: string;
  backgroundColor: string;
  action: VoidFunction;
  labelColor: string;
}

const MoviesRow = ({ item, type }: Props) => {
  const openInBrowser = (id: Number) => {
    Linking.canOpenURL("https://www.themoviedb.org/" + type + "/" + id).then(
      supported => {
        if (supported) {
          Linking.openURL(
            "https://www.themoviedb.org/" + type.toLowerCase() + "/" + id
          );
        } else {
          console.log(
            "Don't know how to open URI: " +
              "https://www.themoviedb.org/" +
              type +
              "/" +
              id
          );
        }
      }
    );
  };

  const getButton = ({
    label,
    labelColor,
    backgroundColor,
    action
  }: ButtonProps) => {
    return (
      <View style={{ paddingVertical: 8, paddingHorizontal: 8 }}>
        <TouchableOpacity
          onPress={action}
          style={{
            backgroundColor,
            borderRadius: 15,
            width: 50,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
            height: 30,
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              color: labelColor,
              fontSize: 12,
              textAlign: "center",
              fontWeight: "700"
            }}
          >
            {label}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.movieRow}>
      <View
        style={{
          ...styles.posterContainer,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          borderRadius: 8,
          elevation: 5
        }}
      >
        <Image
          resizeMode="cover"
          source={{ uri: getTmdbImage(item.poster_path) }}
          style={[styles.posterContainer, styles.poster]}
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
        <ScrollView style={styles.descriptionContainer}>
        <Text>{item.overview}</Text>
        </ScrollView>
        <View style={styles.buttonRow}>
          {getButton({
            label: "Play",
            labelColor: "#fff",
            backgroundColor: COLORS.tertiary,
            action: () => console.log("Playing: " + item.title)
          })}

          {getButton({
            label: "View",
            labelColor: "#000",
            backgroundColor: "#fff",
            action: () => openInBrowser(item.id)
          })}
        </View>
      </View>
    </View>
  );
};

export default MoviesRow;

const styles = StyleSheet.create({
  poster: {
    borderRadius: 8
  },
  posterContainer: {
    width: 150,
    height: 225
  },
  movieRow: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 8,
    padding: 16
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: "700"
  },
  descriptionContainer:{
    height:200
  },
  textContainer: {
    paddingStart: 10,
    flex:1,
    height:225
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
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  }
});
