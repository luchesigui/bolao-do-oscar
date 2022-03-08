import { collection, getDocs, doc, setDoc, query, where } from "firebase/firestore/lite";
import { v4 as uuidv4 } from "uuid";

export class Votes {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    const votesCollection = collection(this.db, "votes");
    const votesSnapshot = await getDocs(votesCollection);
    const votes = votesSnapshot.docs.map((doc) => doc.data());
    return votes;
  }

  async getByUser(userName) {
    const votesCollection = collection(this.db, "votes");
    const votesQuery = query(votesCollection, where("user", "==", userName))
    const votesSnapshot = await getDocs(votesQuery);
    const votes = votesSnapshot.docs.map((doc) => doc.data());
    return votes;
  }

  async voteForNominee(vote) {
    const voteId = vote.id || uuidv4();
    const voteDoc = doc(this.db, "votes", voteId);
    await setDoc(voteDoc, vote, { merge: true });

    return {
      ...vote,
      id: voteId,
    };
  }
}
