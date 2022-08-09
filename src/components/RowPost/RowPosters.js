import axios from "../../axios";
import React, { useEffect, useState } from "react";
import "./RowPosters.css";
import { imageUrl } from "../../constants/constants";
function RowPosters(props) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get(props.url).then((res) => {
        console.log("Orginals", res.data.results);
        setPosts(res.data.results);
      });
  }, []);
  return (
    <div className="row">
      <h3 className="rowTitle">{props.title}</h3>
      <div className="posters">
        {
          posts.map((result)=>
            <img className={props.isSmall?'smallPoster':'poster'} src={imageUrl+result.backdrop_path} alt="posters"/>
          )
        }
       
      </div>
    </div>
  );
}

export default RowPosters;
