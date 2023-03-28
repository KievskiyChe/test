export const getTournament = (): ITournament => {
  return window.__TOURNAMENT__;
};

export const setTouranment = (tournament: ITournament) => {
  window.__TOURNAMENT__ = tournament;
};
