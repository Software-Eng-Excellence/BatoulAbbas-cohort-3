import { FinanceCalculator, OrderManagement, Validator } from '../src/app';

describe('OrderManagement', () => {
  it(" should add an order", () => {

    //Arrange 
    const validator = new Validator([]);
    const calc = new FinanceCalculator();
    const orderManager = new OrderManagement(validator,calc);
    const  item = "Sponge"; 
    const price = 15;

    //Act 
    orderManager.addOrder(item, price);

    //Assert
    expect(orderManager.getOrders()).toEqual([ { id: 1, item, price }]);


  });
});

it("should get an order", () => {
    //Arrange
    const validator = new Validator([]);
    const calc = new FinanceCalculator();
    const orderManager = new OrderManagement(validator, calc);
    const item = "Sponge";
    const price = 15;
    orderManager.addOrder(item, price);
    const orderId = 1;

    //Act
    const order = orderManager.getOrder(orderId); 
    //Assert    
    expect(order).toEqual({ id: 1, item, price });
}); 

describe('FinanceCalculator', () => {
  it("should calculate total revenue", () => {
    //Arrange
    const validator = new Validator([]);
    const calc = new FinanceCalculator();
    const orders = [
      { id: 1, item: "Sponge", price: 15 },
      { id: 2, item: "Chocolate", price: 20 },
      { id: 3, item: "Fruit", price: 18 },
    ];
    
    //Act
    const revenue = calc.getRevenue(orders);
    //Assert    
    expect(revenue).toBe(53); // 15 + 20 + 18
  });
    it("should calculate average buy power", () => {
    //Arrange
    const validator = new Validator([]);
    const calc = new FinanceCalculator();
    const orders = [
      { id: 1, item: "Sponge", price: 15 },
      { id: 2, item: "Chocolate", price: 20 },
      { id: 3, item: "Fruit", price: 18 },
    ];  
    //Act
    const averageBuyPower = calc.getAverageBuyPower(orders);
    //Assert
    expect(averageBuyPower).toBe((15 + 20 + 18) / 3);
  });

});
