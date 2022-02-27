import { firebase as service } from "../service";

export interface VoteType {
  id?: string;
  user: string;
  category: string;
  nominee: string;
}

export const voteForNominee = (vote: VoteType): Promise<VoteType> => {
  return service.votes.voteForNominee(vote);
};
