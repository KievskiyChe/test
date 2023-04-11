export class Game implements IGame {
  public round = null as number | null;
  public tokens = [] as IToken[];
  public bracket = [] as number[];

  public winner = null as IToken | null;
  public rounds = new Map() as Map<number, IGameRound>;
  public loosers = [] as string[];

  constructor(round: number, tokens: IToken[], bracket: number[]) {
    this.round = round;
    this.tokens = tokens;
    this.bracket = bracket;
    this.initialRounds();
  }

  private initialRounds = async (): Promise<void> => {
    // first round
    this.rounds.set(0, {
      active: this.round === 0,
      pairs: [
        {
          token1: this.tokens[this.bracket[0]],
          token2: this.tokens[this.bracket[1]],
          winner: this.tokens[this.bracket[8]],
        },
        {
          token1: this.tokens[this.bracket[2]],
          token2: this.tokens[this.bracket[3]],
          winner: this.tokens[this.bracket[9]],
        },
        {
          token1: this.tokens[this.bracket[4]],
          token2: this.tokens[this.bracket[5]],
          winner: this.tokens[this.bracket[10]],
        },
        {
          token1: this.tokens[this.bracket[6]],
          token2: this.tokens[this.bracket[7]],
          winner: this.tokens[this.bracket[11]],
        },
      ],
    });

    // second round
    this.rounds.set(1, {
      active: this.round === 1,
      pairs: [
        {
          token1: this.tokens[this.bracket[8]],
          token2: this.tokens[this.bracket[9]],
          winner: this.tokens[this.bracket[12]],
        },
        {
          token1: this.tokens[this.bracket[10]],
          token2: this.tokens[this.bracket[11]],
          winner: this.tokens[this.bracket[13]],
        },
      ],
    });

    // third round
    this.rounds.set(2, {
      active: this.round === 2,
      pairs: [
        {
          token1: this.tokens[this.bracket[12]],
          token2: this.tokens[this.bracket[13]],
          winner: this.tokens[this.bracket[14]],
        },
      ],
    });

    if (this.round === 3 && this.winner) {
      this.rounds.set(3, {
        active: this.round === 3,
        pairs: [],
      });
    }

    this.loosers = this.getLoosers();
  };

  public getRounds = (): any[] => {
    const round1 = this.rounds.get(0);
    const round2 = this.rounds.get(1);
    const round3 = this.rounds.get(2);
    const round4 = this.rounds.get(3) ?? [];
    return [round1, round2, round3, round4];
  };

  public getLoosers = (): string[] => {
    const round1 = this.rounds.get(0);
    const round2 = this.rounds.get(1);
    const round3 = this.rounds.get(2);

    const winnersList = [
      round1?.pairs[0].winner,
      round1?.pairs[1].winner,
      round1?.pairs[2].winner,
      round1?.pairs[3].winner,
      round2?.pairs[0].winner,
      round2?.pairs[1].winner,
      round3?.pairs[0].winner,
    ];

    const winnersAddresses = winnersList.map((winner) => {
      if (winner) return winner.address;
      return;
    }).filter((winner) => winner);

    const loosers: any[] = this.tokens.map((token) => {
      if (!winnersAddresses.includes(token.address)) return token.address;
      return undefined;
    }).filter((looser) => looser);

    return loosers;
  };

  public setWinner = (winner: IToken): void => {
    this.winner = winner;
  };

  public update = (round: number, bracket: number[]): void => {
    this.round = round;
    this.bracket = bracket;
    this.initialRounds();
  };
}
