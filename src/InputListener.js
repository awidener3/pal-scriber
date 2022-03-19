import React, { useState } from 'react';
import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition';
import { MicFill, MicMuteFill } from 'react-bootstrap-icons';
import IOSelect from './components/IOSelect';
import InputSelect from './components/InputSelect';

const InputListener = () => {
	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition();

	// Hooks
	const [editorBody, setBody] = useState('');
	const [isCopyActive, setCopyActive] = useState(false);

	// Checks browser for capability
	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>;
	}

	// Controls methods
	// Handles initializing input source
	const handleStartListening = () => {
		setCopyActive(false);
		setBody(editorBody + '\n>> START \n');
	};

	// Handles adding current transcription text to textarea
	const handleAddToTranscript = ({ transcript }) => {
		setCopyActive(false);
		editorBody === ''
			? setBody(`> ${transcript}.`)
			: setBody(`${editorBody} 
> ${transcript}.`);
		transcript = '';
	};

	// Handles disabling input source
	const handleStopListening = () => {
		setCopyActive(false);
		setBody(`${editorBody}

>> END
--------------------------------`);
	};

	// Editor methods
	// Handles change on the textarea contents
	const handleChange = (e) => {
		setCopyActive(false);
		setBody(e.target.value);
	};

	// Handles the clear button
	const handleClearEditor = () => {
		setCopyActive(false);
		setBody('');
	};

	// Handles the copy button
	const handleCopyEditor = (e) => {
		setCopyActive(!isCopyActive);
		navigator.clipboard.writeText(editorBody);
	};

	// Function that saves text area content as a text/plain file
	const saveAsText = (filename, content) => {
		// Creates a blob to send into the text file
		const blob = new Blob([content], { type: 'text/plain' });

		// Prepares the download link
		const downloadLink = document.createElement('a');
		downloadLink.download = filename;
		downloadLink.innerHtml = 'Download File';

		// Doesn't render the link on page if browser allows it
		if (window.webkitURL != null) {
			downloadLink.href = window.webkitURL.createObjectURL(blob);
			// Displays link if needed
		} else {
			downloadLink.href = window.URL.createObjectURL(blob);
			downloadLink.onclick = destroyClickedLink;
			downloadLink.style.display = 'none';
			document.body.appendChild(downloadLink);
		}

		downloadLink.click();
	};

	// Removes link created from saveAsText()
	const destroyClickedLink = (e) => {
		document.body.removeChild(e.target);
	};

	// Component
	return (
		<div className="container">
			{/* Visual representations of microphone state */}
			<p className="text-center">
				{listening ? (
					<MicFill size={96} color="#188754" />
				) : (
					<MicMuteFill size={96} color="#dc3546" />
				)}
			</p>

			<p className="display-5 text-center">
				Microphone: {listening ? 'on' : 'off'}
			</p>

			<div className="text-center">
				{/* Start listening to Microphone */}
				<button
					className={
						listening
							? 'btn btn-lg btn-success m-2 disabled'
							: 'btn btn-lg btn-success m-2'
					}
					onClick={() => {
						handleStartListening();
						SpeechRecognition.startListening({ continuous: true });
					}}
				>
					Start
				</button>

				{/* Add transcript to textarea value, clear transcript */}
				<button
					className={
						transcript.length > 0
							? 'btn btn-lg btn-success m-2'
							: 'btn btn-lg btn-success m-2 disabled'
					}
					onClick={() => {
						resetTranscript();
						handleAddToTranscript({ transcript });
					}}
				>
					Add
				</button>

				{/* Stop Listening to Microphone */}
				<button
					className="btn btn-lg btn-danger m-2"
					onClick={() => {
						SpeechRecognition.stopListening();
						handleStopListening();
					}}
				>
					Stop
				</button>
			</div>

			<InputSelect />
			<IOSelect />

			{/* Output of microphone */}
			<div className="w-75 mx-auto">
				<h4>Transcription:</h4>
				<div className="input-group input-group-lg mt-3">
					<div
						className="form-control mx-auto"
						placeholder="Transcription..."
					>
						{transcript || (
							<p className="text-muted">
								Text will appear here...
							</p>
						)}{' '}
					</div>
					<button
						className="input-group-text"
						onClick={resetTranscript}
					>
						CLEAR
					</button>
				</div>
			</div>

			{/* Text editor */}
			<div className="mt-5 w-75 mx-auto">
				<h3>Editor:</h3>

				{/* Filename declaration */}
				<label htmlFor="transcript-filename" className="form-label">
					Enter your filename:
				</label>
				<input
					name="transcript-filename"
					className="form-control mb-2"
					id="transcript-filename"
					placeholder="transcript.txt"
				></input>

				{/* Transcription preview and editor */}
				<label htmlFor="transcript-editor" className="form-label">
					Edit transcription:
				</label>
				<textarea
					name="transcript-editor"
					id="transcript-editor"
					className="form-control"
					rows="10"
					value={editorBody}
					onChange={handleChange}
					placeholder="Text will appear here"
				></textarea>

				{/* Button to save textarea contents as a .txt file */}
				<button
					className="btn btn-primary mt-4 me-2"
					onClick={() => {
						const filename = document.querySelector(
							'#transcript-filename'
						);
						const content =
							document.querySelector('#transcript-editor');
						saveAsText(
							filename.value.split(' ').join('_').toLowerCase(),
							content.value
						);
					}}
				>
					Save as Text File
				</button>

				{/* Button to copy text area contents to clipboard */}
				<button
					className={
						isCopyActive
							? 'btn btn-success mt-4 me-2'
							: 'btn btn-secondary mt-4 me-2'
					}
					onClick={() => {
						handleCopyEditor();
					}}
				>
					{isCopyActive ? 'Copied!' : 'Copy'}
				</button>

				{/* Button to clear text area contents */}
				<button
					className="btn btn-secondary mt-4 me-2"
					onClick={handleClearEditor}
				>
					Clear
				</button>
			</div>
		</div>
	);
};
export default InputListener;
