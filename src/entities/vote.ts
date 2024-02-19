import { useToast } from "vue-toastification";
import service from "../service/firebase";

export interface VoteType {
  id?: string;
  user: string;
  category: string;
  nominee: string;
}

export const voteForNominee = async (vote: VoteType): Promise<VoteType> => {
  const voteRegistered = await service.votes.voteForNominee(vote);

  const toast = useToast();
  toast.success("Voto registrado com sucesso");

  return voteRegistered;
};

export const getVotes = async (): Promise<VoteType[]> => {
  const votes = await service.votes.getAll();
  return votes;
};

export const getUserVotes = async (
  userName: VoteType["user"]
): Promise<VoteType[]> => {
  const votes = await service.votes.getByUser(userName);
  return votes;
};
