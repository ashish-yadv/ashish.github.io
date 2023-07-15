window.addEventListener('load', () => {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particlesArray = [];
    let hue = 0;

    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    })

    const mouse = {
        x: 0,
        y: 0,
    };

    class Particles {
        constructor() {
            this.x = mouse.x;
            this.y = mouse.y;
            // this.size = Math.random() * 6;
            this.size = Math.random() * 3;
            // this.speedX = Math.random() * 4 - 2;
            // this.speedY = Math.random() * 4 - 2;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = 'hsl(' + hue + ', 100%, 50%)';
            this.color = 'hsl(156, 100%, 57%)';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }
    }


    function handleParticles() {
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }

        for (let i = 0; i < particlesArray.length; i++) {
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt((dx * dx) + (dy * dy));
                // const distance = Math.sqrt((dx * dx) * (dy * dy));
                // const distance = ((dx * dx) * (dy * dy));
                // const distance = Math.sqrt((dx * dx) - (dy * dy));
                // const distance = Math.sqrt((dx * dx) / (dy * dy));
                // const distance = Math.sqrt((dy * dy) / (dx * dx));
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = particlesArray[i].color;
                    ctx.lineWidth = 0.33;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
                    ctx.stroke();
                    ctx.closePath();
                }
                if (particlesArray[i].size < 1) {
                    particlesArray.splice(i, 1);
                }
            }
        }
    }

    let numberOfParticles = 300;
    function createParticles(numberOfParticles) {
        for (let i = 0; i < numberOfParticles; i++) {
            mouse.x = Math.random() * canvas.width;
            mouse.y = Math.random() * canvas.height;
            particlesArray.push(new Particles);
        }
    }

    createParticles(numberOfParticles);

    window.addEventListener("click", () => {
        numberOfParticles = 30;
        createParticles(numberOfParticles);
    })

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
        // hue++;
        requestAnimationFrame(animate);
    }
    animate();

})