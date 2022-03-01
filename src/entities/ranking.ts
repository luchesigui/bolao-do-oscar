import { firebase as service } from "../service";

export interface RankingType {
  position: number;
  user: string;
  points: number;
}

export const getPositions = async (): Promise<RankingType[]> => {
  const [categories, votes] = await Promise.all([
    service.categories.getAll(),
    service.votes.getAll(),
  ]);

  const categoryWinners = categories.map((category) => category.winner);
  const voteUsers = votes.map((vote) => vote.user);
  const participants = [...new Set(voteUsers)];

  const positions = participants.map(
    (participant: string, index: number): RankingType => {
      const votesByParticipant = votes.filter(
        (vote) => vote.user === participant
      );

      const points = votesByParticipant.reduce((acc, vote) => {
        const categoryWinner = categoryWinners.find(
          (winner) => winner === vote.nominee
        );
        return categoryWinner ? acc + 1 : acc;
      }, 0);

      return {
        position: index,
        user: participant,
        points,
      };
    }
  );

  return positions;
};
