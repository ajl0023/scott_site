export const getInitialValues = (formFields, data) => {

	return formFields.reduce((acc, field) => {
		if (field.sub_fields.length > 0) {
			field.sub_fields.forEach((sub_field) => {
				acc[sub_field.name] = sub_field.initial_value;
			});
		} else {
			acc[field.name] = field.initial_value;
		}
		return acc;
	}, {});
};
export const getValidationSchema = (formFields) => {
	return formFields.reduce((acc, field) => {
		if (field.sub_fields.length > 0) {
			field.sub_fields.forEach((sub_field) => {
				acc[sub_field.name] = sub_field.validation;
			});
		} else {
			acc[field.name] = field.validation;
		}
		return acc;
	}, {});
};
export const netlifyFormSubmit = (formName, values) => {
	console.log(values);
	fetch('/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams(values).toString()
	})
		.then(() => console.log('Form successfully submitted'))
		.catch((error) => alert(error));
};
