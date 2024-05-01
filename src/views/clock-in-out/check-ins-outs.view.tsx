import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegQuestionCircle } from 'react-icons/fa';
import { z } from "zod";
import api from "../../api";
import trackterra from '../../assets/trackterra.png';
import TextWithBorders from "../../components/auth/text-with-borders.component";
import ConfirmButton from "../../components/forms/confirm-button";
import InputForm from "../../components/forms/input-form.component";
import { SearchResults } from "../../components/lists/basic.list";
import { clockInOutSchema } from "../../form-schemas/clock-in-out/clock-in-out.schema";
import * as interfaces from '../../interfaces';


type IClockInOutForm = z.infer<typeof clockInOutSchema>

export default () => {
	const { register, handleSubmit, watch, formState: { errors } } = useForm<IClockInOutForm>({ });
	const [results, setResults] = useState<interfaces.mark.IMark[]>([]);
	const onSubmit = async (_data: IClockInOutForm) => {
		const { marks } = await api.marks.getMarks();
		setResults(marks)
	};

	return (
		<div className="w-full px-6 md:px-0 mb-10 lg:flex lg:justify-center lg:items-center lg:mt-5">
			<div className="lg:w-5/12">
				<div className='flex items-center justify-center pt-10 pb-5'>
					<img className='h-[150px] w-[150px] text-center' src={trackterra} />
				</div>
				<TextWithBorders text="Consultar empleados" />
				<form className="mt-4 bg-white p-5 rounded-md" onSubmit={handleSubmit(onSubmit)} >
					<div className="flex flex-col md:w-full">
						<div className="flex items-stretch items-center justify-center ">
							<div className="flex flex-col md:w-full">
								<InputForm
									{...register('document')}
									type="text"
									name={'document'}
									placeholder="Buscar"
									error={errors.document}
									className="flex-grow h-20"
								/>
							</div>
							<ConfirmButton
								type="submit"
								textButton=" "
								useIcon={true}
								className="text-sm w-1/4 h-20 mt-2 ml-2 w-20"
							/>
						</div>
						<div className="flex aling-center gap-2 flex flex-col md:w-full">
							<p className="py-2 flex text-[12px] opacity-50 items-center">  <FaRegQuestionCircle className="text-gray-400 cursor-pointer mr-2" /> <span className="pr-2">Ingresa número de documento de identidad sin puntos ni comas, fechas o nombres para buscar...</span> </p>
						</div>
					</div>
					<SearchResults results={results.filter((r) => 
						r.name.toLowerCase().includes((watch('document') || '').toLowerCase()) ||
						r.document.toLowerCase().includes((watch('document') || '').toLowerCase()) ||
						r.entryDate.toLowerCase().includes((watch('document') || '').toLowerCase()) ||
						r.exitDate?.toLowerCase().includes((watch('document') || '').toLowerCase())
					)}/>
				</form>
			</div>
		</div>
	);
};
