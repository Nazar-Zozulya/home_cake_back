import * as yup from "yup"

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const timeRegExp = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])$/

const dataRegExp = /^$/

export const OrderValidation = {
	selfOrder: yup.object({
		user: yup.object({
			name: yup
				.string()
				.required("Вкажіть ваше ім'я")
				.min(2, "Ваше ім'я надто маленьке")
				.max(30, "Ваше ім'я надто велике"),
			surname: yup
				.string()
				.required("Вкажіть ваше ім'я")
				.min(2, "Ваше прізвище надто маленьке")
				.max(30, "Ваше прізвище надто велике"),
			email: yup
				.string()
				.email("Ваша пошта неккоректна")
				.required("Вкажіть вашу пошту")
				.min(5, "Ваша пошта занадто маленька")
				.max(50, "Ваша пошта занадто велика"),
			phone: yup
				.string()
				.matches(phoneRegExp, "Некорректний номер телефону")
				.required("Вкажіть вашу пошту")
				.min(9, "Ваша номер телефону занадто маленький")
				.max(50, "Ваша номер телефону занадто великий"),
		}),
		descriptionOrder: yup
			.string()
			.required("Ви не вказали ваше замовлення"),
	}),
	cartOrder: yup.object({
		user: yup.object({
			name: yup
				.string()
				.required("Вкажіть ваше ім'я")
				.min(2, "Ваше ім'я надто маленьке")
				.max(30, "Ваше ім'я надто велике"),
			surname: yup
				.string()
				.required("Вкажіть ваше ім'я")
				.min(2, "Ваше прізвище надто маленьке")
				.max(30, "Ваше прізвище надто велике"),
			email: yup
				.string()
				.email("Ваша пошта неккоректна")
				.required("Вкажіть вашу пошту")
				.min(5, "Ваша пошта занадто маленька")
				.max(50, "Ваша пошта занадто велика"),
			phone: yup
				.string()
				.matches(phoneRegExp, "Некорректний номер телефону")
				.required("Вкажіть вашу пошту")
				.min(9, "Ваша номер телефону занадто маленький")
				.max(50, "Ваша номер телефону занадто великий"),
		}),
		delivaryInfo: yup.object({
			addres: yup.string().required("Вкажіть вашу адресу"),
			data: yup
				.string()
				.required("Вкажіть дату коли ми вам привеземо замовлення")
				.matches(dataRegExp, "Некорректна дата"),
			time: yup
				.string()
				.required("Вкажіть час коли ми вам привеземо замовлення")
				.matches(timeRegExp, "Некорректний час"),
		}),
	}),
}
