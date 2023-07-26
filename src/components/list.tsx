import styles from "./css/list.module.css"
import styl from "./css/2_list.module.css"
import { GoOrganization } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { shortenAddress } from "@/utils";

interface ListCardProps {
    name: string;
    address: string;
    emp: number;
}

interface TitleCardProps {
    title: string
}

interface empListProps {
    id: string;
    address: string;
}

export function ListCard(props: ListCardProps){

    return(
        
        <div className={styl.emp__grid}>
         <span><GoOrganization/></span>
         <div className={styl.emp__name}>{props.name}</div>
         <div className={styl.emp__addr}>{props.address}</div>
         
         <div className={styl.emp__value}>{props.emp > 1 ? `${props.emp} Employees` : `${props.emp} Employee`}</div>
        </div>
        
    )
}

export function ListTitle(props: TitleCardProps){
    return(
        <div className={styles.title}>{props.title}</div>
    )
}

export function ListEmployee(props: empListProps){
    return(
        <div className={styl.emp__grid}>
         
         <div className={styl.emp__id}>{props.id}.</div>
         <span><CgProfile/></span>
         <div className={styl.emp__addr}>{shortenAddress(props.address)}</div>
        </div>
    )
}