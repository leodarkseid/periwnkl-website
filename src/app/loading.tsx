// import { Spinner } from "@/components/bootstrap";
import styles from './loading.module.css'

export default function Loading() {
    
    return (
            
            <div className={styles.lds_roller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        
    )
    // <Spinner animation="border" className="d-block mx-auto" />
}