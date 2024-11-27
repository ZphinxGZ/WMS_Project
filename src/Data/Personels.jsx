const Personels = [
  
  {
    id: 1,
    name: "Nattanicha Prueprang",
    pass: "123456789",
    role: "admin",
    completed: true,
    tel: "0812345678",
    token: "name",
  },
  {
    id: 2,
    name: "Kunakorn Khamcharoen",
    pass: "123456789",
    role: "superadmin",
    completed: false,
    tel: "0823456789",
    token: "name",
  },
  {
    id: 3,
    name: "Nitiphon",
    pass: "123456789",
    role: "admin",
    completed: true,
    tel: "0834567890",
    token: "name",
  },
  {
    id: 4,
    name: "Teeraphan Thienpromthong",
    pass: "123456789",
    role: "admin",
    completed: true,
    tel: "0845678901",
    token: "name",
  },
  { 
    id: 5,
    name: "Methaphon Thongnak",
    pass: " ",
    role: "admin",
    completed: true,
    tel: "0856789012",
    token: "name",
  },
];

export function fetchPersonels() {
  return Personels.map((personel) => ({
    ...personel,
    username: `user${personel.id}`,
    password: personel.pass,  // ใช้รหัสผ่านจริงจากข้อมูล
  }));
}

export function verifyUser(name, password) {
  const userFound = Personels.find((personel) => personel.name === name && personel.pass === password);  
  return userFound ? { role: userFound.role, token: userFound.token } : null; 
}
