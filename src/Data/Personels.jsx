const Personels = [
  { id: 1, name: "Anan Phan", role: "admin", completed: true },
  { id: 2, name: "Somsak Decha", role: "superadmin", completed: false },
  { id: 3, name: "Kanya Meechai", role: "admin", completed: true },
  { id: 4, name: "Wichai Somchai", role: "admin", completed: true },
  { id: 5, name: "Siriwan Thaweesak", role: "admin", completed: true },
  { id: 6, name: "Supachai Paiboon", role: "superadmin", completed: false },
  { id: 7, name: "Chanida Srisuk", role: "admin", completed: true },
  { id: 8, name: "Prasert Charoen", role: "superadmin", completed: false },
  { id: 9, name: "Arunee Khunpon", role: "admin", completed: true },
  { id: 10, name: "Narong Chaisiri", role: "admin", completed: true },
  { id: 11, name: "Suchada Pradit", role: "admin", completed: true },
  { id: 12, name: "Montree Sutee", role: "superadmin", completed: false },
  { id: 13, name: "Jariya Suwan", role: "admin", completed: true },
  { id: 14, name: "Prawit Sinsiri", role: "admin", completed: true },
  { id: 15, name: "Wilawan Jamnong", role: "admin", completed: true },
  { id: 16, name: "Thanet Tawee", role: "superadmin", completed: false },
  { id: 17, name: "Udom Jinda", role: "admin", completed: true },
  { id: 18, name: "Kanokwan Rattana", role: "superadmin", completed: false },
  { id: 19, name: "Worachai Phayao", role: "admin", completed: true },
  { id: 20, name: "Sujitra Songyot", role: "superadmin", completed: false },
  { id: 21, name: "Somchai Wongsa", role: "admin", completed: true },
  { id: 22, name: "Kamon Suwan", role: "admin", completed: true },
  { id: 23, name: "Pattra Ruangsak", role: "admin", completed: true },
  { id: 24, name: "Boonmee Thongchai", role: "admin", completed: true },
  { id: 25, name: "Nalinee Prasert", role: "admin", completed: true },
  { id: 26, name: "Thidarat Sanan", role: "admin", completed: true },
  { id: 27, name: "Pongsak Siri", role: "superadmin", completed: false },
  { id: 28, name: "Ratana Khun", role: "admin", completed: true },
  { id: 29, name: "Vichai Ratchada", role: "admin", completed: true },
  { id: 30, name: "Suda Yammee", role: "superadmin", completed: false },
];
export function fetchPersonels() {
  return Personels;
}
