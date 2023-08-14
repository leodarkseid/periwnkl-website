"use client"
import styles from "./css/header.module.css"
import styl from "./css/text.module.css"
import { TypeAnimation } from 'react-type-animation';
import Ellipse from "@/image/homeCircle.svg";
import Image from "next/image"

export default function FPHeader() {
    return (
        <>
            <div  >
                <div className={styles.head}>
                    <h2 className={styles.animate_character}>Periwnkl  </h2>{'  '}



                    &nbsp;<span> is a project inspired by novel EVM Applications like Delegation, Abstraction to provide free composable services that brings real life use cases Onchain</span>
                </div>

                <div className="d-flex justify-content-center py-5">
                    <Image 
                    
                    alt="security"
                    src={Ellipse}
                    height={300}
                    width={400}
                    />
                </div>

                <div>
                    <TypeAnimation
                    className={styl.transition}
                        preRenderFirstString={true}
                        sequence={[
                            500,
                            'Crypto does not have to be', // initially rendered starting point
                            1000,
                            'Crypto does not have to be All Scam',
                            1000,
                            'Crypto does not have to be For Conmen',
                            1000,
                            'Crypto does not have to be Criminals',
                            500,
                        ]}
                        speed={50}
                        style={{ fontSize: '2em' }}
                        repeat={Infinity}
                    />
            </div>
            {/* <div className={styl.h1}>
                <div className={styl.span}>Crypto does not have to be
                    <div className={styl.message}>
                        <div className="word1">All Scam</div>
                        <div className="word2">For Conmen</div>
                        <div className="word3">For Criminals</div>
                    </div>
                    <h2> We are building for real builders</h2>
                </div>
            </div> */}
        </div >
        </>
    )
}