import FormInputText from "../components/quiz/form-component/FormInputText";
import FormMultipleCheckboxList from "../components/quiz/form-component/FormMultipleCheckboxList";
import MultipleSelectCheckmarks from "../components/quiz/form-component/FormMultipleSelectCheckmarks";
import FormRangeSlider from "../components/quiz/form-component/FormRangeSlider";
import { FilterFormType } from "../types/filter";

export const available_filters = [
    "Текстовый элемент",
    "Выпадающий список",
    "Выпадающий список с мультиселектом",
    "Диапазон",
    "Радио элемент",
    "Мульти-селектор",
    "Текстовая область",
    "календарь",
    "Календарь (от-до)",
];

/**
 * @description Function return filter by param filter_type (default - text input)
 * @param {any} rest
 * @returns
 */
export const filter = ({
    control,
    label = " ",
    filter_name = " ",
    filter_type = "Текстовый элемент",
    default_data = " ",
    rest = {},
}: FilterFormType): JSX.Element => {
    switch (filter_type) {
        case "Выпадающий список с мультиселектом":
            return (
                <MultipleSelectCheckmarks
                    name={filter_name}
                    label={label}
                    control={control}
                    names_array={default_data}
                    {...rest}
                />
            );

        case "Выпадающий список":
            default_data =
                typeof default_data !== "string" && default_data
                    ? default_data
                    : [];
            return (
                <FormMultipleCheckboxList
                    control={control}
                    name={filter_name}
                    names_array={default_data}
                />
            );

        case "Диапазон":
            default_data =
                typeof default_data !== "string" && default_data
                    ? default_data
                    : [
                          String(new Date().getFullYear() - 1),
                          String(new Date().getFullYear()),
                      ];
            return (
                <FormRangeSlider
                    control={control}
                    label={label}
                    name={filter_name}
                    defaultArrayValue={
                        default_data.map((el) => Number(el)).slice(0, 2) as [
                            number,
                            number
                        ]
                    }
                />
            );

            case "Радио элемент":
                default_data =
                    typeof default_data !== "string" && default_data
                        ? default_data
                        : [
                              String(new Date().getFullYear() - 1),
                              String(new Date().getFullYear()),
                          ];
                return (
                    <FormRangeSlider
                        control={control}
                        label={label}
                        name={filter_name}
                        defaultArrayValue={
                            default_data.map((el) => Number(el)).slice(0, 2) as [
                                number,
                                number
                            ]
                        }
                    />
                );

        default:
            default_data =
                typeof default_data !== "string" ? " " : default_data;
            return (
                <>
                    <FormInputText
                        control={control}
                        label={label}
                        name={filter_name}
                        input_value={default_data}
                    />
                </>
            );
    }
};
