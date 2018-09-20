// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

//has many customers
let mealId = 0;
class Meal {
  constructor(title, price){
    this.id = ++mealId;
    this.title = title;
    this.price = price;
    store.meals.push(this);
  }
  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }
  customers(){
    let customerIds = this.deliveries().map(delivery => delivery.customerId)
    let customers = [];
    for (let id of customerIds){
      customers.push(store.customers.find(customer => customer.id === id))
    }
    return customers;
  }
  static byPrice(){
    return store.meals.sort((a, b) => b.price - a.price)
  }

}

//belongs to meal, customer, neighborhood
let deliveryId = 0;
class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.customerId = customerId;
    this.neighborhoodId = neighborhoodId;
    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find(meal => this.mealId === meal.id);
  }
  customer(){
    return store.customers.find(customer => this.customerId === customer.id);
  }
  neighborhood(){
    return store.neighborhoods.find(neighborhood => this.neighborhoodId === neighborhood.id);
  }
}

//has many deliveries
//has many meals thru deliveries
//belongs to neightborhood
let customerId = 0;
class Customer {
  constructor(name, neighborhoodId){
    this.id = ++customerId
    this.name = name
    this.neighborhoodId = neighborhoodId
    store.customers.push(this);
  }
  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId === this.id);
  }
  meals(){
    // debugger;
    let mealIds = this.deliveries().map(delivery => delivery.mealId)
    let meals = [];
    for (let id of mealIds){
      meals.push(store.meals.find(meal => meal.id === id))
    }
    return meals;
  }
  totalSpent(){
    return this.meals().reduce((total, meal) => total + meal.price, 0);
  }
}

//has many deliveries
// has many customers thru deliveries
//has many meals thru deliveries
let neighborhoodId = 0;
class Neighborhood{
  constructor(name){
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
  }
  customers(){
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  }
  meals(){
    let mealIds = this.deliveries().map(delivery => delivery.mealId)
    return store.meals.filter(meal => mealIds.includes(meal.id));
  }

}
