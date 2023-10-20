export const Initial = {
	motivoDemanda: null,
	relatoDemanda: null,
	idOrganizacion: null,
	idTipo: null,
	almacenDemanda: null,
	personasInvolucradas: {
		demandante: {},
		alumno: {},
	},
	esDemandante: false,
};

export const demandaFormReducer = (state, action) => {
	switch (action.type) {
		case "inputDemandaChange":
			if (action.field == "idTipo" && action.payload != 3) {
				return {
					...state,
					[action.field]: action.payload,
					personasInvolucradas: {
						demandante: {
							...state.personasInvolucradas.demandante,
							alumno: false,
						},
						alumno: {},
					},
				};
			} else {
				return {
					...state,
					[action.field]: action.payload,
				};
			}

		case "esDemandanteChange":
			if (state.idTipo == 3) {
				if (!state.esDemandante == true) {
					return {
						...state,
						esDemandante: !state.esDemandante,
						personasInvolucradas: {
							demandante: {
								...state.personasInvolucradas.demandante,
								grado: state.personasInvolucradas.alumno.grado || null,
								turno: state.personasInvolucradas.alumno.turno || null,
								docente: state.personasInvolucradas.alumno.docente || null,
								alumno: true,
								demandante: true,
							},
							alumno: {},
						},
					};
				} else {
					return {
						...state,
						esDemandante: !state.esDemandante,
						personasInvolucradas: {
							...state.personasInvolucradas,
							demandante: {
								...state.personasInvolucradas.demandante,
								grado: null,
								turno: null,
								docente: null,
								alumno: false,
								demandante: true,
							},
							alumno: {
								...state.personasInvolucradas.alumnos,
								grado: state.personasInvolucradas.demandante.grado || null,
								turno: state.personasInvolucradas.demandante.turno || null,
								docente: state.personasInvolucradas.demandante.docente || null,
								alumno: true,
								demandante: false,
							},
						},
					};
				}
			}

		case "inputPersonasInvolucradasChange":
			if (state.idTipo != 3) {
				return {
					...state,
					personasInvolucradas: {
						demandante: {
							...state.personasInvolucradas.demandante,
							[action.field]: action.payload,
							grado: null,
							turno: null,
							docente: null,
							alumno: false,
							demandante: true,
						},
						alumno: {},
					},
				};
			} else {
				if (state.esDemandante) {
					return {
						...state,
						personasInvolucradas: {
							...state.personasInvolucradas,
							demandante: {
								...state.personasInvolucradas.demandante,
								[action.field]: action.payload,
								alumno: true,
								demandante: true,
							},
							alumno: {},
						},
					};
				} else {
					if (action.demandante) {
						return {
							...state,
							personasInvolucradas: {
								...state.personasInvolucradas,
								demandante: {
									...state.personasInvolucradas.demandante,
									[action.field]: action.payload,
									alumno: false,
									demandante: true,
									grado: null,
									turno: null,
									docente: null,
								},
								alumno: {
									...state.personasInvolucradas.alumno,
									alumno: true,
									demandante: false,
								},
							},
						};
					} else {
						return {
							...state,
							personasInvolucradas: {
								...state.personasInvolucradas,
								alumno: {
									...state.personasInvolucradas.alumno,
									[action.field]: action.payload,
									alumno: true,
									demandante: false,
								},
								demandante: {
									...state.personasInvolucradas.demandante,
									alumno: false,
									demandante: true,
									grado: null,
									turno: null,
									docente: null,
								},
							},
						};
					}
				}
			}

		default:
			return state;
	}
};
