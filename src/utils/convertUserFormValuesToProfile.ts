import { User, UserFormValues } from "../store/interfaces";

const convertUserFormValuesToProfile = (
  formValues: UserFormValues,
  preProfile: User
): User => {
  return {
    ...preProfile,
    name: formValues.name,
    email: formValues.email,
    address: {
      ...preProfile.address,
      street: formValues.street,
      suite: formValues.suite,
      city: formValues.city,
      zipcode: formValues.zipcode,
    },
    phone: formValues.phone,
    website: formValues.website,
    company: {
      ...preProfile.company,
      name: formValues.companyName,
      catchPhrase: formValues.companyPhrase,
    },
  };
};

export default convertUserFormValuesToProfile;
