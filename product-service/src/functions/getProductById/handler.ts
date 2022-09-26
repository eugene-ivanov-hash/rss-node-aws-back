import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import {formatErrorResponse, formatJSONResponse} from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import products from "@data/products";

const getProductId: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  let product = null
  try {
    product = products.find((item) => (item.id === event.pathParameters.id))
  } catch (e){
    return formatErrorResponse({
      error: {
        status: 500,
        massage: e.toString()
      }
    })
  }

  if (!product){
    return formatErrorResponse({
      error: {
        status: 404,
        massage: 'Product not found'
      }
    })
  }

  return formatJSONResponse(product);
};

export const main = middyfy(getProductId);
