import React from "react";

export const AuctionNavigation: React.FC<{
  isFirstAuction?: boolean;
  isLastAuction?: boolean;
  onPrevAuctionClick: () => void;
  onNextAuctionClick: () => void;
}> = props => {
  const { isFirstAuction, isLastAuction, onPrevAuctionClick, onNextAuctionClick } = props;

  return (
    <div className="flex gap-6 rounded-full mb-4">
      <button
        onClick={() => onPrevAuctionClick()}
        className="text-xl px-2 border border-black rounded-full"
        disabled={isFirstAuction}
      >
        {" "}
        ←
      </button>
      <button
        disabled={isLastAuction}
        onClick={() => onNextAuctionClick()}
        className="text-xl px-2 border border-black rounded-full"
      >
        →
      </button>
    </div>
  );
};
