export interface Quantity {
  amount: number;
  unitOfMeasure: string;
}
export class Ingredient {
  constructor(public name: string, public quantity: Quantity, public note?: string) {}
  public scaleTo(servings: number, desiredServings: number) {
    return new Ingredient(
      this.name,
      {
        unitOfMeasure: this.quantity.unitOfMeasure,
        amount:
          servings > desiredServings
            ? this.scaleDown(servings, desiredServings)
            : this.scaleUp(servings, desiredServings),
      },
      this.note
    );
  }

  private scaleUp(servings: number, desiredServings: number) {
    console.log(
      'Scaling up ' +
        this.name +
        ' ' +
        this.quantity.amount +
        ' by ' +
        (desiredServings - servings) +
        ' to ' +
        this.quantity.amount * (desiredServings - servings)
    );
    return this.quantity.amount * (desiredServings - servings);
  }

  private scaleDown(servings: number, desiredServings: number) {
    console.log(
      'Scaling down ' +
        this.name +
        ' ' +
        this.quantity.amount +
        ' by ' +
        (servings - desiredServings) +
        ' to ' +
        this.quantity.amount * (servings - desiredServings)
    );
    return this.quantity.amount / (servings - desiredServings);
  }
}
export interface Servings {
  ingredients: Ingredient[];
  servingPerPerson: number;
  ingredientsTotal: number;
}

export interface Recipe {
  title: string;
  servings: Quantity;
  ingredients: ReadonlyArray<Ingredient>;
  instructions: string;
  preperationTime: Quantity;
}
