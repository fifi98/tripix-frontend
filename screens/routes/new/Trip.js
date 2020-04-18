import React from "react";
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from "react-native-maps";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { mapStyle } from "../../../constants/mapStyle";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MyContext } from "../../../context/Provider";
import Sheet from "../../../components/Sheet";
import { colors } from "../../../constants/theme";
import LandmarkItem from "../../../components/Route/Overview/LandmarkItem";

const Trip = ({ navigation }) => {
  const { user, newRoute } = React.useContext(MyContext);

  let mapRef = React.createRef();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleShowAll = () => {
    sheet.current.snapTo(0);
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Sheet />
      </View>
      <MapView
        onMapReady={() => {
          mapRef.fitToCoordinates(newRoute.trip.locations, {
            edgePadding: { top: 0, right: 50, bottom: 200, left: 50 },
            animated: true,
          });
        }}
        ref={(ref) => (mapRef = ref)}
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        customMapStyle={mapStyle}
      >
        {/* Draw the route */}
        <Polyline coordinates={newRoute.trip.locations} strokeWidth={5} strokeColor="#3890FB" />

        {/* Mark all the locations */}
        {newRoute.trip.locations.map((loc) => (
          <Marker key={loc.latitude} coordinate={{ latitude: loc.latitude, longitude: loc.longitude }} />
        ))}
      </MapView>
      <Sheet title="Route overview" buttonText="Start route">
        <ScrollView>
          {newRoute.trip.locations.map((location) => (
            <LandmarkItem location={location} key={location.latitude} />
          ))}
        </ScrollView>
      </Sheet>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleBack}>
          <FontAwesomeIcon icon={faChevronCircleLeft} style={styles.icon} size={34} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    left: 22,
    top: 34,
  },
  icon: {
    color: "white",
  },
  panelContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: 600,
    paddingHorizontal: 20,
    backgroundColor: "#313233",
  },
  header: {
    backgroundColor: "#313233",
    shadowColor: "#000000",
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 50,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
});

export default Trip;
