import axios from "axios";
import { useState, useEffect } from "react";

type Data = {
    data: any;
    loading: boolean;
    error: Error;
}


export function useFetch(url:string):Data {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>(new Error());
  
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
      )
      .then(({ data }:any ) => setData(data))

      .catch((err:Error) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
