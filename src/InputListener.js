import React, { useState } from 'react';
import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition';
import { MicFill, MicMuteFill } from 'react-bootstrap-icons';

// Example from docs
const InputListener = () => {
	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition();

	// Hooks
	const [editorBody, setBody] = useState('ENTER TITLE OF TRANSCRIPTION HERE');
	const [isCopyActive, setCopyActive] = useState(false);

	// Checks browser for capability
	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>;
	}

	// Controls methods
	const handleStartListening = () => {
		setCopyActive(false);
		setBody(editorBody + '\n>> START \n');
	};

	const handleAddToTranscript = ({ transcript }) => {
		setCopyActive(false);
		editorBody === ''
			? setBody(`> ${transcript}.`)
			: setBody(`${editorBody} 
> ${transcript}.`);
		transcript = '';
	};

	const handleStopListening = () => {
		setCopyActive(false);
		setBody(`${editorBody}

>> END
--------------------------------`);
	};

	// Editor methods
	const handleChange = (e) => {
		setCopyActive(false);
		setBody(e.target.value);
	};

	const handleClearEditor = () => {
		setCopyActive(false);
		setBody('');
	};

	const handleCopyEditor = (e) => {
		setCopyActive(!isCopyActive);
		navigator.clipboard.writeText(editorBody);
	};

	// Component
	return (
		<div className="container">
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

			{/* output of microphone */}
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

			{/* editor */}
			<div className="mt-5 w-75 mx-auto">
				<h3>Editor:</h3>
				<textarea
					name="transcript-editor"
					id="transcript-editor"
					className="form-control"
					rows="10"
					value={editorBody}
					onChange={handleChange}
				></textarea>
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
