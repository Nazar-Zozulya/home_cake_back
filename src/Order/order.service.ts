// import { error } from "";
import { OrderService } from "./order.types";
import { EmailService } from "../tools/emailService";
import { sign } from 'jsonwebtoken'
import { error } from "../tools/result";



export const orderService: OrderService = {
    orderFromSelf: async (user, descriptionOrder) => {

        const token = sign(user.email, process.env.SECRET_KEY ?? '', { expiresIn: "1d" })

        const verification_link = `http://127.0.0.1:8000/${user.email}/${token}`

        const newStorage = EmailService.storage.set(token, {type: 'self', userInfo: user, describeOrder: descriptionOrder} )
        
        const emailResult = await EmailService.sendVerifyfOrderMail(verification_link, user)


        return emailResult
    },

    orderFromCart: async (user, products, delivaryInfo? ) => {

        const token = sign(user.email, process.env.SECRET_KEY ?? '', { expiresIn: "1d" })

        const verification_link = `http://127.0.0.1:8000/${user.email}/${token}`

        const newStorage = EmailService.storage.set(token, {type: 'cart', userInfo: user, products, takeProductInfo: delivaryInfo} )

        const emailResult = await EmailService.sendVerifyfOrderMail(verification_link, user)

        return emailResult
    },

    verifyOrder: async (token) => {
        const storageData = EmailService.storage.get(token)

        if (!storageData) return error("bad data")

        const emailResult = await EmailService.SendOrderToOwner(storageData)

        return emailResult
    }
}