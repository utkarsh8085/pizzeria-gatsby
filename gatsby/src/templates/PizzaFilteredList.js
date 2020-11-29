import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzaFilteredList({ data, pageContext }) {
  const { nodes } = data.pizzas;
  const { topping } = pageContext;
  return (
    <>
      <ToppingsFilter activeToppingName={topping} />
      <PizzaList pizzas={nodes} />
    </>
  );
}

export const query = graphql`
  query($topping: String!) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { eq: $topping } } } }
    ) {
      nodes {
        name
        id
        price
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
