import styles from "./css/header.module.css"

export default function FPHeader() {
    return (
        <>
            <div >
                <h2 className={styles.animate_character}>Periwnkl</h2>



                <span>is a project inspired by novel EVM Applications like Delegation, Abstraction to provide free composable services that brings real life use cases Onchain</span>
                <h2>Crypto does not have to be
                    <div className="message">
                        <div class="word1">close</div>
                        <div class="word2">code</div>
                        <div class="word3">creating</div>
                    </div>all Scam </h2> <h2> We are building for real builders</h2>
            </div>
        </>
    )
}