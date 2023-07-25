import { Alert } from "react-bootstrap";

export const errorAlert = (message: string, variant: string, visible={}) => {
    <Alert variant={variant} dismissible aria-disabled={true} >{message}</Alert>
    try{
      setAlertVariant("danger")
    setAlertMessage(message);
    setShowAlert(true);
    }
    catch(error){
      console.log(error)
    }
    
  }





 