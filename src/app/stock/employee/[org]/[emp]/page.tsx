"use client"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"
import { useParams } from "next/navigation"
import styles from "./css/orgEmpDash.module.css"
import { Alert, Button, Form, Placeholder, Spinner } from "react-bootstrap"
import { SyntheticEvent, useEffect, useState } from "react"
import { ExcercisedOptions, GetStockOptionsAmount, GetVestingCountdown, VestedOptions, CountdownProp, Transfer, CheckForVestAble } from "@/utils/contracts"
import { useMetaMask } from "@/hooks/useMetaMask"
import { checkIfValidAddress } from "@/utils"
import { Placehold } from "@/components/placeholder"

export default function EmployeeDash() {
  const [stockOptions, setStockOptions] = useState(0);
  const [vestedOptions, setVestedOptions] = useState(0);
  const [excercisedOptions, setExcercisedOptions] = useState(0);
  const [countdown, setCountdown] = useState<CountdownProp>();
  const [amount, setAmount] = useState<number>(0);
  const [recipient, setRecipient] = useState<string>("");
  const [vestLoading, setVestLoading] = useState(false);
  const [sPLoading, setSpLoading] = useState(false);
  const [countdownLoading, setCountDownLoading] = useState(false);
  const [exerciseLoading, setExerciseLoading] = useState(false);
  const [transferLoading, setTransferLoading] = useState(false);
  const [invalidData, setInvalidData] = useState(false);
  const [alertCountdown, setAlertCountdown] = useState(false);
  const [vestable, setVestable] = useState(0);
  const [disableVestButton, setDisableVestButton] = useState(true);

  const params: Params = useParams()
  const empAddr = params.emp
  const orgAddr = params.org

  const { wallet, hasProvider, isConnecting, signer, connectMetaMask } = useMetaMask()

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const _amount = (amount);
    const _address = (recipient)?.toString().trim()
    if (wallet.accounts.length >= 1 && hasProvider) {
      if (_amount != 0 && _address != "" && checkIfValidAddress([_address])) {
        try {
          setTransferLoading(true)
          setInvalidData(false);
          const transfer = await Transfer(orgAddr, empAddr, amount)

          console.log(transfer);
        } catch (error) {
          console.error("handle submit emp dash", error)
        } finally {
          setTransferLoading(false)
        }
      }

    } else {
      setInvalidData(true);
    }

  }


  useEffect(() => {
    async function FetchData() {



      setCountDownLoading(true);
      setSpLoading(true);
      setVestLoading(true);
      setExerciseLoading(true);
      const stockOpt: number = await GetStockOptionsAmount(empAddr, orgAddr);
      const vestedOpt: number = await VestedOptions(orgAddr, empAddr);
      const exercisedOpt: number = await ExcercisedOptions(orgAddr, empAddr);
      const vestAble: number = await CheckForVestAble(orgAddr, empAddr);

      setVestable(vestAble);
      setStockOptions(stockOpt);
      setSpLoading(false);
      setVestedOptions(vestedOpt);
      setVestLoading(false);
      setExcercisedOptions(exercisedOpt);
      setExerciseLoading(false);


      const vestingCountdown: CountdownProp = await GetVestingCountdown(orgAddr, empAddr);
      setCountdown(vestingCountdown);
      setCountDownLoading(false);
      if (vestingCountdown.days === 0 && vestingCountdown.hours === 0 && vestingCountdown.minutes === 0) {
        setAlertCountdown(true);
      }

    }


    if (wallet.accounts.length >= 1 && hasProvider) {
      FetchData()
    }
  }, [empAddr, orgAddr, wallet.accounts, hasProvider])

  useEffect(() => {
    if (!checkIfValidAddress([recipient]) && recipient != "") {
      setInvalidData(true)
    }
    else { setInvalidData(false) }
  }, [recipient])
  return (
    <>
      <div className="bg-primary rounded text-center text-white p-2 w-100">{empAddr}</div>
      <div className={styles.main}>
        <div className={styles.main_grid1}>
          <div className={styles.main_grid1__col}>

            <div className={styles.main_grid__timer_box}>
              <div className={styles.main_grid__timer_box__small_grid}>
                <div className={styles.main_grid__timer_box_days__val}>{countdownLoading ? <Spinner /> : countdown?.days}</div>
                <div className={styles.main_grid__timer_box_hours__val}>{countdownLoading ? <Spinner /> : countdown?.hours}</div>
                <div className={styles.main_grid__timer_box_mins__val}>{countdownLoading ? <Spinner /> : countdown?.minutes}</div>
                <div className={styles.main_grid__timer_box_days}>Days</div>
                <div className={styles.main_grid__timer_box_hours}>Hours</div>
                <div className={styles.main_grid__timer_box_mins}>Min</div>
              </div>
            </div>
            <div className="bg-primary text-center rounded-pill text-white mx-auto w-50 mb-5">Countdown For Stock Options to Vest</div>

            {alertCountdown && <Alert variant="danger" className="mb-4" dismissible>Vesting Schedule has not been set</Alert>}

            <div className={styles.main_grid__timer_box_small_card}>Stock Options: {sPLoading ? <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            /> : stockOptions}</div>
            <div className={styles.main_grid__timer_box_small_card}>Vested Options: {vestLoading ? <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            /> : vestedOptions}</div>
            <div className={styles.main_grid__timer_box_small_card}>Excercised Options: {exerciseLoading ? <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            /> : excercisedOptions}</div>

          </div>
        </div>





        <div className={styles.main_grid2}>
          <div className={styles.main_grid2__col}>
            <div className={styles.main_grid2__row}>
              <div className={styles.main_grid2__row_display}>{vestable}</div>
              <Button disabled={vestable < 1} className={styles.main_grid2__row_button}>{countdownLoading ? <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /> : "Vest"}</Button>

            </div>
            <div className={styles.main_grid2__row}>
              <div className={styles.main_grid2__row_display}>{vestedOptions}</div>
              <Button disabled={vestedOptions < 1} className={styles.main_grid2__row_button}>{countdownLoading ? <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /> : "Exercise"}</Button>

            </div>



            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName">
                <div className={styles.main_grid2__row_transfer}>
                  <div className={styles.row_transfer}>
                    <div className={styles.main_grid2__row_display}><Form.Control type="address" name="address" onChange={e => setRecipient(e.target.value)} className="w-100 shadow-none border-white" placeholder="0x0000..." /></div>
                    <div className={styles.main_grid2__row_display}><Form.Control type="number" name="amount" onChange={e => setAmount(Number(e.target.value))} className="w-100 shadow-none border-white" placeholder="0" /></div>
                  </div>
                  <Button type="submit" disabled={recipient == "" || amount < 1 || vestedOptions < 1} className={styles.main_grid2__row_button_transfer}>{transferLoading ? <Spinner
                    as="span"
                    animation="border"
                    role="status"
                    aria-hidden="true"
                  /> : "Transfer"}</Button>
                </div>
              </Form.Group>
            </Form>

            {invalidData && <div className="text-danger" style={{ "fontSize": "15px", "marginTop": "0" }}>Invalid Address !</div>}
          </div>
        </div>
      </div>
    </>
  )
}