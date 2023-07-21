import { useState } from "react";

interface PageProps {
    params: {emp :string}
}

export default function Page({ params: {emp} }: PageProps) {
    const [organisationName_, setOrganisationName] = useState("");
    const [totalStockOptions_, setTotalStockOptions] = useState("");
    const [stockOptions_, setStockOptions] = useState("");
    const [vestingSchedule_, setVestingSchedule] = useState("");
    const [vestingCountdown_, setVestingCountdown] = useState("");
    const [vestedOptions_, setVestedOptions] = useState("");
    const [excercisedOptions_, setExcercisedOptions] = useState("");

    const navigation = useNavigation();
    const previousParams = navigation.getParam('org');


    return (
        <div>
            {emp}
        </div>
    )
}