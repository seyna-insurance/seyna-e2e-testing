import slugify from "slugify";

const firstNames = [
  "Jade",
  "Louise",
  "Ambre",
  "Alba",
  "Emma",
  "Rose",
  "Alice",
  "Romy",
  "Anna",
  "Lina",
  "Gabriel",
  "Léo",
  "Raphaël",
  "Maël",
  "Louis",
  "Noah",
  "Jules",
  "Arthur",
  "Adam",
  "Lucas",
];

const lastNames = [
  "Martin",
  "Bernard",
  "Dubois",
  "Thomas",
  "Robert",
  "Richard",
  "Petit",
  "Durand",
  "Leroy",
  "Moreau",
  "Simon",
  "Laurent",
  "Lefebvre",
  "Michel",
  "Garcia",
  "David",
  "Bertrand",
  "Roux",
  "Vincent",
  "Fournier",
];

export const randomIdentity = () => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const username = `}`;
  const email = `${slugify(firstName.toLowerCase())}.${slugify(
    lastName.toLowerCase()
  )}@maildrop.cc`;
  const phone = "0123456789";
  return {
    firstName,
    lastName,
    email,
    phone,
  };
};
