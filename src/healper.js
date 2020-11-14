//  get the difference of years, insurance the previous year is cheaper
export function getYearDifferent(year) {
  return new Date().getFullYear() - year;
}

// calculates the total years to pay according to the brand
export function calculateBrand(brand) {
  let increment;

  switch (brand) {
    case 'americano':
      increment = 1.15;
      break;
    case 'europeo':
      increment = 1.30;
      break;
    default:
      increment = 1.05;
      break;
  }

  return increment;
}

export function calculatePlant(plan) {
  return (plan === 'basic') ? 1.20 : 1.50;
}

// capital letter
export function capitalLetter(text) {
  // return text[0].toUpperCase() + text.slice(1);
  // inmutable
  return text.charAt(0).toUpperCase() + text.slice(1);
}