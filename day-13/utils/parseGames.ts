import { Game } from "../types";

const scalarAdjustment = process.env.PART_2 ? 10000000000000: 1

export function parseGames(gameSpecs: Array<Array<string>>): Array<Game> {
  return gameSpecs.map((gs: Array<string>, index: number) => {
    const [directiveA, directiveB, prizeLocation] = gs;

    // Split the A button description into stuff we can use
    const [_descriptorA, AxDesc, AyDesc] = directiveA.split(/:|,/);
    const aIncX = parseInt(AxDesc.split('+')[1]);
    const aIncY = parseInt(AyDesc.split('+')[1]);

    // Split the B button description into stuff we can use
    const [_descriptorB, BxDesc, ByDesc] = directiveB.split(/:|,/);
    const bIncX = parseInt(BxDesc.split('+')[1]);
    const bIncY = parseInt(ByDesc.split('+')[1]);

    // Parse the Prize Location
    const [_label, _labelX, xVal, _labelY, yVal] = prizeLocation.split(/:|,|=/);

    return {
      gameId: index,
      buttons: {
        a: {
          x: aIncX,
          y: aIncY
        },
        b: {
          x: bIncX,
          y: bIncY,
        },
      },
      prizeLocation: {
        x: parseInt(xVal) + scalarAdjustment,
        y: parseInt(yVal) + scalarAdjustment
      }
    } as Game;
  });
}
