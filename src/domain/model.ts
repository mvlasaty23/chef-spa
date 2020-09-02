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
        amount: (this.quantity.amount / servings) * desiredServings,
      },
      this.note
    );
  }

  public displayString(): string {
    return `${this.quantity.amount} ${this.quantity.unitOfMeasure} ${this.name}`;
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
