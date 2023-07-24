import styles from "../page.module.css"
import { GoOrganization } from "react-icons/go";

interface ListCardProps {
    name: string;
    address: string;
    emp: number;
}

export function ListCard(props: ListCardProps){

    return(
        <div className={styles.org_card}>
        <div className={styles.org_card__grid}>
         <span><GoOrganization/></span>
         <h4>{props.name}</h4>
         <div className={styles.org_card__text}>{props.address}</div>
         
         <div className={styles.org_card__value}>{props.emp > 1 ? `${props.emp} employees` : `${props.emp} employee`}</div>
        </div>
        </div>
    )
}