import useSWR, { useSWRInfinite } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const baseUrl = "https://fam-erp.com/property/website/FamLandingPage";

export const useGetprojects = (path) => {
  if (!path) {
    throw new Error("Path is required");
  }
  const url = baseUrl + path;
  const { data: projects, error } = useSWR(url, fetcher);

  return { projects, error };
};


