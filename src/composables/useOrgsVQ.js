import { useQuery } from "@tanstack/vue-query";
import useOrgs from "@/composables/useOrgs";

const useOrgsVQ = () => {
  const { doQuery, doSelectOne } = useOrgs();

  const getAllOrgs = () => {
    const result = useQuery(["orgs"], doQuery);
    return result;
  };

  const getOrgById = (id) => {
    const result = useQuery(["org", id], ()=> doSelectOne(`*`,id));
    return result;
  };

  return {
    getAllOrgs,
    getOrgById
  };
};

export default useOrgsVQ;
