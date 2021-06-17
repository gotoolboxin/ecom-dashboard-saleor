import { getValueWithDefault } from "./utils/Utils";

export function createShippingRate({
  name,
  shippingZone,
  type = "PRICE",
  maxWeight,
  minWeight
}) {
  const maxOrderWeight = getValueWithDefault(
    maxWeight,
    `maximumOrderWeight: ${maxWeight}`
  );
  const minOrderWeight = getValueWithDefault(
    minWeight,
    `minimumOrderWeight: ${minWeight}`
  );

  const mutation = `mutation{
    shippingPriceCreate(input:{
      name: "${name}"
      shippingZone: "${shippingZone}"
      type: ${type}
      ${minOrderWeight}
      ${maxOrderWeight}
    }){
      shippingMethod{
        id
      }
    }
  }`;
  return cy.sendRequestWithQuery(mutation).its("body.data.shippingPriceCreate");
}

export function createShippingZone(name, country, channelId) {
  const mutation = `mutation{
    shippingZoneCreate(input:{
      name: "${name}"
      countries: "${country}"
      addChannels:["${channelId}"]
    }){
      shippingZone{
        id
        name
      }
    }
  }`;
  return cy
    .sendRequestWithQuery(mutation)
    .its("body.data.shippingZoneCreate.shippingZone");
}
export function addChannelToShippingZone(shippingZoneId, channelId) {
  const mutation = `mutation addCh{
    shippingZoneUpdate(id:"${shippingZoneId}", input:{
      addChannels:["${channelId}"]
    }){
      shippingErrors{
        field
        message
      }
    }
  }`;
  return cy.sendRequestWithQuery(mutation);
}
export function addChannelToShippingMethod(shippingRateId, channelId, price) {
  const mutation = `mutation{
    shippingMethodChannelListingUpdate(id:"${shippingRateId}", input:{
      addChannels: {
        channelId:"${channelId}"
        price: ${price}
      }
    }){
      shippingMethod{
        id
      }
      shippingErrors{
        code
        message
      }
    }
  }`;
  return cy.sendRequestWithQuery(mutation);
}

export function deleteShippingZone(shippingZoneId) {
  const mutation = `mutation{
          shippingZoneDelete(id:"${shippingZoneId}"){
            shippingErrors{
              message
            }
          }
        }
        `;
  return cy.sendRequestWithQuery(mutation);
}

export function getShippingZones() {
  const query = `query{
          shippingZones(first:100){
            edges{
              node{
                name
                id
              }
            }
          }
        }
        `;
  return cy
    .sendRequestWithQuery(query)
    .then(resp => resp.body.data.shippingZones.edges);
}
