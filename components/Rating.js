import React from "react";
import { StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

const Rating = ({ rating }) => {
  let icons = [];

  let fullStars = Math.floor(rating);
  let halfStars = rating % 1;
  if (halfStars != 0) {
    if (halfStars > 0.8) {
      fullStars++;
      halfStars = 0;
    } else halfStars = 1;
  }

  const blankStars = 5 - (fullStars + halfStars);

  for (let i = 0; i < blankStars; i++) icons.push(<FontAwesomeIcon key={Math.random()} icon={faStarRegular} style={styles.icon} />);
  for (let i = 0; i < halfStars; i++)
    icons.push(<FontAwesomeIcon key={Math.random()} icon={faStarHalfAlt} style={styles.icon} transform={{ flipX: 1 }} />);
  for (let i = 0; i < fullStars; i++) icons.push(<FontAwesomeIcon key={Math.random()} icon={faStar} style={styles.icon} />);

  return <View style={{ flexDirection: "row" }}>{icons}</View>;
};

const styles = StyleSheet.create({
  icon: {
    color: "white",
  },
});

export default Rating;
