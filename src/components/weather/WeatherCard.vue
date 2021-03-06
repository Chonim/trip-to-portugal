<template>
  <div class="card cardTemplate weather-forecast" v-if="weather">
    <div class="city-key" hidden></div>
    <div class="card-last-updated" hidden></div>
    <div class="location">{{weather.location.city}}</div>
    <div class="date">{{weather.lastBuildDate}}</div>
    <div class="description">{{weather.item.condition.text}}</div>
    <div class="current">
      <div class="visual">
        <div :class="['icon', getIcon(weather.item.condition.code)]"></div>
        <div class="temperature">
          <span class="value">{{calcFtoC(weather.item.condition.temp)}}</span><span class="scale">°C</span>
        </div>
      </div>
      <div class="description">
        <div class="humidity">{{weather.atmosphere.humidity}}%</div>
        <div class="wind">
          <span class="value">{{weather.wind.speed}}</span>
          <span class="scale">mph</span>
          <span class="direction">{{weather.wind.direction}}</span>°
        </div>
        <div class="sunrise">{{weather.astronomy.sunrise}}</div>
        <div class="sunset">{{weather.astronomy.sunset}}</div>
      </div>
    </div>
    <div class="future">
      <template v-for="(forecast, i) in weather.item.forecast">
        <div class="oneday" :key="i">
          <div class="date"></div>
          <div :class="['icon', getIcon(forecast.code)]"></div>
          <div class="temp-high">
            <span class="value">{{calcFtoC(forecast.high)}}</span>°
          </div>
          <div class="temp-low">
            <span class="value">{{calcFtoC(forecast.low)}}</span>°
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherCard',
  props: {
    weather: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    calcFtoC (f) {
      return parseInt((f - 32) * 5 / 9)
    },
    getIcon (weatherCode) {
      weatherCode = parseInt(weatherCode)
      switch (weatherCode) {
        case 25: // cold
        case 32: // sunny
        case 33: // fair (night)
        case 34: // fair (day)
        case 36: // hot
        case 3200: // not available
          return 'clear-day'
        case 0: // tornado
        case 1: // tropical storm
        case 2: // hurricane
        case 6: // mixed rain and sleet
        case 8: // freezing drizzle
        case 9: // drizzle
        case 10: // freezing rain
        case 11: // showers
        case 12: // showers
        case 17: // hail
        case 35: // mixed rain and hail
        case 40: // scattered showers
          return 'rain'
        case 3: // severe thunderstorms
        case 4: // thunderstorms
        case 37: // isolated thunderstorms
        case 38: // scattered thunderstorms
        case 39: // scattered thunderstorms (not a typo)
        case 45: // thundershowers
        case 47: // isolated thundershowers
          return 'thunderstorms'
        case 5: // mixed rain and snow
        case 7: // mixed snow and sleet
        case 13: // snow flurries
        case 14: // light snow showers
        case 16: // snow
        case 18: // sleet
        case 41: // heavy snow
        case 42: // scattered snow showers
        case 43: // heavy snow
        case 46: // snow showers
          return 'snow'
        case 15: // blowing snow
        case 19: // dust
        case 20: // foggy
        case 21: // haze
        case 22: // smoky
          return 'fog'
        case 24: // windy
        case 23: // blustery
          return 'windy'
        case 26: // cloudy
        case 27: // mostly cloudy (night)
        case 28: // mostly cloudy (day)
        case 31: // clear (night)
          return 'cloudy'
        case 29: // partly cloudy (night)
        case 30: // partly cloudy (day)
        case 44: // partly cloudy
          return 'partly-cloudy-day'
      }
    }
  }
}
</script>

<style scoped>
/*
 * Copyright 2016 Google Inc.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

* {
  box-sizing: border-box; }

html, body {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  font-family: 'Helvetica', 'Verdana', sans-serif;
  font-weight: 400;
  font-display: optional;
  color: #444;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; }

div, h1, h2, h3, h4 {
  color: #444;
  text-align: left;
}

html {
  overflow: hidden; }

body {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-flex-wrap: nowrap;
      -ms-flex-wrap: nowrap;
          flex-wrap: nowrap;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
      -ms-flex-align: stretch;
          align-items: stretch;
  -webkit-align-content: stretch;
      -ms-flex-line-pack: stretch;
          align-content: stretch;
  /* background: #ececec;  */
}

.header {
  width: 100%;
  height: 56px;
  color: #FFF;
  background: #3F51B5;
  position: fixed;
  font-size: 20px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 2px 9px 1px rgba(0, 0, 0, 0.12), 0 4px 2px -2px rgba(0, 0, 0, 0.2);
  padding: 16px 16px 0 16px;
  will-change: transform;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
      -ms-flex-direction: row;
          flex-direction: row;
  -webkit-flex-wrap: nowrap;
      -ms-flex-wrap: nowrap;
          flex-wrap: nowrap;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
      -ms-flex-pack: start;
          justify-content: flex-start;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
      -ms-flex-align: stretch;
          align-items: stretch;
  -webkit-align-content: center;
      -ms-flex-line-pack: center;
          align-content: center;
  -webkit-transition: -webkit-transform 0.233s cubic-bezier(0, 0, 0.21, 1) 0.1s;
  transition: -webkit-transform 0.233s cubic-bezier(0, 0, 0.21, 1) 0.1s;
  transition: transform 0.233s cubic-bezier(0, 0, 0.21, 1) 0.1s;
  transition: transform 0.233s cubic-bezier(0, 0, 0.21, 1) 0.1s, -webkit-transform 0.233s cubic-bezier(0, 0, 0.21, 1) 0.1s;
  z-index: 1000; }
  .header .headerButton {
    width: 24px;
    height: 24px;
    margin-right: 16px;
    text-indent: -30000px;
    overflow: hidden;
    opacity: 0.54;
    -webkit-transition: opacity 0.333s cubic-bezier(0, 0, 0.21, 1);
    transition: opacity 0.333s cubic-bezier(0, 0, 0.21, 1);
    border: none;
    outline: none;
    cursor: pointer; }
  .header #butRefresh {
    background: url(/static/img/ic_refresh_white_24px.svg) center center no-repeat; }
  .header #butAdd {
    background: url(/static/img/ic_add_white_24px.svg) center center no-repeat; }

.header__title {
  font-weight: 400;
  font-size: 20px;
  margin: 0;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
      -ms-flex: 1;
          flex: 1; }

.loader {
  left: 50%;
  top: 50%;
  position: fixed;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%); }
  .loader #spinner {
    box-sizing: border-box;
    stroke: #673AB7;
    stroke-width: 3px;
    -webkit-transform-origin: 50%;
            transform-origin: 50%;
    -webkit-animation: line 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite, rotate 1.6s linear infinite;
            animation: line 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite, rotate 1.6s linear infinite; }

@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0);
            transform: rotate(0); }
  to {
    -webkit-transform: rotate(450deg);
            transform: rotate(450deg); } }

@keyframes rotate {
  from {
    -webkit-transform: rotate(0);
            transform: rotate(0); }
  to {
    -webkit-transform: rotate(450deg);
            transform: rotate(450deg); } }

@-webkit-keyframes line {
  0% {
    stroke-dasharray: 2, 85.964;
    -webkit-transform: rotate(0);
            transform: rotate(0); }
  50% {
    stroke-dasharray: 65.973, 21.9911;
    stroke-dashoffset: 0; }
  100% {
    stroke-dasharray: 2, 85.964;
    stroke-dashoffset: -65.973;
    -webkit-transform: rotate(90deg);
            transform: rotate(90deg); } }

@keyframes line {
  0% {
    stroke-dasharray: 2, 85.964;
    -webkit-transform: rotate(0);
            transform: rotate(0); }
  50% {
    stroke-dasharray: 65.973, 21.9911;
    stroke-dashoffset: 0; }
  100% {
    stroke-dasharray: 2, 85.964;
    stroke-dashoffset: -65.973;
    -webkit-transform: rotate(90deg);
            transform: rotate(90deg); } }

.main {
  padding-top: 60px;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
      -ms-flex: 1;
          flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; }

.dialog-container {
  background: rgba(0, 0, 0, 0.57);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  will-change: opacity;
  -webkit-transition: opacity 0.333s cubic-bezier(0, 0, 0.21, 1);
  transition: opacity 0.333s cubic-bezier(0, 0, 0.21, 1); }

.dialog-container--visible {
  opacity: 1;
  pointer-events: auto; }

.card {
  padding: 16px;
  padding-left: 4px;
  position: relative;
  box-sizing: border-box;
  background: #fff;
  border-radius: 2px;
  margin: 16px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12); }

.weather-forecast .location {
  font-size: 1.75em; }

.weather-forecast .date, .weather-forecast .description {
  font-size: 1.25em; }

.weather-forecast .current {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex; }
  .weather-forecast .current .icon {
    width: 128px;
    height: 128px; }
  .weather-forecast .current .visual {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    font-size: 4em; }
    .weather-forecast .current .visual .scale {
      font-size: 0.5em;
      vertical-align: super; }
  .weather-forecast .current .visual, .weather-forecast .current .description {
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
            flex-grow: 1; }
  .weather-forecast .current .sunset:before {
    content: "Sunset: ";
    color: #888; }
  .weather-forecast .current .wind:before {
    content: "Wind: ";
    color: #888; }
  .weather-forecast .current .sunrise:before {
    content: "Sunrise: ";
    color: #888; }
  .weather-forecast .current .humidity:before {
    content: "Humidity: ";
    color: #888; }
  .weather-forecast .current .pollen:before {
    content: "Pollen Count: ";
    color: #888; }
  .weather-forecast .current .pcount:before {
    content: "Pollen ";
    color: #888; }

.weather-forecast .future {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex; }
  .weather-forecast .future .oneday {
    -webkit-box-flex: 1;
    -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
            flex-grow: 1;
    text-align: center; }
    .weather-forecast .future .oneday .icon {
      width: 64px;
      height: 64px;
      margin-left: auto;
      margin-right: auto; }
    .weather-forecast .future .oneday .temp-high, .weather-forecast .future .oneday .temp-low {
      display: inline-block; }
    .weather-forecast .future .oneday .temp-low {
      color: #888; }

.weather-forecast .icon {
  background-repeat: no-repeat;
  background-size: contain; }
  .weather-forecast .icon.clear-day {
    background-image: url("/static/img/clear.png"); }
  .weather-forecast .icon.clear-night {
    background-image: url("/static/img/clear.png"); }
  .weather-forecast .icon.rain {
    background-image: url("/static/img/rain.png"); }
  .weather-forecast .icon.snow {
    background-image: url("/static/img/snow.png"); }
  .weather-forecast .icon.sleet {
    background-image: url("/static/img/sleet.png"); }
  .weather-forecast .icon.windy {
    background-image: url("/static/img/wind.png"); }
  .weather-forecast .icon.fog {
    background-image: url("/static/img/fog.png"); }
  .weather-forecast .icon.cloudy {
    background-image: url("/static/img/cloudy.png"); }
  .weather-forecast .icon.partly-cloudy-day {
    background-image: url("/static/img/partly-cloudy.png"); }
  .weather-forecast .icon.partly-cloudy-night {
    background-image: url("/static/img/partly-cloudy.png"); }
  .weather-forecast .icon.thunderstorms {
    background-image: url("/static/img/thunderstorm.png"); }

@media (max-width: 450px) {
  .weather-forecast .date, .weather-forecast .description {
    font-size: 0.9em; }
  .weather-forecast .current .icon {
    width: 96px;
    height: 96px; }
  .weather-forecast .current .visual {
    font-size: 3em; }
  .weather-forecast .future .oneday .icon {
    width: 32px;
    height: 32px; } }

.mdl-button {
  background: transparent;
  border: none;
  border-radius: 2px;
  color: black;
  position: relative;
  height: 36px;
  margin: 0;
  min-width: 64px;
  padding: 0 16px;
  display: inline-block;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  line-height: 1;
  letter-spacing: 0;
  overflow: hidden;
  will-change: box-shadow;
  -webkit-transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  line-height: 36px;
  vertical-align: middle; }
  .mdl-button::-moz-focus-inner {
    border: 0; }
  .mdl-button:hover {
    background-color: rgba(158, 158, 158, 0.2); }
  .mdl-button:focus:not(:active) {
    background-color: rgba(0, 0, 0, 0.12); }
  .mdl-button:active {
    background-color: rgba(158, 158, 158, 0.4); }
  .mdl-button.mdl-button--colored {
    color: #3f51b5; }
    .mdl-button.mdl-button--colored:focus:not(:active) {
      background-color: rgba(0, 0, 0, 0.12); }

.mdl-button--primary.mdl-button--primary {
  color: #3f51b5; }
  .mdl-button--primary.mdl-button--primary .mdl-ripple {
    background: white; }
  .mdl-button--primary.mdl-button--primary.mdl-button--raised, .mdl-button--primary.mdl-button--primary.mdl-button--fab {
    color: white;
    background-color: #3f51b5; }

.deleteButton {
  position: absolute;
  font-size: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
}
</style>
