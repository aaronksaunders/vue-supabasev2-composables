import { alertController } from "@ionic/vue";
import { ref } from "vue";

const alert = ref();

 const useAlert = () => {
  const present = async (
    options = { header: "", subHeader: "", message: "" }
  ) => {
    const alert = await alertController.create({
      header: options?.header,
      subHeader: options?.subHeader,
      message: options?.message,
      buttons: ["OK"],
    });
    return alert.present();
  };

  return {
    present,
    dismiss :  ()=> alertController.dismiss(),
  };
};

export default useAlert;