import { UserFormValues } from "../store/interfaces";
const createNewProfileObject = (formValues: UserFormValues) => {
  return {
    name: formValues.name,
    email: formValues.email,
    avatarUrl: "",
    username: "",
    address: {
      geo: {
        lat: "0",
        lng: "0",
      },
      street: formValues.street,
      suite: formValues.suite,
      city: formValues.city,
      zipcode: formValues.zipcode,
    },
    phone: formValues.phone,
    website: formValues.website,
    company: {
      bs: "",
      name: formValues.companyName,
      catchPhrase: formValues.companyPhrase,
    },
  };
};

export default createNewProfileObject;
