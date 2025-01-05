import "./Trending.css";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  //define function to get movie data
  const fetchTrending = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/media");
      setContent(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //actually run the fetching data function
  useEffect(() => {
    fetchTrending();
    console.log(content);
    // eslint-disable-next-line
  }, [page]);

  //movies use 'title', tv-shows use 'name'
  //movies use 'release date', tv-shows use 'first air date'
  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content.map((c) => (
          <SingleContent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type={c.media_type}
            vote_average={c.vote_average}
          />
        ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
