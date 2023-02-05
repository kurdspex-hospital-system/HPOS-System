import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, options = {}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      axios.get(url, options)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          setError(error);
        })
        .then(() => {
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  return {data, loading, error};
};

export default useFetch;
