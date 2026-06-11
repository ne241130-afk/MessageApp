
const express = require('express');

const PORT = 8080;

let stock = 5;
let stock_shortage = -1;

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.render('top.ejs', { stock: stock });
});

app.post('/order', (req, res) => {
  let stock_check = stock - Number(req.body.order);
  console.log(Number(req.body.order));
  console.log(stock_check);
  if (stock_check < 0) {
    stock_shortage = Math.abs(stock_check);
    res.render('out_of_stock.ejs', { stock_shortage: stock_shortage });
  }
  else {
    stock = stock_check;
    res.render('order_succeeded.ejs',
      { order: Number(req.body.order) }
    );
  }
});

app.listen(process.env.PORT || PORT);
