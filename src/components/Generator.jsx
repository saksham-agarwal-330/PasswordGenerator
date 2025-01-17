import { useState, useCallback, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
const Generator = () => {
    const [passLength, setPassLength] = useState(8);
    const [hasLettersUppercase, setHasLettersUppercase] = useState(true);
    const [hasLettersLowercase, setHasLettersLowercase] = useState(true);
    const [hasNumbers, setHasNumbers] = useState(true);
    const [hasSymbols, setHasSymbols] = useState(true);

    const [password, setPassword] = useState('');
    const passwordRef = useRef(null);

    const generatePassword = useCallback(() => {
        let charSet = '';
        if (hasLettersUppercase) charSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (hasLettersLowercase) charSet += 'abcdefghijklmnopqrstuvwxyz';
        if (hasNumbers) charSet += '0123456789';
        if (hasSymbols) charSet += '!@#$%^&*()_+';

        if (charSet.length === 0) {
            setPassword('');
            return;
        }

        let generatedPassword = '';
        for (let i = 0; i < passLength; i++) {
            const randomCharIndex = Math.floor(Math.random() * charSet.length);
            generatedPassword += charSet[randomCharIndex];
        }

        setPassword(generatedPassword);
    }, [passLength, hasLettersUppercase, hasLettersLowercase, hasNumbers, hasSymbols]);

    const copyPassword = () => {
        if (passwordRef.current) {
            navigator.clipboard.writeText(passwordRef.current.value);
            toast.success('Password copied!', {
                theme: 'dark'
            });
        }
    };

    const regeneratePassword = () => {
        generatePassword();
        toast.success('Password regenerated!', {
            theme: 'dark'
        });
    };


    useEffect(() => {
        generatePassword();
    }, [passLength, hasLettersUppercase, hasLettersLowercase, hasNumbers, hasSymbols, generatePassword]);
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce
            />
                <div className="w-full max-w-lg flex flex-col items-center bg-gray-800 rounded-lg shadow-lg p-6">
                    <h1 className="text-4xl text-center text-purple-500 mb-6">Password Generator</h1>

                    <div className="my-4 flex items-center bg-gray-700 rounded-lg overflow-hidden shadow-md">
                        <input
                            type="text"
                            value={password}
                            className="outline-none w-full py-3 px-4 text-2xl bg-gray-700 text-white placeholder-gray-500"
                            placeholder="Password"
                            readOnly
                            ref={passwordRef}
                        />

                        <img src="copy_icon.svg" alt="" className=' cursor-pointer w-9 h-9' onClick={copyPassword} />

                        <lord-icon
                            src="https://cdn.lordicon.com/rsbokaso.json"
                            trigger="hover"
                            colors="primary:#8930e8"
                            style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                            onClick={regeneratePassword}>

                        </lord-icon>

                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-4 mb-6">
                        <div className="flex items-center w-full gap-x-2">
                            <label className="text-white">Length:&nbsp;{passLength}</label>
                            <input
                                type="range"
                                min={6}
                                max={100}
                                value={passLength}
                                className="w-full h-2 bg-purple-300 rounded-lg cursor-pointer accent-purple-500"
                                onChange={(e) => setPassLength(Number(e.target.value))}
                            />
                        </div>

                        <div className="flex items-center gap-x-2">
                            <input
                                type="checkbox"
                                checked={hasSymbols}
                                onChange={() => setHasSymbols((prev) => !prev)}
                                className="h-5 w-5 accent-purple-500"
                            />
                            <label className="text-white">Symbols</label>
                        </div>

                        <div className="flex items-center gap-x-2">
                            <input
                                type="checkbox"
                                checked={hasNumbers}
                                onChange={() => setHasNumbers((prev) => !prev)}
                                className="h-5 w-5 accent-purple-500"
                            />
                            <label className="text-white">Numbers</label>
                        </div>

                        <div className="flex items-center gap-x-2">
                            <input
                                type="checkbox"
                                checked={hasLettersLowercase}
                                onChange={() => setHasLettersLowercase((prev) => !prev)}
                                className="h-5 w-5 accent-purple-500"
                            />
                            <label className="text-white">Lowercase</label>
                        </div>

                        <div className="flex items-center gap-x-2">
                            <input
                                type="checkbox"
                                checked={hasLettersUppercase}
                                onChange={() => setHasLettersUppercase((prev) => !prev)}
                                className="h-5 w-5 text-purple-500 accent-purple-500"
                            />
                            <label className="text-white">Uppercase</label>
                        </div>
                    </div>
                    <button
                        className="bg-purple-500 text-white px-4 py-3 ml-2 rounded-lg hover:bg-purple-600 transition-colors"
                        onClick={copyPassword} >
                        Copy Password
                    </button>
                </div>
        </>
    )
}

export default Generator