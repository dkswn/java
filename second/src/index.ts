interface User {
  id: number;
  name: string;
  role: "admin" | "customer";
}

interface Beverage {
  name: string;
  price: number;
}

interface Order {
  orderId: number;
  customerId: number;
  customerName: string;
  beverageName: string;
  status: "placed" | "completed" | "picked-up";
}
let beverages: Beverage[] = []; // 음료
let orders: Order[] = []; // 주문

function isAdmin(user: User): boolean {
  return user.role === "admin";
}

function isCustomer(user: User): boolean {
  return user.role === "customer";
}

function addBeverage(user: User, name: string, price: number): void {
  if (!isAdmin(user)) {
    console.log("권한이 없습니다.");
    return;
  }

  const newBeverage: Beverage = { name, price };
  beverages.push(newBeverage);
}
//
function removeBeverage(user: User, beverageName: string): void {
  if (!isAdmin) {
    console.log("권한이 없습니다.");
    return;
  }
  beverages = beverages.filter((beverage) => beverage.name !== beverageName);
}

// 음료목록 조회
function getBeverages(user: User): Beverage[] {
  if (!user) {
    return [];
  }
  return beverages;
}
// 음료 찾기
function findBeverage(BeverageName: string): Beverage | undefined {
  return beverages.find((beverage) => beverage.name === BeverageName);
}

function placeOrder(user: User, beverageName: string): number {
  if (!isCustomer(user)) {
    console.log("권한이없습니다");
    return -1;
  }

  const beverage = findBeverage(beverageName);
  if (!beverage) {
    console.log("해당음료를 찾을 수 없습니다.");
    return -1;
  }
  const newOrder: Order = {
    orderId: orders.length + 1,
    customerId: user.id,
    customerName: user.name,
    beverageName,
    status: "placed",
  };
  orders.push(newOrder);
  return newOrder.orderId;
}
function completeOrder(user: User, orderId: number): void {
  if (!isAdmin(user)) {
    console.log("권한이 없습니다.");
    return;
  }
  const order = orders.find((order) => order.orderId === orderId);
  if (order) {
    order.status = "completed";
    console.log(
      `${order.customerName}님 ~주문하신 ${order.beverageName} 1잔 나왔습니다.`
    );
  }
}

function pickupOrder(user: User, orderId: Number): void {
  if (!isCustomer(user)) {
    console.log("권한이 없습니다");
    return;
  }

  const order = orders.find(
    (order) => order.orderId === orderId && order.customerId === user.id
  );
  if (order && order.status === "completed") {
    order.status = "picked-up";
    console.log(
      `[어드민 메시지] 고객 ID[${order.customerId}] 님이 주문하신 ID[${orderId}] 를 수령했습니다.`
    );
  }
}
