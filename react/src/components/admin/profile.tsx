import cloneDeep from "lodash.clonedeep";
import { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useWhoIs from "../../hooks/useWhoIs";
import { useGetApiQuery, useSubmitDataMutation } from "../../services/goroskop";
import ScrollDialog from "../quiz/Dialog";
import DraggableEnhancedTable from "./constituents/dragableTable";
import FormAdmin from "./constituents/formAdmin";
import SendStatusButton from "./constituents/sendStatusButton";
import EnhancedTable from "./constituents/Table";
import { QuizType } from "../../types/quiz";
import ReactTable from "./constituents/ReactTable";
import { FilterColumns } from "../../types/filter";
import { Data } from "../../types/data";

const Profile: FC = () => {
    let { user_id } = useParams();

    const [fav, setFav] = useState<any>("");

    const { data, error, isLoading, isSuccess, currentData } = useGetApiQuery(
        `profile/${user_id}`
    );
    const filtersData = useGetApiQuery(`filter`);
    const favData = useGetApiQuery(`find_person?id_in=${fav}`, {
        skip: !fav.length,
    });

    let deepCloneData =
        favData.data && typeof favData.data !== "string"
            ? cloneDeep(favData.data)
            : [];

    const newData =
        favData.data &&
        typeof favData.data !== "string" &&
        data &&
        typeof data !== "string" &&
        deepCloneData.length
            ? favData.data.find((el) => el.id === data[0].id)
                ? deepCloneData.splice(
                      0,
                      0,
                      deepCloneData.splice(
                          Number(
                              deepCloneData.findIndex(
                                  (el) => el.id === data[0].id
                              )
                          ),
                          1
                      )[0]
                  ) && deepCloneData
                : data.slice().concat(deepCloneData)
            : [];

    let FormDefaultValues = data
        ? typeof data[0] != "string"
            ? (data[0] as QuizType)
            : false
        : false;

    const mergeFilterData = useCallback(
        (filtersData: FilterColumns[], userFiltersData: string | null) => {
            if (userFiltersData) {
                const userFiltersArr = JSON.parse(userFiltersData);

                const userFilterIds = userFiltersArr.map((userFilter: any) => {
                    // return Number(userFilter.id) - 1
                    return userFilter.id;
                });

                return filtersData.map((filter) => {
                    // const filter_id = Number(filter.id) - 1
                    const userFilterIndex = userFilterIds.indexOf(filter.id);

                    if (userFilterIndex !== -1) {
                        return {
                            ...userFiltersArr[userFilterIndex],
                            createdByUser: true,
                        };
                    }
                    return { ...filter, createdByUser: false };
                });
            } else {
                return filtersData;
            }
        },
        [filtersData.data, data]
    );

    // data && filtersData.data && console.log(mergeFilterData((filtersData.data as unknown) as FilterColumns[],  data[0].filters));

    useEffect(() => {
        setFav(
            typeof FormDefaultValues !== "boolean" ? FormDefaultValues.fav : ""
        );
    }, [isSuccess]);

    return (
        <>
            {error && <h1>Oops, error </h1>}
            {isLoading && (
                <h1>
                    Подождите, я слишком медленный, что бы быстро загрузиться😀{" "}
                </h1>
            )}
            {FormDefaultValues && (
                <>
                    <SendStatusButton />
                    {filtersData.data && data && (
                        <ScrollDialog fullScreenDialog>
                            <ReactTable
                                filterData={mergeFilterData(
                                    filtersData.data as unknown as FilterColumns[],
                                    data[0].filters
                                )}
                            />
                        </ScrollDialog>
                    )}
                    <FormAdmin defaultValues={FormDefaultValues} />
                    {newData.length > 1 ? (
                        <ScrollDialog fullScreenDialog>
                            <DraggableEnhancedTable
                                data={newData}
                                nameOfTable={"Избранные"}
                                profile={FormDefaultValues}
                            />
                        </ScrollDialog>
                    ) : (
                        <h2>У этого пользователя нет избранных</h2>
                    )}
                </>
            )}
        </>
    );
};

export default Profile;
