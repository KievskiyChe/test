interface IGame {
  winner: IToken | null;
  bracket: number[];
  round: number | null;
  rounds: Map<number, IGameRound>;
  tokens: IToken[];
  loosers: string[];
  update: (round: number, bracket: number[]) => void;
  getRounds(): any[];
}

interface IGameRound {
  active: boolean;
  pairs: {
    token1: IToken;
    token2: IToken;
    winner: IToken | null;
  }[];
}
