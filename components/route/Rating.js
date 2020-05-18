import React from "react";
import StarRating from "react-native-star-rating";
import { StyleSheet } from "react-native";

const Rating = ({ rating, color }) => {
  return (
    <StarRating
      disabled={true}
      maxStars={5}
      rating={rating}
      fullStarColor={color}
      emptyStarColor={color}
      halfStarColor={color}
      emptyStar={"star-o"}
      fullStar={"star"}
      halfStar={"star-half-full"}
      iconSet={"FontAwesome"}
      reversed
      starSize={16}
      starStyle={styles.star}
    />
  );
};

const styles = StyleSheet.create({
  star: {
    margin: 1,
  },
});

export default Rating;
