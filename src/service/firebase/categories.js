import { collection, getDocs } from "firebase/firestore/lite";

export class Categories {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    const categoriesCollection = collection(this.db, "categories");
    const categoriesSnapshot = await getDocs(categoriesCollection);
    const categories = categoriesSnapshot.docs.map((doc) => doc.data());
    return categories;
  }
}
