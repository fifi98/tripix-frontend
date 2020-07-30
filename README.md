<p align="center">
<img src="https://github.com/fifi98/TripixPublic/blob/master/screenshots/logo.png?raw=true" alt="" width="100" height="100"/>
</p>
<h1 align="center">Tripix</h1>

Tripix is a mobile application available both for iOS and Android platforms which helps users in planning their trips. The way the application makes planning trips easier is by automating the whole process and by suggesting landmarks the user may be interested in visiting. This is a project I have been working with my colleague for a competition called Lumen Development 2020 which is the largest student programming competition in Croatia. We won the 3rd place and got a lot of good feedback on the project. 

## Duration
- March 2020 - July 2020

## Technologies used
My responsibilities on this project were front-end development using React Native and REST API integration.

Front-end:
- React Native

Back-end:
- Laravel

Database management:
- MySQL

## Home screen
<p align="center">
<img src="https://github.com/fifi98/TripixPublic/blob/master/screenshots/1.png?raw=true" alt="" width="30%"/>
</p>
All the main application's functionalities can be seen straight from the simple modern looking home screen - creating a new route, viewing planned routes, viewing finished routes, creating a suggested route and finding nearby places (restaurants, coffee shops, shops and attractions).

## Viewing planned and finished routes

<p align="center">
  <img src="https://github.com/fifi98/TripixPublic/blob/master/screenshots/14.png?raw=true" width="30%" />
  <img src="https://github.com/fifi98/TripixPublic/blob/master/screenshots/15.png?raw=true" width="30%" /> 
</p>

Routes that user creates are saved to his account and can be viewed any time by clicking on the "Planned routes" button from the main screen. Routes that user finishes (goes to the trip he planned and visits all the chosen landmarks) are stored in the "Finished routes" section. When clicked on a route, user can view it displayed on the map.

## Creating a new route

<p align="center">
  <img src="https://github.com/fifi98/TripixPublic/blob/master/screenshots/2.png?raw=true" width="30%" />
  <img src="https://github.com/fifi98/TripixPublic/blob/master/screenshots/3.png?raw=true" width="30%" /> 
  <img src="https://github.com/fifi98/TripixPublic/blob/master/screenshots/4.png?raw=true" width="30%" />
</p>

When creating a new route, user is asked to enter the trip location and date. After that, the applications shows him landmarks for that location which he might be interested in visiting during his trip.


<p align="center">
  <img src="https://github.com/fifi98/TripixPublic/blob/master/screenshots/5.png?raw=true" width="30%" />
  <img src="https://github.com/fifi98/TripixPublic/blob/master/screenshots/6.png?raw=true" width="30%" /> 
  <img src="https://github.com/fifi98/TripixPublic/blob/master/screenshots/7.png?raw=true" width="30%" />
</p>

User can then select landmarks which he wants to visit during his trip. When a landmark is selected, it is marked with a filled check mark, Landmarks can be searched by name and by categories.

<p align="center">
  <img src="https://github.com/fifi98/TripixPublic/blob/master/screenshots/8.png?raw=true" width="30%" />
  <img src="https://github.com/fifi98/TripixPublic/blob/master/screenshots/9.png?raw=true" width="30%" /> 
  <img src="https://github.com/fifi98/TripixPublic/blob/master/screenshots/10.png?raw=true" width="30%" />
</p>

When long pressed on a landmark, some details are shown about it - the name, rating and a selected top user review. After selecting all landmarks, user can view them in the "Selected" tab. If those are all the landmarks he wants to include in his trip, he can click "Next" after which he is asked to pick a location from which he wants to start his trip.

<p align="center">
  <img src="https://github.com/fifi98/TripixPublic/blob/master/screenshots/11.png?raw=true" width="30%" />
  <img src="https://github.com/fifi98/TripixPublic/blob/master/screenshots/12.png?raw=true" width="30%" /> 
  <img src="https://github.com/fifi98/TripixPublic/blob/master/screenshots/13.png?raw=true" width="30%" />
</p>

After that, user is asked to pick an ending location for his trip after which a trip overview is shown to him containing the optimal trip route and some useful information regarding the trip like the total time and distance. If the user likes the generated route, he can click "Create" after which the route is shown to him on a map.


## Tracking trip progress

Except for the planning itself, Tripix also helps users during the planned trip. When user arrives at the location of his trip, he can open the created trip from "Planned routes" section and press "Start route". After that, the application is tracking user's location and is marking which landmarks user has visited. It also tells the user which landmark he has to visit next according to the generated optimal trip route.

This functionality can be seen on https://youtu.be/aTVQiE2uQjo (1:30)

## Discovering nearby locations

Besides routes, users can also discover some locations in the nearby which might be useful during a trip. Users can choose from the main screen to view nearby restaurants, coffee shops, shops and attractions.

<p align="center">
  <img src="https://github.com/fifi98/TripixPublic/blob/master/screenshots/16.png?raw=true" width="22%" />
  <img src="https://github.com/fifi98/TripixPublic/blob/master/screenshots/17.png?raw=true" width="22%" /> 
  <img src="https://github.com/fifi98/TripixPublic/blob/master/screenshots/18.png?raw=true" width="22%" />
  <img src="https://github.com/fifi98/TripixPublic/blob/master/screenshots/19.png?raw=true" width="22%" />
</p>
