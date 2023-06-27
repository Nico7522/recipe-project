import { useMutation } from "react-query"
import { contact } from "./POST/message-contact"

export const sendMessage = () => {
    return useMutation({
        mutationFn: contact
    })
}