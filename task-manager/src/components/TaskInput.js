import React, { useState } from 'react';
import './TaskInput.css';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'; // For microphone icons

const TaskInput = () => {
    const [text, setText] = useState('');
    const [response, setResponse] = useState('');
    const [listening, setListening] = useState(false); // Track listening state

    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await axios.post('http://127.0.0.1:5001/nlp-task', { text }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setResponse(`Task added: ${result.data.description}`);
            resetTranscript(); // Clear the voice transcript after submitting
            setText(''); // Clear the text input after submitting
            window.location.reload();

        } catch (error) {
            console.error('Error adding task', error);
            setResponse('Error adding task');
        }
    };

    const handleStartStopListening = () => {
        if (listening) {
            SpeechRecognition.stopListening();
            setText(transcript);
            resetTranscript();
        } else {
            SpeechRecognition.startListening({ continuous: true });
        }
        setListening(!listening);
    };

    if (!browserSupportsSpeechRecognition) {
        return <p className="no-support">Your browser does not support speech recognition.</p>;
    }

    return (
        <div className="task-input-container">
            <h2 className="task-input-header">Add Task Using NLP</h2>
            <p className="task-input-info">
                Type or use voice to enter your task. For example, say "Finish work by next Friday".
            </p>
            <form onSubmit={handleSubmit} className="task-input-form">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Describe your task here..."
                    className="task-input-textarea"
                />
                <button type="submit" className="submit-button">Submit</button>
            </form>
            <div className="voice-controls">
                <button
                    onClick={handleStartStopListening}
                    className={`voice-button ${listening ? 'stop' : 'start'}`}
                >
                    {listening ? <FaMicrophoneSlash /> : <FaMicrophone />}
                </button>
            </div>
            {response && <p className="response-message">{response}</p>}
        </div>
    );
};

export default TaskInput;
