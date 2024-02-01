/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { configs } from "../../utils/configs/Configs";
import { useNavigate } from "react-router-dom";
import "./RowPosters.css";

// Functional component for displaying row posters
function RowPosters({ api = null, title, isSmall = false }) {
  // State to store the fetched posts
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    if (api) {
      api()
        .then((res) => {
          setPosts(res.data.results);
        })
        .catch((err) => console.log(err));
    }
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Display the title of the row */}
        <h3 className="rowTitle">{title}</h3>
        {/* Container for posters */}
        <div className="posters d-flex gap-1">
          {/* Map through posts and display each poster */}
          {posts.map((post) => {
            return (
              <div
                key={post.id}
                className={isSmall ? "smallPoster" : "poster"}
                onClick={() => navigate("/movie".concat("/", post.id))}
              >
                {/* Display poster image */}
                <img
                  src={configs.imageUrl + post.poster_path}
                  alt="posters"
                  className="thumbnail"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RowPosters;
