import { useState, useEffect } from "react";
import axios from "axios";


function useAxiosFetch(dataUrl) {
  const [data, setData] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)


  useEffect(() => {
    let isMounted = true
    const cancelTokenSource = axios.CancelToken.source();

    async function fetchData(url) {
    
      setIsLoading(true)
      try {
        const res = await axios.get(url, { cancelToken: cancelTokenSource.token })

        if (isMounted) {
          setData(res.data)
          setFetchError(null)
        }
      } catch (error)  {
        
        if (isMounted) {
          console.log(`ERROR: ${error}`)
          setFetchError(error.message);
          setIsLoading(false);
          setData([])
        }
      } finally {
        isMounted &&  setIsLoading(false)}
   }

    fetchData(dataUrl);

    return () => {
      console.log("clean up function");
      isMounted = false;
      cancelTokenSource.cancel();
    };
    
      
  }, [dataUrl])

  return {data, isLoading, fetchError}

}


export default useAxiosFetch;