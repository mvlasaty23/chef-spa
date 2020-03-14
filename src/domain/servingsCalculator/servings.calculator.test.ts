import React from 'react';
import { servingsCalculator } from './servings.calculator';
import { Ingredient, Servings } from '../model';

describe('Servings Calculator', () => {
  const ingredients: Ingredient[] = [
    new Ingredient('Carrot', {
      amount: 2,
      unitOfMeasure: 'kg',
    }),
    new Ingredient('Eggplant', {
      amount: 1,
      unitOfMeasure: 'kg',
    }),
    new Ingredient('Onion', {
      amount: 2,
      unitOfMeasure: 'kg',
    }),
  ];

  it('should return the given servings if scale is 0', () => {
    // Given
    const servingPerPerson = 2;
    const servings: Servings = {
      ingredients,
      servingPerPerson,
      ingredientsTotal: 5,
    };
    // When
    const scaledServings = servingsCalculator({
      servings,
      desiredServings: 0,
    });
    // Then
    expect(scaledServings).toHaveProperty('servingPerPerson', servingPerPerson);
    expect(scaledServings).toHaveProperty('ingredientsTotal', 3);
  });
  it('should return the given servings if the given scale is equal to the desired scale', () => {
    // Given
    const servingPerPerson = 2;
    const servings: Servings = {
      ingredients,
      servingPerPerson,
      ingredientsTotal: 5,
    };
    // When
    const scaledServings = servingsCalculator({
      servings,
      desiredServings: servingPerPerson,
    });
    // Then
    expect(scaledServings).toHaveProperty('servingPerPerson', servingPerPerson);
    expect(scaledServings).toHaveProperty('ingredientsTotal', 3);
  });
  it('should return ingredients with the desired scale', () => {
    // Given
    const servingPerPerson = 2;
    const servings: Servings = {
      ingredients,
      servingPerPerson,
      ingredientsTotal: 5,
    };
    // When
    const scaledServings = servingsCalculator({
      servings,
      desiredServings: 4,
    });
    // Then
    expect(scaledServings).toHaveProperty('servingPerPerson', 4);
    expect(scaledServings).toHaveProperty('ingredientsTotal', 10);
    scaledServings.ingredients.forEach((ingredient, index) =>
      expect(ingredient).toHaveProperty('quantity.amount', ingredients[index].quantity.amount * 2)
    );
  });
  // const testCases: ReadonlyArray<Servings> = [
  //   {
  //     ingredients,
  //     ingredientsTotal: 5,
  //     servingPerPerson: 2
  //   }
  // ]
});
