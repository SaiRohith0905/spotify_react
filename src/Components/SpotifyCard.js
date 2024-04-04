import React from "react";

const SpotifyCard = (props) => {
  const { cardDetails } = props;
  console.log(cardDetails);
  return (
    <div className="w-[190px] h-[270px] mt-5 mb-5 ml-3 mr-3 rounded-md bg-[#171717] p-3 cursor-pointer hover:bg-[#242424] duration-700">
      <img
        className="rounded-md "
        src={cardDetails?.content?.data?.images?.items[0]?.sources[0]?.url}
      />
      <div className="font-semibold pt-1">
        {cardDetails?.content?.data?.name}
      </div>
      <div
        className="overflow-hidden text-ellipsis font-light"
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
        }}
      >
        {cardDetails?.content?.data?.description}
      </div>
    </div>
  );
};

export default SpotifyCard;
