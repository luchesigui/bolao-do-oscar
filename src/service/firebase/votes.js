import { doc, setDoc } from "firebase/firestore/lite";
import { v4 as uuidv4 } from "uuid";

export class Votes {
  constructor(db) {
    this.db = db;
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
