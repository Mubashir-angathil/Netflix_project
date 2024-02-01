import React from "react";
import { configs } from "../../../utils/configs/Configs";

const CastCard = ({ url, name, character }) => {
  return (
    // Container div for the cast card with Bootstrap classes and custom styles
    <div className="profile-card me-3 rounded overflow-hidden bg-white">
      {/* Image for the cast member, with a fallback placeholder */}
      <img
        src={
          url
            ? configs.imageUrl.concat(url)
            : "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"
        }
        alt="profile border"
        loading="lazy"
      />
      {/* Container for the name and character details */}
      <div className="p-1">
        {/* Cast member's name */}
        <h5>{name}</h5>
        {/* Character played by the cast member */}
        <p>{character}</p>
      </div>
    </div>
  );
};

export default CastCard;
