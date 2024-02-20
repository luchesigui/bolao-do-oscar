import { Ranking } from "../../types";
import { categoryService } from "../categories";
import { voteService } from "../votes";

export const rankingService = {
  getPositions: async () => {
    const [categories, votes] = await Promise.all([
      categoryService.getAll(),
      voteService.getAll(),
    ]);

    const categoryWinners = categories.map((category) => category.winner);
    const voteUsers = votes.map((vote) => vote.user);
    const participants = [...new Set(voteUsers)];

    const positions = participants.map(
      (participant: string, index: number): Ranking => {
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

    const sortedPositions = rankingService.sortPositions(positions);

    for (let i = 0; i < sortedPositions.length; i++) {
      let position = sortedPositions[i];

      if (i === 0) {
        sortedPositions[i].position = 1;
        continue;
      }

      const previousPosition = sortedPositions[i - 1];
      const previousPositionPosition = previousPosition.position;

      if (position.points === previousPosition.points) {
        sortedPositions[i].position = previousPositionPosition;
        continue;
      }

      sortedPositions[i].position = previousPositionPosition + 1;
    }

    return sortedPositions;
  },
  sortPositions: (positions: Ranking[]) => {
    return positions
      .sort((a, b) => (a.user < b.user ? -1 : 1))
      .sort((a, b) => b.points - a.points);
  },
};
