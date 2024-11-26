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
    name: "Itsara Boonma",
    role: "admin",
    completed: true,
    tel: "0856789012",
  },
  {
    id: 6,
    name: "Supachai Paiboon",
    role: "superadmin",
    completed: false,
    tel: "0867890123",
  },
  {
    id: 7,
    name: "Chanida Srisuk",
    role: "admin",
    completed: true,
    tel: "0878901234",
  },
  {
    id: 8,
    name: "Prasert Charoen",
    role: "superadmin",
    completed: false,
    tel: "0889012345",
  },
  {
    id: 9,
    name: "Arunee Khunpon",
    role: "admin",
    completed: true,
    tel: "0890123456",
  },
  {
    id: 10,
    name: "Narong Chaisiri",
    role: "admin",
    completed: true,
    tel: "0801234567",
  },
  {
    id: 11,
    name: "Suchada Pradit",
    role: "admin",
    completed: true,
    tel: "0812345678",
  },
  {
    id: 12,
    name: "Montree Sutee",
    role: "superadmin",
    completed: false,
    tel: "0823456789",
  },
  {
    id: 13,
    name: "Jariya Suwan",
    role: "admin",
    completed: true,
    tel: "0834567890",
  },
  {
    id: 14,
    name: "Prawit Sinsiri",
    role: "admin",
    completed: true,
    tel: "0845678901",
  },
  {
    id: 15,
    name: "Wilawan Jamnong",
    role: "admin",
    completed: true,
    tel: "0856789012",
  },
  {
    id: 16,
    name: "Thanet Tawee",
    role: "superadmin",
    completed: false,
    tel: "0867890123",
  },
  {
    id: 17,
    name: "Udom Jinda",
    role: "admin",
    completed: true,
    tel: "0878901234",
  },
  {
    id: 18,
    name: "Kanokwan Rattana",
    role: "superadmin",
    completed: false,
    tel: "0889012345",
  },
  {
    id: 19,
    name: "Worachai Phayao",
    role: "admin",
    completed: true,
    tel: "0890123456",
  },
  {
    id: 20,
    name: "Sujitra Songyot",
    role: "superadmin",
    completed: false,
    tel: "0801234567",
  },
  {
    id: 21,
    name: "Somchai Wongsa",
    role: "admin",
    completed: true,
    tel: "0812345678",
  },
  {
    id: 22,
    name: "Kamon Suwan",
    role: "admin",
    completed: true,
    tel: "0823456789",
  },
  {
    id: 23,
    name: "Pattra Ruangsak",
    role: "admin",
    completed: true,
    tel: "0834567890",
  },
  {
    id: 24,
    name: "Boonmee Thongchai",
    role: "admin",
    completed: true,
    tel: "0845678901",
  },
  {
    id: 25,
    name: "Nalinee Prasert",
    role: "admin",
    completed: true,
    tel: "0856789012",
  },
  {
    id: 26,
    name: "Thidarat Sanan",
    role: "admin",
    completed: true,
    tel: "0867890123",
  },
  {
    id: 27,
    name: "Pongsak Siri",
    role: "superadmin",
    completed: false,
    tel: "0878901234",
  },
  {
    id: 28,
    name: "Ratana Khun",
    role: "admin",
    completed: true,
    tel: "0889012345",
  },
  {
    id: 29,
    name: "Vichai Ratchada",
    role: "admin",
    completed: true,
    tel: "0890123456",
  },
  {
    id: 30,
    name: "Suda Yammee",
    role: "superadmin",
    completed: false,
    tel: "0801234567",
  },
];
export function fetchPersonels() {
  return Personels.map((personel) => ({ 
    ...personel,
    username: `user${personel.id}`,
    password: "123456789", 
  }));
}
