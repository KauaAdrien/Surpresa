document.addEventListener("DOMContentLoaded", () => {
    const playBtn = document.getElementById("play-btn");
    const introScreen = document.getElementById("intro-screen");
    const staticScreen = document.getElementById("static-screen");
    const messageScreen = document.getElementById("message-screen");
    
    // Captura o elemento de áudio
    const vhsAudio = document.getElementById("vhs-audio"); 

    playBtn.addEventListener("click", () => {
        // Dispara o som no clique
        vhsAudio.play(); 

        // Vibra por 200ms, pausa por 100ms, vibra por 200ms
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);

        introScreen.classList.add("hidden");
        staticScreen.classList.remove("hidden");

        // Ajustado para 9000ms (9 segundos) para bater com a duração do seu áudio
        setTimeout(() => {
            staticScreen.classList.add("hidden");
            messageScreen.classList.remove("hidden");
            startVCRTimer();
        }, 9000); 
    });

    function startVCRTimer() {
        const timeDisplay = document.querySelector('.date');
        let seconds = 0;
        setInterval(() => {
            seconds++;
            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            const s = seconds % 60;
            timeDisplay.textContent = `SP ${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }, 1000);
    }
});