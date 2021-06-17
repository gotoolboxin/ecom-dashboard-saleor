import * as shippingMethodRequest from "../apiRequests/ShippingMethod";
import * as warehouseRequest from "../apiRequests/Warehouse";

export function createShipping({ channelId, name, address, price = 1 }) {
  let shippingMethod;
  let shippingZone;
  let warehouse;

  return shippingMethodRequest
    .createShippingZone(name, address.country, channelId)
    .then(shippingZoneResp => {
      shippingZone = shippingZoneResp;
      warehouseRequest.createWarehouse({
        name,
        shippingZone: shippingZone.id,
        address
      });
    })
    .then(warehouseResp => {
      warehouse = warehouseResp;
      shippingMethodRequest.createShippingRate({
        name,
        shippingZone: shippingZone.id
      });
    })
    .then(({ shippingMethod: sippingMethodResp }) => {
      shippingMethod = sippingMethodResp;
      shippingMethodRequest.addChannelToShippingMethod(
        shippingMethod.id,
        channelId,
        price
      );
    })
    .then(() => ({ shippingMethod, shippingZone, warehouse }));
}

export function deleteShippingStartsWith(startsWith) {
  cy.deleteElementsStartsWith(
    shippingMethodRequest.deleteShippingZone,
    shippingMethodRequest.getShippingZones,
    startsWith
  );
  cy.deleteElementsStartsWith(
    warehouseRequest.deleteWarehouse,
    warehouseRequest.getWarehouses,
    startsWith
  );
}
