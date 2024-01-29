// import axios from "../../axios";
import React, { useEffect, useState } from "react";
import "./RowPosters.css";
import { configs } from "../../utils/configs/Configs";

function RowPosters({ api = null, title, isSmall = false }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (api) {
      api()
        .then((res) => {
          setPosts(res.data.results);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <h3 className="rowTitle">{title}</h3>
        <div className="posters d-flex gap-1">
          {posts.map((result) => {
            return (
              <div
                key={result.id}
                className={isSmall ? "smallPoster" : "poster"}
              >
                <img
                  src={configs.imageUrl + result.backdrop_path}
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
