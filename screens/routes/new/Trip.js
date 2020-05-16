import React, { createRef, useEffect, useState } from "react";
import { InteractionManager, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE, Polyline as PolyLineMark, Marker } from "react-native-maps";
import LandmarkItem from "../../../components/route/LandmarkItem";
import BackButton from "../../../components/map/BackButton";
import Polyline from "@mapbox/polyline";
import Loading from "../../../components/ui/Loading";
import BottomSheet from "../../../components/map/BottomSheet";
import { faLandmark, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { View, StyleSheet, ScrollView } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { mapStyle } from "../../../constants/mapStyle";
import { colors } from "../../../constants/theme";

const Trip = ({ navigation, route }) => {
  const { trip } = route.params;
  const [loading, setLoading] = useState(true);
  const [polyline, setPolyline] = useState([]);
  const [mapReady, setMapReady] = useState(false);

  let mapRef = createRef();

  // Calculate paddings for showing the route inside the map
  const sidePadding = Dimensions.get("window").width * 0.1;
  const topPadding = Dimensions.get("window").height * 0.1;
  const bottomPadding = Dimensions.get("window").height * 0.45;

  // Show the screen after the screen navigation animation has finished
  useEffect(() => {
    // Decode received polyline in order to show the route on map
    const points = Polyline.decode(trip.route);
    const coords = points.map((point) => ({ latitude: point[0], longitude: point[1] }));
    setPolyline(coords);

    InteractionManager.runAfterInteractions(() => {
      // We are not loading anymore, show the map
      setLoading(false);
    });
  }, [trip]);

  // If map is already ready (it is rendered already), fit the route in the view
  // useEffect(() => {
  //   if (mapReady) {
  //     mapRef.fitToCoordinates(trip.locations, {
  //       edgePadding: { top: topPadding, right: sidePadding, bottom: bottomPadding, left: sidePadding },
  //       animated: true,
  //     });
  //   }
  // }, [polyline, mapReady]);

  if (loading) return <Loading text="Loading trip" />;

  return (
    <View style={styles.map}>
      <MapView
        onMapReady={() => {
          setLoading(false);
          setMapReady(true);
        }}
        ref={(ref) => (mapRef = ref)}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={mapStyle}
      >
        {/* Draw the route */}
        <PolyLineMark coordinates={polyline} strokeWidth={5} strokeColor="#3890FB" />

        {/* Mark all the locations */}
        {trip.locations.map((loc, index) => (
          <Marker
            key={loc.latitude}
            tracksViewChanges={false}
            title={loc.name}
            coordinate={{ latitude: parseFloat(loc.latitude), longitude: parseFloat(loc.longitude) }}
          >
            {index == 0 || index == trip.locations.length - 1 ? (
              <FontAwesomeIcon icon={faMapMarkerAlt} size={30} style={styles.icon} />
            ) : (
              <View style={{ backgroundColor: "#30D158", padding: 6, borderRadius: 20 }}>
                <FontAwesomeIcon icon={faLandmark} size={18} style={styles.icon} />
              </View>
            )}
          </Marker>
        ))}
      </MapView>
      <BottomSheet title="Route overview" buttonText="Start route">
        <ScrollView>
          {trip.locations.map((location) => (
            <LandmarkItem location={location} key={location.latitude} />
          ))}
        </ScrollView>
      </BottomSheet>

      <BackButton onPress={() => navigation.navigate("PlannedRoutes")} />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: colors.textPrimary,
  },
  map: {
    flex: 1,
  },
});

export default Trip;
