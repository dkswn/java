"use strict";
let beverages = []; // 음료
let orders = []; // 주문
function isAdmin(user) {
    return user.role === "admin";
}
function isCustomer(user) {
    return user.role === "customer";
}
function addBeverage(user, name, price) {
    if (!isAdmin(user)) {
        console.log("권한이 없습니다.");
        return;
    }
    const newBeverage = { name, price };
    beverages.push(newBeverage);
}
//
function removeBeverage(user, beverageName) {
    if (!isAdmin) {
        console.log("권한이 없습니다.");
        return;
    }
    beverages = beverages.filter((beverage) => beverage.name !== beverageName);
}
// 음료목록 조회
function getBeverages(user) {
    if (!user) {
        return [];
    }
    return beverages;
}
// 음료 찾기
function findBeverage(BeverageName) {
    return beverages.find((beverage) => beverage.name === BeverageName);
}
function placeOrder(user, beverageName) {
    if (!isCustomer(user)) {
        console.log("권한이없습니다");
        return -1;
    }
    const beverage = findBeverage(beverageName);
    if (!beverage) {
        console.log("해당음료를 찾을 수 없습니다.");
        return -1;
    }
    const newOrder = {
        orderId: orders.length + 1,
        customerId: user.id,
        customerName: user.name,
        beverageName,
        status: "placed",
    };
    orders.push(newOrder);
    return newOrder.orderId;
}
function completeOrder(user, orderId) {
    if (!isAdmin(user)) {
        console.log("권한이 없습니다.");
        return;
    }
    const order = orders.find((order) => order.orderId === orderId);
    if (order) {
        order.status = "completed";
        console.log(`${order.customerName}님 ~주문하신 ${order.beverageName} 1잔 나왔습니다.`);
    }
}
function pickupOrder(user, orderId) {
    if (!isCustomer(user)) {
        console.log("권한이 없습니다");
        return;
    }
    const order = orders.find((order) => order.orderId === orderId && order.customerId === user.id);
    if (order && order.status === "completed") {
        order.status = "picked-up";
        console.log(`[어드민 메시지] 고객 ID[${order.customerId}] 님이 주문하신 ID[${orderId}] 를 수령했습니다.`);
    }
}
