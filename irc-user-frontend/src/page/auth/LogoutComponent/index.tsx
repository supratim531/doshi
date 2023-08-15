import React from "react";

import WriteDialog from "../../../component/WriteDialog";


type Props = {
    onCancel?: any,
}

const LogoutComponent = ({ onCancel }: Props) => {
   
    const [dialog, setDialog] = React.useState<boolean>(true)
   
    function successBtnClick() {
        setDialog(false);
        localStorage.clear();
        window.location.reload();       
    }

    const clear = () => {
        onCancel()
    };

    return (
        <WriteDialog
            title={"Do you really want to logout?"}
            dialogState={dialog}
            setDialogState={setDialog}
            successText={"Logout"}
            onSuccess={successBtnClick}
            onCancel={clear}
        >
            
        </WriteDialog>
    );
};

export default LogoutComponent;
