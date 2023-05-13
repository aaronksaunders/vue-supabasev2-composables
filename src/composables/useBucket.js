import { ref } from "vue";
import useClient from "./useClient";

const error = ref(null);
const data = ref([]);
const loading = ref(true);

/**
 *
 * @param {*} bucket
 * @param {*} options
 * @returns
 */
function useBucket(bucket = "", options = {}) {
  const { sbStorage } = useClient();

  /**
   *  Get all of the images from the bucket
   * @returns 
   */
  const doQuery = async () => {
    console.log("in select bucket hook...");
    loading.value = true;
    const { data, error } = await client.storage.from(bucket).list(path, {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
      ...options,
    });

    loading.value = false;
    return { data, error };
  };

  /**
   * add object to bucket
   * 
   * @param {*} blob
   * @param {*} filename
   */
  const doUpload = async (blob, filename) => {
    let uploadBlob = null;
    if (blob instanceof String) {
      // if string, we assume it is a path and try to convert
      // to blob...
      const response = await fetch(blob);
      uploadBlob = await response.blob();
    } else {
      // its just a Blob|File so upload it
      uploadBlob = blob;
    }
    console.log("in upload hook...");

    const { data, error } = await sbStorage
      .from(bucket)
      .upload(`${filename}`, uploadBlob, {
        cacheControl: "3600",
        upsert: false,
        ...options,
      });

    loading.value = false;
    return { data, error };
  };

  return {
    error,
    data,
    loading,
    doUpload,
    doQuery,
  };
}

export default useBucket;
