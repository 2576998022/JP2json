import { showToast } from '../../utils/toast.js';
import { HistoryManager } from './history.js';

// 格式转换功能
export class FormatTool {
    constructor() {
        this.initElements();
        this.bindEvents();
        this.historyManager = new HistoryManager();
    }

    initElements() {
        this.inputData = document.getElementById('inputData');
        this.outputData = document.getElementById('outputData');
        this.toCsvBtn = document.getElementById('toCsv');
        this.toXlsBtn = document.getElementById('toXls');
        this.toJsonBtn = document.getElementById('toJson');
        this.clearBtn = document.getElementById('clearInput');
        this.copyBtn = document.getElementById('copyResult');
    }

    bindEvents() {
        this.toCsvBtn.addEventListener('click', () => this.convertToCsv());
        this.toXlsBtn.addEventListener('click', () => this.convertToXls());
        this.toJsonBtn.addEventListener('click', () => this.convertToJson());
        this.clearBtn.addEventListener('click', () => this.clearInput());
        this.copyBtn.addEventListener('click', () => this.copyResult());
    }

    // 实现转换方法
    convertToCsv() {
        const input = this.inputData.value.trim();
        if (!input) {
            showToast('请先输入数据！');
            return;
        }
        // 将输入文本按行分割，并用逗号连接
        const lines = input.split('\n');
        const csvLines = lines.map(line => {
            return line.trim().split(/\s+/).join(',');
        });
        const result = csvLines.join('\n');
        this.outputData.value = result;
        this.historyManager.addHistory(input, result, 'CSV');
        showToast('CSV格式转换成功！');
    }

    convertToXls() {
        const input = this.inputData.value.trim();
        if (!input) {
            showToast('请先输入数据！');
            return;
        }
        // 将输入文本按行分割，并用制表符连接
        const lines = input.split('\n');
        const xlsLines = lines.map(line => {
            return line.trim().split(/\s+/).join('\t');
        });
        const result = xlsLines.join('\n');
        this.outputData.value = result;
        this.historyManager.addHistory(input, result, 'XLS');
        showToast('XLS格式转换成功！');
    }

    convertToJson() {
        const input = this.inputData.value.trim();
        if (!input) {
            showToast('请先输入数据！');
            return;
        }
        try {
            // 尝试解析输入的JSON数组
            let inputArray = JSON.parse(input);
            
            // 转换每一行数据
            const jsonResult = inputArray.map(line => {
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

            const result = JSON.stringify(jsonResult, null, 2);
            this.outputData.value = result;
            this.historyManager.addHistory(input, result, 'JSON');
            showToast('JSON格式转换成功！');
        } catch (error) {
            showToast('输入的数据格式不正确！');
            console.error('JSON转换错误：', error);
        }
    }

    clearInput() {
        this.inputData.value = '';
        showToast('已清空输入内容');
    }

    async copyResult() {
        const output = this.outputData.value.trim();
        if (!output) {
            showToast('没有可复制的内容！');
            return;
        }
        try {
            await navigator.clipboard.writeText(output);
            showToast('复制成功！');
        } catch (err) {
            showToast('复制失败，请手动复制！');
            console.error('复制错误：', err);
        }
    }
} 