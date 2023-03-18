import { url_new } from '../dev';

export const getInitialValues = (formFields, data) => {
	return formFields.reduce((acc, field) => {
		if (field.sub_fields.length > 0) {
			field.sub_fields.forEach((sub_field) => {
				acc[sub_field.name] = sub_field.initial_value;
			});
		} else {
			if (field.initial_value !== undefined) {
				acc[field.name] = field.initial_value;
			}
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
export const handleFormSubmit = (form_name, values) => {
	//this has to be appended due to netlify form handling
	const body = JSON.stringify({
		formName: form_name,
		formData: values
	});

	return fetch(`/api/forms?formName=${form_name}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: body
	}).then();
};
