import React from "react";

export default function ColorWheel({ piece }: { piece: string }): JSX.Element {
  let gamePiece: string = "";
  if (piece) {
    gamePiece = piece;
  }
  const colors = new Set<string>();
  for (let i = 0; i <= 6; i++) {
    for (let j = 0; j <= 6; j++) {
      for (let k = 0; k <= 7; k++) {
        if (i !== j && j !== k && i !== k) {
          colors.add(
            `rgb(${Math.round(i * 42.6)}, ${Math.round(j * 42.6)}, ${Math.round(
              k * 36.6
            )})`
          );
        }
      }
    }
  }

  const formatRGBtoHex = (color: string) => {
    const rgb = color
      .replace("rgb(", "")
      .replace(")", "")
      .split(",")
      .map((x) => parseInt(x));
    const hex = rgb
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("");
    return "#" + hex;
  };

  const submitNewColor = (color: string, piece: string) => {
    console.log(color, piece);
    const storedBoard = localStorage.getItem("board");
    if (storedBoard) {
      const board = JSON.parse(storedBoard);
      board[piece] = formatRGBtoHex(color);
      console.log(board);
      localStorage.setItem("board", JSON.stringify(board));
    } else {
      return;
    }
  };

  const greyScale = [];
  for (let i = 0; i < 4; i++) {
    greyScale.push(`rgb(${i * 85}, ${i * 85}, ${i * 85})`);
  }

  const RGBToHSL = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return [
      60 * h < 0 ? 60 * h + 360 : 60 * h,
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
      (100 * (2 * l - s)) / 2,
    ];
  };

  const colorsSortedByHSL = Array.from(colors)
    .map((color) => {
      const rgb = color
        .replace("rgb(", "")
        .replace(")", "")
        .split(",")
        .map((x) => parseInt(x));
      const hsl = RGBToHSL(rgb[0], rgb[1], rgb[2]);
      return { color, hsl };
    })
    .sort((a, b) => {
      if (a.hsl[0] === b.hsl[0]) {
        if (a.hsl[1] === b.hsl[1]) {
          return a.hsl[2] - b.hsl[2];
        }
        return a.hsl[1] - b.hsl[1];
      }
      return a.hsl[0] - b.hsl[0];
    })
    .map((x) => x.color);

  const concatColors = colorsSortedByHSL.concat(greyScale.reverse());

  return (
    <div
      className="grid grid-cols-16"
      style={{ gridTemplateColumns: "repeat(16, 1fr)" }}
    >
      {concatColors.map((color) => (
        <div
          className="w-3 h-3 border border-black"
          style={{
            backgroundColor: color,
          }}
          key={color}
          onClick={() => {
            submitNewColor(color, gamePiece);
          }}
        ></div>
      ))}
    </div>
  );
}
