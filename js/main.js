// 获取DOM元素
const inputData = document.getElementById('inputData');
const outputData = document.getElementById('outputData');
const toCsvBtn = document.getElementById('toCsv');
const toXlsBtn = document.getElementById('toXls');
const toJsonBtn = document.getElementById('toJson');
const clearBtn = document.getElementById('clearInput');
const copyBtn = document.getElementById('copyResult');

// 添加历史记录相关的DOM元素
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistory');

// 转换为CSV格式
function convertToCsv(text) {
    // 将输入文本按行分割
    const lines = text.trim().split('\n');
    // 处理每一行
    const csvLines = lines.map(line => {
        // 将每行文本转换为CSV格式（用逗号分隔）
        return line.trim().split(/\s+/).join(',');
    });
    return csvLines.join('\n');
}

// 转换为XLS格式
function convertToXls(text) {
    // 将输入文本按行分割
    const lines = text.trim().split('\n');
    // 处理每一行
    const xlsLines = lines.map(line => {
        // 将每行文本转换为XLS格式（用制表符分隔）
        return line.trim().split(/\s+/).join('\t');
    });
    return xlsLines.join('\n');
}

// 添加JSON转换函数
function convertToJson(text) {
    try {
        // 首先将输入字符串解析为数组
        let inputArray = JSON.parse(text);
        
        // 转换每一行数据
        const jsonResult = inputArray.map(line => {
            // 使用正则表达式匹配日语、中文和罗马音
            const matches = line.match(/(.*?)\((.*?)\)\s*(.*)/);
            
            if (matches) {
                return {
                    japanese: matches[1].trim(),
                    chinese: matches[2].trim(),
                    romaji: matches[3].trim()
                };
            }
            return null;
        }).filter(item => item !== null);

        // 返回格式化的JSON字符串
        return JSON.stringify(jsonResult, null, 2);
    } catch (error) {
        alert('输入的数据格式不正确！请确保输入的是有效的数组格式。');
        console.error('JSON转换错误：', error);
        return '';
    }
}

// 历史记录管理
class HistoryManager {
    constructor() {
        this.maxHistoryItems = 50; // 最大历史记录数量
    }

    // 获取所有历史记录
    getHistory() {
        const history = localStorage.getItem('conversionHistory');
        return history ? JSON.parse(history) : [];
    }

    // 添加新的历史记录
    addHistory(input, output, type) {
        const history = this.getHistory();
        const newItem = {
            id: Date.now(),
            timestamp: new Date().toLocaleString(),
            input: input,
            output: output,
            type: type
        };

        history.unshift(newItem);
        
        // 限制历史记录数量
        if (history.length > this.maxHistoryItems) {
            history.pop();
        }

        localStorage.setItem('conversionHistory', JSON.stringify(history));
        this.renderHistory();
    }

    // 清空历史记录
    clearHistory() {
        localStorage.removeItem('conversionHistory');
        this.renderHistory();
    }

    // 渲染历史记录列表
    renderHistory() {
        const history = this.getHistory();
        historyList.innerHTML = '';

        history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="timestamp">${item.timestamp}</div>
                <div class="content">输入: ${this.truncateText(item.input, 50)}</div>
                <div class="content">输出: ${this.truncateText(item.output, 50)}</div>
                <div class="content">类型: ${item.type}</div>
            `;

            // 点击历史记录项可以恢复内容
            historyItem.addEventListener('click', () => {
                inputData.value = item.input;
                outputData.value = item.output;
                showToast('已恢复历史记录');
            });

            historyList.appendChild(historyItem);
        });
    }

    // 截断文本
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
}

// 创建历史记录管理器实例
const historyManager = new HistoryManager();

// 初始化历史记录显示
historyManager.renderHistory();

// 清空历史记录按钮事件
clearHistoryBtn.addEventListener('click', () => {
    if (confirm('确定要清空所有历史记录吗？')) {
        historyManager.clearHistory();
        showToast('历史记录已清空');
    }
});

// 事件监听器
toCsvBtn.addEventListener('click', () => {
    const input = inputData.value;
    if (!input.trim()) {
        alert('请先输入数据！');
        return;
    }
    const result = convertToCsv(input);
    outputData.value = result;
    historyManager.addHistory(input, result, 'CSV');
    showToast('CSV格式转换成功！');
});

toXlsBtn.addEventListener('click', () => {
    const input = inputData.value;
    if (!input.trim()) {
        alert('请先输入数据！');
        return;
    }
    const result = convertToXls(input);
    outputData.value = result;
    historyManager.addHistory(input, result, 'XLS');
    showToast('XLS格式转换成功！');
});

toJsonBtn.addEventListener('click', () => {
    const input = inputData.value;
    if (!input.trim()) {
        alert('请先输入数据！');
        return;
    }
    const result = convertToJson(input);
    if (result) {
        outputData.value = result;
        historyManager.addHistory(input, result, 'JSON');
        showToast('JSON格式转换成功！');
    }
});

clearBtn.addEventListener('click', () => {
    inputData.value = '';
    showToast('已清空输入内容');
});

copyBtn.addEventListener('click', async () => {
    if (!outputData.value.trim()) {
        alert('没有可复制的内容！');
        return;
    }
    try {
        await navigator.clipboard.writeText(outputData.value);
        showToast('复制成功！');
    } catch (err) {
        alert('复制失败，请手动复制！');
    }
});

// 添加快捷键支持
document.addEventListener('keydown', (e) => {
    // Ctrl + Enter 快速转换为CSV
    if (e.ctrlKey && e.key === 'Enter') {
        toCsvBtn.click();
    }
});

// 添加 Toast 提示功能
function showToast(message) {
    // 创建 toast 元素
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // 显示动画
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // 3秒后移除
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
} 