export class Product {
  $key: string;
  productId: number;
  productName: string;
  productCategory: string;
  productPrice: number;
  productDiscount: 0;
  productDescription: string = null;
  productMaterial: string = null;
  productSize: string = null;
  productStyle: string = null;
  productOrigin: string = null;
  productManufacturer: string = null;
  productDesigner: string = null;
  productTime: string = null;
  productCondition: string = null;
  productImageUrl: string = null;
  productImageAlt: string = null;
  productAdded: number;
  productAvailable = true;
  productQuatity = 1;
  productActive = true;
  productSold = false;
  favourite: boolean;
}
