export function showToast(message, duration = 3000) {
    // 移除现有的 toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // 创建新的 toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    // 添加到 iframe 文档中
    document.body.appendChild(toast);

    // 显示 toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // 隐藏并移除 toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
} 