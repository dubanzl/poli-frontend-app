import { Auth } from "aws-amplify";
import { isEmpty } from 'lodash';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as uuid from 'uuid';
import { z } from "zod";
import api from "../../api";
import trackterra from '../../assets/trackterra.png';
import { clockInOutSchema } from "../../form-schemas/clock-in-out/clock-in-out.schema";

type IClockInOutForm = z.infer<typeof clockInOutSchema>

export default () => {
	const { register, handleSubmit, setValue, formState: { errors } } = useForm<IClockInOutForm>();
	const [alert, setAlert] = useState({ msg: '', error: false });
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState<string>('');

	useEffect(() => {
		const getUsername = async () => {
			try {
				const user = await Auth.currentAuthenticatedUser();
				setUsername(user.attributes.name);
			} catch (error) {
				console.log(error);
			}
		};
			getUsername();
	}, []);

	const onSubmit = async (data: IClockInOutForm) => {
		const { document } = data;
		try { 
			setLoading(true)
			if (!isEmpty(document)) {
				setValue('document', '')
				const { marks } = await api.marks.getMarks();
				const filteredMarks = marks.filter(mark => mark.document === document);
				const existingMark = filteredMarks.length > 0 ? filteredMarks[filteredMarks.length - 1] : null;
		
				if (existingMark) {
					if (existingMark.exitDate) {
						await api.marks.createMark({
							id: uuid.v4(),
							name: username,
							document,
							entryDate: new Date().toUTCString(),
						});
						setAlert({ msg: 'Entrada marcada correctamente', error: false });
					} else {
						await api.marks.createMark(
							{
								id: existingMark.id,
								name: existingMark.name,
								document: existingMark.document,
								entryDate: existingMark.entryDate,
								exitDate: new Date().toUTCString(),
							});
						setAlert({ msg: 'Salida marcada correctamente', error: false });
					}
				} else {
					const id = uuid.v4();
					await api.marks.createMark({
						id,
						name: username,
						document,
						entryDate: new Date().toUTCString(),
					});
					setAlert({ msg: 'Entrada marcada correctamente', error: false });
				}
				setLoading(false)
			}
		} catch (err) {
			setLoading(false)
		} finally{
			setLoading(false)
		}
	};

	return (
		<div className="w-full px-6 md:px-0 mb-10 lg:flex lg:justify-center lg:items-center lg:mt-5">
			<div className="lg:w-5/12">
				<div className='flex items-center justify-center pt-10 pb-5'>
						<img className='h-[150px] w-[150px] text-center' src={trackterra} />
				</div>

			
			</div>
		</div>
	);
};
