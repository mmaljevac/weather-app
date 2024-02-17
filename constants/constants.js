export const apiKey = '196b32705ebf4ecca19151828241702';

export const dayMode = '92, 179, 255';
export const nightMode = '13, 38, 59';

const sunny = require('../assets/images/sunny.png');
const partlycloudy = require('../assets/images/partlycloudy.png');
const cloudy = require('../assets/images/cloudy.png');
const rain = require('../assets/images/rain.png');
const heavyrain = require('../assets/images/heavyrain.png');
const snow = require('../assets/images/snow.png');
const fog = require('../assets/images/fog.png');

const clear_night = require('../assets/images/clear_night.png');
const partlycloudy_night = require('../assets/images/partlycloudy_night.png');

export const weatherImages = {
  'sunny': sunny,
  'clear': sunny,
  'partlycloudy': partlycloudy,
  'overcast': cloudy,
  'cloudy': cloudy,
  'moderaterain': rain,
  'patchyrain possible': rain,
  'lightrain': rain,
  'lightrain shower': rain,
  'moderaterainattimes': rain,
  'lightdrizzle': rain,
  'patchyrainnearby': rain,
  'heavyrain': heavyrain,
  'heavyrainattimes': heavyrain,
  'moderateorheavyrainshower': heavyrain,
  'moderateorheavyrainwiththunder': heavyrain,
  'lightfreezingrain': snow,
  'moderateorheavyfreezingrain': snow,
  'lightsleet': snow,
  'lightsnow': snow,
  'moderatesnow': snow,
  'heavysnow': snow,
  'patchylightsnow': snow,
  'mist': fog,
  'fog': fog,
  'freezing fog': fog,
  'other': fog
}

export const weatherImagesNight = {
  'sunny': clear_night,
  'clear': clear_night,
  'partlycloudy': partlycloudy_night,
  'overcast': cloudy,
  'cloudy': cloudy,
  'moderaterain': rain,
  'patchyrainpossible': rain,
  'lightrain': rain,
  'lightrainshower': rain,
  'moderaterainattimes': rain,
  'lightdrizzle': rain,
  'patchyrainnearby': rain,
  'heavyrain': heavyrain,
  'heavyrainattimes': heavyrain,
  'moderateorheavyrainshower': heavyrain,
  'moderateorheavyrainwiththunder': heavyrain,
  'lightfreezingrain': snow,
  'moderateorheavyfreezingrain': snow,
  'lightsleet': snow,
  'lightsnow': snow,
  'moderatesnow': snow,
  'heavysnow': snow,
  'patchylightsnow': snow,
  'mist': fog,
  'fog': fog,
  'freezing fog': fog,
  'other': fog
}