export type Game = {
  gameId: number;
  buttons: {
    a: {
      x: number;
      y: number;
    };
    b: {
      x: number;
      y: number;
    };
  };
  prizeLocation: {
    x: number;
    y: number;
  };
};

export type GameResult = {
  wonPrize: boolean;
  na: number | null;
  nb: number | null;
};