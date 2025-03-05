import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import { QueryController } from "../utils/queryController";

export const useSearchQueries = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const controller = useMemo(() => new QueryController(searchParams), [searchParams]);

  const update = useCallback(
    (fn: (controller: QueryController) => URLSearchParams) => {
      const result = fn(controller);
      setSearchParams(result);
    },
    [controller, setSearchParams],
  );

  return { controller, update };
};
