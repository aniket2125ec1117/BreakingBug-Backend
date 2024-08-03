
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Seller = require('./models/sellerSchema')
const Customer = require('./models/customerSchema')
const Order = require('./models/orderSchema')
const Product = require('./models/productSchema')

// MongoDB URL
const mongoURL = process.env.MONGO_URL;

console.log(`
IEEE CS MUJ Breaking Bug - Database set up.

Setting up the database. This might take a moment.
Note: It worked if it ends with "Dummy data created!"
`)

if (!mongoURL) {
  return process.exit(1);
}
// Connect to MongoDB
mongoose.connect(mongoURL)
  .then(() => {
    console.log('MongoDB connected...');
    createDummyData();  // Call function to create dummy data
  })
  .catch(err => console.log(err.message));

// Function to create dummy data
async function createDummyData() {
  // Dummy Seller
  const seller = new Seller({
    name: "John's Shop",
    email: `jo${Math.random(3)}h1n@1mp.0le.com`,
    password: "password123",
    shopName: "JohnsShop"
  });
  await seller.save();

  // Dummy Customer
  const customer = new Customer({
    name: "Jane Doe",
    email: `ane@exa1m1p.l14${Math.random(3)}5e.com`,
    password: "password123",
    shippingData: {
      address: "123 Main St",
      city: "Anytown",
      state: "Anystate",
      country: "USA",
      pinCode: 12345,
      phoneNo: 1234567890
    }
  });
  await customer.save();

  // Dummy Product
  const product = new Product({
    productName: "Sample Product",
    price: {
      mrp: 100,
      cost: 90,
      discountPercent: 10
    },
    subcategory: "Sample Subcategory",
    productImage: "sample.jpg",
    category: "Sample Category",
    description: "This is a sample product.",
    tagline: "Best product ever!",
    seller: seller._id
  });
  await product.save();

  // Dummy Order
  const order = new Order({
    buyer: customer._id,
    shippingData: customer.shippingData,
    orderedProducts: [{
      productName: product.productName,
      price: product.price,
      // subcategory: product.subcategory, // no reference given
      productImage: product.productImage,
      category: product.category,
      description: product.description,
      tagline: product.tagline,
      quantity: 1,
      seller: seller._id
    }],
    paymentInfo: {
      id: "payment123",
      status: "Paid"
    },
    paidAt: new Date(),
    productsQuantity: 1,
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 90,
    orderStatus: "Processing"
  });
  await order.save();

  console.log('Dummy data created!');
}


