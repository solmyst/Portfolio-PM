import React, { useEffect, useRef } from 'react';

const BallPit = ({ ballCount = 30, colors = ['#ec4899', '#8b5cf6', '#3b82f6', '#f97316'] }) => {
  const canvasRef = useRef(null);
  const ballsRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Ball {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.radius = Math.random() * 20 + 10;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.gravity = 0.3;
        this.damping = 0.9;
        this.friction = 0.99;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Add shine effect
        const gradient = ctx.createRadialGradient(
          this.x - this.radius / 3,
          this.y - this.radius / 3,
          0,
          this.x,
          this.y,
          this.radius
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      update() {
        this.vy += this.gravity;
        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x + this.radius > canvas.width) {
          this.x = canvas.width - this.radius;
          this.vx *= -this.damping;
        }
        if (this.x - this.radius < 0) {
          this.x = this.radius;
          this.vx *= -this.damping;
        }
        if (this.y + this.radius > canvas.height) {
          this.y = canvas.height - this.radius;
          this.vy *= -this.damping;
        }
        if (this.y - this.radius < 0) {
          this.y = this.radius;
          this.vy *= -this.damping;
        }
      }
    }

    // Initialize balls
    ballsRef.current = Array.from({ length: ballCount }, () => new Ball());

    // Handle mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      ballsRef.current.forEach((ball) => {
        const dx = mouseX - ball.x;
        const dy = mouseY - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const force = (100 - distance) / 100;
          ball.vx -= (dx / distance) * force * 2;
          ball.vy -= (dy / distance) * force * 2;
        }
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ballsRef.current.forEach((ball) => {
        ball.update();
        ball.draw();

        // Ball collision
        ballsRef.current.forEach((otherBall) => {
          if (ball !== otherBall) {
            const dx = otherBall.x - ball.x;
            const dy = otherBall.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < ball.radius + otherBall.radius) {
              const angle = Math.atan2(dy, dx);
              const sin = Math.sin(angle);
              const cos = Math.cos(angle);

              // Rotate velocities
              const vx1 = ball.vx * cos + ball.vy * sin;
              const vy1 = ball.vy * cos - ball.vx * sin;
              const vx2 = otherBall.vx * cos + otherBall.vy * sin;
              const vy2 = otherBall.vy * cos - otherBall.vx * sin;

              // Collision reaction
              ball.vx = vx2 * cos - vy1 * sin;
              ball.vy = vy1 * cos + vx2 * sin;
              otherBall.vx = vx1 * cos - vy2 * sin;
              otherBall.vy = vy2 * cos + vx1 * sin;

              // Separate balls
              const overlap = ball.radius + otherBall.radius - distance;
              ball.x -= (overlap / 2) * cos;
              ball.y -= (overlap / 2) * sin;
              otherBall.x += (overlap / 2) * cos;
              otherBall.y += (overlap / 2) * sin;
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [ballCount, colors]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto"
      style={{ zIndex: 1 }}
    />
  );
};

export default BallPit;
