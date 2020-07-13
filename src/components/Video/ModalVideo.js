import Head from 'next/head';

const ModalVideo = ({props,children}) => {

	const {modalcta,buttonclass,buttonplayiconsize,buttonctatext,showbuttonplayicon} = props;

	switch(modalcta) {
		case "button":
			return (
				<button
					type="button"
					onClick="openVidyardLightbox('#esapiEncode('html',objectparams.videoid)#'); return false;"
					className={`btn btn-${buttonclass}`}>
					{showbuttonplayicon ?
						<i className={`fas fa-play fa-${buttonplayiconsize} align-middle`} />
						:
						null
					}
					{buttonctatext}
					<Head />
				</button>
			)
			break;	

		default:
			return <div>Nah</div>
	}
}

export default ModalVideo;