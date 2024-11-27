const Personels = [
  {
    id: 1,
    name: " Nattanicha Prueprang",
    role: "admin",
    completed: true,
    tel: "0812345678",
  },
  {
    id: 2,
    name: "Kunakorn Khamcharoen",
    role: "superadmin",
    completed: false,
    tel: "0823456789",
  },
  {
    id: 3,
    name: "Nitiphon Udomphot",
    role: "admin",
    completed: true,
    tel: "0834567890",
  },
  {
    id: 4,
    name: "Teeraphan Thienpromthong",
    role: "admin",
    completed: true,
    tel: "0845678901",
  },
  {
    id: 5,
    name: "Methaphon Thongnak",
    role: "admin",
    completed: true,
    tel: "0856789012",
  },
];
export function fetchPersonels() {
  return Personels.map((personel) => ({ 
    ...personel,
    username: `user${personel.id}`,
    password: "123456789", 
  }));
}
