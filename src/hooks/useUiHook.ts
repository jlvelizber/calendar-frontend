import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { onCloseModal, onOpenDateModal } from "../store";

export const useUiHooks = () => {
    const dispatch = useDispatch();
    const { isOPenDateModal } =  useSelector( (state: any) => state.ui )

    const openDateModal = () => {
        dispatch(onOpenDateModal())
    }

    const closeDateModal = () => {
        dispatch(onCloseModal())
    }


    return {
        //!properties
        isOPenDateModal,
        //* Methods
        openDateModal,
        closeDateModal
    }

}