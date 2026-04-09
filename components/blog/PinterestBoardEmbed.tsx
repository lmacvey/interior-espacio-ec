"use client";

import Script from "next/script";

interface Props {
  boardUrl: string;
  width?: number;
  height?: number;
  className?: string;
}

export function PinterestBoardEmbed({ boardUrl, width = 380, height = 500, className }: Props) {
  return (
    <div aria-label="Tablero de Pinterest" className={className}>
      <div
        data-pin-do="embedBoard"
        data-pin-board-width={width}
        data-pin-scale-height={height}
        data-pin-scale-width="80"
        data-pin-href={boardUrl}
      />
      <Script
        src="https://assets.pinterest.com/js/pinit.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
