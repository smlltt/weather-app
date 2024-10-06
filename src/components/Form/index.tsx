import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { envConfig } from "../../envConfig.ts";
import { useSearchStore } from "../../zustand";
import { useForm, Controller } from "react-hook-form";
import { PlaceId } from "../../queries/types.ts";

type FormValues = {
  place: {
    label: string;
    value: {
      place_id: PlaceId;
    };
  };
};

const Form = () => {
  const { setPlaceId, addRecentSearch, setPlaceName } = useSearchStore();
  const { control, getValues, reset, setValue, handleSubmit } =
    useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    const placeId = data.place?.value?.place_id;
    const placeName = data.place?.label;

    if (placeId && placeName) {
      setPlaceId(placeId);
      setPlaceName(placeName);
      addRecentSearch(placeId, placeName);
    }
    setValue("place", null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="place"
        control={control}
        render={({ field }) => (
          <GooglePlacesAutocomplete
            apiKey={envConfig.googleApiKey}
            selectProps={{
              ...field,
              placeholder: "Look up a place to see the current weather",
              onChange: (value) => {
                field.onChange(value);
                handleSubmit(onSubmit)();
              },
            }}
          />
        )}
      />
    </form>
  );
};

export default Form;
