import { collection, getDocs, doc, setDoc } from "firebase/firestore/lite";

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

  async setWinner(category, winner) {
    const voteDoc = doc(this.db, "categories", category.id);
    await setDoc(voteDoc, { winner }, { merge: true });

    return {
      ...category,
      winner,
    };
  }
}
