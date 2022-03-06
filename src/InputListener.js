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

	const [editorBody, setBody] = useState('');

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>;
	}

	function handleStopListen({ transcript }) {
		setBody(`${editorBody} ${transcript}`);
	}

	function handleChange(e) {
		setBody(e.target.value);
	}

	return (
		<div className="text-center">
			<p className="display-5">Microphone: {listening ? 'on' : 'off'}</p>

			{/* start listening, continuously */}
			<button
				className="btn btn-success m-2"
				onClick={() =>
					SpeechRecognition.startListening({ continuous: true })
				}
			>
				Start
			</button>

			{/* stop listening */}
			<button
				className="btn btn-danger m-2"
				onClick={() => {
					SpeechRecognition.stopListening();
					// resetTranscript();
					handleStopListen({ transcript });
				}}
			>
				Stop
			</button>

			{/* output of microphone */}
			<p>{transcript}</p>
			<textarea
				name="transcript-editor"
				id="transcript-editor"
				cols="30"
				rows="10"
				value={editorBody}
				onChange={handleChange}
			></textarea>
		</div>
	);
};
export default InputListener;
