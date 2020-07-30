import React, { createRef, useEffect, useState } from "react";
import { InteractionManager, Dimensions, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE, Polyline as PolyLineMark, Marker } from "react-native-maps";
import LandmarkItem from "../../../components/route/LandmarkItem";
import BackButton from "../../../components/map/BackButton";
import Polyline from "@mapbox/polyline";
import Loading from "../../../components/ui/Loading";
import BottomSheet from "../../../components/map/BottomSheet";
import BackgroundGeolocation from "@mauron85/react-native-background-geolocation";
import Progress from "../../../components/route/started/Progress";
import api from "../../../utils/api";
import { faLandmark, faMapMarkerAlt, faFlag } from "@fortawesome/free-solid-svg-icons";
import { View, StyleSheet, ScrollView } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { getDistance } from "geolib";
import { mapStyle } from "../../../constants/mapStyle";
import { colors } from "../../../constants/theme";

const Trip = ({ navigation, route }) => {
  const { trip } = route.params;
  const [loading, setLoading] = useState(true);
  const [polyline, setPolyline] = useState([]);
  const [mapReady, setMapReady] = useState(false);

  const [landmarks, setLandmarks] = useState(trip.locations);
  const [started, setStarted] = useState(false);

  let mapRef = createRef();

  const handleBack = () => {
    if (!started) return navigation.navigate("PlannedRoutes");

    Alert.alert(
      "Are you sure you want to quit the route?",
      "Your progress will be saved and you can continue the route any time",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            BackgroundGeolocation.stop();
            BackgroundGeolocation.removeAllListeners();
            setStarted(false);
            navigation.navigate("PlannedRoutes");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleStartRoute = () => {
    setStarted(true);

    BackgroundGeolocation.getCurrentLocation((location) => {
      landmarks.forEach((landmark) => {
        const distance = getDistance(
          { latitude: location.latitude, longitude: location.longitude },
          { latitude: landmark.latitude, longitude: landmark.longitude }
        );
        if (distance <= 200 && landmark.status == 0) {
          // Change landmark status
          setLandmarks(
            landmarks.map((l) => {
              if (l.place_id !== landmark.place_id) return l;
              return { ...l, status: 1 };
            })
          );
        }
      });
    });

    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 25,
      distanceFilter: 25,
      startOnBoot: false,
      stopOnTerminate: true,
      notificationsEnabled: false,
      debug: false,
      locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
      interval: 5000,
      fastestInterval: 1000,
      activitiesInterval: 5000,
      stopOnStillActivity: false,
    });

    BackgroundGeolocation.on("location", (location) => {
      BackgroundGeolocation.startTask(() => {
        landmarks.forEach((landmark) => {
          // Calculate distance between current location and that landmark
          const distance = getDistance(
            { latitude: location.latitude, longitude: location.longitude },
            { latitude: landmark.latitude, longitude: landmark.longitude }
          );

          // If the distance is less than 150m, mark the landmark as visited
          if (distance <= 200 && landmark.status == 0) {
            // Change the landmark status on the server
            api.post("/route-item/completed", { route_id: trip.route_id, place_id: landmark.place_id }).then(() => {
              // Change landmark status
              setLandmarks((old) =>
                old.map((l) => {
                  if (l.place_id !== landmark.place_id) return l;
                  return { ...l, status: 1 };
                })
              );
            });
          }
        });
      });
    });

    BackgroundGeolocation.start();
  };

  useEffect(() => {
    // If all locations have been visited
    const visited = landmarks.filter((loc) => parseInt(loc.status) === 1).length;

    if (visited === landmarks.length && started) {
      api.post("/route/finish", { route_id: trip.route_id }).then(() => {
        Alert.alert("You have finished the route!", "Your route will be moved to the Finished routes", [{ text: "OK" }]);
        BackgroundGeolocation.stop();
        BackgroundGeolocation.removeAllListeners();
      });
    }
  }, [landmarks]);

  // Calculate paddings for showing the route inside the map
  const sidePadding = Dimensions.get("window").width * 0.1;
  const topPadding = Dimensions.get("window").height * 0.1;
  const bottomPadding = Dimensions.get("window").height * 0.5;

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
  useEffect(() => {
    if (mapReady) {
      mapRef.fitToCoordinates(
        trip.locations.map((location) => ({ latitude: parseFloat(location.latitude), longitude: parseFloat(location.longitude) })),
        {
          edgePadding: { top: topPadding, right: sidePadding, bottom: bottomPadding, left: sidePadding },
          animated: true,
        }
      );
    }
  }, [polyline, mapReady]);

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
        showsUserLocation={started ? true : false}
        followsUserLocation={started ? true : false}
        showsCompass={false}
      >
        {/* Draw the route */}
        <PolyLineMark coordinates={polyline} strokeWidth={5} strokeColor="#3890FB" />

        {/* Mark all the locations */}
        {landmarks.map((loc, index) => (
          <Marker
            key={loc.latitude}
            tracksViewChanges={true}
            title={loc.name}
            coordinate={{ latitude: parseFloat(loc.latitude), longitude: parseFloat(loc.longitude) }}
          >
            <View style={loc.status == 1 && started ? styles.iconVisitedContainer : styles.iconContainer}>
              <FontAwesomeIcon
                icon={index == landmarks.length - 1 ? faFlag : index == 0 ? faMapMarkerAlt : faLandmark}
                size={18}
                style={loc.status == 1 && started ? styles.iconVisited : styles.icon}
              />
            </View>
          </Marker>
        ))}
      </MapView>

      <BottomSheet
        title={started ? "Next on route" : "Route overview"}
        buttonText={started ? "See all" : "Start route"}
        buttonHandler={started ? null : handleStartRoute}
      >
        <ScrollView>
          {landmarks.map((location) => (
            <LandmarkItem location={location} key={location.latitude} started={started} />
          ))}
        </ScrollView>
      </BottomSheet>

      {started && <Progress locations={landmarks} />}

      <BackButton onPress={handleBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 20,
  },
  icon: {
    color: "black",
  },
  iconVisitedContainer: {
    backgroundColor: "#30D158",
    padding: 6,
    borderRadius: 20,
  },
  iconVisited: {
    color: colors.textPrimary,
  },
  map: {
    flex: 1,
  },
});

export default Trip;
