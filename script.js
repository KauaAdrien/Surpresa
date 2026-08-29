document.addEventListener("DOMContentLoaded", () => {
    const playBtn = document.getElementById("play-btn");
    const introScreen = document.getElementById("intro-screen");
    const staticScreen = document.getElementById("static-screen");
    const messageScreen = document.getElementById("message-screen");
    
    const vhsAudio = document.getElementById("vhs-audio"); 
    const bgMusic = document.getElementById("bg-music"); 

    playBtn.addEventListener("click", () => {
        // 1. Toca o primeiro áudio normalmente
        vhsAudio.play(); 
        
        // 2. O TRUQUE PARA O IPHONE:
        // Dá o play na música de fundo IMEDIATAMENTE, mas com volume 0 (muda)
        bgMusic.volume = 0;
        bgMusic.play();
        
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);

        introScreen.classList.add("hidden");
        staticScreen.classList.remove("hidden");

        setTimeout(() => {
            staticScreen.classList.add("hidden");
            messageScreen.classList.remove("hidden");
            
            // 3. Aos 9 segundos, voltamos o tempo para o início 
            // e levantamos o volume para 20% (0.2)
            bgMusic.currentTime = 0;
            bgMusic.volume = 0.2; 
            
            startVCRTimer();
            revealText(); 
            
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
            timeDisplay.textContent = `AM ${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }, 1000);
    }

    // Função que faz os parágrafos aparecerem um por um
    function revealText() {
        const lines = document.querySelectorAll('.fade-line');
        let delay = 0;
        
        lines.forEach((line) => {
            setTimeout(() => {
                line.classList.add('visible');
            }, delay);
            // Adiciona 1.5 segundos (1500ms) de atraso entre cada parágrafo
            delay += 1500; 
        });
    }
});