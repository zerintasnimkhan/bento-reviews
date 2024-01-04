const { Schema, model, mongoose } = require("mongoose");

const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  reviews: {
    type: [{ type: Schema.ObjectId, ref: "review" }],
    required: true,
  },
  imgUrl: {
    type: String,
  },
});

const RestaurantModel = model("restaurant", RestaurantSchema);

module.exports.getAllRestaurants = () => RestaurantModel.find();

module.exports.getRestaurantById = (id) => RestaurantModel.findById(id);

module.exports.getRestaurantByCategory = (category) =>
  RestaurantModel.find({ category });

module.exports.addRestaurant = ({
  name,
  address,
  location,
  categories,
  ownerId,
  food,
  peakTime,
  imgUrl,
}) =>
  RestaurantModel.create({
    name,
    address,
    location,
    categories,
    ownerId,
    food,
    peakTime,
    imgUrl,
  });
