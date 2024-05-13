class Room {
  constructor(type, smoking, pets) {
    this.type = type;
    this.smoking = smoking;
    this.pets = pets;
    this.reservations = [];
  }

  isAvailable(startDate, endDate) {
    return !this.reservations.some(reservation => {
      const reservationStart = new Date(reservation.startDate);
      const reservationEnd = new Date(reservation.endDate);

      return (
        (startDate >= reservationStart && startDate <= reservationEnd) ||
        (endDate >= reservationStart && endDate <= reservationEnd)
      );
    });
  }

  addReservation(reservation) {
    this.reservations.push(reservation);
  }

  getOccupancy() {
    return this.reservations.reduce((total, reservation) => total + reservation.numPeople, 0);
  }
}

class Hotel {
  constructor() {
    this.rooms = {
      individual: {
        smoking: new Room("individual", true, false),
        nonSmoking: new Room("individual", false, false)
      },
      double: {
        smoking: new Room("double", true, false),
        nonSmoking: new Room("double", false, false)
      },
      family: {
        smoking: new Room("family", true, true),
        nonSmoking: new Room("family", false, true)
      }
    };
    this.reservations = [];
  }

  makeReservation(type, smoking, startDate, endDate, numPeople, country, pets) {
    const room = this.rooms[type][smoking ? "smoking" : "nonSmoking"];

    if (room.isAvailable(startDate, endDate)) {
      const reservation = {
        startDate,
        endDate,
        numPeople,
        country,
        pets
      };
      room.addReservation(reservation);
      this.reservations.push(reservation);
      return true;
    } else {
      console.log("Lo sentimos, la habitación no está disponible en las fechas seleccionadas.");
      return false;
    }
  }

  getStatistics() {
    const totalPeople = this.reservations.reduce((total, reservation) => total + reservation.numPeople, 0);
    const petOwners = this.reservations.filter(reservation => reservation.pets).length;

    return {
      totalPeople,
      petOwners,
      rooms: Object.values(this.rooms).reduce((total, roomType) => {
        Object.values(roomType).forEach(room => {
          total.total += room.getOccupancy();
          total.individual += room.reservations.filter(reservation => reservation.numPeople === 2).length;
          total.double += room.reservations.filter(reservation => reservation.numPeople === 4).length;
          total.family += room.reservations.filter(reservation => reservation.numPeople === 6).length;
        });
        return total;
      }, {
        total: 0,
        individual: 0,
        double: 0,
        family: 0
      })
    };
  }
}

// Ejemplo de uso:
const hotel = new Hotel();

// Reservar habitaciones
hotel.makeReservation("individual", false, "2023-01-01", "2023-01-05", 2, "USA", false);
hotel.makeReservation("double", true, "2023-01-07", "2023-01-10", 4, "Canada", false);
hotel.makeReservation("family", false, "2023-01-12", "2023-01-15", 6, "Mexico",
