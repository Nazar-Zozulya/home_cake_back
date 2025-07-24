import { EmailServiceTypes } from "./types"
import * as nodemailer from "nodemailer"
import { sign } from "jsonwebtoken"
import { success, error } from "./result"
import { userInfo } from "os"
import { title } from "process"

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.GMAIL_MAIL,
		pass: process.env.GMAIL_PASSWORD,
	},
})

export const EmailService: EmailServiceTypes = {
	storage: new Map(),
	sendVerifyfOrderMail: async (verification_link, user) => {
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: user.email,
			subject: "Підтвердіть пошту",
			text: `Добрий день ${user.name} ${user.surname} Підтвердіть свою пошту по цьому посиланню: ${verification_link}`,
		}

		try {
			const info = await transporter.sendMail(mailOptions)
			console.log("Письмо отправлено:", info.response)
			return success("Письмо отправленно")
		} catch (err) {
			console.error("Ошибка при отправке:", err)
			return error("Письмо не отправленно")
		}
	},

	SendOrderToOwner: async (orderInfo) => {
		let text
		if (orderInfo.type === "self") {
			text = `Ім'я: ${orderInfo.userInfo.name} ${orderInfo.userInfo.name} \n
                Номер телефону: ${orderInfo.userInfo.phone} \n
                Пошта: ${orderInfo.userInfo.email} \n
                Заказ: \n
                ${orderInfo.describeOrder}
            `
			// `f"`Ім'я: {data['name']} {data['surname']}\n"
			// f"Номер телефону: {data['phone']}\n"
			// f"Пошта: {data['email']}\n"
			// f"Заказ:\n{data['describeOrder']}"
		} else if (orderInfo.type === "cart") {
			text = `
			Ім'я: ${orderInfo.userInfo.name} ${orderInfo.userInfo.surname}
			Номер телефону: ${orderInfo.userInfo.phone}
			Пошта: ${orderInfo.userInfo.email}

			${
				orderInfo.takeProductInfo
				? `
			Адреса: ${orderInfo.takeProductInfo.adress}
			Дата: ${orderInfo.takeProductInfo.data}
			Час: ${orderInfo.takeProductInfo.time}
			`
					: null
			}

			Заказ: 
		
			${orderInfo.products.map((p) => {
				return `
			${p.name}
			Загальна: Вартість${p.price}
			Кількість ${p.count}
					`
			})}

		`
		}
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: "likeemangames@gmail.com",
			subject: "Підтвердіть пошту",
			title: "Нове замовлення",
			text,
		}

		try {
			const info = await transporter.sendMail(mailOptions)
			console.log("Письмо отправлено:", info.response)
			return success("Письмо отправленно")
		} catch (err) {
			console.error("Ошибка при отправке:", err)
			return error("Письмо не отправленно")
		}
	},
}
