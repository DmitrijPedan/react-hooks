import {useEffect, useState} from "react";

export default function useRequest (request) {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    request()
      .then(response => setData(response.data))
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, [])

  return [data, loading, error];

}
