import { es } from "yup-locales";
import * as yup from "yup";
yup.setLocale(es);
import { FirestoreModel } from "../../../firebase/models/FirestoreModel";

// Attributos principales del modelo
export interface Attributes {
  urlImg: string;
  urlImg2: string;
  name: string;
  price: number;
  description: string;
}

// No hace falta modificar esta interface
export interface ProductElement extends Attributes {
  id: string;
}

// Validar los attributes para crear o editar
export const validateAttributes = yup
  .object({
    urlImg: yup.string().required(),
    urlImg2: yup.string().required(),
    name: yup.string().min(3).required(),
    price: yup.string().required(),
    description: yup.string().min(3).required(),
  })
  .required();

// Clase Modelo
export class Product extends FirestoreModel {
  // Firestore table name
  static tableName: string = "products";

  static find(id: string): Promise<ProductElement> {
    return super.retriveDoc(Product.tableName, id);
  }

  static findAll(): Promise<ProductElement[]> {
    return super.retriveAllDoc(Product.tableName);
  }

  static async create(attributes: Attributes): Promise<string> {
    const docRef = await super.createDoc(Product.tableName, attributes);
    return docRef.id;
  }

  static update(id: string, attributes: Attributes): Promise<void> {
    return super.updateDoc(Product.tableName, id, attributes);
  }

  static destroy(id: string): Promise<void> {
    return super.deleteDoc(Product.tableName, id);
  }
}
