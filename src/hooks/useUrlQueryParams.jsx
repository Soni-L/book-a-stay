import { useState, useEffect } from "react";

const useUrlQueryParams = () => {
  const [queryParams, setQueryParams] = useState(() => {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    for (const [key, value] of urlParams.entries()) {
      params[key] = value;
    }
    return params;
  });

  useEffect(() => {
    const handlePopState = () => {
      const params = {};
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      for (const [key, value] of urlParams.entries()) {
        params[key] = value;
      }
      setQueryParams(params);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const setQueryParam = (key, value) => {
    const newQueryParams = { ...queryParams, [key]: value };
    setQueryParams(newQueryParams);
    updateUrl(newQueryParams);
  };

  const clearQueryParam = (key) => {
    const newQueryParams = { ...queryParams };
    delete newQueryParams[key];
    setQueryParams(newQueryParams);
    updateUrl(newQueryParams);
  };

  const updateUrl = (newQueryParams) => {
    const searchParams = new URLSearchParams(newQueryParams);
    const newUrl = searchParams.toString()
      ? `${window.location.pathname}?${searchParams.toString()}`
      : window.location.pathname;
    window.history.pushState({}, "", newUrl);
  };

  return {
    queryParams,
    setQueryParam,
    clearQueryParam,
  };
};

export default useUrlQueryParams;
