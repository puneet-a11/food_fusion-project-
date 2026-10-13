// ===== FOOD DATA (shared across all pages) =====
// Replace the "img" paths with your own 20 photos: images/pizza1.jpg, images/burger1.jpg, etc.

const foodItems = [
  // ---- PIZZA ----
  { id: "p1", name: "Margherita Pizza", category: "pizza", price: 299, rating: 4.6, img: "images/pizza1.jpg", special: true },
  { id: "p2", name: "Pepperoni Pizza", category: "pizza", price: 349, rating: 4.8, img: "images/pizza2.jpg" },
  { id: "p3", name: "Cheese Burst Pizza", category: "pizza", price: 379, rating: 4.7, img: "images/pizza3.jpg", special: true },
  { id: "p4", name: "Veggie Pizza", category: "pizza", price: 329, rating: 4.5, img: "images/pizza4.jpg" },
  { id: "p5", name: "Farmhouse Pizza", category: "pizza", price: 349, rating: 4.6, img: "images/pizza5.jpg" },

  // ---- BURGER ----
  { id: "b1", name: "Classic Cheeseburger", category: "burger", price: 199, rating: 4.5, img: "images/burger1.jpg" },
  { id: "b2", name: "Crispy Chicken Burger", category: "burger", price: 219, rating: 4.7, img: "images/burger2.jpg", special: true },
  { id: "b3", name: "Double Patty Burger", category: "burger", price: 259, rating: 4.8, img: "images/burger3.jpg" },
  { id: "b4", name: "Veg Burger", category: "burger", price: 149, rating: 4.3, img: "images/burger4.jpg" },
  { id: "b5", name: "Grilled Burger", category: "burger", price: 229, rating: 4.6, img: "images/burger5.jpg" },

  // ---- DRINKS ----
  { id: "d1", name: "Cold Cola", category: "drinks", price: 49, rating: 4.2, img: "images/drink1.jpg" },
  { id: "d2", name: "Cold Coffee", category: "drinks", price: 99, rating: 4.4, img: "images/drink2.jpg" },
  { id: "d3", name: "Orange Juice", category: "drinks", price: 79, rating: 4.5, img: "images/drink3.jpg" },
  { id: "d4", name: "Strawberry Milkshake", category: "drinks", price: 119, rating: 4.7, img: "images/drink4.jpg", special: true },
  { id: "d5", name: "Mojito", category: "drinks", price: 129, rating: 4.6, img: "images/drink5.jpg" },

  // ---- DESSERTS ----
  { id: "ds1", name: "Chocolate Lava Cake", category: "desserts", price: 149, rating: 4.9, img: "images/dessert1.jpg", special: true },
  { id: "ds2", name: "Ice Cream Sundae", category: "desserts", price: 129, rating: 4.6, img: "images/dessert2.jpg" },
  { id: "ds3", name: "Chocolate Brownie", category: "desserts", price: 119, rating: 4.7, img: "images/dessert3.jpg" },
  { id: "ds4", name: "Cheesecake", category: "desserts", price: 159, rating: 4.8, img: "images/dessert4.jpg" },
  { id: "ds5", name: "Chocolate Pastry", category: "desserts", price: 89, rating: 4.5, img: "images/dessert5.jpg" }
];

const reviews = [
  { name: "Aarav Sharma", text: "Best pizza in town! Delivery was super fast and food was still hot.", rating: 5, img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Priya Verma", text: "The build-your-own pizza feature is so much fun. Loved customizing it!", rating: 5, img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Rohan Mehta", text: "Great taste, fresh ingredients, and the app is super easy to use.", rating: 4, img: "https://randomuser.me/api/portraits/men/64.jpg" },
  { name: "Sneha Kapoor", text: "Ordered the chicken burger — absolutely delicious. Will order again!", rating: 5, img: "https://randomuser.me/api/portraits/women/68.jpg" }
];
