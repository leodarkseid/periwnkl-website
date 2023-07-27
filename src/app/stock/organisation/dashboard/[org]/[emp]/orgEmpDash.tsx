"use client"

import { Col, Form, Row } from "react-bootstrap"
import styles from "./css/orgEmpDash.module.css"
interface EmpDashProps {
    address: string
}
export function EmpDashBoard(props: EmpDashProps) {

    return (
        <>
            <div className="bg-primary rounded text-center text-white p-2 w-100">This is the Address of Employee</div>
            <div className={styles.main}>
                <div className={styles.main_grid1}>
                    <div className={styles.main_grid1__col}>
                        <div className={styles.main_grid__timer_box}>
                            <div className={styles.main_grid__timer_box__small_grid}>
                                <div className={styles.main_grid__timer_box_days__val}>21</div>
                                <div className={styles.main_grid__timer_box_hours__val}>21</div>
                                <div className={styles.main_grid__timer_box_mins__val}>21</div>
                                <div className={styles.main_grid__timer_box_days}>Days</div>
                                <div className={styles.main_grid__timer_box_hours}>Hours</div>
                                <div className={styles.main_grid__timer_box_mins}>Min</div>
                            </div>
                        </div>
                    </div>
                </div>





                <div className={styles.main_grid2}>
                    <div className={styles.main_grid2__col}>
                        <div className={styles.main_grid2__row}>
                            <div className={styles.main_grid2__row_display}>1</div>
                            <div className={styles.main_grid2__row_button}>Vest</div>

                        </div>
                        <div className={styles.main_grid2__row}>
                            <div className={styles.main_grid2__row_display}>1</div>
                            <div className={styles.main_grid2__row_button}>Exercise</div>

                        </div>
                        <div className={styles.main_grid2__row}>
                            <div className={styles.main_grid2__row_display}><Form className="w-100"><Form.Control placeholder="0x0000..." /></Form></div>
                            <div className={styles.main_grid2__row_button}>Transfer</div>

                        </div>
                        <div className={styles.main_grid2__row}>
                            <div className={styles.main_grid2__row_display}>1</div>
                            <div className={styles.main_grid2__row_button}>2</div>

                        </div>
                        <div className={styles.main_grid2__row}>
                            <div className={styles.main_grid2__row_display}>1</div>
                            <div className={styles.main_grid2__row_button}>2</div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}