import styles from "./css/list.module.css"
import { GoOrganization } from "react-icons/go";

interface ListCardProps {
    name: string;
    address: string;
    emp: number;
}

interface TitleCardProps {
    title: string
}

export function ListCard(props: ListCardProps){

    return(
        
        <div className={styles.org_card__grid}>
         <span><GoOrganization/></span>
         <div className={styles.org_card__name}>{props.name}</div>
         <div className={styles.org_card__addr}>{props.address}</div>
         
         <div className={styles.org_card__value}>{props.emp > 1 ? `${props.emp} Employees` : `${props.emp} Employee`}</div>
        </div>
        
    )
}

export function ListTitle(props: TitleCardProps){
    return(
        <div className={styles.title}>{props.title}</div>
    )
}