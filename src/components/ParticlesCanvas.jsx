import React, { useEffect, useRef } from 'react';

const ParticlesCanvas = ({
    count = 100,
    colors = ['#a855f7', '#ec4899', '#c084fc', '#f472b6', '#d946ef'],
    sizeRange = [1, 4],
    interactive = true,
    className = 'absolute inset-0 w-full h-full block cursor-crosshair z-0',
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Set up canvas dimensions with devicePixelRatio support
        let dims = { width: 0, height: 0, dpr: 1 };
        const setCanvasDimensions = () => {
            if (!canvas.parentElement) return dims;
            const parentWidth = canvas.parentElement.clientWidth;
            const parentHeight = canvas.parentElement.clientHeight;
            const dpr = window.devicePixelRatio || 1;

            // set CSS size
            canvas.style.width = parentWidth + 'px';
            canvas.style.height = parentHeight + 'px';

            // set backing store size for crisp rendering
            canvas.width = Math.max(1, Math.floor(parentWidth * dpr));
            canvas.height = Math.max(1, Math.floor(parentHeight * dpr));

            // map drawing operations to CSS pixels
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            dims = { width: parentWidth, height: parentHeight, dpr };
            return dims;
        };

        dims = setCanvasDimensions();
        const resizeHandler = () => { dims = setCanvasDimensions(); };
        window.addEventListener('resize', resizeHandler);

        const particles = [];
        const particleCount = Math.max(0, parseInt(count, 10) || 0);
        // Purples and pinks palette
        const colors = ['#a855f7', '#ec4899', '#c084fc', '#f472b6', '#d946ef'];

        const mouse = { x: null, y: null, radius: 120 };

        const handleMouseMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        class Particle {
            constructor() {
                const cw = dims.width || (canvas.width / (window.devicePixelRatio || 1));
                const ch = dims.height || (canvas.height / (window.devicePixelRatio || 1));
                this.x = Math.random() * cw;
                this.y = Math.random() * ch;
                this.size = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 20) + 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                // slight constant movement
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                if (interactive) {
                    // Interactive mouse repulsion
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy) || 0.0001;
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = mouse.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    let directionX = forceDirectionX * force * this.density;
                    let directionY = forceDirectionY * force * this.density;

                    if (distance < mouse.radius && mouse.x !== null) {
                        this.x -= directionX;
                        this.y -= directionY;
                    } else {
                        // return to base positions slowly, but let baseline move slowly
                        this.baseX += this.vx;
                        this.baseY += this.vy;

                        // bounce off edges
                        if (this.baseX < 0 || this.baseX > canvas.width) this.vx *= -1;
                        if (this.baseY < 0 || this.baseY > canvas.height) this.vy *= -1;

                        if (this.x !== this.baseX) {
                            let dx = this.x - this.baseX;
                            this.x -= dx / 20;
                        }
                        if (this.y !== this.baseY) {
                            let dy = this.y - this.baseY;
                            this.y -= dy / 20;
                        }
                    }
                } else {
                    // return to base positions slowly, but let baseline move slowly
                    this.baseX += this.vx;
                    this.baseY += this.vy;

                    // bounce off edges
                    if (this.baseX < 0 || this.baseX > canvas.width) this.vx *= -1;
                    if (this.baseY < 0 || this.baseY > canvas.height) this.vy *= -1;

                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 20;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 20;
                    }
                }
            }
        }

        init();

        function init() {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        const animate = () => {
            // clear using CSS pixel dims (ctx is already scaled)
            const clearW = dims.width || (canvas.width / (window.devicePixelRatio || 1));
            const clearH = dims.height || (canvas.height / (window.devicePixelRatio || 1));
            ctx.clearRect(0, 0, clearW, clearH);
            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
                particles[i].update();
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeHandler);
            if (interactive) {
                canvas.removeEventListener('mousemove', handleMouseMove);
                canvas.removeEventListener('mouseleave', handleMouseLeave);
            }
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className={className} />;
};

export default ParticlesCanvas;
