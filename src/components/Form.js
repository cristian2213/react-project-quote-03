// Dependencies
import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

// Components
import { getYearDifferent, calculateBrand, calculatePlant } from '../healper';

// Styled components
const Field = styled.div`
  display: flex;
  margin: 0 0 1rem 0;
  align-items: center;
`;

const Label = styled.label`
  /* Three values: flex-grow | flex-shrink | flex-basis */
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  /* delete default styles */
  -webkit-appearance: none;
`;

const RadioInput = styled.input`
  margin: 0 1rem;
`;

const Button = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease;
  margin-top: 2rem;
  &:hover {
    cursor: pointer;
    background-color: #26c6da;
  }
  &:focus {
    outline: 2px solid #03999D;
  }
`;

const Error = styled.div`
  background-color: red;
  color: #fff;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin: 0 0 2rem 0;
`;

const Form = ({ saveSummary, saveSpinner }) => {
  const [data, saveData] = useState({
    brand: '',
    year: '',
    plan: '',
  });

  const [error, saveError] = useState(false);

  const { brand, year, plan } = data;

  // read data and save
  const getInformation = (e) => {
    saveData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  const submitQoute = (e) => {
    e.preventDefault();

    // validate form
    if (brand.trim() === '' || year.trim() === '' || plan.trim() === '') {
      saveError(true);
      return;
    }

    saveError(false);

    // base
    let result = 2000;


    // get the difference of years = insurance the previous year is cheaper
    const yearDifferent = getYearDifferent(year);

    /* 
      ----- formula para calcular el valor del porcentaje ---
      total = 2000
      porcentaje = 25%
        ■ Method 1: 2000 * 0.25 = 500;
        ■ Method 2: ((2000 * 25%) / 100%) = valor del 25% (500)
    */
    // for each year subtract the 3%
    // result - el valor del %
    result -= ((yearDifferent * 3) * result) / 100;

    /* 
      ----------- formula de aumento de porcentaje ----------
      ■ total: 25.000 = 100% 
      ■ aumento = 20%
      ■ total a aumentar = total + aumento = 120%
      
      ↓formula: total * total a aumentar
        ■ 25.000 * 1.20 = 31.250
    */

    // value increment to each brand
    // Americano 15%
    // Asiatico 5%
    // Europeo 30%
    result = calculateBrand(brand) * result;

    //  basic plan 20%
    // full plan 50%
    const incrementPlan = calculatePlant(plan);
    result = parseFloat(incrementPlan * result).toFixed(2);

    saveSpinner(true);

    setTimeout(() => {
      // remove the spinner 
      saveSpinner(false);

      // send to the main component
      saveSummary({
        quote: Number(result),
        data
      });
    }, 3000);
  }

  return (
    <form onSubmit={submitQoute}>

      {error ? <Error>All fields are required</Error> : null}

      <Field>
        <Label>Brand</Label>
        <Select name="brand" value={brand} onChange={getInformation}>
          <option value="">-- Select --</option>
          <option value="americano">American</option>
          <option value="europeo">European</option>
          <option value="asiactico">Asian</option>
        </Select>
      </Field>

      <Field>
        <Label>Year:</Label>
        <Select name="year" value={year} onChange={getInformation}>
          <option value="">-- Select --</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Field>

      <Field>
        <Label>Plans:</Label>
        <RadioInput
          type="radio"
          name="plan"
          value="basic"
          onChange={getInformation}
          checked={plan === 'basic'}
        ></RadioInput> Basic
        <RadioInput
          type="radio"
          name="plan"
          value="full"
          checked={plan === 'full'}
          onChange={getInformation}
        ></RadioInput> Full
      </Field>

      <Button type="submit">Quote</Button>
    </form>
  );
};

Form.propTypes = {
  saveSummary: PropTypes.func.isRequired,
  saveSpinner: PropTypes.func.isRequired
}

export default Form;
