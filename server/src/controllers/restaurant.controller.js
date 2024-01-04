module.exports.fetchAllRestaurants = async (_req, res) => {
      try {
        const restaurants = await getAllRestaurants();
        console.log(restaurants);
        res.status(200).json(restaurants);
      } catch (error) {
        res.status(500).json({ error: error });
      }
    };
    
    module.exports.fetchRestaurantById = async (req, res) => {
      try {
        const restaurant = await getRestaurantById(req.params.id);
        res.status(200).json(restaurant);
      } catch (error) {
        res.status(500).json({ error: "Server error" });
      }
    };