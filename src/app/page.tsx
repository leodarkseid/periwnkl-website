import FPBody from "./frontPage/body";
import FPFooter from "./frontPage/footer";
import FPHeader from "./frontPage/header";
import FPNavbar from "./frontPage/navbar";

export default function Page() {
    return (
        <>
        <FPNavbar />
        <FPHeader />
        <FPBody />
        <FPFooter />
        </>
    )
}