export function initClickEffect() {
    // 存储所有特效元素
    const effectElements = [];
    
    // 特效符号数组
    const effectSymbols = ['✨', '🌟', '⭐', '💫', '✴️', '🎈', '🎉'];
    
    // 预定义颜色数组
    const colors = [
        '#FFB7B7', // 粉红
        '#84B1ED', // 天蓝
        '#C7B7ED', // 淡紫
        '#FFD700', // 金色
        '#FF69B4', // 粉色
        '#4CAF50', // 绿色
        '#FF7F50', // 珊瑚色
        '#9370DB'  // 紫色
    ];

    // 创建特效元素
    function createEffect(e) {
        const effect = document.createElement('div');
        effect.className = 'click-effect';
        
        // 随机选择特效符号
        const randomSymbol = effectSymbols[Math.floor(Math.random() * effectSymbols.length)];
        effect.innerHTML = randomSymbol;
        
        // 随机选择颜色
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // 随机生成初始大小 (12-20之间)
        const initialSize = 12 + Math.random() * 8;
        
        document.body.appendChild(effect);

        effectElements.push({
            el: effect,
            top: e.clientY - initialSize/2,
            left: e.clientX - initialSize/2,
            opacity: 1,
            scale: 1,
            color: randomColor,
            size: initialSize,
            // 随机生成运动方向和速度
            speedX: (Math.random() - 0.5) * 2,
            speedY: -1 - Math.random() * 2,
            // 随机生成旋转角度
            rotate: Math.random() * 360,
            rotateSpeed: (Math.random() - 0.5) * 10
        });
        
        animate();
    }

    // 动画函数
    function animate() {
        for(let i = 0; i < effectElements.length; i++) {
            const item = effectElements[i];
            
            if(item.opacity <= 0) {
                document.body.removeChild(item.el);
                effectElements.splice(i, 1);
                i--;
                continue;
            }

            // 更新位置
            item.top += item.speedY;
            item.left += item.speedX;
            item.opacity -= 0.02;
            item.scale += 0.02;
            item.rotate += item.rotateSpeed;
            
            // 限制缩放范围 (1-2倍之间)
            const currentScale = Math.min(2, Math.max(1, item.scale));
            
            item.el.style.cssText = `
                position: fixed;
                top: ${item.top}px;
                left: ${item.left}px;
                color: ${item.color};
                opacity: ${item.opacity};
                transform: scale(${currentScale}) rotate(${item.rotate}deg);
                pointer-events: none;
                z-index: 9999;
                font-size: ${item.size}px;
                transition: all 0.05s ease;
            `;
        }

        if (effectElements.length > 0) {
            requestAnimationFrame(animate);
        }
    }

    // 绑定点击事件
    document.addEventListener('click', createEffect);
} 