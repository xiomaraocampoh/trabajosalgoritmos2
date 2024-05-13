class Client {
  constructor(type) {
    this.type = type;
  }
}

class Bank {
  constructor() {
    this.clients = {
      preferential: [],
      general: [],
      noAccount: []
    };
    this.cashiers = [
      { id: 1, type: "retiro" },
      { id: 2, type: "retiro" },
      { id: 3, type: "deposito" },
      { id: 4, type: "deposito" },
      { id: 5, type: "asesoria" }
    ];
  }

  addClient(client) {
    if (client.type === "preferential") {
      this.clients.preferential.push(client);
    } else if (client.type === "general") {
      this.clients.general.push(client);
    } else {
      this.clients.noAccount.push(client);
    }
  }

  serveClients() {
    const availableCashiers = this.cashiers.filter(cashier => !cashier.client);

    // Atender clientes preferenciales
    this.clients.preferential.forEach(client => {
      const cashier = availableCashiers.find(cashier => cashier.type === "deposito" || cashier.id === 5);
      if (cashier) {
        cashier.client = client;
        console.log(`Atendiendo a ${client.type} en caja ${cashier.id}`);
      }
    });

    // Atender clientes generales
    this.clients.general.forEach(client => {
      const cashier = availableCashiers.find(cashier => cashier.type === "deposito" || cashier.id === 5);
      if (cashier) {
        cashier.client = client;
        console.log(`Atendiendo a ${client.type} en caja ${cashier.id}`);
      }
    });

    // Atender clientes sin cuenta
    this.clients.noAccount.forEach(client => {
      const cashier = availableCashiers.find(cashier => cashier.type === "asesoria" && cashier.id === 5);
      if (cashier) {
        cashier.client = client;
        console.log(`Atendiendo a ${client.type} en caja ${cashier.id}`);
      }
    });

    // Liberar cajas
    this.cashiers = this.cashiers.map(cashier => {
      if (cashier.client) {
        cashier.client = null;
      }
      return cashier;
    });
  }
}

// Ejemplo de uso:
const bank = new Bank();

// Agregar clientes
bank.addClient(new Client("preferential"));
bank.addClient(new Client("general"));
bank.addClient(new Client("noAccount"));

// Atender clientes
bank.serveClients();
