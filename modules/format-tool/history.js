import { showToast } from '../../utils/toast.js';

export class HistoryManager {
    constructor() {
        this.maxHistoryItems = 50;
        this.initElements();
        this.bindEvents();
        this.renderHistory();
    }

    initElements() {
        this.historyList = document.getElementById('historyList');
        this.clearHistoryBtn = document.getElementById('clearHistory');
    }

    bindEvents() {
        this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
    }

    getHistory() {
        const history = localStorage.getItem('conversionHistory');
        return history ? JSON.parse(history) : [];
    }

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
        if (history.length > this.maxHistoryItems) {
            history.pop();
        }

        localStorage.setItem('conversionHistory', JSON.stringify(history));
        this.renderHistory();
    }

    clearHistory() {
        if (confirm('确定要清空所有历史记录吗？')) {
            localStorage.removeItem('conversionHistory');
            this.renderHistory();
            showToast('历史记录已清空');
        }
    }

    renderHistory() {
        const history = this.getHistory();
        this.historyList.innerHTML = '';

        history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="timestamp">${item.timestamp}</div>
                <div class="content">输入: ${this.truncateText(item.input, 50)}</div>
                <div class="content">输出: ${this.truncateText(item.output, 50)}</div>
                <div class="content">类型: ${item.type}</div>
            `;

            historyItem.addEventListener('click', () => {
                document.getElementById('inputData').value = item.input;
                document.getElementById('outputData').value = item.output;
                showToast('已恢复历史记录');
            });

            this.historyList.appendChild(historyItem);
        });
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
} 