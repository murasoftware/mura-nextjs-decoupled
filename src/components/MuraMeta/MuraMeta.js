const MuraMeta = ({label,labeltag}) => {
	const LabelHeader = labeltag ? `${labeltag}` : 'h2';
	console.log("META!");

	return (
		<div>
			<div className="mura-object-meta-wrapper">
				<div className="mura-object-meta">
					<LabelHeader>{label}</LabelHeader>
				</div>
			</div>
			<div className="mura-flex-break"></div>
		</div>
	)
}
export default MuraMeta;