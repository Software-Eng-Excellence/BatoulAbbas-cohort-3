//solid principle
//S:single responsibilitty principle (SRP)
//open close principle (OCP) 
//liskov substitution principle (LSP)
//interface segregation principle (ISP)
// dependency inversion principle (DIP)

 interface Order {
    price: number;
    id: number;
    item: string;
}
 export class OrderManagement{
    //get,store and add orders 
  
    private orders: Order[] =[];
      constructor( private validator: IValidator, private calculator : ICalculator) {}
    getOrders(){
        return this.orders;
    }
    addOrder(item :string, price: number ){
        const order: Order = {id: this.orders.length+1, item, price};
        this.validator.validate(order); // validate the order before adding
        this.orders.push({id: this.orders.length+1, item, price});

    }
    //fetch order by id 
    getOrder(id: number){

        return this.getOrders().find(order => order.id === id );


    }

    getRevenue() {
        return this.calculator.getRevenue(this.orders);
    }
    getAverageBuyPower() {
        return this.calculator.getAverageBuyPower(this.orders);
    }   

}
class PremiumOrderManagement extends OrderManagement {
    getOrder(id: number): Order | undefined {
        console.log("ALERT : PREMIUM  ORDER BEING Fetced");
        return super.getOrder(id);
    }
 }
export interface IValidator {
    validate (order :Order): void;

}

export interface IPossibleItems {
 getpossibleItems(): string[];
}


export class Validator implements IValidator{
    
    constructor (private rules: IValidator[]){}

    validate (order :Order):void{
        this.rules.forEach(rule => rule.validate(order));
    }

}
export class ItemValidator implements IValidator, IPossibleItems {
    getpossibleItems(): string[] {
        return ItemValidator.possibleItems;
    }

     public static  possibleItems = [
            "Sponge",
            "Chocolate",
            "Fruit",
            "Red Velvet",
            "Birthday",
            "Carrot",
            "Marble",
            "Coffee",
        ];
    validate(order: Order) {
      
        if (!ItemValidator.possibleItems.includes(order.item)) {
            throw new Error(`Invalid item. Must be one of: ${ItemValidator.possibleItems.join(", ")}`);
        }
    }
}
    export class PriceValidator implements IValidator {
        public validate(order: Order) {
            if (order.price <= 0) {
                throw new Error("price must be greater than zero");
            }
        }
    }

     export class MaxPriceValidator implements IValidator{             
        validate(order: Order){
        if (order.price> 100) {
            throw new Error ("price must be less than  100");
        }
    }
}

 export interface ICalculator {
    getRevenue(orders: Order[]): number;
    getAverageBuyPower(orders: Order[]): number;
 }

export class FinanceCalculator implements ICalculator {
    //calculate total revenue and average by power 
    public getRevenue(orders: Order[]) {
        return orders.reduce((total, order) => total + order.price, 0);
    }
   public getAverageBuyPower(orders: Order[]) {
       return  orders.length === 0 ? 0 : this.getRevenue(orders) / orders.length;
    }
}