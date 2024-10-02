import Step from './Step'

const StepNumber: React.FC<{ pageNumber: number }> = props => {
	return (
		<div className="steps">
			<Step pageNumber={props.pageNumber} stepNumber={1} text="Neighbourhood Land Uses" />
			<Step pageNumber={props.pageNumber} stepNumber={2} text="Quality & Condition" />
			<Step pageNumber={props.pageNumber} stepNumber={3} text="Subject Current Quality & Condition" />
			<Step pageNumber={props.pageNumber} stepNumber={4} text="Summary" />
		</div>
	)
}

export default StepNumber
