import { Ranking } from '../../types';
import { User } from '../../types/user.type';
import { categoryService } from '../categories';
import { voteService } from '../votes';

export const rankingService = {
  getVotingStatus: async () => {
    const categories = await categoryService.getAll();
    const categoryWinners = new Set(
      categories.map((category) => category.winner),
    );

    return categoryWinners;
  },
  getPositions: async () => {
    const [categories, votes] = await Promise.all([
      categoryService.getAll(),
      voteService.getAll(),
    ]);

    const categoryWinners = categoryService.getWinners(categories);

    const participants = votes.reduce((acc, vote) => {
      if (acc.has(vote.user.id)) {
        return acc;
      }

      return acc.set(vote.user.id, vote.user);
    }, new Map<User['id'], User>([]));

    const positions = Array.from(participants.values()).map(
      (participant, index): Ranking => {
        const votesByParticipant = votes.filter(
          (vote) => vote.user.id === participant.id,
        );
        const points = votesByParticipant.reduce(
          (acc, vote) =>
            categoryWinners.includes(vote.nominee) ? acc + 1 : acc,
          0,
        );

        return {
          position: index,
          user: participant.name,
          points,
        };
      },
    );

    const sortedPositions = rankingService.sortPositions(positions);

    let currentPosition = 1;
    for (let i = 0; i < sortedPositions.length; i++) {
      if (
        i > 0 &&
        sortedPositions[i].points !== sortedPositions[i - 1].points
      ) {
        currentPosition++;
      }
      sortedPositions[i].position = currentPosition;
    }

    return sortedPositions;
  },
  sortPositions: (positions: Ranking[]) => {
    return positions
      .sort((a, b) => (a.user < b.user ? -1 : 1))
      .sort((a, b) => b.points - a.points);
  },
};
