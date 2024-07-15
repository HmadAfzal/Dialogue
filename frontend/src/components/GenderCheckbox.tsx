
const GenderCheckbox = ({ register }: any) => {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label className='label gap-2 cursor-pointer'>
					<span className='label-text'>Male</span>
					<input
						type='radio'
						className='checkbox border-slate-900'
						name='gender'
						value='male'
						{...register('gender')}
					/>
				</label>
			</div>
			<div className='form-control'>
				<label className='label gap-2 cursor-pointer'>
					<span className='label-text'>Female</span>
					<input
						type='radio'
						className='checkbox border-slate-900'
						name='gender'
						value='female'
						{...register('gender')}
					/>
				</label>
			</div>
		</div>
	);
};

export default GenderCheckbox;
