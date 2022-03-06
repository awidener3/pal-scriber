import React, { useState } from 'react';
import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition';

// Example from docs
const InputListener = () => {
	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition();

	const [editorBody, setBody] = useState('>> Start of Transcript');

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>;
	}

	function handleAddToTranscript({ transcript }) {
		editorBody === ''
			? setBody(`> ${transcript}.`)
			: setBody(`${editorBody} 
> ${transcript}.`);
		transcript = '';
	}

	function handleStopListening() {
		setBody(`${editorBody}

>> End of Transcript
--------------------------------`);
	}

	function handleClearEditor() {
		setBody('');
	}

	function handleChange(e) {
		setBody(e.target.value);
	}

	return (
		<div className="text-center">
			<p className="display-5">Microphone: {listening ? 'on' : 'off'}</p>

			<div className="controls">
				{/* Start listening to Microphone */}
				<button
					className="btn btn-success m-2"
					onClick={() =>
						SpeechRecognition.startListening({ continuous: true })
					}
				>
					Start
				</button>

				{/* Add transcript to textarea value, clear transcript */}
				<button
					className="btn btn-success m-2"
					onClick={() => {
						resetTranscript();
						handleAddToTranscript({ transcript });
					}}
				>
					Add
				</button>

				{/* Stop Listening to Microphone */}
				<button
					className="btn btn-danger m-2"
					onClick={() => {
						SpeechRecognition.stopListening();
						handleStopListening();
					}}
				>
					Stop
				</button>
			</div>

			{/* output of microphone */}
			<p>{transcript}</p>

			{/* editor */}
			<div>
				<textarea
					name="transcript-editor"
					id="transcript-editor"
					className="px-3 py-2"
					cols="30"
					rows="10"
					value={editorBody}
					onChange={handleChange}
				></textarea>
			</div>

			<button
				className="btn btn-secondary m-2"
				onClick={handleClearEditor}
			>
				Clear
			</button>
		</div>
	);
};
export default InputListener;
