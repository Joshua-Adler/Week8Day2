import React, { Component } from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';

const formSchema = Yup.object().shape({
	'name': Yup.string()
		.typeError('I asked for a string and you gave me... not a string? In a form?')
		.required('Required')
});

const formInitValues = {
	'name': ''
}

function readInfo(data) {
	return {
		name: data.name,
		ability: data.abilities[0].ability.name,
		exp: data.base_experience,
		sprite: data.sprites.front_shiny
	};
}

export default class Home extends Component {

	constructor() {
		super();
		this.state = {
			info: null,
			err: ''
		}
	}

	handleSubmit = ({ name }) => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().replace(/ /g, '-')}`)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				this.setState({ info: readInfo(data), err: '' })
			})
			.catch(error => {
				console.error(error);
				this.setState({ err: 'error' });
			});
	}

	render() {
		return (
			<div>
				<Formik initialValues={formInitValues}
					validationSchema={formSchema}
					onSubmit={(values, { resetForm }) => {
						this.handleSubmit(values);
						resetForm(formInitValues);
					}}>
					{({ errors, touched }) => (
						<Form>
							<label htmlFor='name'>Name</label>
							<Field name='name' />
							{errors.name && touched.name ? <div>{errors.name}</div> : null}
							<br />
							<button type='submit'>Submit</button>
						</Form>
					)}
				</Formik>
				{this.state.err}
				{this.state.info ?
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Ability</th>
								<th>Experience</th>
								<th>Sprite</th>
							</tr>
							<tr>
								<td>{this.state.info.name}</td>
								<td>{this.state.info.ability}</td>
								<td>{this.state.info.exp}</td>
								<td><img src={this.state.info.sprite} alt='images must have an alt text' /></td>
							</tr>
						</thead>
					</table>
					: null}
			</div>
		)
	}
}
