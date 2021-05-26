const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dburl =
  "mongodb+srv://user:user@cluster0.dhnws.mongodb.net/E_commerce?retryWrites=true&w=majority";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "static")));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

var Allcategory = mongoose.model(
  "Allcategory",
  {
    name: String,
    price: Number,
    link: String,
    cat: String,
    quantity: Number,
    incart: Boolean,
  },
  "allcategorys"
);
var Cart = mongoose.model(
  "Cart",
  {
    name: String,
    price: Number,
    link: String,
    cat: String,
    quantity: Number,
    incart: Boolean,
  },
  "carts"
);

var Order = mongoose.model("Order", {
  name: String,
  address: String,
  city: String,
  product: [{ name: String, quantity: Number, price: Number }],
  amount: Number,
});

var Profile = mongoose.model(
  "Profile",
  {
    name: String,
    number: Number,
    email: String,
  },
  "profile"
);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/getall", (req, res) => {
  Allcategory.find({}, (err, data) => {
    res.send(data);
  });
});
app.get("/getcart", (req, res) => {
  Cart.find({}, (err, data) => {
    res.send(data);
  });
});

app.get("/getorder", (req, res) => {
  Order.find({}, (err, data) => {
    if (err) console.log(err);
    else res.send(data);
  });
});

app.get("/getprofile", (req, res) => {
  Profile.find({}, (err, data) => {
    res.send(data);
  });
});

app.post("/addtocart", (req, res) => {
  var name = req.body.name;
  Allcategory.findOneAndUpdate(
    { name: name },
    { incart: true },
    (err, product) => {
      cart = new Cart(product);
      cart._id = mongoose.Types.ObjectId();
      cart.isNew = true;
      cart.incart = true;
      cart.save();
    }
  );
});

app.post("/removecart", (req, res) => {
  var name = req.body.name;
  Cart.findOneAndDelete({ name: name }, (err, data) => {
    if (err) console.log(err);
  });
  Allcategory.findOneAndUpdate(
    { name: name },
    { incart: false },
    (err, data) => {
      if (err) console.log(err);
    }
  );
});

app.post("/addnew", (req, res) => {
  product = new Allcategory(req.body.product);
  product.save();
});
app.post("/delete", (req, res) => {
  Allcategory.findOneAndDelete({ name: req.body.product }, (err, data) => {
    if (err) console.log(err);
  });
});

app.post("/edit", (req, res) => {
  Allcategory.findOneAndUpdate(
    { name: req.body.name },
    { quantity: req.body.quantity, price: req.body.price },
    (err, data) => {
      if (err) console.log(err);
    }
  );
});

app.post("/placeOrder", (req, res) => {
  var data = req.body.data;
  var order = new Order(data);
  order.save();
  for (let i = 0; i < data.product.length; i++) {
    Allcategory.findOneAndUpdate(
      { name: data.product[i].name },
      { $inc: { quantity: -data.product[i].quantity }, incart: false },
      (err, data) => {
        if (err) console.log(err);
      }
    );
  }
  Cart.remove({}, (err) => {
    if (err) console.log(err);
  });
});

app.post("/editprofile", (req, res) => {
  var newprofile = req.body.profile;
  Profile.findOneAndUpdate(
    { name: req.body.name },
    {
      name: newprofile.name,
      number: newprofile.number,
      email: newprofile.email,
    },
    (err, data) => {
      if (err) console.log(err);
    }
  );
});
mongoose.connect(dburl, (err) => {
  console.log("database connected", err);
});

app.listen(port, () => {
  console.log("server is listening at: ", port);
});
