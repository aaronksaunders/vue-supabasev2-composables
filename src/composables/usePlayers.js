import { ref } from "vue";
import useClient from "./useClient";

const error = ref(null);
const data = ref([]);
const loading = ref(false);

/**
 *
 * @param {*} table - table to execute query against
 * @param {*} columns - columns to return
 * @param {*} auto - if true, run query at startup
 * @returns
 */
export default function (columns = "*", auto = true) {
  // get supabase client
  const { sbDB } = useClient();

  /**
   * this is the function that does the actual query
   */
  const doQuery = async () => {
    loading.value = true;

    let { data: qData, error: qError } = await sbDB("players").select(
      `${columns},organization(id,name)`
    );
    loading.value = false;
    data.value = qData;
    error.value = qError;
  };

  // if auto flag is set, run a startup
  if (auto) {
    doQuery();
  }

  const doUpsert = async (rows = [{}], options = {}) => {
    loading.value = true;
    let { data: qData, error: qError } = await sbDB("players")
      .upsert(rows, { ...options })
      .select();
    loading.value = false;
    data.value = qData;
    error.value = qError;

    return qData;
  };

  const doInsert = async (rows = [{}], options = {}) => {
    loading.value = true;
    let { data, error } = await sbDB("players")
      .insert(rows, { ...options })
      .select();
    loading.value = false;

    return { data, error };
  };

  const doDelete = async (id = "", options = {}) => {
    loading.value = true;
    let { data, error } = await sbDB("players")
      .delete({ returning: true, ...options })
      .match({ id });

    loading.value = false;

    return { data, error };
  };

  const doSelectOne = async (columns = "*", id) => {
    debugger;
    let { data, error } = await sbDB("players")
      .select(`${columns},organization(id,name)`)
      .eq("id", id).single()
    loading.value = false;

    return { data, error };
  };

  return {
    // reactive variables...
    error,
    data,
    loading,
    // function to call to execute query
    doQuery,
    doUpsert,
    doDelete,
    doInsert,
    doSelectOne,
  };
}
