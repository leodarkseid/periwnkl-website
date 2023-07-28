"use client"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { useParams } from "next/navigation"
import styles from "./css/orgEmpDash.module.css"
import { Form } from "react-bootstrap"

export default function EmployeeDash() {
  const params: Params = useParams()
  const empL = params.emp
  const orgL = params.org
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
            <div className="bg-primary text-center rounded-pill text-white mx-auto w-50 mb-5">Countdown For Stock Options to Vest</div>

            <div className={styles.main_grid__timer_box_small_card}>Stock Options: 42424242</div>
            <div className={styles.main_grid__timer_box_small_card}>Vested Options: 42424242</div>
            <div className={styles.main_grid__timer_box_small_card}>Excercised Options: 42424242</div>

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