import { showToast } from '../../utils/toast.js';

export class DataList {
    constructor() {
        // 确保在iframe内部运行
        if (window.self === window.top) {
            console.warn('DataList 应该在 iframe 内运行');
            return;
        }
        this.currentPage = 1;
        this.pageSize = 10;
        this.initElements();
        this.bindEvents();
        // 初始加载数据
        this.loadData();
    }

    initElements() {
        this.tableBody = document.getElementById('dataTableBody');
        this.prevPageBtn = document.getElementById('prevPage');
        this.nextPageBtn = document.getElementById('nextPage');
        this.currentPageSpan = document.getElementById('currentPage');
    }

    bindEvents() {
        this.prevPageBtn.addEventListener('click', () => this.prevPage());
        this.nextPageBtn.addEventListener('click', () => this.nextPage());
    }

    // 加载数据的占位方法
    async loadData() {
        try {
            // 这里添加加载动画
            this.tableBody.innerHTML = '<tr><td colspan="7" class="loading-text">加载中...</td></tr>';
            
            // TODO: 实际的数据加载将在后续实现
            // 临时显示一些示例数据
            this.renderDummyData();
            
        } catch (error) {
            console.error('加载数据失败：', error);
            showToast('加载数据失败，请稍后重试');
        }
    }

    // 渲染示例数据（临时方法）
    renderDummyData() {
        const dummyData = [
            {
                id: 1,
                japanese: 'こんにちは',
                chinese: '你好',
                romaji: 'Konnichiwa',
                audio_url: '#',
                created_at: '2024-01-01 12:00:00',
                updated_at: '2024-01-01 12:00:00'
            }
        ];

        this.tableBody.innerHTML = dummyData.map(item => `
            <tr>
                <td>${item.id}</td>
                <td>${item.japanese}</td>
                <td>${item.chinese}</td>
                <td>${item.romaji}</td>
                <td>${item.audio_url ? `<a href="${item.audio_url}" class="audio-link">播放</a>` : '-'}</td>
                <td>${item.created_at}</td>
                <td>${item.updated_at}</td>
            </tr>
        `).join('');
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.currentPageSpan.textContent = this.currentPage;
            this.loadData();
        }
    }

    nextPage() {
        this.currentPage++;
        this.currentPageSpan.textContent = this.currentPage;
        this.loadData();
    }
}

// 初始化数据列表
new DataList(); 