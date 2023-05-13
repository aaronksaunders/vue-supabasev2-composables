import { ref } from "vue";
import useClient from "./useClient";

const authResp = ref(null);

const useAuth = () => {
  console.log("init...");

  const { sbAuth } = useClient();

  sbAuth.onAuthStateChange((event, session) => {
    authResp.value = session;
    console.log(session?.user);
  });

  const login = ({ email, password }) => {
    return sbAuth.signInWithPassword({ email, password });
  };

  const createAcct = async ({ email, password, name }) => {
    const createAcctResp =  await sbAuth.signUp({ email, password,});
    if (createAcctResp.error) { 
      return createAcctResp
    }
    const updateResp =  await sbAuth.updateUser({data : { name }});

    return updateResp
  };


  const logout = () => {
    return sbAuth.signOut();
  };

  return {
    authResp,
    login,
    logout,
    createAcct
  };
};
export default useAuth;
