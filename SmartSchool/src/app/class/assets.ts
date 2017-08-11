export class AssetsClass {
  'id': number;
  'name': string;
  'brand': string;
  'model': string;
  'type': number;
  'stockCount': number;
  'outStockCount': number;
  'equipmentTypeName': string;
  'supplierName': string;
  'price': number;
  'supplier': number;
  'purchaseDate': string;
  'invalidTotalQuantity': number;
  'validTotalQuantity': number;
  'schoolId': number;
  constructor() {
    this.id = 0;
    this.name = '';
    this.brand = '';
    this.model = '';
    this.type = 0;
    this.stockCount = 0;
    this.outStockCount = 0;
    this.equipmentTypeName = '';
    this.supplierName = '';
    this.price = 0;
    this.supplier = 0;
    this.purchaseDate = '';
    this.invalidTotalQuantity = 0;
    this.validTotalQuantity = 0;
    this.schoolId = 0;
  }
}
