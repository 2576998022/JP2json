import { showToast } from '../../utils/toast.js';

export class DataUpload {
    constructor() {
        this.initElements();
        this.bindEvents();
    }

    initElements() {
        this.inputData = document.getElementById('inputData');
        this.uploadBtn = document.getElementById('uploadBtn');
    }

    bindEvents() {
        this.uploadBtn.addEventListener('click', () => this.uploadData());
    }

    // 格式化输入数据
    formatInputData(inputText) {
        try {
            // 如果已经是JSON格式，直接解析
            const data = JSON.parse(inputText);
            return data;
        } catch (error) {
            // 如果解析失败，尝试处理普通文本格式
            try {
                // 移除所有多余的空格和换行
                const cleanText = inputText.replace(/\s+/g, ' ').trim();
                // 确保是数组格式
                if (!cleanText.startsWith('[') || !cleanText.endsWith(']')) {
                    throw new Error('数据必须是数组格式');
                }
                // 解析为JSON
                return JSON.parse(cleanText);
            } catch (e) {
                throw new Error('数据格式不正确');
            }
        }
    }

    async uploadData() {
        try {
            const inputText = this.inputData.value.trim();
            if (!inputText) {
                showToast('请先输入数据！');
                return;
            }

            // 格式化数据
            const data = this.formatInputData(inputText);
            
            // 验证数据格式
            if (!Array.isArray(data)) {
                showToast('数据必须是数组格式');
                return;
            }

            // 验证每条数据的格式
            const isValid = data.every(item => 
                item.japanese && 
                item.chinese && 
                item.romaji && 
                typeof item.japanese === 'string' &&
                typeof item.chinese === 'string' &&
                typeof item.romaji === 'string'
            );

            if (!isValid) {
                showToast('数据格式不正确，请检查每条数据是否包含必要字段');
                return;
            }

            const response = await fetch('http://localhost:3001/api/sentences/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (result.status === 'success') {
                showToast('数据上传成功');
                this.inputData.value = ''; // 清空输入框
            } else {
                showToast('⚠ ' + (result.message || '数据上传失败'));
            }
        } catch (error) {
            console.error('上传失败：', error);
            showToast('✕ ' + (error.message || '数据格式不正确，请检查JSON格式'));
        }
    }
}

// 初始化上传功能
new DataUpload(); 