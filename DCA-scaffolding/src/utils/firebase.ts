import {initializeApp} from 'firebase/app';
import firebaseConfig from "../firebaseConfig";
import { Product } from "../types/products";
import { getFirestore, collection, addDoc, getDocs, query, orderBy  } from "firebase/firestore";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// export const auth = gethAuth(app);
// const storage = getStorage();

export const addProduct = async (formData: Omit<Product, 'id'> ) => {
    try {
        const docRef = await addDoc(collection(db, "products"), formData);
        console.log('Document written with ID: ', docRef.id);
          return true
        } catch (e) {
          console.error("Error adding document: ", e);
          return false
        }
};

export const getProducts = async() => {
    const q = query(collection(db,"products"), orderBy("createdAt"))
    const querySnapshot = await getDocs(q);
    const arrayProducts: Array<Product> = [];

    querySnapshot.forEach((doc: any) => {
      const data = doc.data() as any;
      arrayProducts.push({id: doc.id, ...data})
});

return arrayProducts;

};