class Product {
  constructor(id, name, initialBid, date) {
    this.id = id;
    this.name = name;
    this.initialBid = initialBid;
    this.date = date;
    this.bids = [];
  }

  addBid(bid) {
    this.bids.push(bid);
  }

  getHighestBid() {
    return Math.max(...this.bids);
  }
}

class Bid {
  constructor(bidder, value, date, product) {
    this.bidder = bidder;
    this.value = value;
    this.date = date;
    this.product = product;
  }
}

class Auction {
  constructor() {
    this.products = [];
  }

  registerProduct(id, name, initialBid, date) {
    const product = new Product(id, name, initialBid, date);
    this.products.push(product);
  }

  placeBid(bidder, value, date, productId) {
    const product = this.products.find(product => product.id === productId);
    if (product) {
      const bid = new Bid(bidder, value, date, product);
      product.addBid(value);
      return true;
    } else {
      console.log("El producto no existe.");
      return false;
    }
  }

  viewProducts() {
    this.products.forEach(product => {
      console.log(`ID: ${product.id}, Nombre: ${product.name}, Fecha: ${product.date}, Precio inicial: ${product.initialBid}`);
    });
  }

  viewBidsByProduct(productId) {
    const product = this.products.find(product => product.id === productId);
    if (product) {
      console.log(`Bids for product ID ${productId}:`);
      product.bids.forEach((bid, index) => {
        console.log(`${index + 1}. ${bid.bidder} - ${bid.value} (${bid.date})`);
      });
    } else {
      console.log("El producto no existe.");
    }
  }

  selectWinningBid(productId) {
    const product = this.products.find(product => product.id === productId);
    if (product) {
      const highestBid = product.getHighestBid();
      const winningBid = product.bids.find(bid => bid.value === highestBid);
      console.log(`El oferente ${winningBid.bidder} ha ganado la subasta del producto ID ${productId} con un valor de ${winningBid.value}`);
    } else {
      console.log("El producto no existe.");
    }
  }
}

// Ejemplo de uso:
const auction = new Auction();

// Registrar productos
auction.registerProduct(1, "Producto 1", 100, "2023-01-01");
auction.registerProduct(2, "Producto 2", 200, "2023-01-02");

// Realizar ofertas
auction.placeBid("Juan", 150, "2023-01-03", 1);
auction.placeBid("Pedro", 250, "2023-01-04", 2);
auction.placeBid("Ana", 300, "2023-01-05", 1);

// Ver productos y ofertas
auction.viewProducts();
auction.viewBidsByProduct(1);
auction.viewBidsByProduct(2);

// Seleccionar oferta ganadora
auction.selectWinningBid(1);
auction.selectWinningBid(2);
