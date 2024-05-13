class Bank {
  constructor() {
    this.accounts = {};
  }

  validateIdentity(identity) {
    // Validación de identidad de ejemplo
    return !!this.accounts[identity];
  }

  validatePin(identity, pin) {
    // Validación de PIN de ejemplo
    return this.accounts[identity].pin === pin;
  }

  approveTransaction(identity) {
    // Aprobación de transacción de ejemplo
    return true;
  }

  getAccount(identity) {
    return this.accounts[identity];
  }
}

class ATM {
  constructor(bank) {
    this.bank = bank;
    this.operatorMode = false;
  }

  startTransaction(identity, pin) {
    if (!this.operatorMode) {
      if (this.bank.validateIdentity(identity)) {
        if (this.bank.validatePin(identity, pin)) {
          return true;
        } else {
          let attempts = 3;
          while (attempts > 0) {
            console.log("PIN inválido. Intente nuevamente.");
            pin = prompt("Ingrese su PIN:");
            attempts--;
            if (this.bank.validatePin(identity, pin)) {
              break;
            }
          }
          if (attempts === 0) {
            console.log("Ha excedido el número máximo de intentos. Saliendo de la aplicación.");
            return false;
          }
        }
      } else {
        console.log("Identidad inválida.");
        return false;
      }
    }
    return true;
  }

  processTransaction(transactionType, identity, amount, isCheck) {
    if (this.startTransaction(identity, prompt("Ingrese su PIN:"))) {
      const account = this.bank.getAccount(identity);
      switch (transactionType) {
        case "withdraw":
          if (this.bank.approveTransaction(identity)) {
            if (amount % 50000 === 0) {
              if (amount <= account.balance) {
                account.balance -= amount;
                console.log(`Retiro exitoso. Tomar ${amount} desde la bandeja principal.`);
              } else {
                console.log("Saldo insuficiente.");
              }
            } else {
              console.log("El monto de retiro debe ser múltiplo de $50000.");
            }
          } else {
            console.log("Transacción denegada.");
          }
          break;
        case "deposit":
          account.balance += amount;
          console.log(`Depósito exitoso. El nuevo saldo es ${account.balance}.`);
          break;
        case "transfer":
          const targetIdentity = prompt("Ingrese el documento de identidad del destinatario:");
          const targetAccount = this.bank.getAccount(targetIdentity);
          if (targetAccount) {
            if (amount <= account.balance) {
              account.balance -= amount;
              targetAccount.balance += amount;
              console.log(`Transferencia exitosa. El nuevo saldo de la cuenta ${identity} es ${account.balance}.`);
            } else {
              console.log("Saldo insuficiente.");
            }
          } else {
            console.log("Identidad de destinatario inválida.");
          }
          break;
        case "balance":
          console.log(`Saldo de la cuenta ${identity}: ${account.balance}`);
          break;
        default:
          console.log("Transacción no válida.");
      }
    }
  }

  setOperatorMode(mode) {
    this.operatorMode = mode;
  }
}

const bank = new Bank();
const atm = new ATM(bank)
